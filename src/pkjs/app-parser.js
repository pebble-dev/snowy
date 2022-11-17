var App = require('./app');
var Config = require('./app-settings');
var _ = require('./app-localize')._;
var Convert = require('./app-conversion');

var MONTH = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November", 
	"December"
];

var WEEK = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

Date.prototype.toGCalString = function(){
	var base = this.toLocaleString();
	return base.substring(0, base.lastIndexOf(':'));
};

function preParse(intel, index, query, original){
	var nonKeywords = query;
	
	var keyLen = intel[index].keywords.length;
	
	for(var x = 0; x < keyLen; x++){
		nonKeywords = nonKeywords.replace(intel[index].keywords[x].string, ' ');
	}
	
	nonKeywords = nonKeywords.split(' ');
	
	var nonKeyLen = nonKeywords.length;
	
	for(var n = 0; n < nonKeyLen; n++){
		while(nonKeywords[n] === "") nonKeywords.splice(n,1);
	}
	
	return {
		raw : query,
		array : nonKeywords,
		original : original
	};
}

function ampmCheck(time, day, hour, date){
	var check = { hour : hour, date : date };
	
	if(time.indexOf('pm') !== -1){ //Explicit PM
		if(day === null){ //Same Day
			if(check.hour !== 12) check.hour += 12;
			if(check.hour < check.date.getHours()) check.date.setDate(check.date.getDate()+1);
		}
		else{ //Different Day
			if(check.hour !== 12) check.hour += 12;
		}
	}
	else if(time.indexOf('am') !== -1){ //Explicit AM
		if(day === null){ //Same Day
			if(check.hour === 12) check.hour = 0;
			if(check.hour < check.date.getHours()) check.date.setDate(check.date.getDate()+1);
		}
		else{ //Different Day
			if(check.hour === 12) check.hour = 0;
		}
	}
	else{ //No AM or PM
		if(day === null){ //Same Day
			if(check.hour < 8) check.hour += 12;
			if(check.hour < check.date.getHours()) check.date.setDate(check.date.getDate()+1);
		}
		else{ //Different Day
			if(check.hour < 8) check.hour += 12;
		}
	}
	
	return check;
}

module.exports = {
	check : function(intel, query, original){
		if(original === undefined) original = query;
		
		for(var c = 0; c < intel.length; c++){
			var command = intel[c];
		
			var keyLen = command.keywords.length;
			
			for(var k = 0; k < keyLen; k++){
				if(query.indexOf(command.keywords[k].string) !== -1) command.score += command.keywords[k].value;
			}
		}
		
		console.log("Query: " + query);
		
		var winner = -1, winningScore = 0;
	
		for(var w = 0; w < intel.length; w++){
			var score = intel[w].score;
	
			if(score > winningScore){
				winner = w;
				winningScore = score;
			}
		}
	
		for(var s = 0; s < intel.length; s++) intel[s].score = 0;

		if(winner !== -1){
			console.log("Snowy Response: " + intel[winner].name);
			intel[winner].callback(preParse(intel, winner, query, original));
		}
		else{
			console.log("Snowy Response: NO RESPONSE");
			
			var error = {};
			error.title = _("Sorry...");
			error.body = _("I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information.");
			console.log("PreError");
			App.sendErrorMessage(error);
			console.log("Post Send Error");
		}
	},
	checkNames : function(processed, original){
		original = original.split(' ');
		processed = processed.split(' ');
		
		var orCount = original.length;
		var proCount = processed.length;
		
		for(var o = 0; o < orCount; o++){
			for(var p = 0; p < proCount; p++){
				if(original[o].toLowerCase() === processed[p] && original[o] !== processed[p]){
					processed[p] = original[o];
				}
			}
		}
	
		return processed.join(' ');
	},
	createGCalString : function(start, end){
		return "from " + start.toLocaleTimeString().replace(':00', '') + " to " + end.toLocaleTimeString().replace(':00', '') + " on " + end.toLocaleDateString();
	},
	parseTime2 : function(q){
		var on_day, on_date, on_month, at_hour, at_minute, for_hours, for_minutes, from_hour, from_minute, to_hour, to_minute, in_weeks = 0, in_days = 0, in_hours = 0, in_minutes = 0;
	
		var month_num, date_num, day_num;
	
		var start = new Date();
		var end = new Date();
	
	//if(q.array[0] === "to"){ //Action goes first
		var array = q.array.join(' ')
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
			.replace(/\bhalf an hour\b/g, '30 minutes')
			.replace(/\ban hour\b/g, '1 hour')
			.replace(/\ba half hour\b/g, '30 minutes');

		if(array.indexOf('tomorrow') !== -1){
			array = array.split(' ').filter(function(e){ return e !== 'tomorrow'; } ).join(' ');
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			start.setHours(0);
			start.setMinutes(0);
			end.setTime(start.getTime());
		}

		var on = array.match(/\bon\b.*?\b(at|for|from|$)\b/g);
		if(on !== null){
			
			on = on[0].replace(/\s\b(at|for|from)\b/g, '');
			on = on.replace(/\b(\d+)(?:st|nd|rd|th)\b/g, '$1');
			
			on_day = on.match(/\b(mon|tues|wednes|thurs|fri|satur|sun)day\b/g);
			on_month = on.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/g);
			on_date = on.match(/\d+/g);
			
			if(on_month !== null){
				for(var m = 0; m < MONTH.length; m++){
					if(on_month.indexOf(MONTH[m].toLowerCase()) !== -1) month_num = m;
				}
				if(on_date !== null) date_num = on_date[0]*1;
				else date_num = 1;
				
				start.setMonth(month_num);
				start.setDate(date_num);
				
				end.setMonth(month_num);
				end.setDate(date_num);
			}
			else if(on_date !== null){
				date_num = on_date[0]*1;
				
				if(start.getDate() > date_num){
					start.setMonth(start.getMonth()+1);
					end.setMonth(end.getMonth()+1);
				}
				
				start.setDate(date_num);
				end.setDate(date_num);
			}
			else if(on_day !== null){
				for(var w = 0; w < WEEK.length; w++){
					if(on_day.indexOf(WEEK[w].toLowerCase()) !== -1) day_num = w;
				}
				
				start.setDate(start.getDate() + (7 + day_num - start.getDay()) % 7);
				end.setDate(end.getDate() + (7 + day_num - end.getDay()) % 7);
			}
		}
		
		var in_ = array.match(/\bin\b.*?\b(from|for|at|$)\b/g);
		if(in_ !== null){
			in_ = in_[0];
			
			if(in_.indexOf("week") !== -1){
				in_weeks = in_.match(/\d+\s(week)/g, '$1');
				if(in_weeks !== null) in_weeks = in_weeks[0].substring(0,in_weeks[0].indexOf(' week'))*1;
			}
			if(in_.indexOf("day") !== -1){
				in_days = in_.match(/\d+\s(day)/g, '$1');
				if(in_days !== null) in_days = in_days[0].substring(0,in_days[0].indexOf(' day'))*1;
			}
			if(in_.indexOf("hour") !== -1){
				in_hours = in_.match(/\d+\s(hour)/g, '$1');
				if(in_hours !== null) in_hours = in_hours[0].substring(0,in_hours[0].indexOf(' hour'))*1;
			}
			if(in_.indexOf("minute") !== -1){
				in_minutes = in_.match(/\d+\s(minute)/g, '$1');
				if(in_minutes !== null) in_minutes = in_minutes[0].substring(0,in_minutes[0].indexOf(' minute'))*1;
			}
			start.setTime(start.getTime() + in_weeks * 7 * 24 * 60 * 60 * 1000 + in_days * 24 * 60 * 60 * 1000 + in_hours * 60 * 60 * 1000 + in_minutes * 60 * 1000);
			on = '';
		}
		
		var at = array.match(/\bat\b.*?\b(on|for|from|$)\b/g);
		if(at !== null){
			at = at[0].replace(/\s\b(on|for|from)\b/g, '');
			
			if(at.indexOf(':') !== -1){ //Hour + Minute
				at_hour = at.match(/\d+:/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0].replace(/:/g,'')*1;
				else at_hour = start.getHour() + 1;
				
				at_minute = at.match(/:\d+/g, '$1');
				
				if(at_minute !== null) at_minute =at_minute[0].replace(/:/g,'')*1;
				else at_minute = 0;
				
				var at_check_h_m = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h_m.hour;
				start = at_check_h_m.date;
			}
			else if(at.match(/\b(noon|midnight)\b/g) !== null){
				if(at.indexOf('noon') !== -1) at_hour = 12;
				else at_hour = 0;
				
				at_minute = 0;
			}
			else{ //Hour
				at_hour = at.match(/\d+/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0]*1;
				else at_hour = start.getHours()+1;
				
				var at_check_h = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h.hour;
				start = at_check_h.date;		
				
				at_minute = 0;
			}
			
			start.setHours(at_hour);
			start.setMinutes(at_minute);
		}
		
		var for_ = array.match(/\bfor\b.*?\b(on|at|$)\b/g);
		if(for_ !== null){
			for_ = for_[0].replace(/\s\b(on|at)\b/g, '');
			
			for_hours = for_.match(/\d+\s(hour)/g, '$1');
			
			if(for_hours !== null) end.setTime(start.getTime() + for_hours[0].substring(0, for_hours[0].indexOf(' hour')) * 60 * 60 * 1000);
			
			for_minutes = for_.match(/\d+\s(minute)/g, '$1');
			
			if(for_minutes !== null) end.setTime( (for_hours !== null ? end.getTime() : start.getTime()) + for_minutes[0].substring(0, for_minutes[0].indexOf(' minute')) * 60 * 1000);
			
			if(for_hours === null && for_minutes === null) end.setTime(start.getTime() + 60 * 60 * 1000);
		}
		
		var from = array.match(/\bfrom\b.*?\b(on|at|for|$)\b/g);
		if(from !== null){
			from = from[0].replace(/\s\b(on|at|for)\b/g, '');
			console.log("From: " + from);
			var to = '';
			
			if(from.indexOf('to') !== -1){
				to = from.substring(from.indexOf('to'));
				from = from.substring(0, from.indexOf('to'));	
			}
			
			if(from.indexOf(':') !== -1){ //Hour + Minute
				from_hour = from.match(/\d+:/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0].replace(/:/g,'')*1;
				else from_hour = start.getHour() + 1;
				
				from_minute = from.match(/:\d+/g, '$1');
				
				if(from_minute !== null) from_minute = from_minute[0].replace(/:/g,'')*1;
				else from_minute = 0;
				
				var from_check_h_m = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h_m.hour;
				start = from_check_h_m.date;
			}
			else if(from.match(/\b(noon|midnight)\b/g) !== null){
				if(from.indexOf('noon') !== -1) from_hour = 12;
				else from_hour = 0;
				
				from_minute = 0;
			}
			else{ //Hour
				from_hour = from.match(/\d+/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0]*1;
				else from_hour = start.getHours()+1;
				
				var from_check_h = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h.hour;
				start = from_check_h.date;
				
				from_minute = 0;
			}
			
			start.setHours(from_hour);
			start.setMinutes(from_minute);
			
			if(to !== ''){
				
				if(to.indexOf(':') !== -1){ //Hour + Minute
					to_hour = to.match(/\d+:/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0].replace(/:/g,'')*1;
					else to_hour = start.getHour() + 1;
					
					to_minute = to.match(/:\d+/g, '$1');
					
					if(to_minute !== null) to_minute = to_minute[0].replace(/:/g,'')*1;
					else to_minute = 0;
					
					var to_check_h_m = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h_m.hour;
					end = to_check_h_m.date;
				}
				else if(to.match(/\b(noon|midnight)\b/g) !== null){
					if(to.indexOf('noon') !== -1) to_hour = 12;
					else to_hour = 0;
					
					to_minute = 0;
				}
				else{ //Hour
					to_hour = to.match(/\d+/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0]*1;
					else to_hour = start.getHours()+1;
					
					var to_check_h = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h.hour;
					end = to_check_h.date;
					
					to_minute = 0;
				}
				
				end.setHours(to_hour);
				end.setMinutes(to_minute);
			}
			else{
				end.setTime(start.getTime() + 60 * 60 * 1000);
			}
		}
		
		if(end.getTime() < start.getTime()) end.setTime(start.getTime() + 60 * 60 * 1000);
		
		start.setSeconds(0);
		end.setSeconds(0);
		
		if(start.getTime() < Date.now()){
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return { raw : q, start : start, end : end };
	},
	parseTime2ES : function(q){
		var on_day, on_date, on_month, at_hour, at_minute, for_hours, for_minutes, from_hour, from_minute, to_hour, to_minute, in_weeks = 0, in_days = 0, in_hours = 0, in_minutes = 0;
		
		var month_num, date_num, day_num;
		
		var start = new Date();
		var end = new Date();
		
		var array = q.array.join(' ')
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
		
		if(array.indexOf('mañana') !== -1){
			array = array.split(' ').filter(function(e){ return e !== 'mañana'; } ).join(' ');
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			start.setHours(0);
			start.setMinutes(0);
			end.setTime(start.getTime());
		}
		
		var on = array.match(/\bel\b.*?\b(a las|durante|de \d+|$)\b/g);
		if(on !== null){
			on = on[0].replace(/\s\b(a las|durante|de \d+)\b/g, '');
			
			on_day = on.match(/\b(lunes|martes|miércoles|jueves|viernes|sábado|domingo)\b/g);	
			on_month = on.match(/\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/g);
			on_date = on.match(/\d+/g);
					
			if(on_month !== null){
				for(var m = 0; m < MONTH.length; m++){
					if(on_month.indexOf(_(MONTH[m]).toLowerCase()) !== -1) month_num = m;
				}
				if(on_date !== null) date_num = on_date[0]*1;
				else date_num = 1;
				
				start.setMonth(month_num);
				start.setDate(date_num);
				
				end.setMonth(month_num);
				end.setDate(date_num);
			}
			else if(on_date !== null){
				date_num = on_date[0]*1;
				
				if(start.getDate() > date_num){
					start.setMonth(start.getMonth()+1);
					end.setMonth(end.getMonth()+1);
				}
				
				start.setDate(date_num);
				end.setDate(date_num);
			}
			else if(on_day !== null){
				for(var w = 0; w < WEEK.length; w++){
					if(on_day.indexOf(_(WEEK[w]).toLowerCase()) !== -1) day_num = w;
				}
				
				start.setDate(start.getDate() + (7 + day_num - start.getDay()) % 7);
				end.setDate(end.getDate() + (7 + day_num - end.getDay()) % 7);
			}
		}
		
		var in_ = array.match(/\ben.*?\b(durante|$)\b/g);
		if(in_ !== null){
			in_ = in_[0];
			
			console.log("In: " + in_);
			
			if(in_.indexOf("semana") !== -1){
				in_weeks = in_.match(/\d+\s(semana)/g, '$1');
				if(in_weeks !== null) in_weeks = in_weeks[0].substring(0,in_weeks[0].indexOf(' semana'))*1;
			}
			if(in_.indexOf("día") !== -1){
				in_days = in_.match(/\d+\s(día)/g, '$1');
				if(in_days !== null) in_days = in_days[0].substring(0, in_days[0].indexOf(' días'))*1;
			}
			if(in_.indexOf("hora") !== -1){
				in_hours = in_.match(/\d+\s(hora)/g, '$1');
				if(in_hours !== null) in_hours = in_hours[0].substring(0, in_hours[0].indexOf(' hora'))*1;
			}
			if(in_.indexOf("minuto") !== -1){
				in_minutes = in_.match(/\d+\s(minuto)/g, '$1');
				if(in_minutes !== null) in_minutes = in_minutes[0].substring(0, in_minutes[0].indexOf(' minuto'))*1;
			}
			start.setTime(start.getTime() + in_weeks * 7 * 24 * 60 * 60 * 1000 + in_days * 24 * 60 * 60 * 1000 + in_hours * 60 * 60 * 1000 + in_minutes * 60 * 1000);
			on = '';	
		}
		
		var at = array.match(/\ba las\b.*?\b(el|de \d+|durante|$)\b/g);
		if(at !== null){		
			at = at[0].replace(/\s\b(el|de \d+|durante)\b/g, '');
			
			console.log("At: " + at);
			
			if(at.indexOf(':') !== -1){
				at_hour = at.match(/\d+:/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0].replace(/:/g, '')*1;
				else at_hour = start.getHour() + 1;
				
				at_minute = at.match(/:\d+/g, '$1');
					
				if(at_minute !== null) at_minute = at_minute[0].replace(/:/g, '')*1;
				else at_minute = 0;
				
				var at_check_h_m = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h_m.hour;
				start = at_check_h_m.date;
			}
			else if(at.match(/\b(mediodía|medianoche)\b/g) !== null){
				if(at.indexOf('mediodía') !== -1) at_hour = 12;
				else at_hour = 0;
				
				at_minute = 0;
			}
			else{
				at_hour = at.match(/\d+/g, '$1');
													
				if(at_hour !== null) at_hour = at_hour[0]*1;
				else at_hour = start.getHours()+1;
				
				var at_check_h = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h.hour;
				start = at_check_h.date;
				
				at_minute = 0;
			}
			
			start.setHours(at_hour);
			start.setMinutes(at_minute);
		}
		
		var for_ = array.match(/\bdurante\b.*?\b(el|a las|de \d+|$)\b/g);
		if(for_ !== null){
			for_ = for_[0].replace(/\s\b(el|a las|de \d+)\b/g, '');
			
			for_hours = for_.match(/\d+\s(hora)/g, '$1');
			
			if(for_hours !== null) end.setTime(start.getTime() + for_hours[0].substring(0, for_hours[0].indexOf(' hora')) * 60 * 60 * 1000);
			
			for_minutes = for_.match(/\d+\s(minuto)/g, '$1');
			
			if(for_minutes !== null) end.setTime( (for_hours !== null ? end.getTime() : start.getTime()) + for_minutes[0].substring(0, for_minutes[0].indexOf(' minuto')) * 60 * 1000);
			
			if(for_hours === null && for_minutes === null) end.setTime(start.getTime() + 60 * 60 * 1000);
		}
		
		var from = array.match(/\bde\b.*?\b(a las|el|durante|$)\b/g);
		if(from !== null){
			from = from[0].replace(/\s\b(a las|el|durante)/g, '');
			
			var to = '';
			
			if(from.indexOf(' a ') !== -1){
				to = from.substring(from.indexOf(' a ')+1);
				from = from.substring(0, from.indexOf(' a '));
			}
			
			if(from.indexOf(':') !== -1){
				from_hour = from.match(/\d+:/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0].replace(/:/g, '')*1;
				else from_hour = start.getHour() + 1;
				
				from_minute = from.match(/:\d+/g, '$1');
				
				if(from_minute !== null) from_minute = from_minute[0].replace(/:/g, '')*1;
				else from_minute = 0;
				
				var from_check_h_m = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h_m.hour;
				start = from_check_h_m.date;
			}
			else if(from.match(/\b(mediodía|medianoche)\b/g) !== null){
				if(from.indexOf('mediodía') !== -1) from_hour = 12;
				else from_hour = 0;
				
				from_minute = 0;
			}
			else{
				from_hour = from.match(/\d+/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0]*1;
				else from_hour = start.getHours() + 1;
				
				var from_check_h = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h.hour;
				start = from_check_h.date;
				
				from_minute = 0;
			}
			
			start.setHours(from_hour);
			start.setMinutes(from_minute);
			
			if(to !== ''){
				
				if(to.indexOf(':') !== -1){
					to_hour = to.match(/\d+:/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0].replace(/:/g, '')*1;
					else to_hour = start.getHour() + 1;
					
					to_minute = to.match(/:\d+/g, '$1');
					
					if(to_minute !== null) to_minute = to_minute[0].replace(/:/g, '')*1;
					else to_minute = 0;
					
					var to_check_h_m = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h_m.hour;
					end = to_check_h_m.date;
				}
				else if(to.match(/\b(mediodía|medianoche)\b/g) !== null){
					if(to.indexOf('mediodía') !== -1) to_hour = 12;
					else to_hour = 0;
					
					to_minute = 0;
				}
				else{
					to_hour = to.match(/\d+/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0]*1;
					else to_hour = start.getHours() +1;
					
					var to_check_h = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h.hour;
					end = to_check_h.date;
					
					to_minute = 0;
				}
				
				end.setHours(to_hour);
				end.setMinutes(to_minute);
			}
			else{
				end.setTime(start.getTime() + 60 * 60 * 1000);
			}
		}
		
		if(end.getTime() < start.getTime()) end.setTime(start.getTime() + 60 * 60 * 1000);
		
		start.setSeconds(0);
		end.setSeconds(0);
		
		if(start.getTime() < Date.now()){
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return { raw : q, start : start, end : end };
	},
	parseTime2FR : function(q){
		var on_day, on_date, on_month, at_hour, at_minute, for_hours, for_minutes, from_hour, from_minute, to_hour, to_minute, in_weeks = 0, in_days = 0, in_hours = 0, in_minutes = 0;
	
		var month_num, date_num, day_num;
	
		var start = new Date();
		var end = new Date();
		
		var array = q.array.join(' ')
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
			.replace(/\bdemi-heure\b/g, '30 minutes')
			.replace(/\bpour demain\b/g, 'demain');
		
		//Replace 10h with 10
		var h_match = array.match(/\d+h/g);
		if(h_match !== null){
			h_match = h_match[0].replace(/h/g, '');
			array = array.replace(/\d+h/g, h_match);
		}
		
		if(array.indexOf('demain') !== -1){
			array = array.split(' ').filter(function(e){ return e !== 'demain'; } ).join(' ');
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			start.setHours(0);
			start.setMinutes(0);
			end.setTime(start.getTime());
		}
	
		var on = array.match(/\ble\b.*?\b(à|dans|de|por|$)\b/g);
		if(on !== null){
			on = on[0].replace(/\s\b(à|dans|de|por)\b/g, '');
			
			on_day = on.match(/\b(luni|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/g);
			on_month = on.match(/\b(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\b/g);
			on_date = on.match(/\d+/g);
			
			if(on_month !== null){
				for(var m = 0; m < MONTH.length; m++){
					if(on_month.indexOf(_(MONTH[m]).toLowerCase()) !== -1) month_num = m;
				}
				if(on_date !== null) date_num = on_date[0]*1;
				else date_num = 1;
				
				start.setMonth(month_num);
				start.setDate(date_num);
				
				end.setMonth(month_num);
				end.setDate(date_num);
			}	
			else if(on_date !== null){
				date_num = on_date[0]*1;
				
				if(start.getDate() > date_num){
					start.setMonth(start.getMonth()+1);
					end.setMonth(end.getMonth()+1);
				}
				
				start.setDate(date_num);
				end.setDate(date_num);
			}
			else if(on_day !== null){
				for(var w = 0; w < WEEK.length; w++){
					if(on_day.indexOf(_(WEEK[w]).toLowerCase()) !== -1) day_num = w;
				}
				
				start.setDate(start.getDate() + (7 + day_num - start.getDay()) % 7);
				end.setDate(end.getDate() + (7 + day_num - end.getDay()) % 7);
			}
		}
		
		var in_ = array.match(/\bdans.*?\b(pour|à|$)\b/g);
		if(in_ !== null){
			in_ = in_[0];
			
			if(in_.indexOf("semine") !== -1){
				in_weeks = in_.match(/\d+\s(semaine)/g, '$1');
				if(in_weeks !== null) in_weeks = in_weeks[0].substring(0,in_weeks[0].indexOf(' semine'))*1;
			}
			if(in_.indexOf("journée") !== -1){
				in_days = in_.match(/\d+\s(journée)/g, '$1');
				if(in_days !== null) in_days = in_days[0].substring(0, in_days[0].indexOf(' journée'))*1;
			}
			if(in_.indexOf("heure") !== -1){
				in_hours = in_.match(/\d+\s(heure)/g, '$1');
				if(in_hours !== null) in_hours = in_hours[0].substring(0, in_hours[0].indexOf(' heure'))*1;
			}
			if(in_.indexOf("minute") !== -1){
				in_minutes = in_.match(/\d+\s(minute)/g, '$1');
				if(in_minutes !== null) in_minutes = in_minutes[0].substring(0, in_minutes[0].indexOf(' minute'))*1;
			}
			start.setTime(start.getTime() + in_weeks * 7 * 24 * 60 * 60 * 1000 + in_days * 24 * 60 * 60 * 1000 + in_hours * 60 * 60 * 1000 + in_minutes * 60 * 1000);
			on = '';	
		}
		
		var at = array.match(/à\s.*?\b(dans|le|pour|$)\b/g);
		if(at !== null){
			at = at[0].replace(/\s\b(dans|le|pour)\b/g, '');
			
			if(at.indexOf(':') !== -1){
				at_hour = at.match(/\d+:/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0].replace(/:/g, '')*1;
				else at_hour = start.getHour() + 1;
				
				at_minute = at.match(/:\d+/g, '$1');
				
				if(at_minute !== null) at_minute = at_minute[0].replace(/:/g, '')*1;
				else at_minute = 0;
				
				var at_check_h_m = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h_m.hour;
				start = at_check_h_m.date;
			}
			else if(at.match(/\b(minuit|le midi)\b/g) !== null){
				if(at.indexOf('le midi') !== -1) at_hour = 12;
				else at_hour = 0;
				
				at_minute = 0;
			}
			else{
				at_hour = at.match(/\d+/g, '$1');
												
				if(at_hour !== null) at_hour = at_hour[0]*1;
				else at_hour = start.getHours()+1;
				
				var at_check_h = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h.hour;
				start = at_check_h.date;
				
				at_minute = 0;
			}
			
			start.setHours(at_hour);
			start.setMinutes(at_minute);
		}
	
		var for_ = array.match(/\bpour\b.*?\b(le|dans|à|$)\b/g);
		if(for_ !== null){
			for_ = for_[0].replace(/\s\b(le|dans|à)\b/g, '');
			
			for_hours = for_.match(/\d+\s(heure)/g, '$1');
			
			if(for_hours !== null) end.setTime(start.getTime() + for_hours[0].substring(0, for_hours[0].indexOf(' hora')) * 60 * 60 * 1000);
			
			for_minutes = for_.match(/\d+\s(minute)/g, '$1');
			
			if(for_minutes !== null) end.setTime( (for_hours !== null ? end.getTime() : start.getTime()) + for_minutes[0].substring(0, for_minutes[0].indexOf(' minuto')) * 60 * 1000);
			
			if(for_hours === null && for_minutes === null) end.setTime(start.getTime() + 60 * 60 * 1000);
		}
		
		var from = array.match(/\bde\b.*?\b(à|dans|le|$)\b/g);
		if(from !== null){
			from = from[0].replace(/\s\b(à|dans|le)/g, '');
			
			var to = '';
			
			if(from.indexOf(' à ') !== -1){
				to = from.substring(from.indexOf(' à ')+1);
				from = from.substring(0, from.indexOf(' à '));
			}
			
			if(from.indexOf(':') !== -1){
				from_hour = from.match(/\d+:/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0].replace(/:/g, '')*1;
				else from_hour = start.getHour() + 1;
				
				from_minute = from.match(/:\d+/g, '$1');
				
				if(from_minute !== null) from_minute = from_minute[0].replace(/:/g, '')*1;
				else from_minute = 0;
				
				var from_check_h_m = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h_m.hour;
				start = from_check_h_m.date;
			}
			else if(from.match(/\b(minuit|le midi)\b/g) !== null){
				if(from.indexOf('le midi') !== -1) from_hour = 12;
				else from_hour = 0;
				
				from_minute = 0;
			}
			else{
				from_hour = from.match(/\d+/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0]*1;
				else from_hour = start.getHours() + 1;
				
				var from_check_h = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h.hour;
				start = from_check_h.date;
				
				from_minute = 0;
			}
			
			start.setHours(from_hour);
			start.setMinutes(from_minute);
			
			if(to !== ''){
				
				if(to.indexOf(':') !== -1){
					to_hour = to.match(/\d+:/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0].replace(/:/g, '')*1;
					else to_hour = start.getHour() + 1;
					
					to_minute = to.match(/:\d+/g, '$1');
					
					if(to_minute !== null) to_minute = to_minute[0].replace(/:/g, '')*1;
					else to_minute = 0;
					
					var to_check_h_m = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h_m.hour;
					end = to_check_h_m.date;
				}
				else if(to.match(/\b(minuit|le midi)\b/g) !== null){
					if(to.indexOf('le midi') !== -1) to_hour = 12;
					else to_hour = 0;
					
					to_minute = 0;
				}
				else{
					to_hour = to.match(/\d+/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0]*1;
					else to_hour = start.getHours() +1;
					
					var to_check_h = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h.hour;
					end = to_check_h.date;
					
					to_minute = 0;
				}
				
				end.setHours(to_hour);
				end.setMinutes(to_minute);
			}
			else{
				end.setTime(start.getTime() + 60 * 60 * 1000);
			}
		}
		
		if(end.getTime() < start.getTime()) end.setTime(start.getTime() + 60 * 60 * 1000);
		
		start.setSeconds(0);
		end.setSeconds(0);
		
		if(start.getTime() < Date.now()){
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return { raw : q, start : start, end : end };
	},
	parseTime2DE : function(q){
		var on_day, on_date, on_month, at_hour, at_minute, for_hours, for_minutes, from_hour, from_minute, to_hour, to_minute, in_weeks = 0, in_days = 0, in_hours = 0, in_minutes = 0;
	
		var month_num, date_num, day_num;
	
		var start = new Date();
		var end = new Date();
		
		var array = q.array.join(' ')
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
	
		if(array.indexOf('morgen') !== -1){
			array = array.split(' ').filter(function(e){ return e !== 'morgen'; } ).join(' ');
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			start.setHours(0);
			start.setMinutes(0);
			end.setTime(start.getTime());
		}

		var on = array.match(/\bam\b.*?\b(um|in|für|von|$)\b/g);
		if(on !== null){
			on = on[0].replace(/\s\b(um|in|für|von)\b/g, '');
		
			on_day = on.match(/\b(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)\b/g);
			on_month = on.match(/\b(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)\b/g);
			on_date = on.match(/\d+/g);
		
			if(on_month !== null){
				for(var m = 0; m < MONTH.length; m++){
					if(on_month.indexOf(_(MONTH[m]).toLowerCase()) !== -1) month_num = m;
				}
				if(on_date !== null) date_num = on_date[0]*1;
				else date_num = 1;
			
				start.setMonth(month_num);
				start.setDate(date_num);
				
				end.setMonth(month_num);
				end.setDate(date_num);
			}
			else if(on_date !== null){
				date_num = on_date[0]*1;
				
				if(start.getDate() > date_num){
					start.setMonth(start.getMonth()+1);
					end.setMonth(end.getMonth()+1);
				}
			
				start.setDate(date_num);
				end.setDate(date_num);
			}
			else if(on_day !== null){
				for(var w = 0; w < WEEK.length; w++){
					if(on_day.indexOf(_(WEEK[w]).toLowerCase()) !== -1) day_num = w;
				}
			
				start.setDate(start.getDate() + (7 + day_num - start.getDay()) % 7);
				end.setDate(end.getDate() + (7 + day_num - end.getDay()) % 7);
			}
		}
	
		var in_ = array.match(/\bin.*?\b(um|am|von|für|$)\b/g);
		if(in_ !== null){
			in_ = in_[0];
		
			if(in_.indexOf("woche") !== -1){
				in_weeks = in_.match(/\d+\s(woche)/g, '$1');
				if(in_weeks !== null) in_weeks = in_weeks[0].substring(0,in_weeks[0].indexOf(' woche'))*1;
			}
			if(in_.indexOf("tag" !== -1)){
				in_days = in_.match(/\d+\s(tag)/g, '$1');
				if(in_days !== null) in_days = in_days[0].substring(0, in_days[0].indexOf(' tag'))*1;
			}
			if(in_.indexOf("stunde") !== -1){
				in_hours = in_.match(/\d+\s(stunde)/g, '$1');
				if(in_hours !== null) in_hours = in_hours[0].substring(0, in_hours[0].indexOf(' stunde'))*1;
			}
			if(in_.indexOf("minute") !== -1){
				in_minutes = in_.match(/\d+\s(minute)/g, '$1');
				if(in_minutes !== null) in_minutes = in_minutes[0].substring(0, in_minutes[0].indexOf(' minute'))*1;
			}
			start.setTime(start.getTime() + in_weeks * 7 * 24 * 60 * 60 * 1000 + in_days * 24 * 60 * 60 * 1000 + in_hours * 60 * 60 * 1000 + in_minutes * 60 * 1000);
			on = '';	
		}
		
		var at = array.match(/\bum\b.*?\b(in|am|für|von|$)\b/g);
		if(at !== null){
			at = at[0].replace(/\s\b(in|am|für|von)\b/g, '');
			
			if(at.indexOf(':') !== -1){
				at_hour = at.match(/\d+:/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0].replace(/:/g, '')*1;
				else at_hour = start.getHour() + 1;
				
				at_minute = at.match(/:\d+/g, '$1');
				
				if(at_minute !== null) at_minute = at_minute[0].replace(/:/g, '')*1;
				else at_minute = 0;
				
				var at_check_h_m = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h_m.hour;
				start = at_check_h_m.date;
			}
			else if(at.match(/\b(mittag|mitternacht)\b/g) !== null){
				if(at.indexOf('mittag') !== -1) at_hour = 12;
				else at_hour = 0;
				
				at_minute = 0;
			}
			else{
				at_hour = at.match(/\d+/g, '$1');
													
				if(at_hour !== null) at_hour = at_hour[0]*1;
				else at_hour = start.getHours()+1;
				
				var at_check_h = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h.hour;
				start = at_check_h.date;
				
				at_minute = 0;
			}
			
			start.setHours(at_hour);
			start.setMinutes(at_minute);
		}
		
		var for_ = array.match(/\bfür\b.*?\b(um|in|am|von|$)\b/g);
		if(for_ !== null){
			for_ = for_[0].replace(/\s\b(um|in|am|von)\b/g, '');
		
			for_hours = for_.match(/\d+\s(stunde)/g, '$1');
			
			if(for_hours !== null) end.setTime(start.getTime() + for_hours[0].substring(0, for_hours[0].indexOf(' stunde')) * 60 * 60 * 1000);
			
			for_minutes = for_.match(/\d+\s(minute)/g, '$1');
				
			if(for_minutes !== null) end.setTime( (for_hours !== null ? end.getTime() : start.getTime()) + for_minutes[0].substring(0, for_minutes[0].indexOf(' minute')) * 60 * 1000);
				
				if(for_hours === null && for_minutes === null) end.setTime(start.getTime() + 60 * 60 * 1000);
			}
			
			var from = array.match(/\bvon\b.*?\b(um|in|am|für|$)\b/g);
			if(from !== null){
				from = from[0].replace(/\s\b(um|in|am|für)/g, '');
				
				var to = '';
				
				if(from.indexOf(' bis ') !== -1){
					to = from.substring(from.indexOf(' bis ')+1);
					from = from.substring(0, from.indexOf(' bis '));
				}
				
				if(from.indexOf(':') !== -1){
					from_hour = from.match(/\d+:/g, '$1');
					
					if(from_hour !== null) from_hour = from_hour[0].replace(/:/g, '')*1;
					else from_hour = start.getHour() + 1;
					
					from_minute = from.match(/:\d+/g, '$1');
					
					if(from_minute !== null) from_minute = from_minute[0].replace(/:/g, '')*1;
					else from_minute = 0;
					
					var from_check_h_m = ampmCheck(from+to, on, from_hour, start);
					from_hour = from_check_h_m.hour;
					start = from_check_h_m.date;
				}
				else if(from.match(/\b(mittag|mitternacht)\b/g) !== null){
					if(from.indexOf('mittag') !== -1) from_hour = 12;
					else from_hour = 0;
					
					from_minute = 0;
				}
				else{
					from_hour = from.match(/\d+/g, '$1');
					
					if(from_hour !== null) from_hour = from_hour[0]*1;
					else from_hour = start.getHours() + 1;
					
					var from_check_h = ampmCheck(from+to, on, from_hour, start);
					from_hour = from_check_h.hour;
					start = from_check_h.date;
					
					from_minute = 0;
				}
				
				start.setHours(from_hour);
				start.setMinutes(from_minute);
				
				if(to !== ''){
					
					if(to.indexOf(':') !== -1){
						to_hour = to.match(/\d+:/g, '$1');
						
						if(to_hour !== null) to_hour = to_hour[0].replace(/:/g, '')*1;
						else to_hour = start.getHour() + 1;
						
						to_minute = to.match(/:\d+/g, '$1');
						
						if(to_minute !== null) to_minute = to_minute[0].replace(/:/g, '')*1;
						else to_minute = 0;
						
						var to_check_h_m = ampmCheck(to+from, on, to_hour, end);
						to_hour = to_check_h_m.hour;
						end = to_check_h_m.date;
					}
					else if(to.match(/\b(mittag|mitternacht)\b/g) !== null){
						if(to.indexOf('mittag') !== -1) to_hour = 12;
						else to_hour = 0;
						
						to_minute = 0;
					}
					else{
						to_hour = to.match(/\d+/g, '$1');
						
						if(to_hour !== null) to_hour = to_hour[0]*1;
						else to_hour = start.getHours() +1;
						
						var to_check_h = ampmCheck(to+from, on, to_hour, end);
						to_hour = to_check_h.hour;
						end = to_check_h.date;
						
						to_minute = 0;
					}
					
					end.setHours(to_hour);
					end.setMinutes(to_minute);
				}
				else{
					end.setTime(start.getTime() + 60 * 60 * 1000);
				}
			}
			
			if(end.getTime() < start.getTime()) end.setTime(start.getTime() + 60 * 60 * 1000);
			
			start.setSeconds(0);
			end.setSeconds(0);
			
			if(start.getTime() < Date.now()){
				start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
				end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
			}
		
		return { raw : q, start : start, end : end };
	},
	parseTime2PT : function(q){
		var on_day, on_date, on_month, at_hour, at_minute, for_hours, for_minutes, from_hour, from_minute, to_hour, to_minute, in_weeks = 0, in_days = 0, in_hours = 0, in_minutes = 0;
	
		var month_num, date_num, day_num;
	
		var start = new Date();
		var end = new Date();
	
		var array = q.array.join(' ')
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
			
		if(array.indexOf('semanas') !== -1){
			array = array.split(' ').filter(function(e){ return e !== 'semanas'; } ).join(' ');
				start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
				start.setHours(0);
				start.setMinutes(0);
				end.setTime(start.getTime());
		}
		
		var on_in = array.match(/\bem\b.*?\b(das|por|$)\b/g);
		if(on_in !== null){
			on_in = on_in[0].replace(/\s\b(das|por)\b/g, '');
	
			on_day = on_in.match(/\b(domingo|segunda-feira|terça-feira|quarta-feira|quinta-feira|sexta-feira|sábado)\b/g);
			on_month = on_in.match(/\b(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/g);
			
			if(on_month !== null) on_date = on_in.match(/\d+/g);
			
			if(on_day !== null || on_month !== null){
				if(on_month !== null){
					for(var m = 0; m < MONTH.length; m++){
						if(on_month.indexOf(MONTH[m].toLowerCase()) !== -1) month_num = m;
					}
					if(on_date !== null) date_num = on_date[0]*1;
					else date_num = 1;
					
					start.setMonth(month_num);
					start.setDate(date_num);
					
					end.setMonth(month_num);
					end.setDate(date_num);
				}
				else if(on_date !== null){
					date_num = on_date[0]*1;
					
					if(start.getDate() > date_num){
						start.setMonth(start.getMonth()+1);
						end.setMonth(end.getMonth()+1);
					}
					
					start.setDate(date_num);
					end.setDate(date_num);
				}
			}
			else{
				if(on_in.indexOf("semana") !== -1){
					in_weeks = on_in.match(/\d+\s(semana)/g, '$1');
					if(in_weeks !== null) in_weeks = in_weeks[0].substring(0,in_weeks[0].indexOf(' semana'))*1;
				}
				if(on_in.indexOf("dia") !== -1){
					in_days = on_in.match(/\d+\s(dia)/g, '$1');
					if(in_days !== null) in_days = in_days[0].substring(0,in_days[0].indexOf(' dia'))*1;
				}
				if(on_in.indexOf("hora") !== -1){
					in_hours = on_in.match(/\d+\s(hora)/g, '$1');
					if(in_hours !== null) in_hours = in_hours[0].substring(0,in_hours[0].indexOf(' hora'))*1;
				}
				if(on_in.indexOf("minuto") !== -1){
					in_minutes = on_in.match(/\d+\s(minuto)/g, '$1');
					if(in_minutes !== null) in_minutes = in_minutes[0].substring(0,in_minutes[0].indexOf(' minuto'))*1;
				}
				start.setTime(start.getTime() + in_weeks * 7 * 24 * 60 * 60 * 1000 + in_days * 24 * 60 * 60 * 1000 + in_hours * 60 * 60 * 1000 + in_minutes * 60 * 1000);
			}
		}
		
		var at = array.match(/\bdas\b.*?\b(por|em|$)\b/g, '');
		if(at !== null){
			at = at[0].replace(/\s\b(por|em)\b/g, '');
			
			if(at.indexOf(':') !== -1){ //Hour + Minute
				at_hour = at.match(/\d+:/g, '$1');
					
				if(at_hour !== null) at_hour = at_hour[0].replace(/:/g,'')*1;
				else at_hour = start.getHour() + 1;
					
				at_minute = at.match(/:\d+/g, '$1');
					
				if(at_minute !== null) at_minute =at_minute[0].replace(/:/g,'')*1;
				else at_minute = 0;
					
				var at_check_h_m = ampmCheck(at, on_in, at_hour, start);
				at_hour = at_check_h_m.hour;
				start = at_check_h_m.date;
			}
			else if(at.match(/\b(meio-dia|meia-noite)\b/g) !== null){
				if(at.indexOf('meio-dia') !== -1) at_hour = 12;
				else at_hour = 0;
				
				at_minute = 0;
			}
			else{ //Hour
				at_hour = at.match(/\d+/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0]*1;
				else at_hour = start.getHours()+1;
				
				var at_check_h = ampmCheck(at, on_in, at_hour, start);
				at_hour = at_check_h.hour;
				start = at_check_h.date;		
				
				at_minute = 0;
			}
				
			start.setHours(at_hour);
			start.setMinutes(at_minute);
		}
		
		var for_ = array.match(/\bpor\b.*?\b(em|das|$)\b/g);
		if(for_ !== null){
			for_ = for_[0].replace(/\s\b(em|das)\b/g, '');
				
			for_hours = for_.match(/\d+\s(hora)/g, '$1');
			
			if(for_hours !== null) end.setTime(start.getTime() + for_hours[0].substring(0, for_hours[0].indexOf(' hora')) * 60 * 60 * 1000);
			
			for_minutes = for_.match(/\d+\s(minuto)/g, '$1');
			
			if(for_minutes !== null) end.setTime( (for_hours !== null ? end.getTime() : start.getTime()) + for_minutes[0].substring(0, for_minutes[0].indexOf(' minuto')) * 60 * 1000);
			
			if(for_hours === null && for_minutes === null) end.setTime(start.getTime() + 60 * 60 * 1000);
		}
		
		if(end.getTime() < start.getTime()) end.setTime(start.getTime() + 60 * 60 * 1000);
			
		start.setSeconds(0);
		end.setSeconds(0);
			
		if(start.getTime() < Date.now()){
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return { raw : q, start : start, end : end };
	},
	parseTime2DA : function(q){
		var on_day, on_date, on_month, at_hour, at_minute, for_hours, for_minutes, from_hour, from_minute, to_hour, to_minute, in_weeks = 0, in_days = 0, in_hours = 0, in_minutes = 0;
	
	var month_num, date_num, day_num;
	
	var start = new Date();
	var end = new Date();
	
	//if(q.array[0] === "to"){ //Action goes first
		var array = q.array.join(' ')
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
	
		if(array.indexOf('imorgen') !== -1){
			array = array.split(' ').filter(function(e){ return e !== 'tomorrow'; } ).join(' ');
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			start.setHours(0);
			start.setMinutes(0);
			end.setTime(start.getTime());
		}

		var on = array.match(/\bpå\b.*?\b(klokken|i|fra|$)\b/g);
		if(on !== null){
			
			on = on[0].replace(/\s\b(klokken|i|fra)\b/g, '');
			on = on.replace(/\b(\d+)(?:st|nd|rd|th)\b/g, '$1');
			
			on_day = on.match(/\b(man|tirs|ons|tors|fre|lør|søn)dag\b/g);
			on_month = on.match(/\b(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)\b/g);
			on_date = on.match(/\d+/g);
			
			if(on_month !== null){
				for(var m = 0; m < MONTH.length; m++){
					if(on_month.indexOf(MONTH[m].toLowerCase()) !== -1) month_num = m;
				}
				if(on_date !== null) date_num = on_date[0]*1;
				else date_num = 1;
				
				start.setMonth(month_num);
				start.setDate(date_num);
				
				end.setMonth(month_num);
				end.setDate(date_num);
			}
			else if(on_date !== null){
				date_num = on_date[0]*1;
				
				if(start.getDate() > date_num){
					start.setMonth(start.getMonth()+1);
					end.setMonth(end.getMonth()+1);
				}
				
				start.setDate(date_num);
				end.setDate(date_num);
			}
			else if(on_day !== null){
				for(var w = 0; w < WEEK.length; w++){
					if(on_day.indexOf(WEEK[w].toLowerCase()) !== -1) day_num = w;
				}
				
				start.setDate(start.getDate() + (7 + day_num - start.getDay()) % 7);
				end.setDate(end.getDate() + (7 + day_num - end.getDay()) % 7);
			}
		}
		
		var in_ = array.match(/\bi\b.*?\b(fra|klokken|$)\b/g);
		if(in_ !== null){
			in_ = in_[0];
			
			if(in_.indexOf("uge") !== -1){
				in_weeks = in_.match(/\d+\s(uge)/g, '$1');
				if(in_weeks !== null) in_weeks = in_weeks[0].substring(0,in_weeks[0].indexOf(' uge'))*1;
			}
			if(in_.indexOf("dage") !== -1){
				in_days = in_.match(/\d+\s(dage)/g, '$1');
				if(in_days !== null) in_days = in_days[0].substring(0,in_days[0].indexOf(' dage'))*1;
			}
			if(in_.indexOf("timer") !== -1){
				in_hours = in_.match(/\d+\s(timer)/g, '$1');
				if(in_hours !== null) in_hours = in_hours[0].substring(0,in_hours[0].indexOf(' timer'))*1;
			}
			if(in_.indexOf("minutter") !== -1){
				in_minutes = in_.match(/\d+\s(minutter)/g, '$1');
				if(in_minutes !== null) in_minutes = in_minutes[0].substring(0,in_minutes[0].indexOf(' minutter'))*1;
			}
			start.setTime(start.getTime() + in_weeks * 7 * 24 * 60 * 60 * 1000 + in_days * 24 * 60 * 60 * 1000 + in_hours * 60 * 60 * 1000 + in_minutes * 60 * 1000);
			on = '';
		}
		
		var at = array.match(/\bklokken\b.*?\b(fra|i|om|$)\b/g);
		if(at !== null){
			at = at[0].replace(/\s\b(fra|i|om)\b/g, '');
			
			if(at.indexOf(':') !== -1){ //Hour + Minute
				at_hour = at.match(/\d+:/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0].replace(/:/g,'')*1;
				else at_hour = start.getHour() + 1;
				
				at_minute = at.match(/:\d+/g, '$1');
				
				if(at_minute !== null) at_minute =at_minute[0].replace(/:/g,'')*1;
				else at_minute = 0;
				
				var at_check_h_m = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h_m.hour;
				start = at_check_h_m.date;
			}
			else if(at.match(/\bmid(dag|nat)\b/g) !== null){
				if(at.indexOf('middag') !== -1) at_hour = 12;
				else at_hour = 0;
				
				at_minute = 0;
			}
			else{ //Hour
				at_hour = at.match(/\d+/g, '$1');
				
				if(at_hour !== null) at_hour = at_hour[0]*1;
				else at_hour = start.getHours()+1;
				
				var at_check_h = ampmCheck(at, on, at_hour, start);
				at_hour = at_check_h.hour;
				start = at_check_h.date;		
				
				at_minute = 0;
			}
			
			start.setHours(at_hour);
			start.setMinutes(at_minute);
		}
		/*
		var for_ = array.match(/\b\b.*?\b(on|at|$)\b/g);
		if(for_ !== null){
			for_ = for_[0].replace(/\s\b(on|at)\b/g, '');
			
			for_hours = for_.match(/\d+\s(hour)/g, '$1');
			
			if(for_hours !== null) end.setTime(start.getTime() + for_hours[0].substring(0, for_hours[0].indexOf(' hour')) * 60 * 60 * 1000);
			
			for_minutes = for_.match(/\d+\s(minute)/g, '$1');
			
			if(for_minutes !== null) end.setTime( (for_hours !== null ? end.getTime() : start.getTime()) + for_minutes[0].substring(0, for_minutes[0].indexOf(' minute')) * 60 * 1000);
			
			if(for_hours === null && for_minutes === null) end.setTime(start.getTime() + 60 * 60 * 1000);
		}
		*/
		var from = array.match(/\bfra\b.*?\b(om|om-at|fra|klokken|$)\b/g);
		if(from !== null){
			from = from[0].replace(/\s\b(om|om-at|fra|klokken)\b/g, '');
			console.log("From: " + from);
			var to = '';
			
			if(from.indexOf('til') !== -1){
				to = from.substring(from.indexOf('til'));
				from = from.substring(0, from.indexOf('til'));	
			}
			
			if(from.indexOf(':') !== -1){ //Hour + Minute
				from_hour = from.match(/\d+:/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0].replace(/:/g,'')*1;
				else from_hour = start.getHour() + 1;
				
				from_minute = from.match(/:\d+/g, '$1');
				
				if(from_minute !== null) from_minute = from_minute[0].replace(/:/g,'')*1;
				else from_minute = 0;
				
				var from_check_h_m = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h_m.hour;
				start = from_check_h_m.date;
			}
			else if(from.match(/\bmid(dag|nat)\b/g) !== null){
				if(from.indexOf('middag') !== -1) from_hour = 12;
				else from_hour = 0;
				
				from_minute = 0;
			}
			else{ //Hour
				from_hour = from.match(/\d+/g, '$1');
				
				if(from_hour !== null) from_hour = from_hour[0]*1;
				else from_hour = start.getHours()+1;
				
				var from_check_h = ampmCheck(from+to, on, from_hour, start);
				from_hour = from_check_h.hour;
				start = from_check_h.date;
				
				from_minute = 0;
			}
			
			start.setHours(from_hour);
			start.setMinutes(from_minute);
			
			if(to !== ''){
				
				if(to.indexOf(':') !== -1){ //Hour + Minute
					to_hour = to.match(/\d+:/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0].replace(/:/g,'')*1;
					else to_hour = start.getHour() + 1;
					
					to_minute = to.match(/:\d+/g, '$1');
					
					if(to_minute !== null) to_minute = to_minute[0].replace(/:/g,'')*1;
					else to_minute = 0;
					
					var to_check_h_m = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h_m.hour;
					end = to_check_h_m.date;
				}
				else if(to.match(/\bmid(dag|nat)\b/g) !== null){
					if(to.indexOf('middag') !== -1) to_hour = 12;
					else to_hour = 0;
					
					to_minute = 0;
				}
				else{ //Hour
					to_hour = to.match(/\d+/g, '$1');
					
					if(to_hour !== null) to_hour = to_hour[0]*1;
					else to_hour = start.getHours()+1;
					
					var to_check_h = ampmCheck(to+from, on, to_hour, end);
					to_hour = to_check_h.hour;
					end = to_check_h.date;
					
					to_minute = 0;
				}
				
				end.setHours(to_hour);
				end.setMinutes(to_minute);
			}
			else{
				end.setTime(start.getTime() + 60 * 60 * 1000);
			}
		}
		
		if(end.getTime() < start.getTime()) end.setTime(start.getTime() + 60 * 60 * 1000);
		
		start.setSeconds(0);
		end.setSeconds(0);
		
		if(start.getTime() < Date.now()){
			start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
			end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return { raw : q, start : start, end : end };
	},
	getOpinion : function(rating){
		var score = parseInt(rating*10);
	
		switch(score){
			case 10: return _(", but there may be better options available.");
			case 15: return _(", but there may be better options available.");
			case 20: return ".";
			case 25: return ".";
			case 30: return _(" that looks good to me!");
			case 35: return _(" that looks good to me!");
			case 40: return _(" that looks really good to me!");
			case 45: return _(" that looks really good to me!");
			case 50: return _(" that looks excellent!");
			default: return ".";
		}
	},
	getDistance : function(input){
		if(Config.getConfig().DistanceUnit === Config.getConfig().METRIC){
			if(input < 1){
				input *= 1000;
				input = input.toFixed(0);
				return input + " m";
			}
			else{
				input = input.toFixed(2);
				return input + " km";
			}
		}
		else{
			if(input < 0.5){
				input *= Convert[3].options[5].multiplier;
				input = input.toFixed(0)*1;
				if(input > 1000) input = Math.floor(input/1000) + "," + (input%1000 < 100 ? "0" : "") + (input%1000 < 10 ? "0" : "") + input%1000;
				return input + " ft";
			}
			else{
				input = input.toFixed(2);
				return input + " mi";
			}
		}
	},
	langNameToAbbr : function(lang){
			switch(lang){
	    case _('french') : return 'fr';
	    case _('spanish') : return 'es';
	    case _('german') : return 'de';
	    case _('italian') : return 'it';
	    case _('czech') : return 'cs';
	    case _('dutch') : return 'nl';
	    case _('finnish') : return 'fi';
	    case _('hungarian') : return 'hu';
	    case _('albanian') : return 'sq';
	    case _('bosnian') : return 'bs';
	    case _('catalan') : return 'ca';
	    case _('croatian') : return 'hr';
	    case _('danish') : return 'da';
	    case _('estonian') : return 'et';
	    case _('icelandic') : return 'is';
	    case _('latvian') : return 'lv';
	    case _('lithuanian') : return 'lt';
	    case _('malay') : return 'ms';
	    case _('maltese') : return 'mt';
	    case _('polish') : return 'pl';
	    case _('portuguese') : return 'pt';
	    case _('romanian') : return 'ro';
	    case _('slovak') : return 'sk';
	    case _('swedish') : return 'sv';
	    case _('turkish') : return 'tr';
			case _('english') : return 'en';
			case _('indonesian') : return 'id';
			case _('norwegian') : return 'no';
				
 	   default : return lang;
 	 }
	},
	parseMonth : function(month){
		switch(month){
			case _("Jan") : return 0;
			case _("Feb") : return 1;
			case _("Mar") : return 2;
			case _("Apr") : return 3;
			case _("May") : return 4;
			case _("Jun") : return 5;
			case _("Jul") : return 6;
			case _("Aug") : return 7;
			case _("Sep") : return 8;
			case _("Oct") : return 9;
			case _("Nov") : return 10;
			case _("Dec") : return 11;
			default : return -1;
		}
	},
	parseTimeString : function(str){
		var mins = parseInt(str);
		var hrs = parseInt(mins/60);
		mins = mins - (hrs*60);
		return hrs >= 1 ? (hrs + "H " + mins + "M") : (mins + "M");
	}
};