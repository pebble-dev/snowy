var Callbacks = require('./app-callbacks');

module.exports = [
	{
		name : "Translate",
		keywords : [
			{ string : "how do i say", value : 5 },
			{ string : "what is", value : 1 },
			{ string : "how do you say", value : 3 },
			{ string : "translate", value : 3 },
			{ string : "into", value : 0 },
			{ string : "in", value : 0 }
		],
		callback : Callbacks.translate,
		score : 0
	}, //Translate
	{
		name : "Eat",
		keywords : [
			{ string : "where should i eat", value : 5 },
			{ string : "breakfast", value : 3 },
			{ string : "lunch", value : 3 },
			{ string : "dinner", value : 3 },
			{ string : "find restaurants near me", value : 5 },
			{ string : "find restaurants", value : 3 },
			{ string : "find", value : 1 },
			{ string : "place to eat", value : 3 },
			{ string : "where can i find a good place to eat", value : 5 },
			{ string : "where can i find a place to eat", value : 5 },
			{ string : "i'm hungry", value : 3 },
			{ string : "i am hungry", value : 3 }
		],
		callback : Callbacks.eat,
		score : 0
	}, //Eat
	{
		name : "Directions",
		keywords : [
			{ string : "get directions", value : 5 },
			{ string : "give me directions", value : 5 },
			{ string : "how do i get", value : 5 },
			{ string : "how do you get", value : 5 },
			{ string : "walking", value : 5 },
			{ string : "directions", value : 5 },
			{ string : "what are directions", value : 5 }
		],
		callback : Callbacks.directions,
		score : 0
	}, //Directions BETA
	{
		name : "Unit Conversion",
		keywords : [
			{ string : "convert", value : 5 }
		],
		callback : Callbacks.conversion,
		score : 0
	}, //Unit Conversion BETA
	{
		name : "Sports",
		keywords : [
			{ string : "what is the score of the", value : 5 },
			{ string : "score of the", value : 3 },
			{ string : "game", value : 3 },
			{ string : "when do the", value : 3 },
			{ string : "score", value : 1},
			{ string : "play", value : 1 },
			{ string : "when is the", value : 5 },
			{ string : "who do the", value : 5 },
			{ string : "who did the", value : 5 },
			{ string : "who are the", value : 5 },
			{ string : "next", value : 1 },
			{ string : "last", value : 1 },
			{ string : "playing", value : 3 },
			{ string : "how do you say", value : -5 },
			{ string : "how do i say", value : -5 },
			{ string : "translate", value : -5 }
		],
		callback : Callbacks.sports,
		score : 0
	}, //Sports BETA
	{
		name : "Movie Review",
		keywords : [
			{ string : "movie review", value : 5 },
			{ string : "movie rating", value : 3 },
			{ string : "movie", value : 1}
		],
		callback : Callbacks.movies,
		score : 0
	}, //Movie Review BETA
	{
		name : "Health",
		keywords : [
			{ string : "how many steps have i walked today", value : 5 },
			{ string : "how many steps", value : 5 },
			{ string : "how far have i walked today", value : 5 },
			{ string : "how far have i walked", value : 5 },
			{ string : "steps", value : 3 },
			{ string : "what is my step count", value : 5 },
			{ string : "step count", value : 3 },
			{ string : "how far", value : 3 },
			{ string : "what is my step goal", value : 5 },
			{ string : "step goal", value : 3 },
			{ string : "far", value : 1 },
			{ string : "how did i sleep last night", value : 5 },
			{ string : "sleep last night", value : 5 },
			{ string : "sleep", value : 3 },
			{ string : "last night", value : 3 },
			{ string : "night", value : 1 },
			{ string : "how much sleep", value : 3 }
		],
		callback : Callbacks.health,
		score : 0
	}, //Health BETA
	{ 
		name : "Fun Fact",
		keywords : [
			{ string : "tell me something interesting", value : 10 },
			{ string : "fun fact", value : 5 },
			{ string : "something interesting", value : 3 }
		],
		callback : Callbacks.funFact,
		score : 0
	}, //Fun Fact
	{
		name : "Introduction",
		keywords : [
			{ string : "say hello", value : 3 },
			{ string : "introduce yourself", value : 5 },
			{ string : "in", value : -1 },
		],
		callback : Callbacks.introduce,
		score : 0
	}, //Introduction
	{
		name : "Description",
		keywords : [
			{ string : "what can you do", value : 5 },
			{ string : "what can i say", value : 5 }
		],
		callback : Callbacks.description,
		score : 0
	}, //Description
	{
		name : "Spell",
		keywords : [
			{ string : "how do you spell", value : 5 },
			{ string : "how do i spell", value : 5 },
			{ string : "spell", value : 3 },
			{ string : "what is the correct spelling of", value : 5 },
			{ string : "spelling", value : 3 }
		],
		callback : Callbacks.spell,
		score : 0
	}, //Spell
	{
		name : "Define",
		keywords : [
			{ string : "define", value : 5 },
			{ string : "what is the definition of", value : 5 },
			{ string : "definition of", value : 3 },
			{ string : "definition", value : 1 }
		],
		callback : Callbacks.define,
		score : 0
	}, //Define
	{
		name : "Time",
		keywords : [
			{ string : "what time is it", value : 5 },
			{ string : "time", value : 1 },
			{ string : "what is the time", value : 3 },
			{ string : "current time", value : 3 }
		],
		callback : Callbacks.time,
		score : 0
	}, //Time
	{
		name : "Date",
		keywords : [
			{ string : "what day is it", value : 5 },
			{ string : "what is the date", value : 5 },
			{ string : "day", value : 1 },
			{ string : "date", value : 3 }
		],
		callback : Callbacks.date,
		score : 0
	}, //Date
	{
		name : "Set Timer",
		keywords : [
			{ string : "set timer", value : 5 },
			{ string : "timer", value : 3 },
			{ string : "set", value : 1 },
			{ string : "time", value : 1 },
			{ string : "at", value : 0 },
			{ string : "for", value : 0 },
			{ string : "and", value : 0},
			{ string : "a", value : 0 }
		],
		callback : Callbacks.setTimer2,
		score : 0
	}, //Set Timer
	{
		name : "Check Timer",
		keywords : [
			{ string : "check timer", value : 5 },
			{ string : "timer", value : 3 },
			{ string : "check", value : 1 },
			{ string : "how much time is left", value : 5 },
			{ string : "how much time", value : 3 }
		],
		callback : Callbacks.checkTimer,
		score : 0
	}, //Check Timer
	{
		name : "Cancel Timer",
		keywords : [
			{ string : "cancel timer", value : 5 },
			{ string : "cancel", value : 3 },
			{ string : "timer" , value : 3 },
			{ string : "destroy timer", value : 5 }
		],
		callback : Callbacks.cancelTimer,
		score : 0
	}, //Cancel Timer
	{
		name : "Finish Timer",
		keywords : [
			{ string : "finish timer", value : 5 }
		],
		callback : Callbacks.finishTimer,
		score : 0
	}, //Finish Timer
	{
		name : "Set Alarm",
		keywords : [
			{ string : "set an alarm", value : 5 },
			{ string : "set alarm", value : 5 },
			{ string : "wake me up", value : 5 },
			{ string : "alarm", value : 1 }
		],
		callback : Callbacks.setAlarm,
		score : 0
	}, //Set Alarm
	{
		name : "Cancel Alarm",
		keywords : [
			{ string : "cancel", value : 3 },
			{ string : "alarm", value : 3 },
			{ string : "cancel alarm", value : 3 },
			{ stirng : "cancel my alarm", value : 5 },
			{ string : "turn off my alarm", value : 5 },
			{ string : "turn off alarm", value : 3 }
		],
		callback: Callbacks.cancelAlarm,
		score : 0
	}, //Cancel Alarm
	{
		name : "Note",
		keywords : [
			{ string : "note to self", value : 5 },
			{ string : "taken note", value : 5 },
			{ string : "taking note", value : 5 },
			{ string : "take a note", value : 5 },
			{ string : "note", value : 3 }
		],
		callback : Callbacks.note,
		score : 0
	}, //Note
	{
		name : "Reminder",
		keywords : [
			{ string : "remind me", value : 5 },
			{ string : "reminder", value : 1 },
			{ string : "set a", value : 1 },
			{ string : "remind", value : 1 },
			{ string : "timer", value : -1 }
		],
		callback : Callbacks.reminder2,
		score : 0
	}, //Reminder
	{
		name : "Calendar",
		keywords : [
			{ string : "schedule a", value : 5 },
			{ string : "schedule", value : 5 },
			{ string : "add a", value : 1 },
			{ string : "add", value : 1 },
			{ string : "to my calendar", value : 5 },
			{ string : "calendar", value : 3}
		],
		callback : Callbacks.calendar2,
		score : 0
	}, //Calendar
	{
		name : "Cancel",
		keywords : [
			{ string : "cancel that", value : 5 }
		],
		callback : Callbacks.cancel,
		score : 0
	}, //Cancel
	{
		name : "Calculate",
		keywords : [
			{ string : "calculate", value : 5 },
			{ string : "what is", value : 1 },
			{ string : "+", value : 5 },
			{ string : "×", value : 5 },
			{ string : "÷", value : 5 },
			{ string : "-", value : 5 },
			{ string : "% of", value : 5 },
			{ string : "%", value : 1 },
			{ string : "times", value : 1 },
			{ stirng : "plus", value : 1 },
			{ string : "minus", value : 1 },
			{ string : "divided by", value : 1 },
			{ string : "percent of", value : 1 },
			{ string : "in", value : -3 }
		],
		callback : Callbacks.calculate,
		score : 0
	}, //Calculate
	{
		name : "Random Number",
		keywords : [
			{ string : "pick a random number between ", value : 5},
			{ string : "pick", value : 1 },
			{ string : "random number", value : 3 },
			{ string : "between", value : 1 },
			{ string : "random", value : 1 },
			{ string : "number", value : 1 },
			{ string : "and", value : 0 },
			{ string : "a", value : 0 }
		],
		callback : Callbacks.random2,
		score : 0
	}, //Random Number
	{
		name : "Flip a Coin",
		keywords : [
			{ string : "flip a coin", value : 5 },
			{ string : "flip", value : 1},
			{ string : "coin", value : 3}
		],
		callback : Callbacks.coin,
		score : 0
	}, //Flip a Coin
	{
		name : "Natural Weather",
		keywords : [
			{ string : "is it going to rain today", value : 5 },
			{ string : "is it going to rain tomorrow", value : 5 },
			{ string : "when is it going to rain", value : 5 },
			{ string : "what time is it going to start raining", value : 5 },
			{ string : "is it going to rain", value : 3 },
			{ string : "start raining", value : 3 },
			{ string : "rain", value : 1 },
			{ string : "raining", value : 1 },
			{ string : "is it going to snow today", value : 5 },
			{ string : "is it going to snow tomorrow", value : 5 },
			{ string : "when is it going to snow", value : 5 },
			{ string : "when is it going to start snowing", value : 5 },
			{ string : "is it going to snow", value : 3 },
			{ string : "start snowing", value : 3 },
			{ string : "snow", value : 1 },
			{ string : "snowing", value : 1 },
			{ string : "is it going to thunderstorm today", value : 5 },
			{ string : "is it going to thunderstorm tomorrow", value : 5 },
			{ string : "is it going to storm today", value : 5 },
			{ string : "is it going to storm tomorrow", value : 5 },
			{ string : "when is it going to thunderstorm", value : 5 },
			{ string : "when is going to storm", value : 5 },
			{ string : "thunderstorm", value : 3 },
			{ string : "storm", value : 1 }
		],
		callback : Callbacks.naturalWeather,
		score : 0
	}, //Natural Weather
	{
		name : "Weather",
		keywords : [
			{ string : "what is the weather", value : 5 },
			{ string : "what is the weather in", value : 5 },
			{ string : "what is the weather for", value : 5 },
			{ string : "what is", value : 1 },
			{ string : "what's", value : 1 },
			{ string : "weather", value : 3 },
			{ string : "outside", value : 1 },
			{ string : "temperature", value : 3 },
			{ string : "in", value : 0 },
			{ string : "for", value : 0},
			{ string : "the", value : 0 }
		],
		callback : Callbacks.weatherWU,
		score : 0
	}, //Weather
	{
		name : "Forecast",
		keywords : [
			{ string : "what is the forecast for tomorrow", value : 5 },
			{ string : "what is the forecast", value : 3 },
			{ string : "tomorrow", value : 1 },
			{ string : "what will the weather be tomorrow", value : 5 },
			{ string : "weather tomorrow", value : 3 },
			{ string : "forecast for tomorrow", value : 3 },
			{ string : "forecast", value : 3 },
			{ string : "for", value : 0 },
			{ string : "in", value : 0 }
		],
		callback : Callbacks.forecastWU,
		score : 0
	}, //Forecast
	{
		name : "IFTTT Maker",
		keywords: [
			{ string : "trigger event", value : 5 },
			{ string : "trigger", value : 3 },
			{ string : "do me a favor", value : 5 },
			{ string : "do me a favour", value : 5 },
			{ string : "please", value : 10 },
			{ string : "how do you say", value : -10 },
			{ string : "what is", value : -5 }
		],
		callback : Callbacks.ifttt,
		score : 0
	}, //IFTTT
	{
		name : "Stock Prices",
		keywords : [
			{ string : "check the stock price for", value : 5 },
			{ string : "check stock price for", value : 5 },
			{ string : "check stock price", value : 3 },
			{ string : "for", value : 0 },
			{ string : "the", value : 0 },
			{ string : "check", value : 1 },
			{ string : "stock", value : 3 },
			{ string : "price", value : 3 },
			{ string : "current", value : 0 }
		],
		callback : Callbacks.stock,
		score : 0
	}, //Stock Prices
	{
		name : "Add To List",
		keywords : [
			{ string : "add", value : 3 },
			{ string : "to my list", value : 3 },
			{ string : "to my to do list", value : 5 },
			{ string : "to do", value : 1 },
			{ string : "to", value : 0 }
		],
		callback : Callbacks.addTodo,
		score : 0
	}, //Add To List
	{
		name : "Check List",
		keywords : [
			{ string : "check my to do list", value : 5 },
			{ string : "check my list", value : 5 },
			{ string : "what is on my list", value : 5 },
			{ string : "what is on my to do list", value : 5 },
			{ string : "checklist", value : 3 },
			{ string : "list", value : 1 },
			{ string : "check", value : 1 }
		],
		callback : Callbacks.checkTodo,
		score : 0
	}, //Check List
	{
		name : "Remove From List",
		keywords : [
			{ string : "remove", value : 1 },
			{ string : "from my list", value : 3 },
			{ string : "from my to do list", value : 5 },
			{ string : "to do", value : 1 },
			{ string : "from", value : 1 }
		],
		callback : Callbacks.removeTodo,
		score : 0
	}, //Remove From List
	{
		name : "Clear List",
		keywords : [
			{ string : "clear list", value : 5 },
			{ string : "clear my list", value : 5 },
			{ sring : "clear my todo list", value : 5 },
			{ string : "clear", value : 1 }
		],
		callback : Callbacks.clearTodo,
		score : 0
	}, //Clear List,
	{
		name : "Wolfram Alpha",
		keywords : [
			{ string : "tell me", value : 10 }
		],
		callback : Callbacks.wolfram,
		score : 0
	}, //Wolfram Alpha,
	{
		name : "Habits",
		keywords : [
			{ string : "list all of my habits", value : 5 },
			{ string : "what are all of my habits", value : 5 },
			{ string : "list my habits", value : 5 },
			{ string : "what are my habits", value : 5 },
			{ string : "what is my next habit", value : 5 },
			{ string : "next habit", value : 3 },
			{ string : "list of habits", value : 3 },
			{ string : "all of my habits", value : 3 },
			{ string : "my habits", value : 3 },
			{ string : "what is my current streak for", value : 3 },
			{ string : "what is my current count for", value : 3 },
			{ string : "streak", value : 1 },
			{ string : "current", value : 1 },
			{ string : "count", value : 1 },
			{ string : "habits", value : 1 },
			{ string : "for", value : 0 },
			{ string : "what is", value : 0 },
			{ string : "my", value : 0 }
		],
		callback : Callbacks.habits,
		score : 0
	},

	{
		name : "Fun - Over 9000",
		keywords : [
			{ string : "what does the scouter say about his power level", value : 5 },
			{ string : "what does the scout her say about his power level", value : 5 },
			{ string : "scouter", value : 3 },
			{ string : "power level", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "It's over 9,000!!!", "BODY" : "\nWHAT? 9,000?!?\n" } ); },
		score : 0
	}, //Fun - Over 9000
	{
		name : "Fun - Hitchhiker's Guide",
		keywords : [
			{ string : "life, the universe, and everything", value : 5 },
			{ string : "life the universe and everything", value : 5 },
			{ stirng : "life", value : 3 },
			{ string : "universe", value : 3 },
			{ string : "everything", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "42!!!", "BODY" : "" } ); },
		score : 0
	}, //Fun - Ultimate Question
				
	{
		name : "News",
		keywords : [
			{ string : "what is the news today", value : 5 },
			{ string : "tell me the news", value : 5 },
			{ string : "what is new today", value : 5 },
			{ string : "what is new", value : 3 },
			{ string : "the news", value : 3 },
			{ string : "news", value : 1 },
			{ string : "what is up", value : 3 }
		],
		callback : Callbacks.news,
		score : 0
	}, //News via Reddit
	{
		name : "Dash API",
		keywords : [
			{ string : "battery", value : 5 },
			{ string : "phone", value : 3 },
			{ string : "wifi", value : 5 },
			{ string : "ringer", value : 5 },
			{ string : "volume", value : 5 },
			{ string : "vibrate", value : 5 },
			{ string : "silent", value : 3 },
			{ string : "hotspot", value : 5 },
			{ string : "sms", value : 5 },
			{ string : "text", value : 5 },
			{ string : "number", value : 1 },
			{ string : "messages", value : 3 },
			{ string : "calendar", value : 3 },
			{ string : "next", value : 3 },
			{ string : "event", value : 1 }
		],
		callback : Callbacks.dash,
		score : 0
	},
	{
		name : "Travel API",
		keywords : [
			{ string : "travel", value : 5 },
			{ string : "time", value : 1 },
			{ string : "flight", value : 5 },
			{ string : "status", value : 3 },
			{ string : "gate", value : 5 },
			{ string : "departure", value : 5 },
			{ string : "arrival", value : 5 },
			{ string : "baggage claim", value : 5 },
			{ string : "baggage", value : 3 }
		],
		callback : Callbacks.travel,
		score : 0
	},
	{
		name : "Commute",
		keywords : [
			{ string : "commute", value : 5 },
			{ string : "how long will", value : 5 },
			{ string : "time", value : 1 },
			{ string : "to work", value : 3 },
			{ string : "to home", value : 3 },
			{ string : "work", value : 1 },
			{ string : "home", value : 1 },
			{ string : "traffic", value : 1 },
			{ string : "to get to work", value : 5 },
			{ string : "to get home", value : 5 }
		],
		callback : Callbacks.commute,
		score : 0
	},
	{
		name : "Open",
		keywords : [
			{ string : "is", value : 0 },
			{ string : "open right now", value : 5 },
			{ string : "open", value : 3 }
		],
		callback : Callbacks.open,
		score : 0
	}
/*				
	{
		name : "Pal - Location",
		keywords : [
			{ string : "where am i", value : 5 }
		],
		callback : pal_location,
		score : 0
	},
	{
		name : "Pal - Charging",
		keywords : [
			{ string : "charge", value : 5 },
			{ string : "charging", value : 5 }, 
			{ string : "begin", value : 3 },
			{ string : "start", value : 3 },
			{ string : "stop", value : 3 },
			{ string : "end", value : 3 },
			{ string : "on", value : 1 },
			{ string : "off", value : 1 }
		],
		callback : pal_charge,
		score : 0
	}
*/
];