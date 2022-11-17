var Callbacks = require('./app-callbacks');

module.exports = [
{
		name : "Translate",
		keywords : [
			{ string : "comment dit-on", value : 5 },
			{ string : "que veut dire", value : 3 },
			{ string : "traduit", value : 5 },
			{ string : "traduire", value : 5 },
			{ string : "en", value : 0 }
		],
		callback : Callbacks.translate,
		score : 0
	}, //Translate
	{
		name : "Eat",
		keywords : [
			{ string : "où devrais-je manger", value : 5 },
			{ string : "où puis-je trouver un endroit pour manger", value : 5 },
			{ string : "trouver", value : 3 },
			{ string : "manger", value : 3 },
			{ string : "restaurants", value : 3 },
			{ string : "j'ai faim", value : 3 }
		],
		callback : Callbacks.eat,
		score : 0
	}, //Eat
	{
		name : "Directions",
		keywords : [
			{ string : "comment aller-là", value : 5 },
			{ string : "comment aller au", value : 5 },
			{ string : "comment aller à la", value : 5 },
			{ string : "comment aller", value : 3 },
			{ string : "comment rentrer à la", value : 5 },
			{ string : "comment rentrer", value : 3 },
			{ string : "au", value : 1 },
			{ string : "à la", value : 1 },
			{ string : "à", value : 0 },
		],
		callback : Callbacks.directions,
		score : 0
	}, //Directions BETA
	{
		name : "Unit Conversion",
		keywords : [
			{ string : "convertir", value : 5 },
			{ string : "convertis", value : 5 }
		],
		callback : Callbacks.conversion,
		score : 0
	}, //Unit Conversion BETA
	{
		name : "Sports",
		keywords : [
			{ string : "quel est le score du match", value : 5 },
			{ string : "quel est le score", value : 3 },
			{ string : "quand", value : 1 },
			{ string : "va rejouer", value : 3 },
			{ string : "contre qui", value : 1},
			{ string : "score", value : 3 },
			{ string : "match", value : 3 },
			{ string : "a joué la dernière fois", value : 3 }
		],
		callback : Callbacks.sports,
		score : 0
	}, //Sports BETA
	{
		name : "Health",
		keywords : [
			{ string : "combien de pas ai-je marché aujourd'hui", value : 5 },
			{ string : "combien de pas ai-je fait", value : 5 },
			{ string : "combien de pas", value : 3 },
			{ string : "quelle distance ai-je parcouru aujourd-hui", value : 5 },
			{ string : "quelle distance", value : 3 },
			{ string : "quel est mon objectif de pas", value : 5 },
			{ string : "objectif de pas", value : 3 },
			{ string : "comment ai-je dormi hier soir", value : 5 },
			{ string : "dormi", value : 3 },
			{ string : "hier soir", value : 3 },
			{ string : "meta de pasos", value : 3 }
		],
		callback : Callbacks.health,
		score : 0
	}, //Health BETA
	{
		name : "Introduction",
		keywords : [
			{ string : "dites bonjour", value : 3 },
			{ string : "présente toi", value : 5 },
			{ string : "en", value : -1 }
		],
		callback : Callbacks.introduce,
		score : 0
	}, //Introduction
	{
		name : "Description",
		keywords : [
			{ string : "que peux-tu faire", value : 5 },
			{ string : "que puis-je dire", value : 5 }
		],
		callback : Callbacks.description,
		score : 0
	}, //Description
	{
		name : "Spell",
		keywords : [
			{ string : "épeler", value : 5 },
			{ string : "comment épelle-t-on", value : 5 },
			{ string : "épelle-t-on", value : 3 }
		],
		callback : Callbacks.spell,
		score : 0
	}, //Spell
	{
		name : "Define",
		keywords : [
			{ string : "définition d'", value : 5 },
			{ string : "défintiond'", value : 5 },
			{ string : "donne moi la définition de", value : 5 },
			{ string : "définition de", value : 5 },
			{ string : "définition", value : 3 },
			{ string : "de", value : 0 }
		],
		callback : Callbacks.defineFR,
		score : 0
	}, //Definition
	{
		name : "Time",
		keywords : [
			{ string : "quelle heure est-il à", value : 5 },
			{ string : "quelle heure est", value : 5 },
			{ string : "quelle heure", value : 3 }
		],
		callback : Callbacks.time,
		score : 0
	}, //Time
	{
		name : "Date",
		keywords : [
			{ string : "quel jour sommes nous", value : 5 },
			{ string : "quelle est la date", value : 5 },
			{ string : "la date", value : 1 },
			{ string : "quel jour", value : 3 }
		],
		callback : Callbacks.date,
		score : 0
	}, //Date
	{
		name : "Set Timer",
		keywords : [
			{ string : "lance un minuteur de", value : 5 },
			{ string : "lance un minuteur d'", value : 5 },
			{ string : "lance un minuteur", value : 3 },
			{ string : "minuteur", value : 1 }
		],
		callback : Callbacks.setTimer2,
		score : 0
	}, //Set Timer
	{
		name : "Check Timer",
		keywords : [
			{ string : "vérife le minuteur", value : 5 },
			{ string : "vérife", value : 3 },
			{ string : "minuteur", value : 1 },
			{ string : "combien de temps reste-t-il", value : 5 }
		],
		callback : Callbacks.checkTimer,
		score : 0
	}, //Check Timer
	{
		name : "Cancel Timer",
		keywords : [
			{ string : "annule le minuteur", value : 5 },
			{ string : "annule", value : 3 },
			{ string : "minuteur" , value : 1 },
			{ string : "supprime le minuteur", value : 5 }
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
			{ string : "régler une alarme", value : 5 },
			{ string : "programme une alarme", value : 5 },
			{ string : "crée une alarme", value : 5 },
			{ string : "régler", value : 3 },
			{ string : "programme", value : 3 },
			{ string : "une alarme", value : 3 },
			{ string : "alarme", value : 1 },
			{ string : "réveille moi", value : 3 },
		],
		callback : Callbacks.setAlarm,
		score : 0
	}, //Set Alarm
	{
		name : "Cancel Alarm",
		keywords : [
			{ string : "annule l'alarme", value : 5 },
			{ string : "annule", value : 3 },
			{ string : "l'alarme", value : 1 },
			{ string : "alarme", value : 1 },
			{ stirng : "arrête l'alarme", value : 5 }
		],
		callback: Callbacks.cancelAlarm,
		score : 0
	}, //Cancel Alarm
	{
		name : "Note",
		keywords : [
			{ string : "note", value : 5 },
			{ string : "noter", value : 5 },
		],
		callback : Callbacks.note,
		score : 0
	}, //Note
	{
		name : "Reminder",
		keywords : [
			{ string : "rappelle-moi de", value : 5 },
			{ string : "rappelle-moi d'", value : 5 },
			{ string : "rappelle-moi", value : 5 },
			{ string : "rappelle moi", value : 5 },
			{ string : "crée un rappel", value : 1},
			{ string : "rappelle", value : 3 },
			{ string : "rappel", value : 1 }
		],
		callback : Callbacks.reminder2FR,
		score : 0
	}, //Reminder
	{
		name : "Calendar",
		keywords : [
			{ string : "programme une", value : 5 },
			{ string : "programme", value : 3 },
			{ string : "ajoute", value : 5 },
			{ string : "dans mon calendrier", value : 5 },
			{ string : "mon calendrier", value : 3 },
			{ string : "calendrier", value : 1 }
		],
		callback : Callbacks.calendar2,
		score : 0
	}, //Calendar
	{
		name : "Cancel",
		keywords : [
			{ string : "annule ça", value : 5 }
		],
		callback : Callbacks.cancel,
		score : 0
	}, //Cancel
	{
		name : "Calculate",
		keywords : [
			{ string : "combien font", value : 1 },
			{ string : "combien fait", value : 1 },
			{ string : "+", value : 5 },
			{ string : "×", value : 5 },
			{ string : "÷", value : 5 },
			{ string : " -", value : 5 },
			{ string : "% de", value : 5 },
			{ string : "%", value : 3 }
		],
		callback : Callbacks.calculate,
		score : 0
	}, //Calculate
	{
		name : "Random Number",
		keywords : [
			{ string : "choisir un nombre", value : 5 },
			{ string : "choisi un nombre", value : 5 },
			{ string : "donner un nombre au hasard", value : 5},
			{ string : "nombre au hasard", value : 3 },
		],
		callback : Callbacks.random2,
		score : 0
	}, //Random Number
	{
		name : "Flip a Coin",
		keywords : [
			{ string : "lancer une pièce", value : 5 },
			{ string : "lancer", value : 1},
			{ string : "pièce", value : 3}
		],
		callback : Callbacks.coin,
		score : 0
	}, //Flip a Coin
	{
		name : "Weather",
		keywords : [
			{ string : "combien font", value : 3 },
			{ string : "combien fait", value : 3 },
			{ string : "quel temps fait-il", value : 5 },
			{ string : "quel est la météo en", value : 5 },
			{ string : "quel est la météo pour", value : 5 },
			{ string : "quel est la météo", value : 5 },
			{ string : "quelle température fait-t-il dehos", value : 5 },
			{ string : "météo", value : 3 },
			{ string : "en", value : 1 },
			{ string : "pour", value : 1 }
		],
		callback : Callbacks.weatherWU,
		score : 0
	}, //Weather
	{
		name : "Forecast",
		keywords : [
			{ string : "quelle est la météo pour demain", value : 5 },
			{ string : "quel temps fera-t-il demain", value : 5 },
			{ string : "météo", value : 1 },
			{ string : "demain", value : 3 },
			{ string : "en", value : 1 }
		],
		callback : Callbacks.forecastWU,
		score : 0
	}, //Forecast
	{
		name : "IFTTT Maker",
		keywords: [
			{ string : "s'il te plaît", value : 10 },
			{ string : "s'il te plait", value : 10 },
			{ string : "s'il vous plaît", value : 10 },
			{ string : "s'il vous plait", value : 10 },
			{ string : "comment dit-on", value : -10 },
		],
		callback : Callbacks.ifttt,
		score : 0
	}, //IFTTT
	{
		name : "Stock Prices",
		keywords : [
			{ string : "ce qui est le prix des actions de", value : 5 },
			{ string : "de", value : 0 },
			{ string : "des actions", value : 3 },
			{ string : "prix", value : 3 }
		],
		callback : Callbacks.stock,
		score : 0
	}, //Stock Prices
	{
		name : "Add To List",
		keywords : [
			{ string : "rajoute", value : 5 },
			{ string : "ajoute", value : 3 },
			{ string : "à ma liste", value : 5 },
			{ string : "à la liste", value : 3 },
			{ string : "liste", value : 1 }
		],
		callback : Callbacks.addTodo,
		score : 0
	}, //Add To List
	{
		name : "Check List",
		keywords : [
			{ string : "affiche la liste", value : 5 },
			{ string : "qu'y a-t-il sur ma liste", value : 5 },
			{ string : "liste", value : 3 }
		],
		callback : Callbacks.checkTodo,
		score : 0
	}, //Check List
	{
		name : "Remove From List",
		keywords : [
			{ string : "supprime", value : 5 },
			{ string : "de la liste", value : 5 },
			{ string : "de ma liste", value : 5 },
			{ string : "liste", value : 1 },
		],
		callback : Callbacks.removeTodo,
		score : 0
	}, //Remove From List
	{
		name : "Clear List",
		keywords : [
			{ string : "efface toute ma liste", value : 5 },
			{ string : "efface ma liste", value : 5 },
			{ string : "efface toute la liste", value : 5 },
			{ string : "efface la liste", value : 5 },
			{ string : "efface", value : 5 },
			{ string : "vide la liste", value : 5 },
			{ string : "vide", value : 3 },
			{ string : "liste", value : 1 }
		],
		callback : Callbacks.clearTodo,
		score : 0
	}, //Clear List
	{
		name : "Habits",
		keywords : [
			{ string : "liste de toutes mes habitudes", value : 5 },
			{ string : "qui toutes mes habitutdes sont", value : 5 },
			{ string : "énumérer mes habitudes", value : 5 },
			{ string : "quelles sont mes habitudes", value : 5 },
			{ string : "quand ma prochaine habitude", value : 5 },
			{ string : "prochaine habitude", value : 3 },
			{ string : "liste des habitudes", value : 3 },
			{ string : "toutes mes habitudes", value : 3 },
			{ string : "mes habitudes", value : 3 },
			{ string : "ce qui est ma série actuelle pour", value : 3 },
			{ string : "quel est mon nombre actuel", value : 3 },
			{ string : "strier", value : 1 },
			{ string : "courant", value : 1 },
			{ string : "contar", value : 1 },
			{ string : "habitudes", value : 1 },
			{ string : "pour", value : 0 },
			{ string : "quel est", value : 0 },
			{ string : "mes", value : 0 }
		],
		callback : Callbacks.habits,
		score : 0
	}
];