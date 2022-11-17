module.exports = {
	sendMessage : function(dict){
		dict.Message = '#';
		Pebble.sendAppMessage(dict);
	},
	sendErrorMessage : function(dict){
		dict.Message = "#";
		dict.Error = "#";
		Pebble.sendAppMessage(dict);
	},
	sendSettings : function(dict){
		dict.Settings = '#';
		Pebble.sendAppMessage(dict);
	},
	sendRequest : function(dict){
		dict.Request = '#';
		Pebble.sendAppMessage(dict);
	}
};