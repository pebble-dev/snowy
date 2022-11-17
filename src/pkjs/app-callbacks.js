var Parser = require('./app-parser');
var App = require('./app-messaging');
var _ = require('./app-localize')._;
var Config = require('./app-settings');
var Timeline = require('./app-timeline');
var Convert = require('./app-conversion');
var ALL_LEAGUES = require('./app-teams');
var IFTTT = require('./app-ifttt');

var strikes = 0;

module.exports = {
	introduce : function(q){
		console.log("Function introduce called");
		App.sendMessage( { "Title" : _("Hi, I'm Snowy!"), "Body" : _("I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?") } );
	},
	description : function(q){
		App.sendMessage( { "Title" : _("I can do lots of things!"), "Body" : _("Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com") } );
	},
	spell : function(q){
		try{
			var word = q.array[0];
			var spelling = "";
			var len = word.length;
			for(var c = 0; c < len; c++){
				spelling += word.charAt(c) + " ";
			}
			
			App.sendMessage( { "Title" : spelling } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Sorry..."), "Body" : _("I'm afraid I don't know how to spell that! Could you please try again?") } );
		}
	},
	time : function(q){
		try{
			if(q.array.indexOf(_('in')) === -1){
				var now = new Date();
				App.sendMessage( { "Title" : _("The time is ") + now.toLocaleTimeString(), "BODY" : now.toString().substring(now.toString().indexOf('GMT')) } );
			}
			else{
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "http://api.wolframalpha.com/v2/query?input=" + encodeURIComponent(q.raw) + "&appid=" + (config.wolfram_key === "" ? "AJT2G4-L6W7AQVER4" : config.wolfram_key), false);
				xhr.send();
		
				var xml = xhr.response;
		
				var resultIndex = xml.indexOf("<pod title='Result'");
		
				var title = q.array.join(' ').substring(q.array.join(' ').indexOf(' in ')+4);
				title = title.split(' ');
				for(var t = 0; t < title.length; t++){
					title[t] = title[t].charAt(0).toUpperCase() + title[t].substring(1);
				}
				title = title.join(' ');
				
				if(resultIndex === -1){
					App.sendErrorMessage( { "Title" : _("The time is now!"), "Bobdy" : _("Sorry, I don't know what time it is in ") + title } );
					return;
				}
				else{
					var result = xml.substring(resultIndex);
					result = result.substring(result.indexOf("<plaintext>")+11, result.indexOf("</plaintext"));
					result = result.replace("  |  ","\n\n");
					App.sendMessage( { "Title" : _("Local Time in ") + title, "Bobdy" : result } );
				}
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I don't know what time it is! Ironic, huh?") } );
		}
	},
	date : function(q){
		try{
			App.sendMessage( { "Title" : _("Today is ") + new Date().toLocaleDateString() } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I don't know what today's date is!") } );
		}
	},
	funFact : function(q){
		try{
			var url = "http://history.muffinlabs.com/date";
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var results = JSON.parse(xhr.responseText);
			
			var type = Math.floor(Math.random()*5);
			
			var num = 0;
			
			if(type === 0){
				num = (Math.random()*results.data.Births.length).toFixed(0)*1;
				
				if(results.data.Births[num].year.length > 8){
					this.funFact(q);
					return;
				}
				else{
					App.sendMessage( { "Title" : "This day in " + results.data.Births[num].year + "...", "Body" : results.data.Births[num].text + " was born."} );
				}
			}
			else if(type === 1){
				num = (Math.random()*results.data.Deaths.length).toFixed(0)*1;
				
				if(results.data.Deaths[num].year.length > 8){
					this.funFact(q);
					return;
				}
				else{
					App.sendMessage( { "Title" : "This day in " + results.data.Deaths[num].year + "...", "Body" : results.data.Deaths[num].text  + " died."} );
				}
			}
			else{
				num = (Math.random()*results.data.Events.length).toFixed(0)*1;
				
				if(results.data.Events[num].year.length > 8){
					this.funFact(q);
					return;
				}
				else{
						App.sendMessage( { "Title" : "This day in " + results.data.Events[num].year + "...", "Body" : results.data.Events[num].text } );
				}
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : "Fun Fact", "Body" : "My Fun Fact generator seems to be malfunctioning." } );
		}
	},
	setAlarm : function(q){
		try{
			var tomorrow = false;
			var then = new Date();
		
			if(q.array.indexOf('tomorrow') !== -1){
				tomorrow = true;
				q.array = q.array.filter(function(e){return e !== 'tomorrow'; } );
			}
		
			if(Config.getLang !== "fr") q.array[0] = _('at');
			
			switch(Config.getLang()){
				case "en" : then = Parser.parseTime2(q).start; break;
				case "es" : then = Parser.parseTime2ES(q).start; break;
				case "fr" : then = Parser.parseTime2FR(q).start; break;
				case "de" : then = Parser.parseTime2DE(q).start; break;
				case "pt" : then = Parser.parseTime2PR(q).start; break;
				case "da" : then = Parser.parseTime2DA(q).start; break;
				default: then = Parser.parseTime2(q).start; break;
			}
			
			then.setSeconds(0);
			
			var pin = {
				"id" : "snowy_alarm",
				"time" : then.toISOString(),
				"duration" : 1,
				"layout" : {
					"title" : _("Alarm"),
					"subtitle" : _("via Snowy"),
					"type" : "genericPin",
					"tinyIcon" : "system://images/ALARM_CLOCK",
					"largeIcon": "system://images/ALARM_CLOCK",
					"foregroundColor" : "#000000",
					"backgroundColor" : "#00AAAA"
				},
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
					var url = "http://maker.ifttt.com/trigger/" + _("snowy_alarm") + "/with/key/" + Config.getConfig().IftttKey;
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);
			
					var data = { "value1" : "Alarm", "value2" : then.toGCalString() };
			
					xhr.setRequestHeader("Content-Type", "application/json");
				  xhr.send(decodeURIComponent(JSON.stringify(data)));
				}
				catch(e){}
			}
			
			localStorage.alarm = 'alarm';
			App.sendMessage( { "Title" : _("Ok, alarm set!"), "Body" : ( Config.getLang() === "de" ? _("Alarm set for ").replace(/%%/g, then.toLocaleString()) : _("Alarm set for ") + then.toLocaleString() ), "Alarm" : (then.getTime()/1000).toFixed(0) + "" } ) ;
			
			Timeline.insertUserPin(pin, function(response){
				console.log("Alarm Pin Inserted");
			});
		}
		catch(err){	
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Wait!"), "Body" : _("I didn't set an alarm because I couldn't tell what time you wanted it.") } );
		}
	},
	cancelAlarm : function(q){
		if(localStorage.alarm === 'alarm'){
			var pin = {
				"id" : "snowy_alarm"
			};
			Timeline.deleteUserPin(pin, function(response){
				localStorage.alarm = '';
				App.sendMessage( { "Title" : _("Ok, alarm cancelled!"), "Alarm" : "-1" } );
			});
		}
		else{
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Bobdy" : _("You don't have an alarm set!") } );
		}
	},
	setTimer2 : function(q){
		try{
			var hours, minutes, array;
			
			if(Config.getLang() === "en"){
				array = q.array.join(' ')
				.replace(/\bone\b/g, '1')
				.replace(/\btwo\b/g, '2')
				.replace(/\bthree\b/g, '3')
				.replace(/\bfour\b/g, '4')
				.replace(/\bfive\b/g, '5')
				.replace(/\bsix\b/g, '6')
				.replace(/\bseven\b/g, '7')
				.replace(/\beight\b/g, '8')
				.replace(/\bnine\b/g, '9')
				.replace(/\bten\b/g, '10')
				.replace(/\ban hour\b/g, '1 hour')
				.replace(/\ba half hour\b/g, '30 minutes')
				.replace(/\bhalf an hour\b/g, '30 minutes');
			}
			else if(Config.getLang() === "es"){
				array = q.array.join(' ')
				.replace(/\buno\b/g, '1')
				.replace(/\bdos\b/g, '2')
				.replace(/\btres\b/g, '3')
				.replace(/\bcuatro\b/g, '4')
				.replace(/\bcinco\b/g, '5')
				.replace(/\bseis\b/g, '6')
				.replace(/\bsiete\b/g, '7')
				.replace(/\bocho\b/g, '8')
				.replace(/\bnueve\b/g, '9')
				.replace(/\bdiez\b/g, '10')
				.replace(/\bmedia hora\b/g, '30 minutos')
				.replace(/\bde la tarde\b/g, 'pm')
				.replace(/\bde la noche\b/g, 'pm')
				.replace(/\bde la madrugada\b/g, 'am')
				.replace(/\bde la mañana\b/g, 'am');
			}
			else if(Config.getLang() === "fr"){
				array = q.array.join(' ')
				.replace(/\bun\b/g, '1')
				.replace(/\bdeux\b/g, '2')
				.replace(/\btrois\b/g, '3')
				.replace(/\bquatre\b/g, '4')
				.replace(/\bcinq\b/g, '5')
				.replace(/\bsix\b/g, '6')
				.replace(/\bsept\b/g, '7')
				.replace(/\bhuit\b/g, '8')
				.replace(/\bneuf\b/g, '9')
				.replace(/\bdix\b/g, '10')
				.replace(/\bdemi-heure\b/g, '30 minutes');
			}		
			else if(Config.getLang() === "de"){
				array = q.array.join(' ')
				.replace(/\beine\b/g, '1')
				.replace(/\beins\b/g, '1')
				.replace(/\bzwei\b/g, '2')
				.replace(/\bdrei\b/g, '3')
				.replace(/\bvier\b/g, '4')
				.replace(/\bfünf\b/g, '5')
				.replace(/\bsechs\b/g, '6')
				.replace(/\bsieben\b/g, '7')
				.replace(/\bacht\b/g, '8')
				.replace(/\bneun\b/g, '9')
				.replace(/\bzehn\b/g, '10')
				.replace(/\belf\b/g, '11')
				.replace(/\bzwölf\b/g, '12');
			}
			else if(Config.getLang() === "pt"){
				array = q.array.join(' ')
				.replace(/\bum\b/g, '1')
				.replace(/\bdois\b/g, '2')
			 	.replace(/\btrês\b/g, '3')
			 	.replace(/\bquatro\b/g, '4')
			 	.replace(/\bcinco\b/g, '5')
			 	.replace(/\bseis\b/g, '6')
			 	.replace(/\bsete\b/g, '7')
			 	.replace(/\boito\b/g, '8')
			 	.replace(/\bnove\b/g, '9')
			 	.replace(/\bdez\b/g, '10')
			 	.replace(/\bmeia hora\b/g, '30 minutos');
			 	}
				
			hours = array.match(/\d+\s(hora|hour|heure|stunde)/g);
			minutes = array.match(/\d+\s(minuto|minute)/g);
			
			if(hours !== null) hours = parseInt(hours[0]);
			else hours = 0;
			if(minutes !== null) minutes = parseInt(minutes[0]);
			else minutes = 0;
			
			var now = new Date();
			var time = new Date();
			time.setTime(now.getTime() + 60*60*1000*hours + 60*1000*minutes);
			localStorage.timer = time.toString();
			
			if(hours === 0) App.sendMessage( { "Title" : _("Countdown time!"), "Body" : _("Timer set for ") + minutes + _(" minute(s)."), "Timer" : minutes + "" } );
			else if(minutes === 0) App.sendMessage( { "Title" : _("Countdown time!"), "Body" : _("Timer set for ") + hours + _(" hour(s)."), "Timer" : (60*hours) + "" } );
			else App.sendMessage( { "Title" : _("Countdown time!"), "Body" : _("Timer set for ") + hours + _(" hour(s) and ") + minutes + _(" minute(s)."), "Timer" : (60*hours)+minutes + "" } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Sorry! I think you're trying to set a timer but I didn't understand what you said.") } );
		}
	},
	checkTimer : function(q){
		try{
			if(localStorage.timer !== ''){
				var end = new Date(localStorage.timer);
				var now = new Date();
				
				var diff = end.getTime() - now.getTime();
				
				var hours = Math.floor(diff/(1000*60*60));
				var minutes = Math.floor((diff-(hours*60*60*1000))/(1000*60));
				var seconds = Math.floor((diff-(hours*60*60*1000)-(minutes*60*1000))/(1000));
			
				var body = "";
				
				if(hours > 0){
					body = hours + (hours !== 1 ? _(" hours") : _(" hour") );
					body += ", " + minutes + (minutes !== 1 ? _(" minutes") : _(" minute") );
					body += ", " + seconds + (seconds !== 1 ? _(" seconds") : _(" second") );
				} 	
				else if(minutes > 0){
					body = minutes + (minutes !== 1 ? _(" minutes") : _(" minute") );
					body += ", " + seconds + (seconds !== 1 ? _(" seconds") : _(" second") );
				}
				else if(seconds > 0){
					body = seconds + (seconds !== 1 ? _(" seconds") : _(" second") );
				}
				else{
					App.sendErrorMessage( {"Title" : _("No timer"), "Body" : _("Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example.") } );
					return;
				}
					
				body += ".";
			
				App.sendMessage( { "Title" : _("Time remaining"), "Body" : body } );
			}
			else{
				App.sendErrorMessage( {"Title" : _("No timer"), "Body" : _("Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example.") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - maybe you haven't set a timer yet?") } );
		}
	},
	cancelTimer : function(q){
		if(localStorage.timer !== ''){
			localStorage.timer = '';
			App.sendMessage( { "Title" : _("Ok, timer cancelled!"), "Timer" : "-1" } );
		}
		else{
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("You don't have a timer set!") } );
		}
	},
	finishTimer : function(q){
		localStorage.timer = '';
	},
	eat : function(q){
		try{
			if(!navigator || !navigator.geolocation || (Config.getCoords().Lat === 0 && Config.getCoords().Lon === 0)){
				App.sendErrorMessage( { "Title" : _("Where am I?"), "Body" : _("It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!") } );
				return;
			}
			
			var lat = Config.getCoords().Lat;
			var lon = Config.getCoords().Lon;
			
			var url = "http://api.tripadvisor.com/api/partner/2.0/map/" + lat + "," + lon + "/restaurants?key=a39ff9c1f7da4f688e305e36766d58e0&distance=1";
			if(Config.getConfig().DistanceUnit === Config.getConfig().METRIC) url += "&lunit=km";
			switch(Config.getLang()){
				case "es" : url += "&lang=es"; break;
				case "fr" : url += "&lang=fr"; break;
				case "de" : url += "&lang=de"; break;
				case "pt" : url += "&lang=pt"; break;
				case "da" : url += "&lang=da"; break;
			}
			
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, false);
			xhr.send();
					
			var result = JSON.parse(xhr.responseText);
			
			if(result.data === undefined || result.data === null || result.data.length === 0){
				App.sendErrorMessage( { "Title" : _("Sorry..."), "Body" : _("There don't seem to be any restaurants nearby.") } );
			}
			else{
				result.data.sort(function(a,b){return (b.rating === a.rating ? b.num_reviews - a.num_reviews : b.rating - a.rating ); } );
				var name = result.data[0].name;
				var subcategory = result.data[0].cuisine.length > 0 ? result.data[0].cuisine[0].localized_name + " " : result.data[0].subcategory.length > 0 ? result.data[0].subcategory[0].localized_name + " " : "";
				var address = result.data[0].address_obj.street1 + ", " + ((result.data[0].distance + "").indexOf(".") === 0 ? "0" + result.data[0].distance : result.data[0].distance) + (Config.getConfig().DistanceUnit === Config.getConfig().IMPERIAL ? _(" miles away.") : _(" kilometers away.")) + _("\n\nFor walking directions, just ask me \"How do I get there?\"");
				   
				var recentAddress = result.data[0].address_obj.address_string;
				var recentName = name;
				Config.setRecent(recentAddress, recentName);
				
				App.sendMessage( { "Title" : name, "Body" : _("...is a nearby ") + subcategory + _("restaurant") + Parser.getOpinion(result.data[0].rating) + _("\n\nIt's located at ") + address } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - there might be tasty food nearby but I can't seem to find it!") } );
		}
	},
	directions : function(q){
		try{
			if(!navigator || !navigator.geolocation || (Config.getCoords().Lat === 0 && Config.getCoords().Lon === 0)){
				App.sendErrorMessage( { "Title" : _("Where am I?"), "Body" : _("It seems you don't have GPS enabled, so I can't tell you how to get from here to there if I don't know where 'here' is!") } );
				return;
			}
			
			var xhr, url, response, steps, message;
			
			var coord = Config.getCoords();
			
			if(Config.getLang() === "en"){
				for(var e = 0; e < q.array.length; e++){
					if(q.array[e] === "2" && e < q.array.length-1 && q.array[e+1] === parseInt(q.array[e+1])+""){ 
						q.array[e] = "to";
					}
				}
			}
			
			if(q.array.indexOf(_("there")) !== -1){
				if(Config.getRecent().Address === ""){
					App.sendErrorMessage( { "Title" : _("Missing Address"), "Body" : _("You need to find a restaurant first! Ask me \"Where should I eat?\" to find one.") } );
					return;
				}
				
				xhr = new XMLHttpRequest();
				url = "http://www.mapquestapi.com/directions/v2/route?key=lt1UbgYg5P6UJMMXQA4q6ttC8tOUPwVy&from=" + coord.Lat + "," + coord.Lon + "&to=" + encodeURIComponent(Config.getRecent().Address) + "&routeType=pedestrian&enhancedNarrative=true";
				if(Config.getConfig().DistanceUnit === Config.getConfig().METRIC) url += "&unit=k";
				switch(Config.getLang()){
					case "es": url += "&locale=es_ES"; break;
					case "fr": url += "&locale=fr_FR"; break;
					case "de": url += "&locale=de_DE"; break;
					case "pt": url += "&locale=pt_PT"; break;
					case "da": url += "&locale=da_DA"; break;
				}
				
				//console.log(url);
				
				xhr.open("GET", url, false);
				xhr.send();
			
				response = JSON.parse(xhr.response);
				steps = response.route.legs[0].maneuvers.length;
				message = "";
				
				for(var i = 0; i < steps; i++){
					message += "• " + response.route.legs[0].maneuvers[i].narrative.replace(_(" (See map for details)"),"");
					if(i != steps-1) message += " (" + Parser.getDistance(response.route.legs[0].maneuvers[i].distance) + ")" + "\n\n";
				}
				
				App.sendMessage( { "Title" : _("Directions to ") + Config.getRecent().Name, "Body" : message, "Directions" : "" } );
			}
			else if(q.array.indexOf(_("home")) !== -1){
				if(Config.getConfig().HomeAddress === ""){
					App.sendErrorMessage( { "Title" : _("Missing Address"), "Body" : _("I don't have your home address on file! You can add it via my Settings page.") } );
					return;
				}
	
				xhr = new XMLHttpRequest();
				url = "http://www.mapquestapi.com/directions/v2/route?key=lt1UbgYg5P6UJMMXQA4q6ttC8tOUPwVy&from=" + coord.Lat + "," + coord.Lon + "&to=" + encodeURIComponent(Config.getConfig().HomeAddress) + "&routeType=pedestrian&enhancedNarrative=true";
				if(Config.getConfig().DistanceUnit === Config.getConfig().METRIC) url += "&unit=k";
				switch(Config.getLang()){
					case "es": url += "&locale=es_ES"; break;
					case "fr": url += "&locale=fr_FR"; break;
					case "de": url += "&locale=de_DE"; break;
					case "pt": url += "&locale=pt_PT"; break;
					case "da": url += "&locale=da_DA"; break;
				}
				
				xhr.open("GET", url, false);
				xhr.send();
			
				response = JSON.parse(xhr.response);
				steps = response.route.legs[0].maneuvers.length;
				message = "";
			
				for(var i3 = 0; i3 < steps; i3++){
					message += "• " + response.route.legs[0].maneuvers[i3].narrative.replace(_(" (See map for details)"),"");
					if(i3 != steps-1) message +=  " (" + Parser.getDistance(response.route.legs[0].maneuvers[i3].distance) + ")" + "\n\n";
				}
				
				App.sendMessage( { "Title" : _("Directions to Home"), "Body" : message, "Directions" : "" } );
			}
			else if(q.array[0] === _("to")){
				q.array.splice(0,1);
				
				xhr = new XMLHttpRequest();
				url = "http://www.mapquestapi.com/directions/v2/route?key=lt1UbgYg5P6UJMMXQA4q6ttC8tOUPwVy&from=" + coord.Lat + "," + coord.Lon + "&to=" + encodeURIComponent(q.array.join(' ')) + "&routeType=pedestrian&enhancedNarrative=true";
				if(Config.getConfig().DistanceUnit === Config.getConfig().METRIC) url += "&unit=k";
				switch(Config.getLang()){
					case "es": url += "&locale=es_ES"; break;
					case "fr": url += "&locale=fr_FR"; break;
					case "de": url += "&locale=de_DE"; break;
					case "pt": url += "&locale=pt_PT"; break;
					case "da": url += "&locale=da_DA"; break;
				}
				
				xhr.open("GET", url, false);
				xhr.send();
				
				response = JSON.parse(xhr.response);
				steps = response.route.legs[0].maneuvers.length;
				message = "";
				
				for(var i2 = 0; i2 < steps; i2++){
					message += "• " + response.route.legs[0].maneuvers[i2].narrative.replace(_(" (See map for details)"),"");
					if(i2 != steps-1) message +=  " (" + Parser.getDistance(response.route.legs[0].maneuvers[i2].distance) + ")" + "\n\n";
				}
				
				App.sendMessage( { "Title" : _("Directions to ") + response.route.locations[1].street, "Body" : message, "Directions" : "" } );
			}
			else{
				App.sendErrorMessage( { "Title" : _("Recalculating..."), "Body" : _("I believe you're asking me for directions but I couldn't quite make out the address. Please try again!") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("I'm lost!!!"), "Body" : _("I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?") } );
		}
	},
	note : function(q){
		try{
			var body = q.array.join(' ');
			body = body.charAt(0).toUpperCase() + body.substring(1) + ".";
			
			var now = new Date();
			
			var pin = {
				"id" : "snowy_note_" + (new Date()).getTime(),
				"time" : now.toISOString(),
				"duration" : 24*60,
				"layout" : {
					"title" :  body,
					"subtitle" : _("via Snowy"),
					"type" : "genericPin",
					"tinyIcon" : "system://images/NEWS_EVENT",
					"largeIcon" : "system://images/NEWS_EVENT",
					"foregroundColor" : "#000000",
					"backgroundColor" : "#00AAAA"	
				},
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
					var url = "http://maker.ifttt.com/trigger/" + _("snowy_note") +  "/with/key/" + Config.getConfig().IftttKey;
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);
					
					var data = { "value1" : body, "value2" : now.toGCalString() };
						
					xhr.setRequestHeader("Content-Type", "application/json");
				 	xhr.send(decodeURIComponent(JSON.stringify(data)));
				}
				catch(e){}
			}
		
			Timeline.insertUserPin(pin, function(e){
				App.sendMessage( { "Title" : _("Note taken!"), "Body" : "\"" + body + "\"" } );
			});
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!") } );
		}
	},
	reminder2 : function(q){
		try{
			var time = Parser.parseTime2(q);
	
			var start = time.start;
			q = time.raw;
			
			var body = q.array.join(' ').match(/\bto\b.*?\b(in|at|from|on|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Reminder!");
			
			body = body.replace(/\bmy\b/g, 'your').replace(/\bmine\b/g, 'yours');
			if(q.array[0] === "to") body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.replace(/to\s/g, '');
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			Timeline.reminderPin(start, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again.") } );
		}
	},
	reminder2ES : function(q){
		try{
			var time = Parser.parseTime2ES(q);
			
			var start = time.start;
			q = time.raw;
			
			var body = q.array.join(' ').replace(/a las/g, 'a-las').match(/.*?\b(el|durante|en|a-las|de \d+|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Reminder!");
			
			if(q.array[0] === "a" && q.array[1] === "las") body = body.substring(0, body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			Timeline.reminderPin(start, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again.") } );
		}
	},
	reminder2FR : function(q){
		try{
			var time = Parser.parseTime2FR(q);
		
			var start = time.start;
			q = time.raw;
			
			var body = q.array.join(' ').match(/.*?\b(à|dans|le|de|pour|$)\b/g);
			
			if(body !== null) body = body[0];
			else body = _("Reminder!");
			
			if(q.array[0] === "à") body = body.substring(0, body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			body = body.replace(/D' /g, "D'").replace(/d' /g, "d'");
			
			Timeline.reminderPin(start, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "TITLE" : _("Uh-oh"), "BODY" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again."), "ERROR" : "" } );
		}
	},
	reminder2DE : function(q){
		try{
			var time = Parser.parseTime2DE(q);
			
			var start = time.start;
			q = time.raw;
			
			var body = q.array.join(' ').match(/.*?\b(um|in|am|für|von|$)\b/g);
			
			if(body !== null) body = body[0];
			else body = _("Reminder!");
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			Timeline.reminderPin(start, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again.") } );
		}
	},
	reminder2PT : function(q){
		try{
			var time = Parser.parseTime2PR(q);
			
			var start = time.start;
			q = time.raw;
			
			var body = q.array.join(' ').match(/.*?\b(em|por|das|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Reminder!");
			
			body = body.substring(0, body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			Timeline.reminderPin(start, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again.") } );
		}
	},
	reminder2DA : function(q){
		try{
			q.array = q.array.join(' ').replace(/om at/g, 'om-at').split(' ');
			
			var time = Parser.parseTime2DA(q);
			
			var start = time.start;
			q = time.raw;
			
			var body = q.array.join(' ').match(/.*?\b(om|om-at|klokken|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Reminder!");
			
			body = body.substring(0, body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			Timeline.reminderPin(start, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again.") } );
		}
	},
	calendar2 : function(q){
		try{		
			var calQuery = q.raw.replace(/schedule a/g, 'to').replace(/schedule/g, 'to').replace(/add a/g, 'to').replace(/add/g, 'to').replace(/\sto my calendar/g,'').replace(/\scalendar/g,'');
			q.array = calQuery.split(' ');
		
			var time = Parser.parseTime2(q);
			var start = time.start;
			var end = time.end;
			q = time.raw;
			
			q.array.shift();
			
			var body = q.array.join(' ').match(/.*?\b(in|at|from|on|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Meeting!");
			
			body = body.replace(/\bmy\b/g, 'your').replace(/\bmine\b/g, 'yours');
			body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			var diff = end.getTime() - start.getTime();
			diff = (diff / 1000) / 60;
			
			Timeline.calendarPin(start, diff, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	},
	calendar2ES : function(q){
		try{				
			var time = Parser.parseTime2ES(q);
			var start = time.start;
			var end = time.end;
			q = time.raw;
			
			q.array.shift();
			
			var body = q.array.join(' ').match(/.*?\b(el|durante|en|a las|de \d+|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Meeting!");
			
			body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			var diff = end.getTime() - start.getTime();
			diff = (diff / 1000) / 60;
			
			Timeline.calendarPin(start, diff, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	},
	calendar2FR : function(q){
		try{
			var time = Parser.parseTime2FR(q);
			var start = time.start;
			var end = time.end;
			q = time.raw;
			
			q.array.shift();
			
			var body = q.array.join(' ').match(/.*?\b(à|dans|le|de|pour|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Meeting!");
			
			body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			var diff = end.getTime() - start.getTime();
			diff = (diff / 1000) / 60;
			
			Timeline.calendarPin(start, diff, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	},
	calendar2DE : function(q){
		try{
			var time = Parser.parseTime2DE(q);
			var start = time.start;
			var end = time.end;
			q = time.raw;
			
			q.array.shift();
			
			var body = q.array.join(' ').match(/.*?\b(um|in|am|für|von|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Meeting!");
			
			body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			var diff = end.getTime() - start.getTime();
			diff = (diff / 1000) / 60;
			
			Timeline.calendarPin(start, diff, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	},
	calendar2PT : function(q){
		try{	
			var time = Parser.parseTime2PR(q);
			var start = time.start;
			var end = time.end;
			q = time.raw;
			
			q.array.shift();
			
			var body = q.array.join(' ').match(/.*?\b(em|das|por|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Meeting!");
			
			body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			var diff = end.getTime() - start.getTime();
			diff = (diff / 1000) / 60;
			
			Timeline.calendarPin(start, diff, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	},
	calendar2DA : function(q){
		try{
			var time = Parser.parseTime2DA(q);
			var start = time.start;
			var end = time.end;
			q = time.raw;
			
			q.array.shift();
			
			var body = q.array.join(' ').match(/.*?\b(om|om-at|klokken|$)\b/g);
				
			if(body !== null) body = body[0];
			else body = _("Meeting!");
			
			body = body.substring(0,body.lastIndexOf(' '));
			
			body = Parser.checkNames(body, q.original);
			
			body = body.charAt(0).toUpperCase() + body.substring(1);
			
			var diff = end.getTime() - start.getTime();
			diff = (diff / 1000) / 60;
			
			Timeline.calendarPin(start, diff, body);
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - That sounds like an important event to add to your calendar, though! Please try again.") } );
		}
	},
	cancel : function(q){
		try{
			var lastPin = localStorage.lastPin;
			if(lastPin !== null && lastPin !== ''){
				var pin = {
					"id" : lastPin
				};
				Timeline.deleteUserPin(pin, function(response){
					localStorage.lastPin = '';
					App.sendMessage( { "Title" : _("Ok, pin removed!"), "Body" : _("I've removed the pin for \"") + localStorage.lastBody + _("\" from your timeline.") } );
					localStorage.lastBody = '';
				});
			}
			else{
				App.sendErrorMessage( { "Title" : _("Like finding a pin in a haystack!"), "Body" : _("I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event.") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("That's one persistent pin!"), "Body" : "Something went wrong with your request, and I couldn't remove that pin from your timeline!" } );
		}
	},
	calculate : function(q){
		try{
			var num1 = parseInt(q.array[0]);
			var num2;
			if(q.raw.indexOf('%') === -1) num2 = parseInt(q.array[1]);
			else{
				if(q.raw.indexOf(_('$')) !== -1) num2 = parseInt(q.array[1].replace(_('$'), ''));
				else num2 = parseInt(q.array[1]);
			}
			
			if(q.raw.indexOf('+') !== -1){
				App.sendMessage( { "Title" : num1 + " + " + num2 + " = " + (num1+num2) } );
			}
			else if(q.raw.indexOf('-') !== -1){
				App.sendMessage( { "Title" : num1 + " - " + num2 + " = " + (num1-num2) } );
			}
			else if(q.raw.indexOf('×') !== -1){
				App.sendMessage( { "Title" : num1 + " * " + num2 + " = " + (num1*num2) } );
			}
			else if(q.raw.indexOf('÷') !== -1){
				App.sendMessage( { "Title" : num1 + " / " + num2 + " = " + (num1/num2).toFixed(2) } );
			}
			else if(q.raw.indexOf('%') !== -1){
				if(q.raw.indexOf(_('$')) !== -1){
					App.sendMessage( { "Title" : num1 + _("% of $") + num2 + _(" = $") + (num1*num2/100).toFixed(2) } );
				}
				else{
					App.sendMessage( { "Title" : num1 + _("% of ") + num2 + " = " + (num1*num2/100) } );
				}
			}
			else{
				App.sendErrorMessage( { "Title" : _("Error"), "Body" : _("Sorry, I don't know how to do that kind of math.") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - you stumped me! Try the calculation again.") } );
		}
	},
	random2 : function(q){
		try{
			var array;
			
			if(Config.getLang() === "en"){
				array = q.raw//array.join(' ')
				.replace(/one/g, '1')
				.replace(/two/g, '2')
				.replace(/three/g, '3')
				.replace(/four/g, '4')
				.replace(/five/g, '5')
				.replace(/six/g, '6')
				.replace(/seven/g, '7')
				.replace(/eight/g, '8')
				.replace(/nine/g, '9')
				.replace(/ten/g, '10');
			}
			else if(Config.getLang() === "es"){
				array = q.raw//array.join(' ')
				.replace(/uno/g, '1')
				.replace(/dos/g, '2')
				.replace(/tres/g, '3')
				.replace(/cuatro/g, '4')
				.replace(/cinco/g, '5')
				.replace(/seis/g, '6')
				.replace(/siete/g, '7')
				.replace(/ocho/g, '8')
				.replace(/nueve/g, '9')
				.replace(/diez/g, '10');
			}
			else if(Config.getLang() === "fr"){
				array = q.raw//array.join(' ')
				.replace(/un/g, '1')
				.replace(/deux/g, '2')
				.replace(/trois/g, '3')
				.replace(/quatre/g, '4')
				.replace(/cinq/g, '5')
				.replace(/six/g, '6')
				.replace(/sept/g, '7')
				.replace(/huit/g, '8')
				.replace(/neuf/g, '9')
				.replace(/dix/g, '10');
			}
			else if(Config.getLang() === "de"){
				array = q.raw//array.join(' ')
				.replace(/eine/g, '1')
				.replace(/eins/g, '1')
				.replace(/zwei/g, '2')
				.replace(/drei/g, '3')
				.replace(/vier/g, '4')
				.replace(/fünf/g, '5')
				.replace(/sechs/g, '6')
				.replace(/sieben/g, '7')
				.replace(/acht/g, '8')
				.replace(/neun/g, '9')
				.replace(/zehn/g, '10')
				.replace(/elf/g, '11')
				.replace(/zwölf/g, '12');
			}
			else if(Config.getLang() === "da"){
				array = q.raw
				.replace(/en/g, '1')
				.replace(/to/g, '2')
				.replace(/tre/g, '3')
				.replace(/fire/g, '4')
				.replace(/fem/g, '5')
				.replace(/seks/g, '6')
				.replace(/syv/g, '7')
				.replace(/otte/g, '8')
				.replace(/ni/g, '9')
				.replace(/ti/g, '10');
			}
			else if(Config.getLang() === "pt"){
				array = q.raw
				.replace(/um/g, '1')
				.replace(/dois/g, '2')
				.replace(/três/g, '3')
				.replace(/quatro/g, '4')
				.replace(/cinco/g, '5')
				.replace(/seis/g, '6')
				.replace(/sete/g, '7')
				.replace(/oito/g, '8')
				.replace(/nove/g, '9')
				.replace(/dez/g, '10');
			}
			
			var noRange = true;
			var lowerBound;
			var upperBound;
			if(q.raw.indexOf(_(' between ')) === -1 || q.raw.indexOf(_(' and ')) === -1){
				lowerBound = 1;
				upperBound = 100;
			}
			else{
				lowerBound = parseInt(array.substring(array.indexOf(_(" between "))+_(" between ").length,array.indexOf(_(" and "))));
				upperBound = parseInt(array.substring(array.indexOf(_(" and "))+_(" and ").length));
				noRange = false;
			}
			
			if(isNaN(lowerBound) || isNaN(upperBound)){
				App.sendErrorMessage( { "Title" : _("The answer is 42..."), "Body" : _("...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds.") } );
				return;
			}
	
			var delta = upperBound - lowerBound;
			var result = Math.floor(Math.random()*delta) + lowerBound;
		
			if(result%3 === 0) App.sendMessage( { "Title" : _("Hmmm, how about ") + result  + "...", "Body" : (noRange ? _("No range was specified, so I picked 1 and 100 as bounds!") : "") } );
			else if(result%3 === 1) App.sendMessage( { "Title" : result + _("! Definitely ") + result + "!", "Body" : (noRange ? _("No range was specified, so I picked 1 and 100 as bounds!") : "") } );
			else App.sendMessage( { "Title" : _("Go with ") + result + ".", "Body" : (noRange ? _("No range was specified, so I picked 1 and 100 as bounds!") : "") } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("NaNaNaNaNa... Batman!"), "Body" : _("Something went wrong, please try again...") } );
		}
	},
	coin : function(q){
		try{
			var side = Math.floor(Math.random()*2);
			if(side === 0) App.sendMessage( { "Title" : _("Aaaannnddd..."), "Body" : _("...it's Heads!") } );
			else App.sendMessage( { "Title" : _("Aaaannnddd..."), "Body" : _("...it's Tails!") } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Aaaannnddd..."), "Body" : _("...it's Heads...I think. Something went wrong - so you might want to try again.") } );
		}
	},
	weatherOpen : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url;
			
			var coord = Config.getCoords();
			
			if(q.raw.indexOf(_('home')) !== -1){
				if(Config.getConfig().HomeAddress === ""){
					App.sendErrorMessage( { "Title" : _("Missing Address"), "Body" : _("I don't have your home address on file! You can add it via my Settings page.") } );
					return;
				}
				
				url = "http://api.openweathermap.org/data/2.5/weather?q="+encodeURIComponent(Config.getConfig().HomeAddress)+"&APPID=17c9f782abc336c36774712c432b6f10";
			}
			else if(q.raw.indexOf(_(' in ')) !== -1 || q.array.indexOf(_(' for ')) !== -1){
				//Specific City
				var city = q.array.join(' ');
				city = encodeURIComponent(city);
				url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=17c9f782abc336c36774712c432b6f10";
			}	
			else{
				if(!navigator || !navigator.geolocation || (coord.Lat === 0 && coord.Lon === 0)){
					Pebble.sendappMessage( { "TITLE" : _("Where am I?"), "BODY" : _("It seems you don't have GPS enabled, so I can't tell the weather!") } );
					return;
				}
				
				//Local
				url = "http://api.openweathermap.org/data/2.5/weather?lat="+coord.Lat+"&lon="+coord.Lon+"&APPID=17c9f782abc336c36774712c432b6f10";
			}
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var weather = JSON.parse(xhr.responseText);
			
			var temp = weather.main.temp*1;
			temp -= 273.15;
			if(Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT) temp = (temp*9)/5 + 32;
			temp = temp.toFixed(0);
		
			var status = (weather.weather[0].main+"").charAt(0).toUpperCase() + (weather.weather[0].main+"").substring(1);
			
			var prefix = _("Weather for ") + weather.name + "\n";
			
			var title = "";
			if(status.indexOf(_('Rain')) !== -1) title = _("Don't forget your umbrella!");
			else if( (Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT && temp <= 32) || (Config.getConfig().TempUnit === Config.getConfig().CELSIUS && temp <= 0) ) title = _("Brrr, it's cold outside!");
			else if( (Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT && temp >= 100) || (Config.getConfig().TempUnit === Config.getConfig().CELSIUS && temp >= 34) ) title = _("Yikes, it's hot!");
			else{
				title = _("Weather for ") + weather.name;
				prefix = "";
			}
			
			App.sendMessage( { "Title" : title, "Body" : prefix + temp + "˚" + (Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT ? "F" : "C") + _(" and ") + status + "." + _("\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again.") } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong with my radar! Try asking me about the weather again.") } );
		}
	},
	weatherWU : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url, location;
			
			var coord = Config.getCoords();
			
			var langParams = "/conditions";
			if(Config.getLang() === "es") langParams = "/conditions/forecast/lang:SP";
			else if(Config.getLang() === "fr") langParams = "/conditions/forecast/lang:FR";
			
			if(q.raw.indexOf(_(' home')) !== -1){
				if(Config.getConfig().HomeAddress === ""){
					App.sendErrorMessage( { "Title" : _("Missing Address"), "Body" : _("I don't have your home address on file! You can add it via my Settings page.") } );
					return;
				}
				
				location = Config.getConfig().HomeAddress.substring(Config.getConfig().HomeAddress.indexOf(",")+2).split(", ");
				
				location.reverse();
				location = location.join("/");
				
				if(Config.getConfig().WuKey === ""){ //Home Location, Default Key
					url = "http://api.wunderground.com/api/8fd6442e08cd60f5" + langParams + "/q/" + location + ".json";
				}
				else{ //Home Location, Custom Key
					url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + langParams + "/q/" + location + ".json";
				}
			}
			else if(q.raw.indexOf(_(' in ')) !== -1 || q.raw.indexOf(_(' for ')) !== -1){
				var cut = -1;
				if(q.raw.indexOf(_(' in ')) === -1) cut = q.raw.indexOf(_(' for ')) + _(' for ').length;
				else cut = q.raw.indexOf(_(' in ')) + _(' in ').length;
				var array = q.raw.substring(cut).split(' ');
				array.reverse();
				location = array.join('/');
				
				if(location === "positive"){
					this.weatherWU( { raw : "", array : [] } );
					return;
				}
				else if(location === _("tomorrow")){
					this.forecastWU( { raw : "", array : [] } );
					return;
				}
				
				if(Config.getConfig().WuKey === ""){ //Specific City, Default Key
					url = "http://api.wunderground.com/api/8fd6442e08cd60f5" + langParams + "/q/" + location + ".json";
				}
				else{ //Specific City, Custom Key
					url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + langParams + "/q/" + location + ".json";
				}
			}
			else{
				if(!navigator || !navigator.geolocation || (coord.Lat === 0 && coord.Lon === 0)){
					App.sendErrorMessage( { "Title" : "Where am I?", "Body" : "It seems you don't have GPS enabled, so I can't tell the weather!" } );
					return;
				}
				
				if(Config.getConfig().WuKey === ""){ //Current Location, Default Key
					url = "http://api.wunderground.com/api/8fd6442e08cd60f5" + langParams + "/q/" + coord.Lat + "," + coord.Lon + ".json";
				}
				else{ //Current Location, Custom Key
					url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + langParams + "/q/" + coord.Lat + "," + coord.Lon + ".json";
				}
			}
		
			xhr.open("GET", url, false);
			xhr.send();
			
			var weather = JSON.parse(xhr.responseText);
			
			if(xhr.status !== 200 || weather.response.error !== undefined ){
				this.weatherOpen(q);
				return;
			}
			else if(weather.response.results !== undefined){
				App.sendErrorMessage( { "Title" : _("Which one?"), "Body" : _("I see multiple results for that location! Could you be more specific? Maybe mention the state or country...") });
				return;
			}
			
			weather = weather.current_observation;
			
			var title = _("Weather for ") + weather.display_location.full;
			var body = "";
			if(Config.getConfig().WuKey === ""){ //Basic Weather Report
				if(weather.weather.indexOf(_("Rain")) !== -1) title = _("Don't forget your umbrella!");
				else if(weather.temp_f > 100) title = _("Yikes, it's hot!");
				else if(weather.temp_f < 32) title = _("Brrr, it's cold!");
				
				body += _("Temp: ") + (Config.getConfig().TempUnit === Config.getConfig().CELSIUS ? weather.temp_c + "˚C\n" : weather.temp_f + "˚F\n");
				body += _("Status: ") + weather.weather;
			}
			else{ //Advanced Weather Report
				if(weather.weather.indexOf(_("Rain")) !== -1) title = _("Don't forget your umbrella!");
				else if(weather.temp_f > 100) title = _("Yikes, it's hot!");
				else if(weather.temp_f < 32) title = _("Brrr, it's cold!");
				
				body += _("Temp: ") + (Config.getConfig().TempUnit === Config.getConfig().CELSIUS ? weather.temp_c + "˚C\n" : weather.temp_f + "˚F\n");						
				body += _("Feels Like: ") + (Config.getConfig().TempUnit === Config.getConfig().CELSIUS ? weather.feelslike_c + "˚C\n\n" : weather.feelslike_f + "˚F\n\n");
				
				body += _("Status: ") + weather.weather + "\n";
				body += _("Humidity: ") + weather.relative_humidity + "\n\n";
				
				body += _("Wind: ") + (Config.getConfig().DistanceUnit === Config.getConfig().METRIC ? weather.wind_kph + " kph\n" : weather.wind_mph + " mph\n");
				body += _("Gust: ") + (Config.getConfig().DistanceUnit === Config.getConfig().METRIC ? weather.wind_gust_kph + " kph\n" : weather.wind_gust_mph + " mph\n");
				body += _("Direction: ") + weather.wind_dir;
			}
			App.sendMessage( { "Title" : title, "Body" : body } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			this.weatherOpen(q);
		}
	},
	forecastOpen : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url = '';
			
			var coord = Config.getCoords();
			
			if(q.raw.indexOf(_('home')) !== -1){
				if(Config.getConfig().HomeAddress === ""){
					App.sendErrorMessage( { "Title" : _("Missing Address"), "Body" : _("I don't have your home address on file! You can add it via my Settings page.") } );
					return;
				}
				
				url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+encodeURIComponent(Config.getConfig().HomeAddress)+"&cnt=2&mode=json&APPID=17c9f782abc336c36774712c432b6f10";
			}
			else if(q.raw.indexOf(_(' in ')) !== -1 || q.raw.indexOf(_(' for ')) !== -1){
				//Specific City
				var city = q.array.join(' ');
				city = encodeURIComponent(city);
				url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&cnt=2&mode=json&APPID=17c9f782abc336c36774712c432b6f10";
			}	
			else{	
				if(!navigator || !navigator.geolocation || (coord.Lat === 0 && coord.Lon === 0)){
					App.sendErrorMessage( { "Title" : _("Where am I?"), "Body" : _("It seems you don't have GPS enabled, so I can't tell the weather!") } );
					return;
				}
				
				//Local
				url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+coord.Lat+"&lon="+coord.Lon+"&cnt=2&mode=json&APPID=17c9f782abc336c36774712c432b6f10";
			}
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var weather = JSON.parse(xhr.responseText);	
			
			var status = weather.list[1].weather[0].main;
			
			var high = weather.list[1].temp.max;
			high -= 273.15;
			if(Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT) high = (high*9)/5 + 32;
			high = high.toFixed(0);
			
			var low = weather.list[1].temp.min;
			low -= 273.15;
			if(Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT) low = (low*9)/5 + 32;
			low = low.toFixed(0);
			
			App.sendMessage( { "Title" : _("Forecast for ") + weather.city.name, "Body" : _("Status: ") + status + "\n" + _("High: ") + high + "˚" + (Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT ? "F" : "C") + "\n" + _("Low: ") + low + "˚" + (Config.getConfig().TempUnit === Config.getConfig().FAHRENHEIT ? "F" : "C") + _("\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again.") } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong with my radar! Try asking me about the forecast again.") } );
		}
	},
	forecastWU : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url, location;
			var wu_home = "";
			
			var coord = Config.getCoords();
			
			var langParams = "/forecast";
			if(Config.getLang() === "es") langParams = "/conditions/forecast/lang:SP";
			else if(Config.getLang() === "fr") langParams = "/conditions/forecast/lang:FR";
			
			if(q.raw.indexOf(_(' home')) !== -1){
				if(Config.getConfig().HomeAddress === ""){
					App.sendErrorMessage( { "Title" : _("Missing Address"), "Body" : _("I don't have your home address on file! You can add it via my Settings page.") } );
					return;
				}
				
				location = Config.getConfig().HomeAddress.substring(Config.getConfig().HomeAddress.indexOf(",")+2).split(", ");
				wu_home = Config.getConfig().HomeAdress.substring(Config.getConfig().HomeAddress.indexOf(",")+2);
			
				location.reverse();
				location = location.join("/");
				
				if(Config.getConfig().WuKey === ""){ //Home Location, Default Key
					url = "http://api.wunderground.com/api/8fd6442e08cd60f5" + langParams + "/q/" + location + ".json";
				}
				else{ //Home Location, Custom Key
					url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + langParams + "/q/" + location + ".json";
				}
			}
			else if(q.raw.indexOf(_(' in ')) !== -1 || q.raw.indexOf(_(' for ')) !== -1){
				var cut = -1;
				if(q.raw.indexOf(_(' in ')) === -1) cut = q.raw.indexOf(_(' for ')) + _(' for ').length;
				else cut = q.raw.indexOf(_(' in ')) + _(' in ').length;
				var array = q.raw.substring(cut).split(' ');
				
				wu_home = array;
				wu_home[0] = wu_home[0].charAt(0).toUpperCase() + wu_home[0].substring(1);
				
				if(wu_home.length > 1){
					if(wu_home[1].length <= 2) wu_home[1] = wu_home[1].toUpperCase();
					else wu_home[1] = wu_home[1].charAt(0).toUpperCase() + wu_home[1].substring(1);
				}
				
				wu_home = wu_home.join(', ');
				
				array.reverse();
				location = array.join('/');
						
				if(Config.getConfig().WuKey === ""){ //Specific City, Default Key
					url = "http://api.wunderground.com/api/8fd6442e08cd60f5" + langParams + "/q/" + location + ".json";
				}
				else{ //Specific City, Custom Key
					url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + langParams + "/q/" + location + ".json";
				}
			}
			else{
				if(!navigator || !navigator.geolocation || (coord.Lat === 0 && coord.Lon === 0)){
					App.sendErrorMessage( { "Title" : _("Where am I?"), "Body" : _("It seems you don't have GPS enabled, so I can't tell the forecast!") } );
					return;
				}
				
				if(Config.getConfig().WuKey === ""){ //Current Location, Default Key
					url = "http://api.wunderground.com/api/8fd6442e08cd60f5" + langParams + "/q/" + coord.Lat + "," + coord.Lon + ".json";
				}
				else{ //Current Location, Custom Key
					url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + langParams + "/q/" + coord.Lat + "," + coord.Lon + ".json";
				}
			}
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var weather = JSON.parse(xhr.responseText);
			
			if(xhr.status !== 200 || weather.error !== undefined ){
				this.forecastOpen(q);
				return;
			}
			else if(weather.response.results !== undefined){
				App.sendErrorMessage( { "Title" : _("Which one?"), "Body" : _("I see multiple results for that location! Could you be more specific? Maybe mention the state or country...") });
				return;
			}
			
			weather = weather.forecast;
			
			var title = "";
			var body = "";
			if(Config.getConfig().WuKey === ""){ //Basic Weather Report
				title = _("Forecast") + (wu_home === "" ? "" :  _(" for ") + wu_home);
				
				body += _("Status: ") + weather.simpleforecast.forecastday[1].conditions + "\n";
				body += _("High: ") + (Config.getConfig().TempUnit === Config.getConfig().CELSIUS ? weather.simpleforecast.forecastday[1].high.celsius + "˚C\n" : weather.simpleforecast.forecastday[1].high.fahrenheit + "˚F\n");
				body += _("Low: ") + (Config.getConfig().TempUnit === Config.getConfig().CELSIUS ? weather.simpleforecast.forecastday[1].low.celsius + "˚C" : weather.simpleforecast.forecastday[1].low.fahrenheit + "˚F");
			}
			else{ //Advanced Weather Report
				title = _("3-Day Forecast") + (wu_home === "" ? "" : _(" for ") + wu_home);
				
				var day = new Date().getDay();
				if(day === 0) day = _("Sunday");
				else if(day === 1) day = _("Monday");
				else if(day === 2) day = _("Tuesday");
				else if(day === 3) day = _("Wednesday");
				else if(day === 4) day = _("Thursday");
				else if(day === 5) day = _("Friday");
				else if(day === 6) day = _("Saturday");
				
				var f_index = 0;
				
				while(weather.txt_forecast.forecastday[f_index].title.indexOf(day) !== -1 && f_index < weather.txt_forecast.forecastday.length) f_index++;
				
				for(var f = f_index; f < weather.txt_forecast.forecastday.length; f++){
					body += weather.txt_forecast.forecastday[f].title + "\n";
					body += (Config.getConfig().TempUnit === Config.getConfig().CELSIUS ? weather.txt_forecast.forecastday[f].fcttext_metric : weather.txt_forecast.forecastday[f].fcttext);
					
					if(f != weather.txt_forecast.forecastday.length - 1) body += "\n\n";
				}
			}
			App.sendMessage( { "Title" : title, "Body" : body } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			this.forecastOpen(q);
		}
	},
	naturalWeather : function(q){
		try{
			if(!navigator || !navigator.geolocation || (Config.getCoords().Lat === 0 && Config.getCoords().Lon === 0)){
				App.sendErrorMessage( { "Title" : _("Where am I?"), "Body" : _("It seems you don't have GPS enabled, so I can't tell the weather!") } );
				return;
			}
			
			var xhr = new XMLHttpRequest();
			var url = "";
			
			var coord = Config.getCoords();
			
			if(Config.getConfig().WuKey === ""){ //Current Location, Default Key
				url = "http://api.wunderground.com/api/8fd6442e08cd60f5/hourly/q/" + coord.Lat + "," + coord.Lon + ".json";
			}
			else{ //Current Location, Custom Key
				url = "http://api.wunderground.com/api/" + Config.getConfig().WuKey + "/hourly/q/" + coord.Lat + "," + coord.Lon + ".json";
			}
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var hourly = JSON.parse(xhr.responseText).hourly_forecast;
			
			var today = new Date().getDate();
			
			var status = "";
			
			if(q.raw.indexOf("rain") !== -1) status = "rain";
			else if(q.raw.indexOf("snow") !== -1) status = "snow";
			else if(q.raw.indexOf("storm") !== -1) status = "storm";
			
			for(var h = 0; h < hourly.lenght; h++){
				if(q.raw.indexOf("tomorrow") !== -1){
					if(today != parseInt(hourly[h].FCTTIME.mday)){
						if(hourly[h].condition.toLowerCase().indexOf(status) !== -1){
							App.sendMessage( { "Title" : status.charAt(0).toUpperCase() + status.substring(1) + " Alert!", "Body" : "It looks like it is going to " + status + " tomorrow, starting at " + hourly[h].FCTTIME.civil + "." } );
							return;
						}
					}
				}
				else{
					if(hourly[h].condition.toLowerCase().indexOf(status) !== -1){
						App.sendMessage( { "Title" : status.charAt(0).toUpperCase() + status.substring(1) + " Alert!", "Body" : "It looks like it is going to " + status + " today, starting at " + hourly[h].FCTTIME.civil + "." } );
						return;
					}
				}
			}
			
			App.sendMessage( { "Title" : "All clear!", "Body" : "It looks like it isn't supposed to " + status + (q.raw.indexOf("tomorrow") !== -1 ? " tomorrow." : " today.") } );
		}
		catch(err){
			if(q.raw.indexOf("tomorrow") !== -1) this.forecastWU({array : [], raw : ''});
			else this.weatherWU({array : [], raw : ''});
		}
	},
	translate : function(q){
		try{
			var tlang = q.array[q.array.length-1];
			var formattedLang = Parser.langNameToAbbr(tlang);
		
			if(formattedLang.length > 2){
				App.sendErrorMessage( { "Title" : _("Sorry, I don't speak ") + tlang, "Body" : _("Try another language, or speak more clearly.") } );
				return;
			}
		
			q.array.splice(q.array.length-1, 1);
			
			var phrase = encodeURIComponent(q.array.join(' '));
			tlang = tlang.charAt(0).toUpperCase() + tlang.substring(1);
		
			var langpair = "&langpair=en%7C";
			switch(Config.getLang()){
				case "es" : langpair = "&langpair=es%7C"; break;
				case "fr" : langpair = "&langpair=fr%7C"; break;
				case "de" : langpair = "&langpair=de%7C"; break;
				case "pt" : langpair = "&langpair=pt%7C"; break;
				case "da" : langpair = "&langpair=da%7C"; break;
			}
			
			var xhr = new XMLHttpRequest();
			var url = "http://api.mymemory.translated.net/get?q=" + phrase + langpair + formattedLang;
			
			xhr.open("GET", url, false);
			
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			
			if(result.responseStatus === "403"){
				App.sendErrorMessage( { "Title" : _("Sorry, I don't speak ") + tlang, "Body" : _("If you want me to learn ") + tlang + _(", use the Contact Developer link in the Pebble Appstore.") } );
				return;
			}
			
			//result.matches = result.matches.filter(function(e){ return e.subject === "All"; });
			
			if(result.matches.length === 0){
				App.sendErrorMessage( { "Title" : _("Hmmm..."), "Body" : _("I'm sorry, but I don't know' how to say \"") + decodeURIComponent(phrase) + _("\" in ") + tlang + "." } );
				return;
			}
		
			var message = result.matches[0].translation;
			var conf = result.matches[0].match * 100 + "%";
			
			message = message.charAt(0).toUpperCase() + message.substring(1);
			if(message.length > 200) message = message.substring(0,197) + "...";
			else if(phrase.indexOf('where%20') !== -1 || phrase.indexOf('what%20') !== -1 || phrase.indexOf('who%20') !== -1 || phrase.indexOf('how%20') !== -1 || phrase.indexOf('why%20') !== -1 || phrase.indexOf('when%20') !== -1){
				if(formattedLang === "es" || formattedLang === "ca") message = "¿" + message;
				message += "?";
			}
			else message += ".";
		
			App.sendMessage( { "Title" : tlang, "Body" : message + _("\n\n(Conf: ") + conf + ")" } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Lost in Translation..."), "Body" : _("...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again.") } );
		}
	},
	define : function(q){
		try{
			var term = q.array.join(' ');
			term = encodeURIComponent(term);
			var url = 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?search=' + term;
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var results = JSON.parse(xhr.responseText).results;
			var length = results.length;
			
			if(results === undefined || length === 0){
				App.sendErrorMessage( { "Title" : _("Sorry..."), "Body" : _("I couldn't find a definition for ") + term + "." } );
				return;
			}
			
			var exactMatch = -1;
			
			for(var e = 0; e < length; e++){
				if(results[e].headword === term){
					exactMatch = e;
				}
			}	
			
			var body;
			if(exactMatch !== -1){
				body = (results[exactMatch].senses[0].definition+"").charAt(0).toUpperCase() + (results[exactMatch].senses[0].definition+"").substring(1) + ".";
				App.sendMessage( { "Title" : results[exactMatch].headword, "Body" : body } );
			}
			else{
				body = (results[0].senses[0].definition+"").charAt(0).toUpperCase() + (results[0].senses[0].definition+"").substring(1) + ".";
				App.sendMessage( { "Title" : results[0].headword, "Body" : body } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("I lost my dictionary! Try asking me again and I'll see if I can find it this time...") } );
		}
	},
	defineES : function(q){
		try{
			var term = q.array.join(' ');
			term = encodeURIComponent(term);
			var url = "https://glosbe.com/gapi/translate?from=es&dest=es&format=json&phrase="+term;
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			if(result.tuc[0].meanings !== undefined) result = result.tuc[0].meanings[0].text;
			else result = result.tuc[1].meanings[0].text;
			
			result = result
				.replace(/&Aacute;/g,"Á").replace(/&Eacute;/g,"É").replace(/&Iacute;/g,"Í").replace(/&Oacute;/g,"Ó").replace(/&Uacute;/g,"Ú")
				.replace(/&aacute;/g,"á").replace(/&eacute;/g,"é").replace(/&iacute;/g,"í").replace(/&oacute;/g,"ó").replace(/&uacute;/g,"ú");
			
			App.sendMessage( { "Title" : decodeURIComponent(term), "Body" : decodeURIComponent(result) } );
			return;
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("I lost my dictionary! Try asking me again and I'll see if I can find it this time...") } );
		}
	},
	defineFR : function(q){
		try{
			var term = q.array.join(' ');
			term = encodeURIComponent(term);
			var url = "https://glosbe.com/gapi/translate?from=fr&dest=fr&format=json&phrase="+term;
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			if(result.tuc[0].meanings !== undefined) result = result.tuc[0].meanings[0].text;
			else result = result.tuc[1].meanings[0].text;
			
			result = result
				.replace(/&Aacute;/g,"Á").replace(/&Eacute;/g,"É").replace(/&Iacute;/g,"Í").replace(/&Oacute;/g,"Ó").replace(/&Uacute;/g,"Ú").replace(/&Agrave;/g, "À").replace(/&Egrave;/g, "È").replace(/&Igrave;/g, "Ì").replace(/&Ograve;/g, "Ò").replace(/&Ugrave;/g, "Ù")
				.replace(/&aacute;/g,"á").replace(/&eacute;/g,"é").replace(/&iacute;/g,"í").replace(/&oacute;/g,"ó").replace(/&uacute;/g,"ú").replace(/&#39;/g, "'").replace(/&agrave;/g, "à").replace(/&egrave;/g, "è").replace(/&igrave;/g, "ì").replace(/&ograve;/g, "ò").replace(/&ugrave;/g, "ù");
			
			App.sendMessage( { "Title" : decodeURIComponent(term), "Body" : decodeURIComponent(result) } );
			return;
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("I lost my dictionary! Try asking me again and I'll see if I can find it this time...") } );
		}
	},
	defineDE : function(q){
		try{
			var term = q.array.join(' ');
			
			if(term === "künstliche intelligenz") term = "Intelligenz";
			
			term = encodeURIComponent(term);
			var url = "https://glosbe.com/gapi/translate?from=de&dest=de&format=json&phrase="+term;
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			if(result.tuc[0].meanings !== undefined) result = result.tuc[0].meanings[0].text;
			else result = result.tuc[1].meanings[0].text;
			
			result = result
				.replace(/&Auml;/g,"Ä").replace(/&auml;/g,"ä").replace(/&Eacute;/g,"É").replace(/&eacute;/g,"é").replace(/&Ouml;/g,"Ö").replace(/&oacute;/g,"ó").replace(/&ouml;/g,"ö").replace(/&Uuml;/g, "Ü").replace(/&uuml;/g, "ü").replace(/&szlig;/g, "ß");
			
			App.sendMessage( { "Title" : decodeURIComponent(term), "Body" : decodeURIComponent(result) } );
			return;
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("I lost my dictionary! Try asking me again and I'll see if I can find it this time...") } );
		}
	},
	definePT : function(q){
		try{
			var term = q.array.join(' ');
			term = encodeURIComponent(term);
			var url = "https://glosbe.com/gapi/translate?from=pt&dest=pt&format=json&phrase="+term;
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			if(result.tuc[0].meanings !== undefined) result = result.tuc[0].meanings[0].text;
			else result = result.tuc[1].meanings[0].text;
			
			result = result
				.replace(/&Aacute;/g,"Á").replace(/&Eacute;/g,"É").replace(/&Iacute;/g,"Í").replace(/&Oacute;/g,"Ó").replace(/&Uacute;/g,"Ú")
				.replace(/&aacute;/g,"á").replace(/&eacute;/g,"é").replace(/&iacute;/g,"í").replace(/&oacute;/g,"ó").replace(/&uacute;/g,"ú");
			
			App.sendMessage( { "Title" : decodeURIComponent(term), "Body" : decodeURIComponent(result) } );
			return;
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("I lost my dictionary! Try asking me again and I'll see if I can find it this time...") } );
		}
	},
	defineDA : function(q){
		try{
			var term = q.array.join(' ');
			term = encodeURIComponent(term);
			var url = "https://glosbe.com/gapi/translate?from=da&dest=da&format=json&phrase="+term;
			var xhr = new XMLHttpRequest();
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			if(result.tuc[0].meanings !== undefined) result = result.tuc[0].meanings[0].text;
			else result = result.tuc[1].meanings[0].text;
			
			result = result
				.replace(/&Aacute;/g,"Á").replace(/&Eacute;/g,"É").replace(/&Iacute;/g,"Í").replace(/&Oacute;/g,"Ó").replace(/&Uacute;/g,"Ú")
				.replace(/&aacute;/g,"á").replace(/&eacute;/g,"é").replace(/&iacute;/g,"í").replace(/&oacute;/g,"ó").replace(/&uacute;/g,"ú");
			
			App.sendMessage( { "Title" : decodeURIComponent(term), "Body" : decodeURIComponent(result) } );
			return;
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("I lost my dictionary! Try asking me again and I'll see if I can find it this time...") } );
		}
	},
	stock : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + encodeURIComponent(q.array.join(' '));
			xhr.open("GET", url, false);
			xhr.send();
			
			var response = JSON.parse(xhr.responseText);
			if(response.length === 0){ //No Symbol Found
				App.sendErrorMessage( { "Title" : _("Waiting for an IPO?"), "Body" : _("Sorry, I couldn't locate a stock symbol for \"") + q.array.join(' ') + _("\". Are you sure they're public?") } );
				return;
			}
			else{
				var symbol = response[0].Symbol;
				var exchange = response[0].Exchange;
				
				xhr = new XMLHttpRequest();
				url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + symbol;
				xhr.open("GET", url, false);
				xhr.send();
				
				response = JSON.parse(xhr.responseText);
				
				if(response.Message !== undefined){ //Error Looking Up Symbol
					App.senErrorMessage( { "Title" : _("Waiting for an IPO?"), "Body" : _("Sorry, I couldn't locate a stock symbol for \"") + q.array.join(' ') + _("\". Are you sure they're public?") } );
				}
				else{
					App.sendMessage( { "Title" : symbol, "Body" : response.Name + "\n" + exchange + _("\n\nNow: $") + response.LastPrice + _("\nChange: ") + (response.ChangePercent > 0 ? "+" : "") + (response.ChangePercent.toFixed(2)) + _("%\n\nOpen: $") + response.Open + _("\nHigh: $") + response.High + _("\nLow: $") + response.Low + _("\n\nLast Update: ") + response.Timestamp } );
				}
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Ding ding ding...dong?"), "Body" : _("Sorry, something went wrong when I tried to look up that company. Please try again.") } );
		}
	},
	addTodo : function(q){
		try{
			var list = localStorage.list ? localStorage.list.split('#') : [];
			
			if(q.array.join(' ').indexOf(_(' and ')) === -1){
				var listItem = q.array.join(' ');
				
				list.push(listItem);
				localStorage.setItem("list", list.join('#'));
		
				listItem = listItem.charAt(0).toUpperCase() + listItem.substring(1);
			
				App.sendMessage( { "Title" : _("List Updated!"), "Body" : Config.getLang() !== "fr" ? _("Added \"") + listItem + "\"." : "\"" + listItem + _("Added \"") } );
			}
			else{
				var listArray = q.array.join(' ').split(_(' and '));
				var numItems = listArray.length;
				var listItems = "";
				
				for(var i = 0; i < numItems; i++){
					if(i === 0) listItems += "\"" + listArray[i].charAt(0).toUpperCase() + listArray[i].substring(1) + "\"";
					else listItems += _(" and ") + "\"" + listArray[i].charAt(0).toUpperCase() + listArray[i].substring(1) + "\"";
					
					list.push(listArray[i]);
				}
			
				localStorage.setItem("list", list.join('#'));
			
				App.sendMessage( { "Title" : _("List Updated!") , "Body" : Config.getLang() !== "fr" ? _("Added ") + listItems + "." : listItems + _("Added ") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - and I don't want to forget to add that to your list! Please try again.") } );
		}
	},
	checkTodo : function(q){
		try{
			var body = "";
			
			var list = localStorage.list ? localStorage.list.split('#') : [];
			
			var listLen = list.length;
			
			if(listLen !== 0){
				for(var i = 0; i < listLen; i++){
					body += "• " + list[i].charAt(0).toUpperCase() + list[i].substring(1) + "\n";
				}
			}
			else{
				body = _("Your list is empty!");
			}
			
			App.sendMessage( { "Title" : _("List"), "Body" : body } );	
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it.") } );
		}		
	},
	removeTodo : function(q){
		try{
			var list = localStorage.list ? localStorage.list.split('#') : [];
			
			if(list.length === 0){
				App.sendErrorMessage( { "Title" : _("List"), "Body" : _("Your list is empty!") } );
				return;
			}
			
			var item = q.array.join(' ');
		
			var index = -1;
			
			for(var i = 0; i < list.length; i++){
				if(list[i] === item) index = i;
			}
			
			if(index !== -1){
				list.splice(index,1);
			
				localStorage.setItem("list", list.join('#'));
			
				App.sendMessage( { "Title" : _("List Updated!"), "Body" : Config.getLang() !== "fr" ? _("Removed \"") + item.charAt(0).toUpperCase() + item.substring(1) + "\"." : item.charAt(0).toUpperCase() + item.substring(1) + _("Removed \"") } );
			}
			else{
				App.sendErrorMessage( { "Title" : _("Sorry..."), "Body" : _("I couldn't find ") + item.charAt(0).toUpperCase() + item.substring(1) + _(" on your list.") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!") } );
		}
	},
	clearTodo : function(q){
		try{	
			localStorage.setItem("list", false);
		
			App.sendMessage( { "Title" : _("List Updated!"), "Body" : _("Your list has been cleared.") } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong - I tried to clear your list but couldn't. Please try again!") } );
		}	
	},
	conversion : function(q){
		try{
			q.array = q.array.join(' ').replace(/\u00B0/g, " ").replace(/\bf\b/g, _("fahrenheit")).replace(/\bc\b/g, _("celsius")).replace(_("degrees "), "").replace(/\bl\b/g, _("liters")).replace(/\bml\b/g, _("milliliters")).replace(/\bkg\b/g, _("kilograms")).replace(/\bg\b/g, _("grams")).replace(/\bcm\b/g, _("centimeters")).replace(/\bm\b/g, _("meters")).replace(/\bkm\b/g, _("kilometers")).replace(_("fluid ounces"), _("fluid-ounces")).replace("court","quart").split(' ');
			
			if(Config.getLang() === "en"){
				if(q.array.join(' ').indexOf('2"') !== -1){
					q.array = q.array.join(' ').replace("'", _(" feet ")).replace('2"', _('to inches')).split(' ');
				}
				if(q.array[q.array.length-2] === "2"){
					q.array[q.array.length-2] = "to";
				}
			}
			
			var inputNum = parseInt(q.array[0]);
			var inputType = q.array[1];
			var outputType = q.array[3]; //q.array[2] should be "to"
			
			if(Config.getLang() !== "de"){
				if(inputType.charAt(inputType.length-1) !== 's' && inputType !== _("fahrenheit") && inputType !== _("celsius") && inputType !== _("kelvin")){
					if(inputType === _("foot")) inputType = _("feet");
					else if(inputType === _("inch")) inputType = _("inches");
					else if(inputType !== _("feet")) inputType += "s";
				}
				
				if(outputType.charAt(outputType.length-1) !== 's' && outputType !== _("fahrenheit") && outputType !== _("celsius") && outputType !== _("kelvin")){
					if(outputType === _("foot")) outputType = _("feet");
					else if(outputType === _("inch")) outputType = _("inches");
					else if(outputType !== _("feet")) outputType += "s";
				}
			}
			
			var outputNum;
			
			var firstUnit = false, secondUnit = false, isTemp = false;
			
			for(var i = 0; i < Convert.length; i++){
				if(_(Convert[i].name) === inputType){
					firstUnit = true;
					for(var o = 0; o < Convert[i].options.length; o++){
						if(_(Convert[i].options[o].name) === outputType){
							secondUnit = true;
							outputNum = inputNum * Convert[i].options[o].multiplier;
							if(Convert[i].tempFlag !== undefined) isTemp = true;
							break;
						}
					}
				}
			}
			
			if(isTemp){
				if(inputType === _("celsius") && outputType === _("kelvin")){
					outputNum = inputNum + 273.15;
					inputType = "˚C";
					outputType = _(" Kelvin");
					outputNum = outputNum.toFixed(2);
				}
				else if(inputType === _("kelvin") && outputType === _("celsius")){
					outputNum = inputNum - 273.15;
					inputType = _(" Kelvin");
					outputType = "˚C";
					outputNum = outputNum.toFixed(1);
				}
				else if(outputType === _("fahrenheit")){
					if(inputType === _("celsius")){
						outputNum = (1.8*inputNum) + 32;
						inputType = "˚C";
					}
					else if(inputType === _("kelvin")){
						outputNum = (1.8*(inputNum-273.15)) + 32;
						inputType = _(" Kelvin");
					}
					outputType = "˚F";
					outputNum = outputNum.toFixed(1);
				}
				else if(inputType === _("fahrenheit")){
					if(outputType === _("celsius") || outputType === _("kelvin")){
						outputNum = (inputNum-32)/1.8;
					}
					if(outputType === _("kelvin")){
						outputNum += 273.15;
						outputType = _(" Kelvin");
						outputNum = outputNum.toFixed(2);
					}
					else{
						outputType = "˚C";
						outputNum = outputNum.toFixed(1);
					}
					inputType = "˚F";
				}
			}
			
			if(firstUnit && secondUnit) App.sendMessage( { "Title" : outputNum + (isTemp ? "" : " ") + outputType, "Body" : inputNum + (isTemp ? "" : " ") + inputType + " -> " + outputType } );
			else if(!firstUnit) App.sendMessage( { "Title" : _("Hmm..."), "Body" : _("I don't recognize the units you're using (") + inputType + _("), sorry!") } );
			else App.sendMessage( { "Title" : _("Apples to Oranges"), "Body" : _("Sorry, either ") + inputType + _(" to ") + outputType + _(" isn't a valid conversion, or I don't know how to convert them.") } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Hmmm..."), "Body" : _("I don't think I know how to convert that!") } );
		}
	},
	movies : function(q){
		try{
			var movie = q.array.join(' ');
			
			var xhr = new XMLHttpRequest();
			var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + encodeURIComponent(movie) + "&page_limit=10&page=1&apikey=9fhppvy3uscgxgmh4a8bzyaw";
			xhr.open("GET", url, false);
			xhr.send();
			
			var response = JSON.parse(xhr.response);
			
			if(response.movies.length === 0){
				App.sendErrorMessage( { "Title" : "Is that an indie film?", "Body" : "Sorry, I couldn't find any information on the movie " + movie } );
			}
			else{
				response.movies = response.movies.sort(function(a,b){
					return (new Date(b.release_dates.theater)).getTime() - (new Date(a.release_dates.theater)).getTime();
				});
				
				var runtime = response.movies[0].runtime;
				runtime = Math.floor(runtime/60) + "h " + (runtime-60*Math.floor(runtime/60)) + "m";
				
				var title = response.movies[0].title;
				var body = "Release Date:\n" + response.movies[0].release_dates.theater + "\n\nRated: " + response.movies[0].mpaa_rating + "\nRuntime: " + runtime + "\n\nCritics: " + response.movies[0].ratings.critics_score + "%\nAudience: " + response.movies[0].ratings.audience_score + "%\n\n" + response.movies[0].synopsis;
				
				App.sendMessage( { "Title" : title, "Body" : body } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : "I'm sorry Dave, I'm afraid I can't do that...", "Body" : "Just kidding! But something did go wrong with my movie database. Please try again!" } );
		}
	},
	health : function(q){
		try{
			if(q.raw.indexOf(_("goal")) !== -1){
				App.sendRequest( { "StepGoalRequest" : "" } );
			}
			else if(q.raw.indexOf(_("steps")) !== -1){
				App.sendRequest( { "StepsRequest" : "" } );
			}
			else if(q.raw.indexOf(_("far")) !== -1 || q.raw.indexOf(_("distance")) !== -1 || (Config.getConfig().DistanceUnit === Config.getConfig().METRIC && q.raw.indexOf(_("kilometers")) !== -1) || (Config.getConfig().DistanceUnit === Config.getConfig().IMPERIAL && q.raw.indexOf(_("miles")) !== -1)){
				App.sendRequest( { "DistanceRequest" : "" } );	
			}
			else if(q.raw.indexOf(_("sleep")) !== -1 || q.raw.indexOf(_("last night")) !== -1){
				App.sendRequest( { "SleepRequest" : "" } );
			}
			else if(q.raw.indexOf(_("heart")) !== -1 || q.raw.indexOf(_("rate")) !== -1){
				App.sendRequest( { "HeartRateRequest" : "" } );
			}
			else{
				App.sendErrorMessage( { "Title" : _("I don't understand..."), "Body" : _("I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today.") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong, but don't let that mess up your workout!") } );
		}
	},
	sports : function(q){
		try{
			var teamName = "";
			var teamID;
			var leagueSlug;
			
			var teamName2 = "";
			var duplicate = false;
			
			var teamFound = false;
			
			for(var sport = 0; sport < ALL_LEAGUES.length; sport++){
				for(var team = 0; team < ALL_LEAGUES[sport].array.length; team++){
					if(!teamFound){
						var current = ALL_LEAGUES[sport].array[team];
						if( q.raw.indexOf(current.full_name.toLowerCase()) !== -1 ){
							teamName = current.full_name;
							teamID = current.id;
							leagueSlug = ALL_LEAGUES[sport].slug;
							teamName2 = "";
							duplicate = false;
							
							teamFound = true;
						}
						else if( q.raw.indexOf(current.name.toLowerCase()) !== -1 || q.raw.indexOf(current.location.toLowerCase()) !== -1 || (current.nickname !== undefined && q.raw.indexOf(current.nickname.toLowerCase()) !== -1) ){
							if(teamName === ""){
								teamName = current.full_name;
								teamID = current.id;
								leagueSlug = ALL_LEAGUES[sport].slug;
							}
							else{
								teamName2 = current.full_name;
								duplicate = true;
							}
						}
					}
				}
			}
			
			if(teamName === ""){
				App.sendErrorMessage( { "Title" : _("Are they in the minors?"), "Body" : _("Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball.") } );
				return;
			}
			else if(duplicate){
				App.sendErrorMessage( { "Title" : _("I'm seeing double!"), "Body" : _("There are at least two teams with that name! Do you mean the ") + teamName + _(" or the ") + teamName2 + _("? Please ask again with the full team name.") } );
				return;
			}
			
			var xhr = new XMLHttpRequest();
			var url;
			if(leagueSlug === "liga" || leagueSlug === "epl" || leagueSlug === "bund" || leagueSlug === "mls" || leagueSlug === "serie" || leagueSlug === "fran") url = "https://api.thescore.com/" + leagueSlug + "/events";
			else url = "https://api.thescore.com/" + leagueSlug + "/teams/" + teamID + "/events/full_schedule";
			xhr.open("GET", url, false);
			xhr.send();
			
			if(xhr.status !== 200){
				strikes++;
				if(strikes < 10){
					this.sports(q);
				}
				else{
					strikes = 0;
					App.sendErrorMessage( { "Title" : _("Too much data!"), "Body" : _("I can't access my sports database right now! Maybe try again later?") } );
				}
				return;
			}
			else{
				strikes = 0;
			}
			
			var schedule = JSON.parse(xhr.responseText);
			var now = (new Date()).getTime();
			
			if(leagueSlug === "liga" || leagueSlug === "epl" || leagueSlug === "bund" || leagueSlug === "mls" || leagueSlug === "serie" || leagueSlug === "fran"){
				schedule = schedule.filter(function(e){
					return (e.home_team.id === teamID || e.away_team.id === teamID);
				});
			}
			
			var title = "", body = "";
			
			//Current or Most Recent Score
			if(q.raw.indexOf(_('score')) !== -1){
				var target;
				for(var g = 0; g < schedule.length; g++){
					var dateArray = schedule[g].game_date.split(' ');
					var gametime = new Date(Date.UTC(dateArray[3], Parser.parseMonth(dateArray[2]), dateArray[1], dateArray[4].split(':')[0], dateArray[4].split(':')[1], dateArray[4].split(':')[2], 0));
					if(gametime.getTime() > now){
						var dateArrayTarget;
						var gametimeTarget;
						
						if(g === 0){ //Before Preseason
							target = schedule[0];
							
							dateArrayTarget = target.game_date.split(' ');
							gametimeTarget = new Date(Date.UTC(dateArrayTarget[3], Parser.parseMonth(dateArrayTarget[2]), dateArrayTarget[1], dateArrayTarget[4].split(':')[0], dateArrayTarget[4].split(':')[1], dateArrayTarget[4].split(':')[2], 0));
							
							body = _("First Game of the Season:\n") + target.away_team.abbreviation + " @ " + target.home_team.abbreviation + ", " + gametimeTarget.toString();
							
							App.sendMessage( { "Title" : _("Preseason"), "Body" : body } );
							return;
						}
						else{ //Currently In-Season
							target = schedule[g-1];	
							
							dateArrayTarget = target.game_date.split(' ');
							gametimeTarget = new Date(Date.UTC(dateArrayTarget[3], Parser.parseMonth(dateArrayTarget[2]), dateArrayTarget[1], dateArrayTarget[4].split(':')[0], dateArrayTarget[4].split(':')[1], dateArrayTarget[4].split(':')[2], 0));
							
							if(target.game_type === "Preseason") title += _("Preseason\n");
							
							title += target.away_team.full_name + " @ " + target.home_team.full_name;
							
							body += target.home_team.abbreviation + ": " + target.box_score.score.home.score + "\n" + target.away_team.abbreviation + ": " + target.box_score.score.away.score + "\n" + (target.box_score.progress.status === "final" ? _("Final") : target.box_score.progress.segment_string + ", " + target.box_score.progress.clock) + "\n\n" + gametimeTarget.toString();
							
							App.sendMessage( { "Title" : title, "Body" : body } );
							return;
						}
					}
				}
				if(target === undefined){ //Season Over
					App.sendMessage( { "Title" : _("Offseason"), "Body" : _("Looks like the season is over! Hope the ") + teamName + _(" do well next year!") } );
				}
			}
			//Future Game Time
			else if(q.raw.indexOf(_('when')) !== -1 || q.raw.indexOf(_('next')) !== -1){
				var target2;
				for(var g2 = 0; g2 < schedule.length; g2++){
					var dateArray2 = schedule[g2].game_date.split(' ');
					var gametime2 = new Date(dateArray2[3], Parser.parseMonth(dateArray2[2]), dateArray2[1], dateArray2[4].split(':')[0], dateArray2[4].split(':')[1], dateArray2[4].split(':')[2], 0);
					if(gametime2.getTime() > now){ //Before Preseason or Currently In-Season
						target2 = schedule[g2];
						
						var dateArrayTarget2 = target2.game_date.split(' ');
						var gametimeTarget2 = new Date(Date.UTC(dateArrayTarget2[3], Parser.parseMonth(dateArrayTarget2[2]), dateArrayTarget2[1], dateArrayTarget2[4].split(':')[0], dateArrayTarget2[4].split(':')[1], dateArrayTarget2[4].split(':')[2], 0));
							
						title += _("Next Game\n") + target2.away_team.full_name + " @ " + target2.home_team.full_name;
						
						body += gametimeTarget2.toString();
						
						App.sendMessage( { "Title" : title, "Body" : body } );
						return;
					}
				}
				if(target2 === undefined){ //Season Over
					App.sendMessage( { "Title" : _("Offseason"), "Body" : _("Looks like the season is over! Hope the ") + teamName + _(" do well next year!") } );
				}
		  }
			//Unknown
			else{
				App.sendErrorMessage( { "Title" : _("Is it sports trivia night?"), "Body" : _("I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball.") } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Penalty!"), "Body" : _("Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!") } );
		}
	},
	ifttt : function(q){
		try{
			if(Config.getConfig().IftttKey === ""){
				App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page.") } );
				return;
			}
			
			var ifttt_intel = IFTTT.getIftttIntel();
			
			var ifttt_len = ifttt_intel.length;
			
			for(var c = 0; c < ifttt_len - 1; c++){
				var command = ifttt_intel[c];
					
				var keyLen = command.keywords.length;
				
				var query = q.array.join(' ');
				
				for(var k = 0; k < keyLen; k++){
					if(query.indexOf(_(command.keywords[k].string)) !== -1) command.score += command.keywords[k].value;
				}
			}
			
			var winner = -1, winningScore = 0;
			
			for(var w = 0; w < ifttt_len; w++){
				var score = ifttt_intel[w].score;
				
				if(score > winningScore){
					winner = w;
					winningScore = score;
				}
			}
			
			for(var s = 0; s < ifttt_len; s++) ifttt_intel[s].score = 0;
		
			if(winner !== -1){
				ifttt_intel[winner].callback(q);
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + err + "\n" + err.stack } );
		}
	},
	wolfram : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url = "http://api.wolframalpha.com/v2/query?input=" + encodeURIComponent(q.array.join(' ')) + "&appid=" + (Config.getConfig().WolframKey === "" ? "AJT2G4-L6W7AQVER4" : Config.getConfig().WolframKey);
			xhr.open("GET", url, false);
			xhr.send();
			
			var xml = xhr.response;
			
			var resultIndex = xml.indexOf("</pod>")+6;
			
			if(resultIndex === 6 - 1){
				if(xml.indexOf("</didyoumean") !== -1){
					var suggestion = xml.substring(xml.lastIndexOf("\">"),xml.lastIndexOf("</didyoumean>"));
					suggestion = suggestion.splt(' ');
					for(var s = 0; s < suggestion.length; s++){
						suggestion[s] = suggestion[s].charAt(0).toUpperCase() + suggestion[s].substring(1);
					}
					suggestion = suggestion.join(' ');
					App.sendErrorMessage( { "Title" : "Wolfram says..." , "Body" : "Did you mean \"" + suggestion + "\"" } );
					return;
				}
				else{
					App.sendErrorMessage( { "Title" : "Sometimes, dogs and wolves just don't get along!", "Body" : "Sorry, Wolfram didn't return any usable data from your query! You could try asking it again with different phrasing." } );
					return;	
				}
			}
			else{
				var result = xml.substring(resultIndex);
				result = result.substring(result.indexOf("<plaintext>")+11, result.indexOf("</plaintext")).replace(/&apos;/g,"'").replace(/&quot;/g, '"').replace(/\|/g, ":");
				
				result = result.split("\n");
				for(var n = 0; n < result.length; n++){
					result[n] = result[n].charAt(0).toUpperCase() + result[n].substring(1);
				}
				result = result.join("\n\n");
				
				var notableFacts = "";
				
				var notableIndex = xml.indexOf("<pod title='Notable facts'");
				if(notableIndex !== -1){
					notableFacts = xml.substring(notableIndex);
					notableFacts = "Notable Facts\n• " + notableFacts.substring(notableFacts.indexOf("<plaintext>")+11, notableFacts.indexOf("</plaintext")).replace(/&apos;/g,"'").replace(/\n/g,"\n\n• ");
				}
				
				App.sendMessage( { "Title" : "Wolfram says...", "Body" : (result + (notableIndex !== -1 ? "\n\n" : "") + notableFacts + "\n\nOriginal Request: " + q.array.join(' ')) } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : "Wolfram Error", "Body" : Config.getConfig().WolframKey === "" ? "Either something went wrong, or Snowy's Wolfram API Key has reached its monthly limit. You can avoid this error by providing your own (free) API Key." + "\n\nOriginal Request: " + q.array.join(' ') : "Something went wrong with your request. Please try again!" + "\n\nOriginal Request: " + q.array.join(' ') } );
		}
	},
	habits : function(q, forceValue){
		try{
			var habit = q.array.join('%20');
			var xhr, result, url = "", title = "", body = "";
			if(q.raw.indexOf(_("list")) !== -1 || q.raw.indexOf(_("all")) !== -1){ //Return all Habits
				url = "https://api.my-habits.net/v1/habits";
				xhr = new XMLHttpRequest();
				
				xhr.open("GET", url, false);			
				
				xhr.setRequestHeader('Accept', 'application/json');
				xhr.setRequestHeader('X-HABITS-TOKEN', Config.getConfig().HabitsKey);
				xhr.setRequestHeader('X-HABITS-APPID', 'snowy_VXKuMPL72');
				
				xhr.send();
				
				result = JSON.parse(xhr.responseText);
				
				title = "My Habits";
				
				for(var h = 0; h < result.length; h++){
					body += result[h].name + " " +  (result[h].enabled ? _("(Enabled)") : _("(Disabled)")) + "\n• " + result[h].description + (result[h].type === "count" ? _("\n  - Count: ") + result[h].count : _("\n  - Current: ") + result[h].streak.current + _("\n  - Longest: ") + result[h].streak.longest);
					if(h !== result.length-1) body += "\n\n";
				}
			}
			else if(q.raw.indexOf(_("streak")) !== -1 || forceValue === 1){
				url = "https://api.my-habits.net/v1/habits?search=" + habit;
				xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);			
				
				xhr.setRequestHeader('Accept', 'application/json');
				xhr.setRequestHeader('X-HABITS-TOKEN', Config.getConfig().HabitsKey);
				xhr.setRequestHeader('X-HABITS-APPID', 'snowy_VXKuMPL72');
				
				xhr.send();
				
				result = JSON.parse(xhr.responseText);
				
				if(result.length === 0){
					App.sendErrorMessage( { "Title" : _("Don't pick up any bad habits!"), "Body" : _("I couldn't find that particular habit!") } );
					return;
				}
				
				if(result[0].streak === undefined && result[0].count !== undefined){
					this.habits(q, 2);
					return;
				}
				
				title = result[0].name;
				body = _("Current: ") + result[0].streak.current + _("\nLongest: ") + result[0].streak.longest;
			}
			else if(q.raw.indexOf(_("count")) !== -1 || forceValue === 2){
				url = "https://api.my-habits.net/v1/habits?search=" + habit;
				xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);			
				
				xhr.setRequestHeader('Accept', 'application/json');
				xhr.setRequestHeader('X-HABITS-TOKEN', Config.getConfig().HabitsKey);
				xhr.setRequestHeader('X-HABITS-APPID', 'snowy_VXKuMPL72');
				
				xhr.send();
				
				result = JSON.parse(xhr.responseText);
				
				if(result.length === 0){
					App.sendErrorMessage( { "Title" : _("Don't pick up any bad habits!"), "Body" : _("I couldn't find that particular habit!") } );
					return;
				}			
				
				if(result[0].count === undefined && result[0].streak !== undefined){
					this.habits(q, 1);
					return;
				}
				
				title = result[0].name;
				body = _("Count: ") + result[0].count;
			}
			else if(q.raw.indexOf(_("next	")) !== -1){
				url = "https://api.my-habit	s.net/v1/habits?sort=next";
				xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);			
				
				xhr.setRequestHeader('Accept', 'application/json');
				xhr.setRequestHeader('X-HABITS-TOKEN', Config.getConfig().HabitsKey);
				xhr.setRequestHeader('X-HABITS-APPID', 'snowy_VXKuMPL72');
				
				xhr.send();
				
				result = JSON.parse(xhr.responseText)[0];
				
				title = _("Next Habit");
				body = result.name + _(" at ") + result.next_reminder;
			}
			else{
				App.sendErrorMessage( { "Title" : _("Don't pick up any bad habits!"), "Body" : _("Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next.") } );
				return;
			}
			App.sendMessage( { "Title" : title, "Body" : body } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("I promise this won't become a habit!"), "Body" : "Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." } );
		}
	},
	news : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url = "https://www.reddit.com/r/" + (Config.getConfig().Subreddit === "" ? "news" : Config.getConfig().Subreddit) + "/hot/.json";
			xhr.open("GET", url, false);
			xhr.send();
			
			console.log(url);
			
			var result = JSON.parse(xhr.responseText);
			
			if(result.error){
				App.sendErrorMessage( { "Title" : "Error from Reddit", "Body" : "Too many requests! Maybe just visit reddit.com on your phone?" } );
				return;
			}
			
			var title = result.data.children[0].data.domain;
			var body = result.data.children[0].data.title + "\n\n(via r/" + (Config.getConfig().Subreddit === "" ? "news" : Config.getConfig().Subreddit) + ")";

			App.sendMessage( { "Title" : title, "Body" : body } );
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Maybe no news is good news?"), "Body" : _("Sorry, I had some trouble reading the news today. Try again later?") } );
		}
	},
	dash : function(q){
		try{
			if(q.raw.indexOf("battery") !== -1){
				App.sendRequest( { "DashBatteryRequest" : "" } );
			} 
			else if(q.raw.indexOf("wifi") !== -1){
				App.sendRequest( { "DashSetWifiRequest" : q.raw.indexOf("on") !== -1 } );
			}
			else if(q.raw.indexOf("ringer") !== -1 || q.raw.indexOf("volume") !== -1 || q.raw.indexOf("vibrate") !== -1 || q.raw.indexOf("silent")){
				App.sendRequest( { "DashSetRingerRequest" : q.raw.indexOf("loud") !== -1 ? 2 : q.raw.indexOf("silent") !== -1 ? 0 : 1 } );
			}
			else if(q.raw.indexOf("hotspot") !== -1){
				App.sendRequest( { "DashSetHotspotRequest" : q.raw.indexOf("on") !== -1 } );
			}
			else if(q.raw.indexOf("sms") !== -1 || q.raw.indexOf("text") !== -1 || q.raw.indexOf("number") !== -1 || q.raw.indexOf("messages") !== -1){
				App.sendRequest( { "DashSMSRequest" : "" } );
			}
			else if(q.raw.indexOf("calendar") !== -1 || q.raw.indexOf("next") !== -1 || q.raw.indexOf("event") !== -1){
				App.sendRequest( { "DashCalendarRequest" : "" } );
			}
			else{
				App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong, but I can't tell what..." ) } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong, but I can't tell what...Maybe this will make sense to you: " + err) } );
		}
	},
	travel : function(q){
		try{
			var travelKey = Config.getConfig().TravelKey;
			if(travelKey === ""){
				App.sendErrorMessage( { "Title" : "Uh-Oh!", "Body" : "It seems you haven't entered a Travel API Key. You can do that in my Settings page." } );
				return;
			}
			
			var xhr = new XMLHttpRequest();
			var url = "https://travel.ronnycarr.com/api/v1/current?apiKey=7s9ecxj4qk1xcv67x78d&token=" + travelKey; 
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			
			if(result.status === "Success"){
				if(result.flight === undefined){
					App.sendErrorMessage( { "Title" : "Did you forget to buy a ticket?", "Body" : "As far as the Travel API is concerned, you don't have any upcoming flights! You can add them via TripIt, or via the Travel Pebble App." } );
				}
				else{
					var delay = parseInt(result.flight.departure.delay);
					App.sendMessage( { "Title" : "Flight " + result.flight.flight_number + " to " + result.flight.arrival.city, "Body" : "Depart: " + result.flight.departure.time_utc.substring(result.flight.departure.time_utc.indexOf('T')+1,result.flight.departure.time_utc.indexOf('.')-3) + "\nArrive: " + result.flight.arrival.time_utc.substring(result.flight.arrival.time_utc.indexOf('T')+1,result.flight.arrival.time_utc.indexOf('.')-3) + "\nStatus: " + (delay === 0 ? "On Time" : Parser.parseTimeString(delay) + " Delay") + "\n\nTerminal: " + result.flight.departure.terminal + "\nGate: " + result.flight.departure.gate + "\n\nDuration: " + Parser.parseTimeString(result.flight.duration) } );
				}
			}
			else{
				App.sendErrorMessage( { "Title" : "Error", "Body" : "The Travel API returned the following error message: " + result.message } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : _("Something went wrong, I can't pull your flight info right now!") } );
		}
	},
	commute : function(q){
		try{
			var dest = q.raw.indexOf('work') !== -1 ? Config.getConfig().WorkAddress.replace(/\s/g, '+') : Config.getConfig().HomeAddress.replace(/\s/g, '+');
			
			if(dest === ""){
				App.sendErrorMessage( { "Title" : "All dressed up with no place to go!", "Body" : "I'm missing either your Work or Home address, which I need to give you a commute time estimate!" } );
				return;
			}
			
			var origin = Config.getCoords().Lat + "," + Config.getCoords().Lon;
			
			var xhr = new XMLHttpRequest();
			var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + dest + "&key=AIzaSyCN9fD30P3qQqb3ONwaUfzh1aIaJBJpy_c&language=" + Config.getLang() + "&units=" + (Config.getConfig().DistanceUnit === Config.getConfig().METRIC ? "metric" : "imperial");
			
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			
			if(result.status === "OK"){
				if(q.raw.indexOf('work') !== -1){
					App.sendMessage( { "Title" : "Commute to Work", "Body" : "Dist: " + result.rows[0].elements[0].distance.text + "\nTime: " + result.rows[0].elements[0].duration.text } );
				}	
				else{
					App.sendMessage( { "Title" : "Commute Home", "Body" : "Dist: " + result.rows[0].elements[0].distance.text + "\nTime: " + result.rows[0].elements[0].duration.text } );
				}
			}
			else{
				App.sendErrorMessage( { "Title" : "Error", "Body" : "Google returned the following error: " + result.error_message } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : "Something went wrong with your request. The Google Maps API may be unavailable at the moment." } );			 
		}
	},
	open : function(q){
		try{
			var xhr = new XMLHttpRequest();
			var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + Config.getCoords().Lat + "," + Config.getCoords().Lon + "&radius=5000&types=food&name=" + q.array.join('%20') + "&key=AIzaSyCN9fD30P3qQqb3ONwaUfzh1aIaJBJpy_c";
			xhr.open("GET", url, false);
			xhr.send();
			
			var result = JSON.parse(xhr.responseText);
			
			if(result.status === "OK"){
				if(result.results[0].opening_hours.open_now){
					App.sendMessage( { "Title" : "Good news!", "Body" : result.results[0].name + " IS open right now!" } );
				}
				else{
					App.sendMessage( { "Title" : "Maybe next time...", "Body" : "It appears that " + result.results[0].name + " is closed right now. But don't despair! You can ask me to find another great restaurant nearby; just ask me 'Where should I eat?'." } );
				}
			}
			else{
				App.sendErrorMessage( { "Title" : "Error", "Body" : "Google returned the following error: " + result.error_message } );
			}
		}
		catch(err){
			console.error(err + "\n" + err.stack);
			App.sendErrorMessage( { "Title" : _("Uh-oh"), "Body" : "Something went wrong with your request. The Google Places API may be unavailable at the moment." } );			 			
		}
	}
};