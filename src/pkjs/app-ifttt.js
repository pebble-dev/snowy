var App = require('./app-messaging');
var _ = require('./app-localize')._;
var Config = require('./app-settings');

function thermostat(q, forceParams){
	try{
		var temp = parseInt(q.array[q.array.indexOf(_('to'))+1], true);
		
		var url = "http://maker.ifttt.com/trigger/snowy_thermostat/with/key/" + Config.getConfig().IftttKey;
		var xhr = new XMLHttpRequest();
	
		var params = "value1=" + temp;
		var data = { "value1" : temp };
		
		xhr.open("POST", url, false);
		
		if(forceParams === undefined){
		  xhr.setRequestHeader("Content-Type", "application/json");
		  xhr.send(decodeURIComponent(JSON.stringify(data)));//params);
		}
		else{
			xhr.send(params);
		}
		
		if(xhr.responseText.indexOf('Congratulations!') !== -1){
			App.sendMessage( { "Title" : _("Event Fired!"), "Body" : _("Ok, I've asked IFTTT to set your thermostat to ") + temp + _(" degrees.\n[snowy_thermostat]") } );
		}
		else if(forceParams === undefined){
			thermostat(q, false, true);
		}
		else{
			console.error("Error from Maker API");
			App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + _("Recipe failed!") } );	
		}
	}
	catch(err){
		console.error(err + "\n" + err.stack);
		if(Config.getConfig().IftttKey === "") App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page.") } );
		else App.sendErrorMessage( { "TITLE" : _("If this, then huh?"), "BODY" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + err + "\n" + err.stack } );
	}
}

function lights(q){
	try{
		var xhr, url;
		
		if(q.array.indexOf(_('on')) !== -1){
			xhr = new XMLHttpRequest();
			url = "http://maker.ifttt.com/trigger/snowy_lights_on/with/key/" + Config.getConfig().IftttKey;
			xhr.open("POST", url, false);
			xhr.send();
			
			App.sendMessage( { "Title" : _("Event Fired!"), "Body" : _("Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]") } );
		}
		else if(q.array.indexOf(_('off')) !== -1){
			xhr = new XMLHttpRequest();
			url = "http://maker.ifttt.com/trigger/snowy_lights_off/with/key/" + Config.getConfig().IftttKey;
			xhr.open("POST", url, false);
			xhr.send();
			
			if(xhr.responseText.indexOf('Congratulations!') !== -1){
				App.sendMessage( { "Titlte" : _("Event Fired!"), "Body" : _("Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]") } );
			}
			else{
				console.error("Error from Maker API");
				App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + _("Recipe failed!") } );
			}
		}
		else{
			console.error("Lights - Unknown On or Off");
			App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Sorry - I didn't understand what you wanted to do.") } );
			return;
		}		
	}
	catch(err){
		console.error(err + "\n" + err.stack);
		if(Config.getConfig().IftttKey === "") App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page.") } );
		else App.sendMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + err + "\n" + err.stack } );
	}
}

function phone(q){
	try{
		var xhr = new XMLHttpRequest();
		var url = "http://maker.ifttt.com/trigger/snowy_find_my_phone/with/key/" + Config.getConfig().IftttKey;
		xhr.open("POST", url, false);
		xhr.send();
		
		if(xhr.responseText.indexOf('Congratulations!') !== -1){
			App.sendMessage( { "Title" : _("Event Fired!"), "Body" : _("Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]") } );
		}
		else{
			console.error("Error from Maker API");
			App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + _("Recipe failed!") } );
		}
	}
	catch(err){
		console.error(err + "\n" + err.stack);
		if(Config.getConfig().IftttKey === "") App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page.") } );
		else App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + err + "\n" + err.stack } );
	}
}

function relay(q, forceParams){
	try{
		var message = q.array.join(' ');
		
		var url = "http://maker.ifttt.com/trigger/snowy_thermostat/with/key/" + Config.getConfig().IftttKey;
		var xhr = new XMLHttpRequest();
	
		var params = "value1=" + message;
		var data = { "value1" : message };
		
		xhr.open("POST", url, false);
		
		if(forceParams === undefined){
		  xhr.setRequestHeader("Content-Type", "application/json");
		  xhr.send(decodeURIComponent(JSON.stringify(data)));//params);
		}
		else{
			xhr.send(params);
		}
		
		if(xhr.responseText.indexOf('Congratulations!') !== -1){
			App.sendMessage( { "Title" : _("Event Fired!"), "Body" : _("Ok, I've asked IFTTT to set your thermostat to ") + temp + _(" degrees.\n[snowy_thermostat]") } );
		}
		else if(forceParams === undefined){
			thermostat(q, false, true);
		}
		else{
			console.error("Error from Maker API");
			App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + _("Recipe failed!") } );	
		}
	}
	catch(err){
		console.error(err + "\n" + err.stack);
		if(Config.getConfig().IftttKey === "") App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page.") } );
		else App.sendErrorMessage( { "TITLE" : _("If this, then huh?"), "BODY" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + err + "\n" + err.stack } );
	}	
}

function custom(q, forceParams){
	try{
		var params = "";
		var data = "";
		
		if(q.array.indexOf(_('saying')) !== -1){
			params = "value1=" + encodeURIComponent(upperCase(q.array.slice(q.array.indexOf(_('saying'))+1).join(' ')));
			data = { "value1" : encodeURIComponent(upperCase(q.array.slice(q.array.indexOf(_('saying'))+1).join(' '))) };
			q.array.splice(q.array.indexOf(_('saying'))+1);
		}
		else if(q.array.indexOf(_('to')) !== -1){
			params = "value1=" + parseInt(q.array[q.array.lastIndexOf(_('to'))+1]);
			data = { "value1" : parseInt(q.array[q.array.lastIndexOf(_('to'))+1])};
			q.array.splice(q.array.lastIndexOf(_('to'))+1);
		}
		else if(Config.getLang() == "en" && q.array[q.array.length-1].length === 3 && q.array[q.array.length-1].charAt(0) === '2'){
			params = "value1=" + parseInt(q.array[q.array.length-1], true);
			data = { "value1" : parseInt(q.array[q.array.length-1], true)};
			q.array.splice(q.array.lastIndexOf('to')+1);
		}
		else if(q.array.indexOf(_('values')) !== -1){
			var val1, val2, val3;
			
			val1 = q.array.slice(q.array.indexOf(_('values'))+1,q.array.indexOf(_('and'))).join(' ');
			
			if(isNaN(parseInt(val1))) val1 = encodeURIComponent(val1);
			else val1 = parseInt(val1);
			
			val2 = q.array.slice(q.array.indexOf(_('and'))+1, q.array.indexOf(_('and')) !== q.array.lastIndexOf(_('and')) ? q.array.lastIndexOf(_('and')) : q.array.length-1).join(' ');
			
			if(isNaN(parseInt(val2))) val2 = encodeURIComponent(val2);
			else val2 = parseInt(val2);
			
			if(q.array.indexOf(_('and')) !== q.array.lastIndexOf(_('and'))){
				val3 = q.array.slice(q.array.lastIndexOf(_('and'))+1).join(' ');
				
				if(isNaN(parseInt(val3))) val3 = encodeURIComponent(val3);
				else val3 = parseInt(val3);
			}
			else val3 = "";
			
			params = "value1=" + val1	+ "&value2=" + val2 + "&value3=" + val3;
			data = { "value1" : val1, "value2" : val2, "value3" : val3 };
			q.array.splice(q.array.lastIndexOf(_('values'))+1);
		}
		
		console.log(params);
		
		var customEvent = q.array.join('_');
		
		var xhr = new XMLHttpRequest();
		var url = "http://maker.ifttt.com/trigger/snowy_" + customEvent + "/with/key/" + Config.getConfig().IftttKey;
		xhr.open("POST", url, false);
		
		if(forceParams === undefined){
		  xhr.setRequestHeader("Content-Type", "application/json");
		  xhr.send(decodeURIComponent(JSON.stringify(data)));//params);
		}
		else{
			xhr.send(params);
		}
		
		if(xhr.responseText.indexOf('Congratulations!') !== -1){
			App.sendMessage( { "Title" : _("Event Fired!"), "Body" : _("Ok, I've asked IFTTT to trigger the event 'snowy_") + customEvent + "'." } );
		}
		else if(forceParams === undefined){
			custom(q, true);
		}
		else{
			console.error("Error from Maker API");
			App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your request. The event 'snowy_") + customEvent + _("' was not recognized by the IFTTT server.") } );
		}
	}
	catch(err){
		console.error(err + "\n" + err.stack);
		if(Config.getConfig().IftttKey === "") App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page.") } );
		else App.sendErrorMessage( { "Title" : _("If this, then huh?"), "Body" : _("Something went wrong with your Maker Channel. Please try again.\n\nError\n") + err + "\n" + err.stack } );
	}
}

function upperCase(string){
	return string.charAt(0).toUpperCase() + string.substring(1);
}

var ifttt_intel = [
	{
		name : "Thermostat",
		keywords : [
			{ string : "thermostat", value : 5 },
			{ string : "on", value : -3 },
			{ string : "off", value : -3 },
			{ string : "values", value : -5 }
		],
		callback : thermostat,
		score : 0
	}, //Thermostat
	{
		name : "Lights",
		keywords : [
			{ string : "lights", value : 3 },
			{ string : "on", value : 3 },
			{ string : "off", value : 3 },
			{ string : "dim", value : -3 },
			{ string : "set", value : -3 },
			{ string : "bedroom", value : -3 },
			{ string : "living room", value : -3 },
			{ string : "den", value : -3 },
			{ string : "garage", value : -3 },
			{ string : "bathroom", value : -3 },
			{ string : "basement", value : -3 },
			{ string : "kitchen", value : -3 },
			{ string : "room", value : -1 },
			{ string : "values", value : -5 },
			{ string : "wifi", value : -3 },
			{ string : "wi-fi", value : -3 },
			{ string : "car", value : -3 },
			{ string : "AC", value : -3 },
			{ string : "heat", value : -3 }
		],
		callback : lights,
		score : 0
	}, //Lights
	{
		name : "Find My Phone",
		keywords : [
			{ string : "phone", value : 3 },
			{ string : "find", value : 3 },
			{ string : "call", value : 3 },
			{ string : "values", value : -5 }			
		],
		callback : phone,
		score : 0
	}, //Find My Phone
	{
		name : "Relay",
		keywords : [
			{ string : "relay", value : 5 }
		],
		callback : relay,
		score : 0
	},
	{
		name : "Custom",
		keywords : [],
		callback : custom,
		score : 4
	} //Custom
];

module.exports = {
	getIftttIntel : function(){
		return ifttt_intel;
	}
};