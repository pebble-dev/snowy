var Callbacks = require('./app-callbacks');

module.exports = [
	{
		name : "Translate",
		keywords : [
			{ string : "hvordan siger man", value : 5 },
			{ string : "hvad hedder", value : 3},
			{ string : "hvordan siger du", value : 3 },
			{ string : "oversæt", value : 5},
			{ string : "på", value : 0 },
			{ string : "til", value : 0 }
		],
		callback : Callbacks.translate,
		score : 0
	}, //Translate
	{
		name : "Eat",
		keywords : [
			{ string : "hvor skal jeg spise", value : 5 },
			{ string : "frokost", value : 3 },
			{ string : "middagsmad", value : 3 },
			{ string : "aftensmad", value : 3 },
			{ string : "find restaurant i nærheden", value : 5 },
			{ string : "find restaurant", value : 3 },
			{ string : "find", value : 1 },
			{ string : "sted at spise", value : 3 },
			{ string : "hvor er der et godt sted at spise", value : 5 },
			{ string : "hvor er der et sted at spise", value : 5 },
			{ string : "jeg er sulten", value : 3 },
			{ string : "vi er sultne", value : 3 }
		],
		callback : Callbacks.eat,
		score : 0
	}, //Eat
	{
		name : "Directions",
		keywords : [
			{ string : "find vejvisninger", value : 5 },
			{ string : "find rutevejledning", value : 5 },
			{ string : "hvordan kommer jeg til", value : 5 },
			{ string : "hvordan finder jeg", value : 5 },
			{ string : "gå til", value : 5 },
			{ string : "rute til", value : 5 },
			{ string : "rutevejledning til", value : 5 }
		],
		callback : Callbacks.directions,
		score : 0
	}, //Directions BETA
	{
		name : "Unit Conversion",
		keywords : [
			{ string : "omregn", value : 5 }
		],
		callback : Callbacks.conversion,
		score : 0
	}, //Unit Conversion BETA
	{
		name : "Sports",
		keywords : [
			{ string : "hvad er stillingen", value : 5 },
			{ string : "stillingen i", value : 3 },
			{ string : "kamp", value : 3 },
			{ string : "stilling", value : 1},
			{ string : "spil", value : 1 },
			{ string : "næste", value : 1 },
			{ string : "sidste", value : 1 },
			{ string : "spiller", value : 3 },
			{ string : "hvordan siger man", value : -5 },
			{ string : "hvordan siger du", value : -5 },
			{ string : "oversæt", value : -5 }
		],
		callback : Callbacks.sports,
		score : 0
	}, //Sports BETA
	{
		name : "Movie Review",
		keywords : [
			{ string : "film anmeldelse", value : 5 },
			{ string : "filmanmeldelse", value : 3 },
			{ string : "film", value : 1}
		],
		callback : Callbacks.movies,
		score : 0
	}, //Movie Review BETA
	{
		name : "Health",
		keywords : [
			{ string : "hvor mange skridt har jeg gået idag", value : 5 },
			{ string : "hvor mange skridt", value : 5 },
			{ string : "hvor langt har jeg gået idag", value : 5 },
			{ string : "hvor langt har jeg gået", value : 5 },
			{ string : "skridt", value : 3 },
			{ string : "hvad siger skridttælleren", value : 5 },
			{ string : "antal skridt", value : 3 },
			{ string : "hvor langt", value : 3 },
			{ string : "hvad er mit skridt mål", value : 5 },
			{ string : "skridt mål", value : 3 },
			{ string : "langt", value : 1 },
			{ string : "hvordan sov jeg sidste nat", value : 5 },
			{ string : "søvn sidste nat", value : 5 },
			{ string : "søvn", value : 3 },
			{ string : "sidste nat", value : 3 },
			{ string : "nat", value : 1 },
			{ string : "hvor meget søvn", value : 3 }
		],
		callback : Callbacks.health,
		score : 0
	}, //Health BETA
	{ 
		name : "Fun Fact",
		keywords : [
			{ string : "fortæl mig noget sjovt", value : 10 },
			{ string : "sjov information", value : 5 },
			{ string : "noget interessant", value : 3 }
		],
		callback : Callbacks.funFact,
		score : 0
	}, //Fun Fact
	{
		name : "Introduction",
		keywords : [
			{ string : "sig hej", value : 3 },
			{ string : "introducer dig selv", value : 5 },
			{ string : "på", value : -1 },
		],
		callback : Callbacks.introduce,
		score : 0
	}, //Introduction
	{
		name : "Description",
		keywords : [
			{ string : "hvad kan du", value : 5 },
			{ string : "hvad kan jeg sige", value : 5 },
                               { string : "hvad kan jeg spørge om", value : 5 }
		],
		callback : Callbacks.description,
		score : 0
	}, //Description
	{
		name : "Spell",
		keywords : [
			{ string : "hvordan staver man til", value : 5 },
			{ string : "hvordan staver man", value : 5 },
			{ string : "stav", value : 3 },
			{ string : "hvad er den korrekte stavning af", value : 5 },
			{ string : "stavning", value : 3 }
		],
		callback : Callbacks.spell,
		score : 0
	}, //Spell
	{
		name : "Define",
		keywords : [
			{ string : "definer", value : 5 },
			{ string : "hvad er definitionen", value : 5 },
			{ string : "definitionen", value : 3 },
			{ string : "definition", value : 1 }
		],
		callback : Callbacks.defineDA,
		score : 0
	}, //Define
	{
		name : "Time",
		keywords : [
			{ string : "hvad er klokken", value : 5 },
			{ string : "klokken", value : 1 },
			{ string : "tid", value : 3 },
			{ string : "hvad er klokken nu", value : 5}
		],
		callback : Callbacks.time,
		score : 0
	}, //Time
	{
		name : "Date",
		keywords : [
			{ string : "hvad dato er det", value : 5 },
			{ string : "hvad dato er det idag", value : 5 },
			{ string : "dag", value : 1 },
			{ string : "dato", value : 3 }
		],
		callback : Callbacks.date,
		score : 0
	}, //Date
	{
		name : "Set Timer",
		keywords : [
			{ string : "start nedtælling", value : 5 },
			{ string : "nedtælling", value : 3 },
			{ string : "start", value : 1 },
			{ string : "timer", value : 3},
			{ string : "start timer", value : 5},
			{ string : "på", value : 0 },
			{ string : "til", value : 0},
			{ string : "i", value : 0 }
		],
		callback : Callbacks.setTimer2,
		score : 0
	}, //Set Timer
	{
		name : "Check Timer",
		keywords : [
			{ string : "tjek nedtælling", value : 5 },
			{ string : "nedtælling", value : 3 },
			{ string : "tjek", value : 1 },
			{ string : "hvor meget tid er der tilbage", value : 5 },
			{ string : "hvor meget tid", value : 3 },
                               { string : "tjek timer", value : 5 }
		],
		callback : Callbacks.checkTimer,
		score : 0
	}, //Check Timer
	{
		name : "Cancel Timer",
		keywords : [
			{ string : "stop nedtælling", value : 5 },
			{ string : "stop", value : 3 },
			{ string : "nedtælling" , value : 3 },
			{ string : "stop timer", value : 5 },
                               { string : "annuller nedtælling", value : 5 },
                               { string : "annuller timer", value : 5 }
		],
		callback : Callbacks.cancelTimer,
		score : 0
	}, //Cancel Timer
	{
		name : "Finish Timer",
		keywords : [
			{ string : "stop timer", value : 5 },
                               { string : "stop nedtælling", value : 5 }
		],
		callback : Callbacks.finishTimer,
		score : 0
	}, //Finish Timer
	{
		name : "Set Alarm",
		keywords : [
			{ string : "sæt en alarm", value : 5 },
			{ string : "sæt alarm", value : 5 },
			{ string : "væk mig", value : 5 },
			{ string : "alarm", value : 1 }
		],
		callback : Callbacks.setAlarm,
		score : 0
	}, //Set Alarm
	{
		name : "Cancel Alarm",
		keywords : [
			{ string : "annuller", value : 3 },
			{ string : "alarm", value : 3 },
			{ string : "annuller alarm", value : 3 },
			{ stirng : "slå alarm fra", value : 5 },
			{ string : "stop min alarm", value : 5 },
			{ string : "slå min alarm fra", value : 3 }
		],
		callback: Callbacks.cancelAlarm,
		score : 0
	}, //Cancel Alarm
	{
		name : "Note",
		keywords : [
			{ string : "note til mig selv", value : 5 },
			{ string : "tag note", value : 5 },
			{ string : "skriv note", value : 5 },
			{ string : "skriv en note", value : 5 },
			{ string : "note", value : 3 }
		],
		callback : Callbacks.note,
		score : 0
	}, //Note
	{
		name : "Reminder",
		keywords : [
			{ string : "mind mig om", value : 5 },
			{ string : "påmindelse", value : 3},
			{ string : "lav en", value : 1 },
			{ string : "påmind", value : 1 },
			{ string : "timer", value : -1 }
		],
		callback : Callbacks.reminder2DA,
		score : 0
	}, //Reminder
	{
		name : "Calendar",
		keywords : [
			{ string : "planlæg", value : 5 },
			{ string : "skriv i kalender", value : 5 },
			{ string : "tilføj", value : 1 },
			{ string : "skriv i", value : 1 },
			{ string : "min kalender", value : 5 },
			{ string : "kalender", value : 3}
		],
		callback : Callbacks.calendar2DA,
		score : 0
	}, //Calendar
	{
		name : "Cancel",
		keywords : [
			{ string : "annuller", value : 5 }
		],
		callback : Callbacks.cancel,
		score : 0
	}, //Cancel
	{
		name : "Calculate",
		keywords : [
			{ string : "udregn", value : 5 },
			{ string : "hvad er", value : 1 },
			{ string : "+", value : 5 },
			{ string : "×", value : 5 },
			{ string : "÷", value : 5 },
			{ string : "-", value : 5 },
			{ string : "% af", value : 5 },
			{ string : "%", value : 1 },
			{ string : "gange", value : 1 },
			{ stirng : "plus", value : 1 },
			{ string : "minus", value : 1 },
			{ string : "divideret med", value : 1 },
			{ string : "procent af", value : 1 },
			{ string : "i", value : -3 }
		],
		callback : Callbacks.calculate,
		score : 0
	}, //Calculate
	{
		name : "Random Number",
		keywords : [
			{ string : "tag et tilfældigt tal", value : 5},
			{ string : "vælg", value : 1 },
			{ string : "tilfældigt tal", value : 3 },
			{ string : "mellem", value : 1 },
			{ string : "tilfældigt", value : 1 },
			{ string : "tal", value : 1 },
			{ string : "og", value : 0 },
			{ string : "et", value : 0 }
		],
		callback : Callbacks.random2,
		score : 0
	}, //Random Number
	{
		name : "Flip a Coin",
		keywords : [
			{ string : "plat eller krone", value : 5 },
			{ string : "slå", value : 1},
			{ string : "mønt", value : 3}
		],
		callback : Callbacks.coin,
		score : 0
	}, //Flip a Coin
	{
		name : "Natural Weather",
		keywords : [
			{ string : "skal det regne idag", value : 5 },
			{ string : "skal det regne imorgen", value : 5 },
			{ string : "hvornår skal det regne", value : 5 },
			{ string : "hvad klok skal det regne", value : 5 },
			{ string : "skal det regne", value : 3 },
			{ string : "starte med at regne", value : 3 },
			{ string : "regn", value : 1 },
			{ string : "regner", value : 1 },
			{ string : "skal det sne idag", value : 5 },
			{ string : "skal det sne imorgen", value : 5 },
			{ string : "hvornår skal det sne", value : 5 },
			{ string : "hvad klok skal det sne", value : 5 },
			{ string : "skal det sne", value : 3 },
			{ string : "starte med at sne", value : 3 },
			{ string : "sne", value : 1 },
			{ string : "sner", value : 1 },
			{ string : "skal der være orkan idag", value : 5 },
			{ string : "skal der være orkan imorgen", value : 5 },
			{ string : "skal det storme idag", value : 5 },
			{ string : "skal det storme imorgen", value : 5 },
			{ string : "hvornår skal der være orkan", value : 5 },
			{ string : "hvornår skal det storme", value : 5 },
			{ string : "orkan", value : 3 },
			{ string : "storm", value : 1 }
		],
		callback : Callbacks.naturalWeather,
		score : 0
	}, //Natural Weather
	{
		name : "Weather",
		keywords : [
			{ string : "hvordan er vejret", value : 5 },
			{ string : "hvordan er vejret i", value : 5 },
			{ string : "hvordan er vejret på", value : 5 },
			{ string : "hvordan er", value : 1 },
			{ string : "hvad er", value : 1 },
			{ string : "vejret", value : 3 },
			{ string : "ude", value : 1 },
			{ string : "temperatur", value : 3 },
			{ string : "i", value : 0 },
			{ string : "på", value : 0},
			{ string : "ved", value : 0 }
		],
		callback : Callbacks.weatherWU,
		score : 0
	}, //Weather
	{
		name : "Forecast",
		keywords : [
			{ string : "hvad er vejrudsigten for imorgen", value : 5 },
			{ string : "hvad er vejrudsigten", value : 3 },
			{ string : "imorgen", value : 1 },
			{ string : "hvordan skal vejret være imorgen", value : 5 },
			{ string : "vejret imorgen", value : 3 },
			{ string : "vejrudsigten for imorgen", value : 3 },
			{ string : "vejrudsigt", value : 3 },
			{ string : "for", value : 0 },
			{ string : "i", value : 0 }
		],
		callback : Callbacks.forecastWU,
		score : 0
	}, //Forecast
	{
		name : "IFTTT Maker",
		keywords: [
			{ string : "start handling", value : 5 },
			{ string : "start", value : 3 },
			{ string : "gør mig en tjeneste", value : 5 },
			{ string : "gør venligst", value : 5 },
			{ string : "venligst", value : 10 },
			{ string : "hvordan siger man", value : -10 },
			{ string : "hvad er", value : -5 }
		],
		callback : Callbacks.ifttt,
		score : 0
	}, //IFTTT
	{
		name : "Stock Prices",
		keywords : [
			{ string : "tjek aktiekursen for", value : 5 },
			{ string : "tjek aktiekurs for", value : 5 },
			{ string : "tjek kurs", value : 3 },
			{ string : "for", value : 0 },
			{ string : "pris", value : 0 },
			{ string : "tjek", value : 1 },
			{ string : "aktie", value : 3 },
			{ string : "kurs", value : 3 },
			{ string : "nuværende", value : 0 }
		],
		callback : Callbacks.stock,
		score : 0
	}, //Stock Prices
	{
		name : "Add To List",
		keywords : [
			{ string : "tilføj", value : 3 },
			{ string : "til min liste", value : 3 },
			{ string : "til min huskeliste", value : 5 },
			{ string : "huskeliste", value : 1 },
			{ string : "til", value : 0 }
		],
		callback : Callbacks.addTodo,
		score : 0
	}, //Add To List
	{
		name : "Check List",
		keywords : [
			{ string : "tjek min huskeliste", value : 5 },
			{ string : "tjek min liste", value : 5 },
			{ string : "hvad er på min liste", value : 5 },
			{ string : "hvad er på min huskeliste", value : 5 },
			{ string : "huskeliste", value : 3 },
			{ string : "liste", value : 1 },
			{ string : "tjek", value : 1 }
		],
		callback : Callbacks.checkTodo,
		score : 0
	}, //Check List
	{
		name : "Remove From List",
		keywords : [
			{ string : "fjern", value : 1 },
			{ string : "fra min liste", value : 3 },
			{ string : "fra min huskeliste", value : 5 },
			{ string : "huskeliste", value : 1 },
			{ string : "fra", value : 1 }
		],
		callback : Callbacks.removeTodo,
		score : 0
	}, //Remove From List
	{
		name : "Clear List",
		keywords : [
			{ string : "tøm min liste", value : 5 },
			{ string : "tøm min huskeliste", value : 5 },
			{ sring : "tøm liste", value : 5 },
			{ string : "tøm", value : 1 }
		],
		callback : Callbacks.clearTodo,
		score : 0
	}, //Clear List,
	{
		name : "Habits",
		keywords : [
			{ string : "liste over mine vaner", value : 5 },
			{ string : "hvad er mine vaner", value : 5 },
			{ string : "list mine vaner", value : 5 },
			{ string : "hvad er alle mine vaner", value : 5 },
			{ string : "hvad er min næste vane", value : 5 },
			{ string : "næste vane", value : 3 },
			{ string : "liste over vaner", value : 3 },
			{ string : "alle mine vaner", value : 3 },
			{ string : "mine vaner", value : 3 },
			{ string : "hvad er mit nuværende stræk", value : 3 },
			{ string : "hvad er min nuværende antal", value : 3 },
			{ string : "stræk", value : 1 },
			{ string : "nuværende", value : 1 },
			{ string : "antal", value : 1 },
			{ string : "vaner", value : 1 },
			{ string : "for", value : 0 },
			{ string : "hvad er", value : 0 },
			{ string : "min", value : 0 }
		],
		callback : Callbacks.habits,
		score : 0
	},

	{
		name : "Fun - Over 9000",
		keywords : [
			{ string : "hvad siger spejderen om hans energi niveau", value : 5 },
			{ string : "hvad siger spejderen om han energi", value : 5 },
			{ string : "spejder", value : 3 },
			{ string : "energi", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "Det er over 9,000!!!", "BODY" : "\nWHAT? 9,000?!?\n" } ); },
		score : 0
	}, //Fun - Over 9000
	{
		name : "Fun - Hitchhiker's Guide",
		keywords : [
			{ string : "livet, universet og alt", value : 5 },
			{ string : "livet universet og alting", value : 5 },
			{ stirng : "livet", value : 3 },
			{ string : "universet", value : 3 },
			{ string : "alt", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "42!!!", "BODY" : "" } ); },
		score : 0
	}, //Fun - Ultimate Question
				
	{
		name : "News",
		keywords : [
			{ string : "hvilke nyheder er der idag", value : 5 },
			{ string : "fortæl mig nogle nyheder", value : 5 },
			{ string : "hvad er der sket idag", value : 5 },
			{ string : "noget nyt", value : 3 },
			{ string : "nyhederne", value : 3 },
			{ string : "nyheder", value : 1 },
			{ string : "er der noget nyt", value : 3 }
		],
		callback : Callbacks.news,
		score : 0
	}
];