var KiezelPay = require('kiezelpay-core');
var kiezelpay = new KiezelPay(false); //Bool = Logging

var Clay = require('pebble-clay');

var clayConfig = require('./app-config');

var intel = require('./app-intel');

var Parser = require('./app-parser');

var customClay = require('./app-custom-clay');
var messageKeys = require('message_keys');
var clay = new Clay(clayConfig, customClay, { autoHandleEvents: false });

var lang = "en";
var dict;

var ENGLISH = 0;
var	SPANISH = 1;
var	FRENCH = 2;
var	GERMAN = 3;
var	PORTUGUESE = 4;
var DANISH = 5;

var _ = require('./app-localize')._;

var App = require('./app-messaging');

var Config = require('./app-settings');

Pebble.addEventListener('ready', function(e){
	if(localStorage.settings){
		var tempConfig = JSON.parse(localStorage.settings);
		Config.setConfig(tempConfig);
	}
	
	lang = Config.getLang();
	
	if(lang !== "en"){
		clay.config = require('./app-config-' + lang);
		intel = require('./app-intel-' + lang);
	}
	
	var lat, lon;
	
	if(navigator && navigator.geolocation) navigator.geolocation.watchPosition(
		function(pos){ //Success - High Acc
			lat = pos.coords.latitude; 
			lon = pos.coords.longitude; 
			Config.setCoords(lat,lon);
		},
		function(pos){ //Fail - High Acc
			navigator.geolocation.watchPosition(
				function(pos){ //Success - Low Acc
					lat = pos.coords.latitude;
					lon = pos.coords.longitude;
					Config.setCoords(lat,lon);
				},
				function(pos){},
				{
					maximumAge:360000, 
					timeout:10000, 
					enableHighAccuracy: false
				}
			);																																					
		},
		{
			maximumAge:360000, 
			timeout:5000, 
			enableHighAccuracy: true
		}
	);
});

Pebble.addEventListener('showConfiguration', function(e){
	if(localStorage.settings){
		var tempConfig = JSON.parse(localStorage.settings);
		Config.setConfig(tempConfig);
	}
	
	lang = Config.getLang();
	
	if(lang !== "en"){
		clay.config = require('./app-config-' + lang);
		intel = require('./app-intel-' + lang);
	}
	
	Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e){
	if(e && !e.response) return;
	
	dict = clay.getSettings(e.response);
	
	if(dict.InactivityStart !== undefined) dict.InactivityStart = dict.InactivityStart.replace(/:/g, '');
	if(dict.InactivityEnd !== undefined) dict.InactivityEnd = dict.InactivityEnd.replace(/:/g, '');
	
	var tempConfig = Config.getConfig();
	
	tempConfig.TempUnit = dict[messageKeys.TemperatureUnit] === "f" ? Config.FAHRENHEIT : Config.CELSIUS;
	tempConfig.FontSize = dict[messageKeys.FontSize] === 1 ? Config.SMALL : Config.LARGE;
	tempConfig.Subreddit = dict[messageKeys.Reddit];
	tempConfig.HomeAddress = dict[messageKeys.HomeAddress];
	tempConfig.WorkAddress = dict[messageKeys.WorkAddress];
	tempConfig.IftttKey = dict[messageKeys.IftttKey];
	tempConfig.IftttPlus = dict[messageKeys.IftttPlus];
	tempConfig.WuKey = dict[messageKeys.WuKey];
	tempConfig.WolframKey = dict[messageKeys.WolframKey];
	tempConfig.TravelKey = dict[messageKeys.TravelKey];
	tempConfig.HabitsKey = dict[messageKeys.HabitsKey];
	
	localStorage.settings = JSON.stringify(tempConfig);
	Config.setConfig(tempConfig);
	
	App.sendSettings(dict);
	App.sendMessage( { "Title" : _("Settings Saved!") } );
});

Pebble.addEventListener('appmessage', function(e){
	try{
		var dict = e.payload;
		
		console.log(JSON.stringify(dict));

		if(dict.Lang){
			console.log("Lang?");
			switch(dict[messageKeys.Lang]){
				case ENGLISH: lang = "en"; break;
				case SPANISH: lang = "es"; break;
				case GERMAN: lang = "de"; break;
				case FRENCH: lang = "fr"; break;
				case PORTUGUESE: lang = "pt"; break;
				case DANISH: lang = "da"; break;
				default: lang = "en"; break;
			}
			
			Config.setLang(lang);
			localStorage.lang = lang;
		}
		else if(dict.Transcript){
			var request = dict.Transcript.toLowerCase().replace(/'s/g, " is");
			
			lang = Config.getLang();
	
			if(lang !== "en"){
				clay.config = require('./app-config-' + lang);
				intel = require('./app-intel-' + lang);
			}
			
			switch(lang){
				case "en" :
					request = request
					.replace(/\bone\b/g, '1')
					.replace(/\btwo\b/g, '2')
					.replace(/\bthree\b/g, '3')
					.replace(/\bfour\b/g, '4')
					.replace(/\bfive\b/g, '5')
					.replace(/\bsix\b/g, '6')
					.replace(/\bseven\b/g, '7')
					.replace(/\beight\b/g, '8')
					.replace(/\bnine\b/g, '9')
					.replace(/\bten\b/g, '10');
					break;
				case "fr" : 
					request = request
					.replace(/\bun\b/g, '1')
					.replace(/\bdeux\b/g, '2')
					.replace(/\btrois\b/g, '3')
					.replace(/\bquatre\b/g, '4')
					.replace(/\bcinq\b/g, '5')
					.replace(/\bsix\b/g, '6')
					.replace(/\bsept\b/g, '7')
					.replace(/\bhuit\b/g, '8')
					.replace(/\bneuf\b/g, '9')
					.replace(/\bdix\b/g, '10');
					break;
				case "es" : 
					request = request
					.replace(/\buno\b/g, '1')
					.replace(/\bdos\b/g, '2')
					.replace(/\btres\b/g, '3')
					.replace(/\bcuatro\b/g, '4')
					.replace(/\bcinco\b/g, '5')
					.replace(/\bseis\b/g, '6')
					.replace(/\bsiete\b/g, '7')
					.replace(/\bocho\b/g, '8')
					.replace(/\bnueve\b/g, '9')
					.replace(/\bdiez\b/g, '10');
					break;
				case "de" : 
					request = request
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
					break;
				case "pt" : 
					request = request
					.replace(/\bum\b/g, '1')
					.replace(/\bdois\b/g, '2')
					.replace(/\btrês\b/g, '3')
					.replace(/\bquatro\b/g, '4')
					.replace(/\bcinco\b/g, '5')
					.replace(/\bseis\b/g, '6')
					.replace(/\bsete\b/g, '7')
					.replace(/\boito\b/g, '8')
					.replace(/\bnove\b/g, '9')
					.replace(/\bdez\b/g, '10');
					break;
				case "da" : 
					request = request
					.replace(/\ben\b/g, '1')
					.replace(/\bto\b/g, '2')
					.replace(/\btre\b/g, '3')
					.replace(/\bfire\b/g, '4')
					.replace(/\bfem\b/g, '5')
					.replace(/\bseks\b/g, '6')
					.replace(/\bsyv\b/g, '7')
					.replace(/\botte\b/g, '8')
					.replace(/\bni\b/g, '9')
					.replace(/\bti\b/g, '10');
					break;
				default: 
					request = request
					.replace(/\bone\b/g, '1')
					.replace(/\btwo\b/g, '2')
					.replace(/\bthree\b/g, '3')
					.replace(/\bfour\b/g, '4')
					.replace(/\bfive\b/g, '5')
					.replace(/\bsix\b/g, '6')
					.replace(/\bseven\b/g, '7')
					.replace(/\beight\b/g, '8')
					.replace(/\bnine\b/g, '9')
					.replace(/\bten\b/g, '10');
					break;
			}
			
			console.log("Request: " + request);
			
			if(request.indexOf('#') === 0){
				switch(request.substring(1)){
					case "weather" : console.log("Weather Widget"); break;
					case "stock" : console.log("Stock Widget"); break;
				}
			}
			else{
				console.log("Precheck");
				Parser.check(intel, request, dict.Transcript);
			}
		}
	}
	catch(err){
		console.error(err + "\n" + err.stack);
	}
});