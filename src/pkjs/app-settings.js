var Settings = {
	"Lang" : "en",
	
	"Lat" : 0,
	"Lon" : 0,
	
	"RecentAddress" : "",
	"RecentName" : "",
	
	"CELSIUS" : 0,
	"FAHRENHEIT" : 1,
	"TempUnit" : 1,
	
	"SMALL" : 0,
	"LARGE" : 1,
	"FontSize" : 0,
	
	"IMPERIAL" : 0,
	"METRIC" : 1,
	"DistanceUnit" : 0,
	
	"Subreddit" : "news",
	
	"HomeAddress" : "",
	"WorkAddress" : "",
	
	"IftttKey" : "",
	"IftttPlus" : false,
	
	"WuKey" : "",
	
	"WolframKey" : "",
	
	"TravelKey" : "",
	
	"HabitsKey" : ""
};

module.exports = {
	getConfig : function(){
		return Settings;
	},
	setConfig : function(newConfig){
		for(var i in newConfig){
			Settings[i] = newConfig[i];
		}
	},
	getLang : function(){
		return Settings.Lang;
	},
	setLang : function(newLang){
		Settings.Lang = newLang;
	},
	getCoords : function(){
		return { "Lat" : Settings.Lat, "Lon" : Settings.Lon };
	},
	setCoords : function(newLat, newLon){
		Settings.Lat = newLat;
		Settings.Lon = newLon;
	},
	getRecent : function(){
		return { "Address" : Settings.RecentAddress, "Name" : Settings.RecentName };
	},
	setRecent : function(addr, name){
		Settings.RecentAddress = addr;
		Settings.RecentName = name;
	}
};