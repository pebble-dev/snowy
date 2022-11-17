var _ = require('./app-localize')._;
var Config = require('./app-settings');
var App = require('./app-messaging');
var Parser = require('./app-parser');

var API_URL_ROOT = 'https://timeline-api.getpebble.com/';

var deleteCount = 0, insertCount = 0;

module.exports = {
	insertUserPin : function(pin, callback){
		try{
		var url = API_URL_ROOT + 'v1/user/pins/' + pin.id;
  
 	 var xhr = new XMLHttpRequest();
 	 xhr.open('PUT', url, false);
 	 
 	   Pebble.getTimelineToken(function(token){
 	     xhr.setRequestHeader('Content-Type', 'application/json');
 	     xhr.setRequestHeader('X-User-Token', '' + token);
 	     xhr.send(JSON.stringify(pin));
			 
			 if(xhr.status === 503 || xhr.status === 429){
				 if(insertCount < 3){
					 insertCount++;
					 this.insertUserPin(pin, callback);
					 return;
				 }
				 else{
					 insertCount = 0;
					 App.sendErrorMessage( { "Title" : _("Timeline Down!"), "Body" : _("Pebble's servers are down at the moment. Please try your request again later!") } );
					 return;
				 }
			 }
			 else if(xhr.status !== 200){
				 App.sendErrorMessage( { "Title" : _("Timeline Error!"), "Body" : _("Something's not quite right with that Timeline Pin!\nError: ") + xhr.status } );
				 return;
			 }
			 
			 callback(xhr.responseText);
 	   	}, function(error){
				App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong with your Timeline. Try again?") } );
	    });

		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong with your Timeline. Try again?") } );
		}
	},
	deleteUserPin : function(pin, callback){
		try{
		var url = API_URL_ROOT + 'v1/user/pins/' + pin.id;
  
 	 var xhr = new XMLHttpRequest();
 	 xhr.open('DELETE', url, false);
 	 
 	   Pebble.getTimelineToken(function(token){
 	     xhr.setRequestHeader('Content-Type', 'application/json');
 	     xhr.setRequestHeader('X-User-Token', '' + token);
 	     xhr.send(JSON.stringify(pin));
			 
			 if(xhr.status === 503 || xhr.status === 429){
				 if(deleteCount < 3){
					 deleteCount++;
					 this.deleteUserPin(pin, callback);
					 return;
				 }
				 else{
					 deleteCount = 0;
					 App.sendErrorMessage( { "Title" : _("Timeline Down!"), "Body" : _("Pebble's servers are down at the moment. Please try your request again later!") } );
					 return;
				 }
			 }
			 else if(xhr.status !== 200){
				 App.sendErrorMessage( { "Title" : _("Timeline Error!"), "Body" : _("Something's not quite right with that Timeline Pin!\nError: ") + xhr.status } );
				 return;
			 }
			 
				 callback(xhr.responseText);
 		  }, function(error){
				App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong with your Timeline. Try again?") } );
	    });
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong with your Timeline. Try again?") } );
		}
	},
	reminderPin : function(start, body){
		try{
			var id = "snowy_reminder_" + Date.now();
			localStorage.lastPin = id;
			localStorage.lastBody = body;
			
			var pin = {
				"id" : id,
				"time" : start.toISOString(),
				"duration" : 1,
				"layout" : {
					"title" : body,
					"subtitle" : _("via Snowy"),
					"type" : "genericPin",
					"tinyIcon" : "system://images/NOTIFICATION_REMINDER",
					"largeIcon": "system://images/NOTIFICATION_REMINDER",
					"foregroundColor" : "#000000",
					"backgroundColor" : "#00AAAA"
				},
				"reminders" : [
					{
						"time" : start.toISOString(),
						"layout" : {
							"type" : "genericReminder",
							"tinyIcon" : "system://images/NOTIFICATION_REMINDER",
							"largeIcon": "system://images/NOTIFICATION_REMINDER",
							"title" : body
						}
					}
				],
				"actions": [
						{
							"title": _("Open Snowy"),
							"type": "openWatchApp",
							"launchCode": 0
						}
					]
			};
			
			if(Config.getConfig().IftttPlus){
				try{
					var url = "http://maker.ifttt.com/trigger/" + _("snowy_reminder") + "/with/key/" + Config.getConfig().IftttKey;
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);
				
					var data = { "value1" : body, "value2" : start.toGCalString() };
				
					xhr.setRequestHeader("Content-Type", "application/json");
				  xhr.send(decodeURIComponent(JSON.stringify(data)));
				}
				catch(e){}
			}
			
			this.insertUserPin(pin, function(response){		
				App.sendMessage( { "Title" : _("Ok, I'll remind you!"), "Body" : _("Reminder to \"") + body + _("\" set for ") + start.toLocaleString() } );
			});
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again.") } );
		}
	},
	calendarPin : function(start, diff, body){
		try{
			var id = "snowy_calendar_" + Date.now();
			
			if(body === "") body = _("Meeting!");
			
			localStorage.lastPin = id;
			localStorage.lastBody = body;
			
			var end = new Date(start.getTime() + diff*60*1000);
			
			var pin = {
				"id" : id,
				"time" : start.toISOString(),
				"duration" : diff,
				"layout" : {
					"title" : body,
					"locationName" : _("via Snowy"),
					"type" : "calendarPin",
					"tinyIcon" : "system://images/SCHEDULED_EVENT",
					"largeIcon": "system://images/SCHEDULED_EVENT",
					"foregroundColor" : "#000000",
					"backgroundColor" : "#00AAAA"
				},
				"reminders" : [
					{
						"time" : new Date(start.getTime() - 15*60*1000).toISOString(),
						"layout" : {
							"type" : "genericReminder",
							"tinyIcon" : "system://images/NOTIFICATION_REMINDER",
							"largeIcon": "system://images/NOTIFICATION_REMINDER",
							"title" : body
						}
					}
				],
				"actions": [
						{
							"title": _("Open Snowy"),
							"type": "openWatchApp",
							"launchCode": 0
						}
					]
			};
	
			if(Config.getConfig().IftttPlus){
				try{
					var url = "http://maker.ifttt.com/trigger/" + _("snowy_calendar") + "/with/key/" + Config.getConfig().IftttKey;
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);
					
					var data = { "value1" : body, "value2" : Parser.createGCalString(start, end) };
					
					xhr.setRequestHeader("Content-Type", "application/json");
				 	xhr.send(decodeURIComponent(JSON.stringify(data)));
				}
				catch(e){}
			}
			
			this.insertUserPin(pin, function(response){
				App.sendMessage( { "Title" : _("Ok, calendar updated!"), "Body" : "\"" + body + _("\" from ") + start.toLocaleTimeString()+ _(" to ") + end.toLocaleTimeString() + _(" on ") + start.toLocaleDateString() + "." } );
			});	
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	}
};