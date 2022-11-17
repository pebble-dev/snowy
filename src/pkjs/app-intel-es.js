var Callbacks = require('./app-callbacks');

module.exports = [
	{
		name : "Translate",
		keywords : [
			{ string : "como digo", value : 5 },
			{ string : "qué es", value : 1 },
			{ string : "como se dice", value : 3 },
			{ string : "traducir", value : 3 },
			{ string : "traduce", value : 3 },
			{ string : "en", value : 0 }
		],
		callback : Callbacks.translate,
		score : 0
	}, //Translate
	{
		name : "Eat",
		keywords : [
			{ string : "dónde debería comer", value : 5 },
			{ string : "donde debería comer", value : 5 },
			{ string : "debería comer", value : 3 },
			{ string : "desayuno", value : 3 },
			{ string : "comida", value : 3 },
			{ string : "cena", value : 3 },
			{ string : "busca restaurantes cerca", value : 5 },
			{ string : "busca restaurantes", value : 3 },
			{ string : "busca", value : 1 },
			{ string : "sitio dónde comer", value : 3 },
			{ string : "dónde hay un buen sitio para comer", value : 5 },
			{ string : "dónde hay un sitio para comer", value : 5 },
			{ string : "tengo hambre", value : 3 }
		],
		callback : Callbacks.eat,
		score : 0
	}, //Eat
	{
		name : "Directions",
		keywords : [
			{ string : "consique direcciones", value : 5 },
			{ string : "darme direcciones", value : 5 },
			{ string : "cómo llego a", value : 5 },
			{ string : "cómo se llega a", value : 5 },
			{ string : "direcciones", value : 5 },
			{ string : "cual es camino más rápido para llegar a", value : 5 }
		],
		callback : Callbacks.directions,
		score : 0
	}, //Directions BETA
	{
		name : "Unit Conversion",
		keywords : [
			{ string : "convertir", value : 5 }
		],
		callback : Callbacks.conversion,
		score : 0
	}, //Unit Conversion BETA
	{
		name : "Sports",
		keywords : [
			{ string : "cuál es el resultado del", value : 5 },
			{ string : "resultado", value : 3 },
			{ string : "cual es el resultado del partido del", value : 5 },
			{ string : "cual es el resultado", value : 5 },
			{ string : "partido del", value : 3 },
			{ string : "cual es el", value : 0 },
			{ string : "partido", value : 3 },
			{ string : "cuando lo", value : 3 },
			{ string : "resultado del partido", value : 1},
			{ string : "jugar", value : 1 },
			{ string : "when is the", value : 5 },
			{ string : "juego", value : 3 },
			{ string : "cómo se dice", value : -5 },
			{ string : "cómo digo", value : -5 },
			{ string : "traduce", value : -5 }
		],
		callback : Callbacks.sports,
		score : 0
	}, //Sports BETA
	{
		name : "Health",
		keywords : [
			{ string : "cuántos pasos he caminado hoy", value : 5 },
			{ string : "cuántos pasos", value : 5 },
			{ string : "qué lejos he andado hoy", value : 5 },
			{ string : "qué lejos he andado", value : 5 },
			{ string : "pasos", value : 3 },
			{ string : "cuál es mi número de pasos", value : 5 },
			{ string : "número de pasos", value : 3 },
			{ string : "qué lejos", value : 3 },
			{ string : "cuál es mi meta de pasos", value : 5 },
			{ string : "meta de pasos", value : 3 },
			{ string : "lejos", value : 1 },
			{ string : "cómo dormí anoche", value : 5 },
			{ string : "dormí anoche", value : 5 },
			{ string : "dormir", value : 3 },
			{ string : "anoche", value : 3 },
			{ string : "noche", value : 1 }
		],
		callback : Callbacks.health,
		score : 0
	}, //Health BETA
	{
		name : "Introduction",
		keywords : [
			{ string : "di hola", value : 3 },
			{ string : "preséntate", value : 5 },
			{ string : "en", value : -1 }
		],
		callback : Callbacks.introduce,
		score : 0
	}, //Introduction
	{
		name : "Description",
		keywords : [
			{ string : "qué sabes hacer", value : 5 },
			{ string : "qué se decir", value : 5 }
		],
		callback : Callbacks.description,
		score : 0
	}, //Description
	{
		name : "Spell",
		keywords : [
			{ string : "cómo se escribe", value : 5 },
			{ string : "cómo escribo", value : 5 },
			{ string : "deletrear", value : 3 },
			{ string : "deletreando", value : 3 },
			{ string : "deletrea", value : 3 },
			{ string : "cómo se escribe correctamente", value : 5 }
		],
		callback : Callbacks.spell,
		score : 0
	}, //Spell
	{
		name : "Define",
		keywords : [
			{ string : "definir", value : 5 },
			{ string : "cuál es la definición de la", value : 5 },
			{ string : "definición de la", value : 3 },
			{ string : "definición", value : 1 },
			{ string : "qué significa", value : 3 },
			{ string : "que significa", value : 3 }
		],
		callback : Callbacks.defineES,
		score : 0
	}, //Definition
	{
		name : "Time",
		keywords : [
			{ string : "qué hora es", value : 5 },
			{ string : "hora", value : 1 }
		],
		callback : Callbacks.time,
		score : 0
	}, //Time
	{
		name : "Date",
		keywords : [
			{ string : "qué día es", value : 5 },
			{ string : "qué fecha es", value : 5 },
			{ string : "día", value : 1 },
			{ string : "fecha", value : 3 }
		],
		callback : Callbacks.date,
		score : 0
	}, //Date
	{
		name : "Set Timer",
		keywords : [
			{ string : "añadir cuenta atrás", value : 5 },
			{ string : "cuenta atrás", value : 3 },
			{ string : "ajustar el temporizador", value : 5 },
			{ string : "establecer un temporizador", value : 5 },
			{ string : "ajustar", value : 3 },
			{ string : "ajuste", value : 1 },
			{ string : "establecer", value : 3 },
			{ string : "establece", value : 1 },
			{ string : "una", value : 0 },
			{ string : "un", value : 0 },
			{ string : "temporizador", value : 3 },
			{ string : "para", value : 3 },
			{ string : "durante", value : 3 },
			{ string : "por", value : 0 }
		],
		callback : Callbacks.setTimer2,
		score : 0
	}, //Set Timer
	{
		name : "Check Timer",
		keywords : [
			{ string : "comprobar cuenta atrás", value : 5 },
			{ string : "cuenta atrás", value : 3 },
			{ string : "comprobar", value : 1 },
			{ string : "cuánto tiempo queda", value : 5 },
			{ string : "cuanto tiempo", value : 3 }
		],
		callback : Callbacks.checkTimer,
		score : 0
	}, //Check Timer
	{
		name : "Cancel Timer",
		keywords : [
			{ string : "cancelar cuenta atrás", value : 5 },
			{ string : "cancelar", value : 3 },
			{ string : "cuenta atrás" , value : 3 },
			{ string : "destruir cuenta atrás", value : 5 }
		],
		callback : Callbacks.cancelTimer,
		score : 0
	}, //Cancel Timer
	{
		name : "Finish Timer",
		keywords : [
			{ string : "terminar cuenta atrás", value : 5 }
		],
		callback : Callbacks.finishTimer,
		score : 0
	}, //Finish Timer
	{
		name : "Set Alarm",
		keywords : [
			{ string : "añadir alarma", value : 5 },
			{ string : "añadir una alarma", value : 5 },
			{ string : "alarma", value : 1 }
		],
		callback : Callbacks.setAlarm,
		score : 0
	}, //Set Alarm
	{
		name : "Cancel Alarm",
		keywords : [
			{ string : "cancelar", value : 3 },
			{ string : "alarma", value : 3 },
			{ string : "cancelar alarma", value : 3 },
			{ stirng : "cancelar mi alarma", value : 5 }
		],
		callback: Callbacks.cancelAlarm,
		score : 0
	}, //Cancel Alarm
	{
		name : "Note",
		keywords : [
			{ string : "nota mental", value : 5 },
			{ string : "añade una nota", value : 5 },
			{ string : "nota", value : 3 },
			{ string : "añade", value : 1 },
			{ string : "una", value : 0 }
		],
		callback : Callbacks.note,
		score : 0
	}, //Note
	{
		name : "Reminder",
		keywords : [
			{ string : "recuérdame", value : 5 },
			{ string : "recuerdame", value : 5 },
			{ string : "recordatorio", value : 1},
			{ string : "recordar", value : 1 },
			{ string : "cuenta atrás", value : -1 }
		],
		callback : Callbacks.reminder2ES,
		score : 0
	}, //Reminder
	{
		name : "Calendar",
		keywords : [
			{ string : "programa una", value : 5 },
			{ string : "programa un", value : 5 },
			{ string : "programa", value : 5 },
			{ string : "añade una", value : 1 },
			{ string : "añade un", value : 1 },
			{ string : "añade", value : 1 },
			{ string : "a mi calendario", value : 5 },
			{ string : "calendario", value : 3}
		],
		callback : Callbacks.calendar2ES,
		score : 0
	}, //Calendar
	{
		name : "Cancel",
		keywords : [
			{ string : "cancelar esa", value : 5 }
		],
		callback : Callbacks.cancel,
		score : 0
	}, //Cancel
	{
		name : "Calculate",
		keywords : [
			{ string : "calcular", value : 5 },
			{ string : "qué es", value : 1 },
			{ string : "que es", value : 1 },
			{ string : "cuanto son", value : 5 },
			{ string : "cuanto es", value : 3 },
			{ string : "cuanto", value : 3 },
			{ string : "+", value : 5 },
			{ string : "×", value : 5 },
			{ string : "÷", value : 5 },
			{ string : "-", value : 5 },
			{ string : "% de", value : 5 },
			{ string : "%", value : 1 },
			{ string : "lo", value : 0 },
			{ string : "el", value : 0 }
		],
		callback : Callbacks.calculate,
		score : 0
	}, //Calculate
	{
		name : "Random Number",
		keywords : [
			{ string : "elige un número aleatorio entre", value : 5},
			{ string : "elige ", value : 1 },
			{ string : "número aleatorio", value : 3 },
			{ string : "entre", value : 1 },
			{ string : "aleatorio", value : 1 },
			{ string : "número ", value : 1 },
			{ string : "y", value : 0 },
			{ string : "un", value : 0 }
		],
		callback : Callbacks.random2,
		score : 0
	}, //Random Number
	{
		name : "Flip a Coin",
		keywords : [
			{ string : "lanza una moneda", value : 5 },
			{ string : "lanza", value : 1 },
			{ string : "moneda", value : 3 },
			{ string : "caro", value : 3 },
			{ string : "cruz", value : 3 },
			{ string : "cara", value : 3 },
			{ string : "corona", value : 3 },
			{ string : "cara o numero", value : 3 },
			{ string : "escudo", value : 3 },
			{ string : "letra", value : 3 },
			{ string : "sello", value : 3 },
			{ string : "águila", value : 3 }
		],
		callback : Callbacks.coin,
		score : 0
	}, //Flip a Coin
	{
		name : "Weather",
		keywords : [
			{ string : "cual es el clima", value : 5 },
			{ string : "cual es el clima en", value : 5 },
			{ string : "cual es el clima para", value : 5 },
			{ string : "qué tiempo hace", value : 5 },
			{ string : "qué tiempo hace en", value : 5 },
			{ string : "qué tiempo hace para", value : 5 },
			{ string : "clima", value : 3 },
			{ string : "tiempo", value : 3 },
			{ string : "ahora", value : 1 },
			{ string : "hoy", value : 1 },
			{ string : "en", value : 0 },
			{ string : "para", value : 0}
		],
		callback : Callbacks.weatherWU,
		score : 0
	}, //Weather
	{
		name : "Forecast",
		keywords : [
			{ string : "cual es la previsión para mañana", value : 5 },
			{ string : "cual es la previsión", value : 3 },
			{ string : "qué tiempo hará mañana", value : 5 },
			{ string : "qué tiempo mañana", value : 3 },
			{ string : "tiempo mañana", value : 3 },
			{ string : "mañana", value : 1 },
			{ string : "qué va a hacer mañana", value : 5 },
			{ string : "hacer mañana", value : 3 },
			{ string : "previsión mañana", value : 3 },
			{ string : "previsión", value : 3 },
			{ string : "para", value : 0 },
			{ string : "en", value : 0 }
		],
		callback : Callbacks.forecastWU,
		score : 0
	}, //Forecast
	{
		name : "IFTTT Maker",
		keywords: [
			{ string : "lanza un evento", value : 5 },
			{ string : "lanza", value : 3 },
			{ string : "hazme un favor", value : 5 },
			{ string : "por favor", value : 10 },
			{ string : "cómo se dice", value : -10 },
			{ string : "cual es", value : -5 }
		],
		callback : Callbacks.ifttt,
		score : 0
	}, //IFTTT
	{
		name : "Stock Prices",
		keywords : [
			{ string : "comprobar el precio de las acciones de", value : 5 },
			{ string : "comprobar precio de las acciones de", value : 5 },
			{ string : "comprobar precio de las acciones", value : 3 },
			{ string : "de", value : 0 },
			{ string : "el", value : 0 },
			{ string : "comprobar", value : 1 },
			{ string : "de las acciones", value : 3 },
			{ string : "precio", value : 3 },
			{ string : "actual", value : 0 }
		],
		callback : Callbacks.stock,
		score : 0
	}, //Stock Prices
	{
		name : "Add To List",
		keywords : [
			{ string : "añade", value : 3 },
			{ string : "a mi lista", value : 3 },
			{ string : "a mi lista de tareas", value : 5 },
			{ string : "de tareas", value : 1 },
			{ string : "mi lista", value : 3 },
			{ string : "lista", value : 0 }
		],
		callback : Callbacks.addTodo,
		score : 0
	}, //Add To List
	{
		name : "Check List",
		keywords : [
			{ string : "revisa mi lista de tareas", value : 5 },
			{ string : "revisa mi lista", value : 5 },
			{ string : "qué hay en mi lista", value : 5 },
			{ string : "qué hay en mi lista de tareas", value : 5 },
			{ string : "lista", value : 1 },
			{ string : "revisa", value : 1 }
		],
		callback : Callbacks.checkTodo,
		score : 0
	}, //Check List
	{
		name : "Remove From List",
		keywords : [
			{ string : "eliminar", value : 1 },
			{ string : "de mi lista", value : 3 },
			{ string : "de mi lista de tareas", value : 5 },
			{ string : "de tareas", value : 1 },
			{ string : "de", value : 1 }
		],
		callback : Callbacks.removeTodo,
		score : 0
	}, //Remove From List
	{
		name : "Clear List",
		keywords : [
			{ string : "limpia lista", value : 5 },
			{ string : "limpia mi lista", value : 5 },
			{ string : "limpia mi lista de tareas", value : 5 },
			{ string : "limpia", value : 1 }
		],
		callback : Callbacks.clearTodo,
		score : 0
	}, //Clear List
	{
		name : "Habits",
		keywords : [
			{ string : "lista de todos mis hábitos", value : 5 },
			{ string : "cuáles son todos mis hábitos", value : 5 },
			{ string : "enumerar mis hábitos", value : 5 },
			{ string : "cuáles son mis hábitos", value : 5 },
			{ string : "cuando es mi hábito siguiente", value : 5 },
			{ string : "hábito siguiente", value : 3 },
			{ string : "lista de los hábitos", value : 3 },
			{ string : "todos mis hábitos", value : 3 },
			{ string : "mis hábitos", value : 3 },
			{ string : "lo que es mi actual racha para", value : 3 },
			{ string : "cuál es mi recuento actual para", value : 3 },
			{ string : "racha", value : 1 },
			{ string : "corriente", value : 1 },
			{ string : "contar", value : 1 },
			{ string : "hábitos", value : 1 },
			{ string : "para", value : 0 },
			{ string : "que es", value : 0 },
			{ string : "mi", value : 0 }
		],
		callback : Callbacks.habits,
		score : 0
	}
];