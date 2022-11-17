var Callbacks = require('./app-callbacks');

module.exports = [
	{
		name : "Translate",
		keywords : [
			{ string : "como se diz", value : 5 },
			{ string : "o que é", value : 1 },
			{ string : "como se fala", value : 3 },
			{ string : "traduzir", value : 3 },
			{ string : "em", value : 0 },
			{ string : "em", value : 0 }
		],
		callback : Callbacks.translate,
		score : 0
	}, //Translate
	{
		name : "Food",
		keywords : [
			{ string : "aonde eu deveria comer", value : 5 },
			{ string : "café da manhã", value : 3 },
			{ string : "onde eu devo comer", value : 5 },
			{ string : "almoço", value : 3 },
			{ string : "aonde eu deveria almoçar", value : 5 },
			{ string : "deveria", value : 3 },
			{ string : "jantar", value : 3 },
			{ string : "encontre restaurantes perto de mim", value : 5 },
			{ string : "encontre restaurantes", value : 3 },
			{ string : "encontre", value : 1 },
			{ string : "lugar para comer", value : 3 },
			{ string : "onde eu posso encontrar um bom lugar para comer", value : 5 },
			{ string : "onde eu posso encontrar um lugar para comer", value : 5 },
			{ string : "onde tem um bom lugar para comer", value : 5 },
			{ string : "estou com fome", value : 3 },
			{ string : "estou faminto", value : 3 }
		],
		callback : Callbacks.eat,
		score : 0
	}, //Eat
	{
		name : "Directions",
		keywords : [
			{ string : "rota", value : 5 },
			{ string : "me mostre o caminho", value : 5 },
			{ string : "como eu chego", value : 5 },
			{ string : "como se chega", value : 5 },
			{ string : "rotas", value : 5 },
			{ string : "qual a rota", value : 5 }
		],
		callback : Callbacks.directions,
		score : 0
	}, //Directions BETA
	{
		name : "Unit Conversion",
		keywords : [
			{ string : "converta", value : 5 },
			{ string : "converter", value : 5 }
		],
		callback : Callbacks.conversion,
		score : 0
	}, //Unit Conversion BETA
	{
		name : "Sports",
		keywords : [
			{ string : "qual a pontuação do", value : 5 },
			{ string : "pontuação do", value : 3 },
			{ string : "jogo", value : 3 },
			{ string : "quando os", value : 3 },
			{ string : "pontuação", value : 1},
			{ string : "jogar", value : 1 },
			{ string : "quando é o", value : 5 },
			{ string : "quem fez o", value : 5 },
			{ string : "quem são os", value : 5 },
			{ string : "próximo", value : 1 },
			{ string : "último", value : 1 },
			{ string : "jogando", value : 3 },
			{ string : "como se diz", value : -5 },
			{ string : "como eu digo", value : -5 },
			{ string : "traduza", value : -5 }
		],
		callback : Callbacks.sports,
		score : 0
	}, //Sports BETA
	{
		name : "Health",
		keywords : [
			{ string : "quantos passos eu dei hoje", value : 5 },
			{ string : "quantos passos", value : 5 },
			{ string : "quanto eu andei hoje", value : 5 },
			{ string : "quanto eu andei", value : 5 },
			{ string : "passos", value : 3 },
			{ string : "qual minha contagem de passos", value : 5 },
			{ string : "contagem de passos", value : 3 },
			{ string : "quão longe", value : 3 },
			{ string : "qual é a minha meta de passos", value : 5 },
			{ string : "qual minha meta de passos", value : 5 },
			{ string : "step goal", value : 3 },
			{ string : "longe", value : 1 },
			{ string : "como eu dormi na última noite", value : 5 },
			{ string : "dormir", value : 3 },
			{ string : "última noite", value : 3 },
			{ string : "noite", value : 1 },
			{ string : "quanto eu dormi", value : 3 }
		],
		callback : Callbacks.health,
		score : 0
	}, //Health BETA
	{
		name : "Introduction",
		keywords : [
			{ string : "apresente-se", value : 5 },
			{ string : "diga olá", value : 3 },
			{ string : "se apresente", value : 5 },
			{ string : "em", value : -1 },
		],
		callback : Callbacks.introduce,
		score : 0
	}, //Introduction
	{
		name : "Description",
		keywords : [
			{ string : "o que você pode fazer", value : 5 },
			{ string : "o que eu posso dizer", value : 5 }
		],
		callback : Callbacks.description,
		score : 0
	}, //Description
	{
		name : "Spell",
		keywords : [
			{ string : "como se soletra", value : 5 },
			{ string : "como eu soletro", value : 5 },
			{ string : "soletre", value : 3 },
			{ string : "soletrar", value : 3 }
		],
		callback : Callbacks.spell,
		score : 0
	}, //Spell
	{
		name : "Define",
		keywords : [
			{ string : "defina", value : 5 },
			{ string : "qual a definição de", value : 5 },
			{ string : "definição de", value : 3 },
			{ string : "definição", value : 1 },
			{ string : "de", value : 0 }
		],
		callback : Callbacks.definePT,
		score : 0
	}, //Define
	{
		name : "Time",
		keywords : [
			{ string : "que horas são", value : 5 },
			{ string : "hora", value : 1 },
			{ string : "qual é a hora", value : 3 },
			{ string : "hora atual", value : 3 }
		],
		callback : Callbacks.time,
		score : 0
	}, //Time
	{
		name : "Date",
		keywords : [
			{ string : "que dia é hoje", value : 5 },
			{ string : "qual é a data de hoje", value : 5 },
			{ string : "qual a data de hoje", value : 5 },
			{ string : "dia", value : 1 },
			{ string : "data", value : 3 }
		],
		callback : Callbacks.date,
		score : 0
	}, //Date
	{
		name : "Set Timer",
		keywords : [
			{ string : "crie um timer", value : 5 },
			{ string : "timer", value : 3 },
			{ string : "marque um timer", value : 1 },
			{ string : "as", value : 0 },
			{ string : "para", value : 0 },
			{ string : "e", value : 0},
			{ string : "um", value : 0 }
		],
		callback : Callbacks.setTimer2,
		score : 0
	}, //Set Timer
	{
		name : "Check Timer",
		keywords : [
			{ string : "checar timer", value : 5 },
			{ string : "timer", value : 3 },
			{ string : "checar", value : 1 },
			{ string : "quanto tempo falta", value : 5 },
			{ string : "quanto tempo", value : 3 }
		],
		callback : Callbacks.checkTimer,
		score : 0
	}, //Check Timer
	{
		name : "Cancel Timer",
		keywords : [
			{ string : "cancelar timer", value : 5 },
			{ string : "cancelar", value : 3 },
			{ string : "timer" , value : 3 },
			{ string : "destruir timer", value : 5 }
		],
		callback : Callbacks.cancelTimer,
		score : 0
	}, //Cancel Timer
	{
		name : "Finish Timer",
		keywords : [
			{ string : "terminar timer", value : 5 },
			{ string : "termine o timer", value : 5 }
		],
		callback : Callbacks.finishTimer,
		score : 0
	}, //Finish Timer
	{
		name : "Set Alarm",
		keywords : [
			{ string : "crie um alarme", value : 5 },
			{ string : "criar alarme", value : 5 },
			{ string : "me acorde", value : 5 },
{ string : "adicionar alarme", value : 5 },
			{ string : "alarme", value : 1 }
		],
		callback : Callbacks.setAlarm,
		score : 0
	}, //Set Alarm
	{
		name : "Cancel Alarm",
		keywords : [
			{ string : "cancelar", value : 3 },
			{ string : "alarme", value : 3 },
			{ string : "cancelar alarme", value : 3 },
			{ string : "cancele o alarme", value : 3 },
			{ stirng : "cancele o meu alarme", value : 5 },
			{ string : "desligue o meu alarme", value : 5 },
			{ string : "desligar alarme", value : 3 }
		],
		callback: Callbacks.cancelAlarm,
		score : 0
	}, //Cancel Alarm
	{
		name : "Note",
		keywords : [
			{ string : "anote isso", value : 5 },
			{ string : "anote", value : 5 },
			{ string : "nota", value : 5 },
			{ string : "anota aí", value : 5 },
			{ string : "nota pra mim mesmo", value : 3 },
			{ string : "nota pra mim mesma", value : 3 }
		],
		callback : Callbacks.note,
		score : 0
	}, //Note
	{
		name : "Reminder",
		keywords : [
			{ string : "me lembre", value : 5 },
			{ string : "lembrete", value : 1 },
			{ string : "crie um", value : 1 },
			{ string : "lembre", value : 1 },
			{ string : "timer", value : -1 }
		],
		callback : Callbacks.reminder2PT,
		score : 0
	}, //Reminder
	{
		name : "Calendar",
		keywords : [
			{ string : "agende um", value : 5 },
			{ string : "agende", value : 5 },
			{ string : "adicione um", value : 1 },
			{ string : "adicione", value : 1 },
			{ string : "pra minha agenda", value : 5 },
			{ string : "agenda", value : 3},
			{ string : "programe um", value : 3}
		],
		callback : Callbacks.calendar2PT,
		score : 0
	}, //Calendar
	{
		name : "Cancel",
		keywords : [
			{ string : "cencele isso", value : 5 }
		],
		callback : Callbacks.cancel,
		score : 0
	}, //Cancel
	{
		name : "Calculate",
		keywords : [
			{ string : "calcular", value : 5 },
			{ string : "calcule", value : 5 },
			{ string : "quanto é", value : 1 },
			{ string : "+", value : 5 },
			{ string : "×", value : 5 },
			{ string : "÷", value : 5 },
			{ string : "-", value : 5 },
			{ string : "% de", value : 5 },
			{ string : "%", value : 1 },
			{ string : "vezes", value : 1 },
			{ stirng : "mais", value : 1 },
			{ string : "menos", value : 1 },
			{ string : "dividido", value : 1 },
			{ string : "porcento de", value : 1 },
			{ string : "em", value : -3 }
		],
		callback : Callbacks.calculate,
		score : 0
	}, //Calculate
	{
		name : "Random Number",
		keywords : [
			{ string : "escolha um número aleatório entre ", value : 5},
			{ string : "escolha", value : 1 },
			{ string : "número aleatório", value : 3 },
			{ string : "entre", value : 1 },
			{ string : "aleatório", value : 1 },
			{ string : "número", value : 1 },
			{ string : "e", value : 0 },
			{ string : "a", value : 0 }
		],
		callback : Callbacks.random2,
		score : 0
	}, //Random Number
	{
		name : "Flip a Coin",
		keywords : [
			{ string : "cara ou coroa", value : 5 },
			{ string : "moeda", value : 3}
		],
		callback : Callbacks.coin,
		score : 0
	}, //Flip a Coin
	{
		name : "Weather",
		keywords : [
			{ string : "como está o tempo", value : 5 },
			{ string : "como está o tempo em", value : 5 },
			{ string : "como está o tempo para", value : 5 },
			{ string : "como é", value : 1 },
			{ string : "tempo", value : 3 },
			{ string : "lá fora", value : 1 },
			{ string : "temperatura", value : 3 },
			{ string : "em", value : 0 },
			{ string : "para", value : 0},
			{ string : "o", value : 0 }
		],
		callback : Callbacks.weatherWU,
		score : 0
	}, //Weather
	{
		name : "Forecast",
		keywords : [
			{ string : "qual a previsão do tempo para amanhã", value : 5 },
			{ string : "qual a previsão do tempo", value : 3 },
			{ string : "amanhã", value : 1 },
			{ string : "como vai estar o tempo amanhã", value : 5 },
			{ string : "tempo amanhã", value : 3 },
			{ string : "previsão do tempo de amanhã", value : 3 },
			{ string : "previsão do tempo", value : 3 },
			{ string : "para", value : 0 },
			{ string : "em", value : 0 }
		],
		callback : Callbacks.forecastWU,
		score : 0
	}, //Forecast
	{
		name : "IFTTT Maker",
		keywords: [
			{ string : "ativar evento", value : 5 },
			{ string : "ative", value : 3 },
			{ string : "me faça um favor", value : 5 },
			{ string : "por favor", value : 10 },
			{ string : "como se diz", value : -10 },
			{ string : "o que é", value : -5 }
		],
		callback : Callbacks.ifttt,
		score : 0
	}, //IFTTT
	{
		name : "Stock Prices",
		keywords : [
			{ string : "checar o preço das ações para", value : 5 },
			{ string : "checar preço das ações para", value : 5 },
			{ string : "checar preço das ações", value : 3 },
			{ string : "para", value : 0 },
			{ string : "o", value : 0 },
			{ string : "checar", value : 1 },
			{ string : "ações", value : 3 },
			{ string : "preço", value : 3 },
			{ string : "atual", value : 0 }
		],
		callback : Callbacks.stock,
		score : 0
	}, //Stock Prices
	{
		name : "Add To List",
		keywords : [
			{ string : "adicionar", value : 3 },
			{ string : "a minha lista", value : 3 },
			{ string : "para minha lista", value : 5 },
			{ string : "a fazer", value : 1 },
			{ string : "a", value : 0 }
		],
		callback : Callbacks.addTodo,
		score : 0
	}, //Add To List
	{
		name : "Check List",
		keywords : [
			{ string : "cheque minha lista de a fazeres", value : 5 },
			{ string : "cheque minha lista", value : 5 },
			{ string : "o que está na minha lista", value : 5 },
			{ string : "o que está na minha lista de a fazeres", value : 5 },
			{ string : "lista", value : 1 },
			{ string : "checar", value : 1 }
		],
		callback : Callbacks.checkTodo,
		score : 0
	}, //Check List
	{
		name : "Remove From List",
		keywords : [
			{ string : "remover", value : 1 },
			{ string : "da minha lista", value : 3 },
			{ string : "da minha lista de a fazeres", value : 5 },
			{ string : "a fazeres", value : 1 },
			{ string : "da", value : 1 }
		],
		callback : Callbacks.removeTodo,
		score : 0
	}, //Remove From List
	{
		name : "Clear List",
		keywords : [
			{ string : "limpar lista", value : 5 },
			{ string : "limpar minha lista", value : 5 },
			{ string : "limpar minha lista de a fazeres", value : 5 },
			{ string : "limpar", value : 1 }
		],
		callback : Callbacks.clearTodo,
		score : 0
	}, //Clear List,
	{
		name : "Habits",
		keywords : [
			{ string : "liste todos os meus hábitos", value : 5 },
			{ string : "quais são os meus hábitos", value : 5 },
			{ string : "liste meus hábitos", value : 5 },
			{ string : "quais são meus hábitos", value : 5 },
			{ string : "qual o meu próximo hábito", value : 5 },
			{ string : "próximo hábito", value : 3 },
			{ string : "lista de hábitos", value : 3 },
			{ string : "todos os meus hábitos", value : 3 },
			{ string : "meus hábitos", value : 3 },
			{ string : "qual a minha sequência atual para", value : 3 },
			{ string : "qual a minha contagem atual para", value : 3 },
			{ string : "sequência", value : 1 },
			{ string : "atual", value : 1 },
			{ string : "contagem", value : 1 },
			{ string : "hábitos", value : 1 },
			{ string : "para", value : 0 },
			{ string : "qual é", value : 0 },
			{ string : "meu", value : 0 }
		],
		callback : Callbacks.habits,
		score : 0
	},
	{
		name : "Fun - Over 9000",
		keywords : [
			{ string : "o que o scouter diz sobre seu nível de poder", value : 5 },
			{ string : "scouter", value : 3 },
			{ string : "nível de poder", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "É mais de 8 mil!!!", "BODY" : "\nO QUÊ!? 8,000?!?\n" } ); },
		score : 0
	}, //Fun - Over 9000
	{
		name : "Fun - Hitchhiker's Guide",
		keywords : [
			{ string : "a vida, o universo e todas as coisas", value : 5 },
			{ string : "a vida o universo e todas as coisas", value : 5 },
			{ stirng : "vida", value : 3 },
			{ string : "universo", value : 3 },
			{ string : "todas as coisas", value : 3 }
		],
		callback : function(q){ Pebble.sendAppMessage( { "TITLE" : "42!!!", "BODY" : "" } ); },
		score : 0
	}
];