var Callbacks = require('./app-callbacks');

module.exports = [
	{
		name : "Translate",
		keywords : [
			{ string : "wie sage ich", value : 3 },
			{ string : "was heißt", value : 5 },
			{ string : "wie sagt man", value : 3 },
			{ string : "übersetze", value : 5 },
			{ string : "auf", value : 0 },
			{ string : "in", value : 0 }
		],
		callback : Callbacks.translate,
		score : 0
	}, //Translate
	{
		name : "Eat",
		keywords : [
			{ string : "wo sollte ich zum essen hingehen", value : 5 },
			{ string : "frühstuck", value : 3 },
			{ string : "mittagessen", value : 3 },
			{ string : "abendessen", value : 3 },
			{ string : "such restaurants in meiner nähe", value : 5 },
			{ string : "finde restaurants in meiner nähe", value : 3 },
			{ string : "suche restaurants", value : 3 },
			{ string : "suche", value : 1 },
			{ string : "ort zum essen", value : 3 },
			{ string : "wo kann man hier gut essen gehen", value : 5 },
			{ string : "wo kann man hier essen gehen", value : 5 },
			{ string : "ich bin hungrig", value : 3 },
			{ string : "ich hab hunger", value : 3 }
		],
		callback : Callbacks.eat,
		score : 0
	}, //Eat
	{
		name : "Directions",
		keywords : [
			{ string : "zeige den weg", value : 5 },
			{ string : "zeige mir den weg", value : 5 },
			{ string : "wie komme ich", value : 5 },
			{ string : "wie kommt man", value : 5 },
			{ string : "wegbeschreibung", value : 5 },
			{ string : "route", value : 5 },
			{ string : "auf welchem weg", value : 5 }
		],
		callback : Callbacks.directions,
		score : 0
	}, //Directions BETA
	{
		name : "Unit Conversion",
		keywords : [
			{ string : "konvertiere", value : 5 }
		],
		callback : Callbacks.conversion,
		score : 0
	}, //Unit Conversion BETA
	{
		name : "Sports",
		keywords : [
			{ string : "wie ist das ergebnis von", value : 5 },
			{ string : "wie ist der spielstand von", value : 5 },
			{ string : "ergebnis von", value : 3 },
			{ string : "spiel", value : 3 },
			{ string : "wann", value : 0 },
			{ string : "spielstand", value : 5 },
			{ string : "ergebnis", value : 3},
			{ string : "spielt", value : 5 },
			{ string : "wann spielten", value : 5 },
			{ string : "wie schlägt sich", value : 5 },
			{ string : "wie hat", value : 3 },
			{ string : "wer sind die", value : 5 },
			{ string : "nächstes", value : 1 },
			{ string : "vorheriges", value : 1 },
			{ string : "spielen", value : 3 }
		],
		callback : Callbacks.sports,
		score : 0
	}, //Sports BETA
	{
		name : "Health",
		keywords : [
			{ string : "wie viele schritte bin ich heute gelaufen", value : 5 },
			{ string : "wie viele schritte", value : 5 },
			{ string : "wie weit bin ich heute gegangen", value : 5 },
			{ string : "wie weit bin ich heute gelaufen", value : 5 },
			{ string : "wie weit bin ich gegangen", value : 5 },
			{ string : "wie weit bin ich gelaufen", value : 5 },
			{ string : "schritte", value : 3 },
			{ string : "was ist meine schrittanzahl", value : 5 },
			{ string : "schrittzähler", value : 3 },
			{ string : "schrittzahl", value : 5 },
			{ string : "wie weit", value : 3 },
			{ string : "was ist mein schrittziel", value : 5 },
			{ string : "schrittziel", value : 3 },
			{ string : "weit", value : 1 },
			{ string : "wie habe ich letzte nacht geschlafen", value : 5 },
			{ string : "schlaf letzte nacht", value : 5 },
			{ string : "schlaf", value : 3 },
			{ string : "letzte nacht", value : 3 },
			{ string : "nacht", value : 1 },
			{ string : "wie viel schlaf", value : 3 }
		],
		callback : Callbacks.health,
		score : 0
	}, //Health BETA
	{
		name : "Einführung",
		keywords : [
			{ string : "sag hallo", value : 3 },
			{ string : "stelle dich vor", value : 5 },
			{ string : "in", value : -1 },
		],
		callback : Callbacks.introduce,
		score : 0
	}, //Introduction
	{
		name : "Beschreibung",
		keywords : [
			{ string : "was kannst du tun", value : 5 },
			{ string : "was kann ich sagen", value : 5 }
		],
		callback : Callbacks.description,
		score : 0
	}, //Description
	{
		name : "Spell",
		keywords : [
			{ string : "wie schreibt man", value : 5 },
			{ string : "wie schreibe ich", value : 5 },
			{ string : "schreibe", value : 3 },
			{ string : "wie ist die richtige schreibweise von", value : 5 },
			{ string : "schreibweise", value : 3 }
		],
		callback : Callbacks.spell,
		score : 0
	}, //Spell
	{
		name : "Define",
		keywords : [
			{ string : "definiere", value : 5 },
			{ string : "was ist die definition von", value : 5 },
			{ string : "definition von", value : 3 },
			{ string : "definition", value : 1 }
		],
		callback : Callbacks.defineDE,
		score : 0
	}, //Define
	{
		name : "Time",
		keywords : [
			{ string : "wie spät ist es", value : 5 },
			{ string : "uhrzeit", value : 1 },
			{ string : "wie ist die uhrzeit", value : 3 },
			{ string : "aktuelle uhrzeit", value : 3 }
		],
		callback : Callbacks.time,
		score : 0
	}, //Time
	{
		name : "Date",
		keywords : [
			{ string : "welcher tag ist heute", value : 5 },
			{ string : "wie ist das datum", value : 5 },
			{ string : "tag", value : 1 },
			{ string : "datum", value : 3 }
		],
		callback : Callbacks.date,
		score : 0
	}, //Date
	{
		name : "Set Timer",
		keywords : [
			{ string : "stelle timer", value : 5 },
			{ string : "timer", value : 3 },
			{ string : "stelle", value : 1 },
			{ string : "auf", value : 0 },
			{ string : "für", value : 0 },
			{ string : "und", value : 0},
			{ string : "einen", value : 0 }
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
			{ string : "wieviel zeit bleibt", value : 5 },
			{ string : "was sagt der Timer", value : 5 },
			{ string : "wieviel zeit", value : 3 }
		],
		callback : Callbacks.checkTimer,
		score : 0
	}, //Check Timer
	{
		name : "Cancel Timer",
		keywords : [
			{ string : "timer löschen", value : 5 },
			{ string : "löschen", value : 3 },
			{ string : "timer" , value : 3 },
			{ string : "timer abbrechen", value : 5 }
		],
		callback : Callbacks.cancelTimer,
		score : 0
	}, //Cancel Timer
	{
		name : "Finish Timer",
		keywords : [
			{ string : "timer beenden", value : 5 },
			{ string : "timer stoppen", value : 5 }
		],
		callback : Callbacks.finishTimer,
		score : 0
	}, //Finish Timer
	{
		name : "Set Alarm",
		keywords : [
			{ string : "stelle einen wecker", value : 5 },
			{ string : "stelle wecker", value : 5 },
			{ string : "wecke mich", value : 5 },
			{ string : "weckt mich", value : 5 },
			{ string : "wecker", value : 1 },
		],
		callback : Callbacks.setAlarm,
		score : 0
	}, //Set Alarm
	{
		name : "Cancel Alarm",
		keywords : [
			{ string : "lösche", value : 3 },
			{ string : "wecker", value : 3 },
			{ string : "wecker löschen", value : 3 },
			{ stirng : "lösche meinen wecker", value : 5 },
			{ string : "schalte meinen wecker aus", value : 5 },
			{ string : "schalte wecker aus", value : 3 },
		],
		callback: Callbacks.cancelAlarm,
		score : 0
	}, //Cancel Alarm
	{
		name : "Note",
		keywords : [
			{ string : "notiz an mich", value : 5 },
			{ string : "schreibe notiz", value : 5 },
			{ string : "notiere", value : 5 },
			{ string : "schreibe eine notiz", value : 5 },
			{ string : "notiz", value : 3 }
		],
		callback : Callbacks.note,
		score : 0
	}, //Note
	{
		name : "Reminder",
		keywords : [
			{ string : "erinner mich", value : 5 },
			{ string : "erinnerung", value : 1 },
			{ string : "erstelle eine", value : 1 },
			{ string : "erinner", value : 1 },
			{ string : "timer", value : 1 }
		],
		callback : Callbacks.reminder2DE,
		score : 0
	}, //Reminder
	{
		name : "Calendar",
		keywords : [
			{ string : "erstelle ein", value : 5 },
			{ string : "erstelle", value : 5 },
			{ string : "plane ein", value : 3 },
			{ string : "plane", value : 3 },
			{ string : "trage ein", value : 1 },
			{ string : "füge", value : 1 },
			{ string : "zu meinem kalender hinzu", value : 5 },
			{ string : "kalender", value : 3}
		],
		callback : Callbacks.calendar2DE,
		score : 0
	}, //Calendar
	{
		name : "Cancel",
		keywords : [
			{ string : "abbrechen", value : 5 },
			{ string : "rüchgangig machen", value : 5 }
		],
		callback : Callbacks.cancel,
		score : 0
	}, //Cancel
	{
		name : "Calculate",
		keywords : [
			{ string : "berechne", value : 5 },
			{ string : "was ist ", value : 1 },
			{ string : "was sind", value : 3 },
			{ string : "+", value : 5 },
			{ string : "×", value : 5 },
			{ string : "÷", value : 5 },
			{ string : "-", value : 5 },
			{ string : "% von", value : 5 },
			{ string : "%", value : 1 },
			{ string : "von", value : 1 },
			{ string : "mal", value : 1 },
			{ string : "plus", value : 1 },
			{ string : "minus", value : 1 },
			{ string : "geteilt durch", value : 1 },
			{ string : "prozent von", value : 1 },
			{ string : "in", value : -3 }
		],
		callback : Callbacks.calculate,
		score : 0
	}, //Calculate
	{
		name : "Random Number",
		keywords : [
			{ string : "wähle eine zufällige zahl zwischen ", value : 5},
			{ string : "wähle", value : 1 },
			{ string : "zufällige zahl", value : 3 },
			{ string : "zwischen", value : 1 },
			{ string : "zufällig", value : 1 },
			{ string : "zahl", value : 1 },
			{ string : "und", value : 0 },
			{ string : "eine", value : 0 }
		],
		callback : Callbacks.random2,
		score : 0
	}, //Random Number
	{
		name : "Flip a Coin",
		keywords : [
			{ string : "wirf eine münze", value : 5 },
			{ string : "wirf", value : 1},
			{ string : "münze", value : 3}
		],
		callback : Callbacks.coin,
		score : 0
	}, //Flip a Coin
	{
		name : "Natural Weather",
		keywords : [
			{ string : "wird es heute regnen", value : 5 },
			{ string : "wird es morgen regnen", value : 5 },
			{ string : "wann wird es regnen", value : 5 },
			{ string : "um wieviel uhr wird es regnen", value : 5 },
			{ string : "wann wird es regnen", value : 5 },
			{ string : "wird es regnen", value : 3 },
			{ string : "anfangen zu regnen", value : 5 },
			{ string : "regen", value : 1 },
			{ string : "regnen", value : 1 },
			{ string : "wird es heute schneien", value : 5 },
			{ string : "wird es heute schneiden", value : 5 },
			{ string : "wird es morgen schneien", value : 5 },
			{ string : "wird es morgen schneiden", value : 5 },
			{ string : "wann wird es schneien", value : 5 },
			{ string : "wann wird es schneiden", value : 5 },
			{ string : "wann wird es anfangen zu schneien", value : 5 },
			{ string : "wird es schneien", value : 3 },
			{ string : "anfangen zu schneien", value : 3 },
			{ string : "wann wird es anfangen zu schneiden", value : 5 },
			{ string : "wird es schneiden", value : 3 },
			{ string : "anfangen zu schneiden", value : 3 },
			{ string : "schnee", value : 1 },
			{ string : "schneien", value : 1 },
			{ string : "schneiden", value : 1 },
			{ string : "wird es heute gewittern", value : 5 },
			{ string : "wird es morgen gewittern", value : 5 },
			{ string : "wird es heute stürmen", value : 5 },
			{ string : "wird es morgen stürmen", value : 5 },
			{ string : "wann wird es gewittern", value : 5 },
			{ string : "wann wird es stürmen", value : 5 },
			{ string : "gewitter", value : 3 },
			{ string : "sturm", value : 1 }
		],
		callback : Callbacks.naturalWeather,
		score : 0
	}, //Natural Weather
	{
		name : "Weather",
		keywords : [
			{ string : "wie ist das wetterr", value : 5 },
			{ string : "wie ist das wetter in", value : 5 },
			{ string : "wie ist das wetter für", value : 5 },
			{ string : "was ist", value : 1 },
			{ string : "was ist", value : 1 },
			{ string : "wetter", value : 3 },
			{ string : "draußen", value : 1 },
			{ string : "temperatur", value : 3 },
			{ string : "in", value : 0 },
			{ string : "für", value : 0},
			{ string : "die", value : 0 }
		],
		callback : Callbacks.weatherWU,
		score : 0
	}, //Weather
	{
		name : "Forecast",
		keywords : [
			{ string : "was ist die vorhersage für morgen", value : 5 },
			{ string : "was ist die vorhersage", value : 3 },
			{ string : "morgen", value : 1 },
			{ string : "wie wird das wetter morgen sein", value : 5 },
			{ string : "wetter morgen", value : 3 },
			{ string : "vorhersage für morgen", value : 3 },
			{ string : "vorhersage", value : 3 },
			{ string : "für", value : 0 },
			{ string : "in", value : 0 }
		],
		callback : Callbacks.forecastWU,
		score : 0
	}, //Forecast
	{
		name : "IFTTT Maker",
		keywords: [
			{ string : "trigger ereignis", value : 5 },
			{ string : "krieger ereignis", value : 5 },
			{ string : "trigger", value : 3 },
			{ string : "krieger", value : 3 },
			{ string : "tu mir einen gefallen", value : 5 },
			{ string : "bitte", value : 10 },
			{ string : "wie sagt man", value : 10 },
			{ string : "was ist", value : 5 }
		],
		callback : Callbacks.ifttt,
		score : 0
	}, //IFTTT
	{
		name : "Stock Prices",
		keywords : [
			{ string : "überprüfe den aktienpreis für", value : 5 },
			{ string : "überprüfe aktienpreis für", value : 5 },
			{ string : "überprüfe den aktienpreis von", value : 5 },
			{ string : "überprüfe aktienpreis", value : 3 },
			{ string : "aktienkurs", value : 5 },
			{ string : "wie steht die aktie von", value : 5 },
			{ string : "wie steht", value : 5 },
			{ string : "für", value : 0 },
			{ string : "die", value : 0 },
			{ string : "überprüfe", value : 1 },
			{ string : "aktien", value : 3 },
			{ string : "aktie", value : 3 },
			{ string : "preis", value : 3 },
			{ string : "aktuell", value : 0 },
			{ string : "den", value : 0 }
		],
		callback : Callbacks.stock,
		score : 0
	}, //Stock Prices
	{
		name : "Add To List",
		keywords : [
			{ string : "füge", value : 3 },
			{ string : "zu meiner ;iste hinzu", value : 3 },
			{ string : "zu meiner aufgabenliste hinzu", value : 5 },
			{ string : "to do", value : 1 },
			{ string : "zu", value : 0 }
		],
		callback : Callbacks.addTodo,
		score : 0
	}, //Add To List
	{
		name : "Check List",
		keywords : [
			{ string : "zeige meine aufgabenliste", value : 5 },
			{ string : "zeige mir meine liste", value : 5 },
			{ string : "was ist auf meiner liste", value : 5 },
			{ string : "was ist auf meiner aufgabenliste", value : 5 },
			{ string : "liste", value : 1 }
		],
		callback : Callbacks.checkTodo,
		score : 0
	}, //Check List
	{
		name : "Remove From List",
		keywords : [
			{ string : "lehre meine liste", value : 5 },
			{ string : "wäre meine liste", value : 5 },
			{ string : "legre liste", value : 5 },
			{ string : "wäre liste", value : 5 },
			{ string : "entferne", value : 1 },
			{ string : "von meiner liste", value : 3 },
			{ string : "von meiner aufgabenliste", value : 5 },
			{ string : "to do", value : 1 },
			{ string : "von", value : 1 }
		],
		callback : Callbacks.removeTodo,
		score : 0
	}, //Remove From List
	{
		name : "Clear List",
		keywords : [
			{ string : "leere liste", value : 5 },
			{ string : "leere meine liste", value : 5 },
			{ sring : "leere meine aufgabenliste", value : 5 },
			{ string : "leere", value : 1 }
		],
		callback : Callbacks.clearTodo,
		score : 0
	}, //Clear List,
	{
		name : "Habits",
		keywords : [
			{ string : "zeige alle meine habits", value : 5 },
			{ string : "zeige meine habits", value : 5 },
			{ string : "was sind meine habits", value : 5 },
			{ string : "was ist mein nächstes habit", value : 5 },
			{ string : "nächstes habit", value : 3 },
			{ string : "liste meiner habits", value : 3 },
			{ string : "alle meine habits", value : 3 },
			{ string : "meine habits", value : 3 },
			{ string : "zeige alle meine herbert", value : 5 },
			{ string : "zeige meine herbert", value : 5 },
			{ string : "was sind meine herbert", value : 5 },
			{ string : "was ist mein nächstes herbert", value : 5 },
			{ string : "nächstes herbert", value : 3 },
			{ string : "liste meiner herbert", value : 3 },
			{ string : "alle meine herbert", value : 3 },
			{ string : "meine herbert", value : 3 },
			{ string : "what is my current streak for", value : 3 },
			{ string : "what is my current count for", value : 3 },
			{ string : "streak", value : 1 },
			{ string : "momentaner", value : 1 },
			{ string : "count", value : 1 },
			{ string : "habits", value : 1 },
			{ string : "herbert", value : 1 },
			{ string : "für", value : 0 },
			{ string : "was ist", value : 0 },
			{ string : "mein", value : 0 }
		],
		callback : Callbacks.habits,
		score : 0
	},
	{
		name : "Fun - Hitchhiker's Guide",
		keywords : [
			{ string : "das leben, das universum und der ganze rest", value : 5 },
			{ string : "das leben das universum und der ganze rest", value : 5 },
			{ stirng : "leben", value : 3 },
			{ string : "universum", value : 3 },
			{ string : "ganze rest", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "42!!!", "BODY" : "" } ); },
		score : 0
	}, //Fun - Ultimate Question
				
	{
		name : "News",
		keywords : [
			{ string : "was sind die heutigen nachrichten", value : 5 },
			{ string : "sag mir die nachrichten", value : 5 },
			{ string : "was gibt es heute neues", value : 5 },
			{ string : "was gibt es neues", value : 3 },
			{ string : "die nachrichten", value : 3 },
			{ string : "nachrichten", value : 1 },
			{ string : "was gibt is", value : 3 }
		],
		callback : Callbacks.news,
		score : 0
	}	
];