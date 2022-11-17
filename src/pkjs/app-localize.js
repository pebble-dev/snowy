var Config = require('./app-settings');
/*
var dict = {
	"Thank You!" : "",
	"Thank you for supporting Snowy! Please give it a ❤ if you haven't already. There are some exciting features in Version 3.3 - check MyDogSnowy.com/changelog for more info." : "",
	
	"I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information." : "",
	
	//IFTTT Plus
	"snowy_reminder" : "",
	"snowy_calendar" : "",
	"snowy_alarm" : "",
	"snowy_note" : "",
	
	//Introduce
	"Hi, I'm Snowy!" : "",
	"I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?" : "",
	
	//Description
	"I can do lots of things!" : "",
	"Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com" : "",
	
	//Spell
	"Sorry..." : "",
	"I'm afraid I don't know how to spell that! Could you please try again?" : "",
	
	//Time
	"The time is " : "",
	"The time is now!" : "",
	"Sorry, I don't know what time it is in " : "",
	"Local Time in " : "",
	"Uh-oh" : "",
	"Something went wrong - I don't know what time it is! Ironic, huh?" : "",
	"in" : "", //Detect request for time in specific city
	
	//Date
	"Today is " : "",
	"Something went wrong - I don't know what today's date is!" : "",
	
	//Set Alarm
	"tomorrow" : "", //Detect keyword 'tomorrow', add 1 day to time
	"at" : "", //Detect specific time
	"Alarm" : "", //Timeline Pin title
	"via Snowy" : "", //Timeline Pin subtitle
	"Open Snowy" : "", //Timeline Pin action
	"Ok, alarm set!" : "",
	"Alarm set for " : "",
	"Wait!" : "",
	"I didn't set an alarm because I couldn't tell what time you wanted it." : "",
	
	//Cancel Alarm
	"Ok, alarm cancelled!" : "",
	"You don't have an alarm set!" : "",
	
	//Set Timer
	"Countdown time!" : "",
	"Timer set for " : "",
	" minute(s)." : "",
	" hour(s)." : "",
	" hour(s) and " : "",
	"Sorry! I think you're trying to set a timer but I didn't understand what you said." : "",
	
	//Check Timer
	" hour" : "",
	" hours" : "",
	" minute" : "",
	" minutes" : "",
	" second" : "",
	" seconds" : "",
	"No timer" : "",
	"Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example." : "",
	"Time remaining" : "",
	"Something went wrong - maybe you haven't set a timer yet?" : "",
	
	//Cancel Timer
	"Ok, timer cancelled!" : "",
	"You don't have a timer set!" : "",
	
	//Eat
	"Where am I?" : "",
	"It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!" : "",
	"There don't seem to be any restaurants nearby." : "",
	" miles away." : "",
	" kilometers away." : "",
	"\n\nFor walking directions, just ask me \"How do I get there?\"" : "",
	"...is a nearby " : "",
	"restaurant" : "",
	"\n\nIt's located at " : "",
	"Something went wrong - there might be tasty food nearby but I can't seem to find it!" : "",
	
	//Directions
	"there" : "", //Detect request for directions to restaurant
	"Missing Address" : "",
	"You need to find a restaurant first! Ask me \"Where should I eat?\" to find one." : "",
	" (See map for details)" : "", //Text returned by API to be removed from results
	"Directions to " : "",
	"home" : "", //Detect request for directions to home address
	"I don't have your home address on file! You can add it via my Settings page." : "",
	"Directions to Home" : "",
	"to" : "", //Detect request for directions to specific address
	"Recalculating..." : "",
	"I believe you're asking me for directions but I couldn't quite make out the address. Please try again!" : "",
	"I'm lost!!!" : "",
	"I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?" : "",
	
	//Note
	"Note taken!" : "",
	"Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!" : "",
	
	//Reminder
	"Ok, I'll remind you!" : "",
	"Reminder to \"" : "",
	"\" set for " : "",
	"Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again." : "",
	"Reminder!" : "",
	"your" : "",
	
	
	//Calendar
	"Something went wrong - That sounds like an important event to add to your calendar, though! Please try again." : "",
	"Ok, calendar updated!" : "",
	"\" from " : "",
	" to " : "",
	" on " : "",
	"Meeting!" : "",
	
	//Cancel
	"Ok, pin removed!" : "",
	"I've removed the pin for \"" : "",
	"\" from your timeline." : "",
	"Like finding a pin in a haystack!" : "",
	"I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event." : "",
	"That's one persistent pin!" : "",
	"Something went wrong with your request, and I couldn't remove that pin from your timeline!" : "",
	
	//Calculate
	"$" : "", //Default currency symbol
	"% of $" : "",
	" = $" : "",
	"% of " : "",
	"Error" : "",
	"Sorry, I don't know how to do that kind of math." : "",
	"Something went wrong - you stumped me! Try the calculation again." : "",
	
	//Random
	" between " : "", //Indicates first number in range
	" and " : "", //Indicates second number in range
	"The answer is 42..." : "",
	"...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds." : "",
	"Hmmm, how about " : "",
	"No range was specified, so I picked 1 and 100 as bounds!" : "",
	"! Definitely " : "",
	"Go with " : "",
	"NaNaNaNaNa... Batman!" : "",
	"Something went wrong, please try again..." : "",
	
	//Coin Flip
	"Aaaannnddd..." : "",
	"...it's Heads!" : "",
	"...it's Tails!" : "",
	"...it's Heads...I think. Something went wrong - so you might want to try again." : "",
	
	//Weather WU
	"It seems you don't have GPS enabled, so I can't tell the weather!" : "",
	" home" : "",
	"Which one?" : "",
	"I see multiple results for that location! Could you be more specific? Maybe mention the state or country..." : "",
	"Weather for " : "",
	"Rain" : "",
	"Don't forget your umbrella!" : "",
	"Yikes, it's hot!" : "",
	"Brrr, it's cold!" : "",
	"Temp: " : "",
	"Status: " : "",
	"Feels Like: " : "",
	"Humidity: " : "",
	"Wind: " : "",
	"Gust: " : "",
	"Direction: " : "",
	" in " : "",
	" for " : "",
	
	//Weather Open
	"\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again." : "",
	"Something went wrong with my radar! Try asking me about the weather again." : "",
	
	//Forecast WU
	"Forecast" : "",
	"High: " : "",
	"Low: " : "",
	"3-Day Forecast" : "",
	
	//Forecast Open
	"Forecast for " : "",
	"Something went wrong with my radar! Try asking me about the forecast again." : "",	
	
	//Translate
	"Sorry, I don't speak " : "",
	"Try another language, or speak more clearly." : "",
	"If you want me to learn " : "",
	", use the Contact Developer link in the Pebble Appstore." : "",
	"Hmmm..." : "",
	"I'm sorry, but I don't know' how to say \"" : "",
	"\" in " : "",
	"\n\n(Conf: " : "",
	"Lost in Translation..." : "",
	"...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again." : "",
	
	//Define
	"I couldn't find a definition for " : "",
	"I lost my dictionary! Try asking me again and I'll see if I can find it this time..." : "",
	
	//Stock
	"Waiting for an IPO?" : "",
	"Sorry, I couldn't locate a stock symbol for \"" : "",
	"\". Are you sure they're public?" : "",
	"\n\nNow: $" : "",
	"\nChange: " : "",
	"%\n\nOpen: $" : "",
	"\nHigh: $" : "",
	"\nLow: $" : "",
	"\n\nLast Update: " : "",
	"Ding ding ding...dong?" : "",
	"Sorry, something went wrong when I tried to look up that company. Please try again." : "",
	
	//Add to List
	"List Updated!" : "",
	"Added \"" : "",
	"Added " : "",
	"Something went wrong - and I don't want to forget to add that to your list! Please try again." : "",
	
	//Check List
	"Your list is empty!" : "",
	"List" : "",
	"Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it." : "",
	
	//Remove from List
	"Removed \"" : "",
	"I couldn't find " : "",
	" on your list." : "",
	"Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!" : "",
	
	//Clear List
	"Your list has been cleared." : "",
	"Something went wrong - I tried to clear your list but couldn't. Please try again!" : "",
	
	//Conversion
	"fahrenheit" : "",
	"celsius" : "",
	"kelvin" : "",
	"degrees " : "",
	"liters" : "",
	"milliliters" : "",
	"kilograms" : "",
	"grams" : "",
	"centimeters" : "",
	"meters" : "",
	"kilometers" : "",
	"fluid ounces" : "",
	"fluid-ounces" : "",
	" feet " : "",
	"to inches" : "",
	"foot" : "",
	"feet" : "",
	"inch" : "",
	"inches" : "",
	" Kelvin" : "",
	"I don't recognize the units you're using (" : "",
	"), sorry!" : "",
	"Apples to Oranges" : "",
	"Sorry, either " : "",
	" isn't a valid conversion, or I don't know how to convert them." : "",
	"I don't think I know how to convert that!" : "",
	"yards" : "",
	"miles" : "",
	"millimeters" : "",
	"pounds" : "",
	"ounces" : "",
	"gallons" : "",
	"quarts" : "",
	"pints" : "",
	"cups" : "",
	"tablespoons" : "",
	"teaspoons" : "",
	
	//Health
	"goal" : "", //Detect request for step goal
	"steps" : "", //Detect request for # of steps
	"far" : "", //Detect request for distance
	"distance" : "", //Detect request for distance
	"sleep" : "", //Detect request for sleep
	"last night" : "", //Detect request for sleep
	"I don't understand..." : "",
	"I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today." : "",
	"Something went wrong, but don't let that mess up your workout!" : "",
	
	//Sports
	"Are they in the minors?" : "",
	"Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "",
	"I'm seeing double!" : "",
	"There are at least two teams with that name! Do you mean the " : "",
	" or the " : "",
	"? Please ask again with the full team name." : "",
	"Too much data!" : "",
	"I can't access my sports database right now! Maybe try again later?" : "",
	"score" : "", //Keyword for detecting score request
	"First Game of the Season:\n" : "",
	"Preseason" : "",
	"Preseason\n" : "",
	"Final" : "",
	"Offseason" : "",
	"Looks like the season is over! Hope the " : "",
	" do well next year!" : "",
	"when" : "",
	"next" : "",
	"Next Game\n" : "",
	"Is it sports trivia night?" : "",
	"I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "",
	"Penalty!" : "",
	"Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!" : "",
	
	//IFTTT
	"If this, then huh?" : "",
	"To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page." : "",
	"Something went wrong with your Maker Channel. Please try again.\n\nError\n" : "",
	"Event Fired!" : "",
	"Ok, I've asked IFTTT to set your thermostat to " : "",
	" degrees.\n[snowy_thermostat]" : "",
	"Recipe failed!" : "",
	"on" : "",
	"off" : "",
	"Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]" : "",
	"Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]" : "",
	"Sorry - I didn't understand what you wanted to do." : "",
	"Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]" : "",
	"saying" : "",
	"Ok, I've asked IFTTT to trigger the event 'snowy_" : "",
	"Something went wrong with your request. The event 'snowy_" : "",
	"' was not recognized by the IFTTT server." : "",
	
	//Habits
	"list" : "",
	"all" : "",
	"(Enabled)" : "",
	"(Disabled)" : "",
	"\n  - Count: " : "",
	"\n  - Current: " : "",
	"\n  - Longest: " : "",
	"streak" : "",
	"Don't pick up any bad habits!" : "",
	"I couldn't find that particular habit!" : "",
	"Current: " : "",
	"\nLongest: " : "",
	"count" : "",
	"Count: " : "",
	"Next Habit" : "",
	" at " : "", //Habit at Time
	"Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next." : "",
	"I promise this won't become a habit!" : "",
	"Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." : "",
	
	//Timeline
	"Timeline Down!" : "",
	"Pebble's servers are down at the moment. Please try your request again later!" : "",
	"Timeline Error!" : "",
	"Something's not quite right with that Timeline Pin!\nError: " : "",
	"Something went wrong with your Timeline. Try again?" : "",
	
	
	//Language Names
	"french" : "",
	"spanish" : "",
	"german" : "",
	"italian" : "",
	"czech" : "",
	"dutch" : "",
	"finnish" : "",
	"hungarian" : "",
	"albanian" : "",
	"bosnian" : "",
	"catalan" : "",
	"croatian" : "",
	"danish" : "",
	"estonian" : "",
	"icelandic" : "",
	"latvian" : "",
	"lithuanian" : "",
	"malay" : "",
	"maltese" : "",
	"polish" : "",
	"portuguese" : "",
	"romanian" : "",
	"slovak" : "",
	"swedish" : "",
	"turkish" : "",
	"english" : "",
	"indonesian" : "",
	"norwegian" : "",
	
	//Get Opinion
	", but there may be better options available." : "",
	" that looks good to me!" : "",
	" that looks really good to me!" : "",
	" that looks excellent!" : "",
	
	//Parsing
	"January" : "",
	"February" : "",
	"March" : "",
	"April" : "",
	"May" : "",
	"June" : "",
	"July" : "",
	"August" : "",
	"September" : "",
	"October" : "",
	"November" : "",
	"December" : "",
	"Sunday" : "",
	"Monday" : "",
	"Tuesday" : "",
	"Wednesday" : "",
	"Thursday" : "",
	"Friday" : "",
	"Saturday" : "",
	"one" : "",
	"two" : "",
	"three" : "",
	"four" : "",
	"five" : "",
	"six" : "",
	"seven" : "",
	"eight" : "",
	"nine" : "",
	"ten" : "",
	"Jan" : "",
	"Feb" : "",
	"Mar" : "",
	"Apr" : "",
	"Jun" : "",
	"Jul" : "",
	"Aug" : "",
	"Sep" : "",
	"Oct" : "",
	"Nov" : "",
	"Dec" : "",
	
	//pebble.js
	"Something went wrong - although I'm not sure what. If this keeps happening, use the Contact Developer link in the app description.\n\nError: " : "",
	"Settings Saved!" : "",
	"I'm having trouble opening my Settings page right now, maybe try again later?" : "",
	"For some reason, your Settings weren't saved correctly. Please try again." : "",
	"Your settings have been updated!\n\nFont Size: " : "",
	"Small" : "",
	"Large" : "",
	"\nTemp Unit: " : "",
	"\nDistance: " : "",
	"Imperial" : "",
	"Metric" : "",
	"\nConfirm: " : "",
	"Yes" : "",
	"No" : "",
	"\nQuick-Exit: " : "",
	"\nFlick: " : "",
	"\nHands-Free: " : "",
	"\nTime: " : "",
	"\nHealth: " : "",
	"Disabled" : "",
	"Enabled" : "",
	"\nStep Goal: " : "",
	"\nMaker Key: " : "",
	"Invalid" : "",
	"Valid" : "",
	"\nWolfram Key: " : "",
	"\nWU Key: " : "",
	"Default" : "",
	"Custom" : "",
	"\n\nHome Address:\n" : "",
	
	//URL Shorteners
	"\n\nFor more info, visit " : ""
};
*/
var dict_spanish = {
	"Thank You!" : "¡Gracias!",
	"Thank you for supporting Snowy! Please give it a ❤ if you haven't already. There are some exciting features in Version 3.3 - check MyDogSnowy.com/changelog for more info." : "¡Gracias por apoyar Snowy! Por favor, dale un ❤ si aún no lo has hecho. La Versión 3.3 tiene muchas características interesantes - visita MyDogSnowy.com/es para obtener más información.",
	
	"I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information." : "No creo que pueda hacer eso. ¿Puedes intentarlo de nuevo? O visite mydogsnowy.com /es/comandos",
	
	//IFTTT Plus
	"snowy_reminder" : "snowy_recordatorio",
	"snowy_calendar" : "snowy_calendario",
	"snowy_alarm" : "snowy_alarmas",
	"snowy_note" : "snowy_notas",
	
	//Introduce
	"Hi, I'm Snowy!" : "Hola, ¡Soy Snowy!",
	"I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?" : "Soy un asistente personal para Pebble Time. Nací durante el Pebble Developer Retreat 2015 y me encanta ayudar a la gente. ¿En qué te puedo ayudar?",
		
	//Description
	"I can do lots of things!" : "¡Puedo hacer un montón de cosas!",
	"Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com" : "Presione el botón de retroceso para ver algunos comandos de ejemplo. También puedes visitar mi sítio web: MyDogSnowy.com/es",
	
	//Spell
	"Sorry..." : "Lo siento...",
	"I'm afraid I don't know how to spell that! Could you please try again?" : "¡Me temo que no se como se escribe eso! ¿Puedes intentarlo de nuevo?",
	
	//Time
	"The time is " : "El tiempo es ",
	"The time is now!" : "El tiempo es ahora!",
	"Sorry, I don't know what time it is in " : "Lo siento, no sé qué hora es en ",
	"Local Time in " : "Hora Local en",
	"Uh-oh" : "Uh-oh",
	"Something went wrong - I don't know what time it is! Ironic, huh?" : "Algo salió mal - ¡no sé que hora es! Irónico ¿eh?",
	"in" : "en", //Detect request for time in specific city
	
	//Date
	"Today is " : "Hoy es ",
	"Something went wrong - I don't know what today's date is!" : "Algo salió mal - ¡no sé que fecha es hoy!",
	
	//Set Alarm
	"tomorrow" : "mañana", //Detect keyword 'tomorrow', add 1 day to time
	"at" : "a las", //Detect specific time
	"Alarm" : "Alarma", //Timeline Pin title
	"via Snowy" : "via Snowy", //Timeline Pin subtitle
	"Open Snowy" : "Abre Snowy", //Timeline Pin action
	"Ok, alarm set!" : "Vale, ¡alarma añadida!",
	"Alarm set for " : "Alarma añadida a las ",
	"Wait!" : "¡Espera!",
	"I didn't set an alarm because I couldn't tell what time you wanted it." : "No he añadido la alarma porque no sé a que hora la quieres.",
	
	//Cancel Alarm
	"Ok, alarm cancelled!" : "Vale, ¡Alarma cancelada!",
	"You don't have an alarm set!" : "¡No tienes ninguna alarma puesta!",
	
	//Set Timer
	"Countdown time!" : "¡Cuenta atrás!",
	"Timer set for " : "Cuenta atrás añadida durante ",
	" minute(s)." : " minuto(s).",
	" hour(s)." : " hora(s).",
	" hour(s) and " : " hora(s) y ",
	"Sorry! I think you're trying to set a timer but I didn't understand what you said." : "¡Lo siento! Creo que estás intentando añadir una cuenta atrás pero no entendí que dijiste.",
	
	//Check Timer
	" hour" : " hora",
	" hours" : " horas",
	" minute" : " minuto",
	" minutes" : " minutos",
	" second" : " segund",
	" seconds" : " segundo",
	"No timer" : "No hay ningún temporizador",
	"Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example." : "Lo siento, no detecto que haya ninguna cuentra atrás en marcha. Para añadir una sólo dí: 'Añade cuenta atrás de 5 minutos', por ejemplo.",
	"Time remaining" : "Tiempo restante",
	"Something went wrong - maybe you haven't set a timer yet?" : "Algo salió mal - tal vez usted no ha establecido un temporizador todavía?",
	
	//Cancel Timer
	"Ok, timer cancelled!" : "Vale, ¡Cuenta atrás cancelada!",
	"You don't have a timer set!" : "No es necesario que un conjunto temporizador!",
	
	//Eat
	"Where am I?" : "¿Dónde estoy?",
	"It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!" : "Parece que no tienes activado el GPS, así que ¡no puedo decirte dónde puedes comer algo bueno!",
	"There don't seem to be any restaurants nearby." : "No parece haber ningún restaurante cerca.",
	" miles away." : " millas de distancia.",
	" kilometers away." : " kilómetros de distancia.",
	"\n\nFor walking directions, just ask me \"How do I get there?\"" : "\n\nPara ir a pie, justo me pregunta '¿Cómo llego allí?'",
	"...is a nearby " : "...cercano ",
	"restaurant" : "restaurante",
	"\n\nIt's located at " : "\n\nEstá en ",
	"Something went wrong - there might be tasty food nearby but I can't seem to find it!" : "Algo salió mal - debe haber comido deliciosa cerca pero ¡no parece que pueda encontrarla!",
	
	//Directions
	"there" : "allí", //Detect request for directions to restaurant
	"Missing Address" : "Dirección que falta",
	"You need to find a restaurant first! Ask me \"Where should I eat?\" to find one." : "Es necesario encontrar un restaurante de primera! Pídeme '¿Dónde debería comer?' para encontrar uno.",
	" (See map for details)" : " (Consultar el mapa para ver los detalles)", //Text returned by API to be removed from results
	"Directions to " : "Cómo llegar a ", 
	"home" : "casa", //Detect request for directions to home address
	"I don't have your home address on file! You can add it via my Settings page." : "No tengo su dirección particular en el archivo! Lo puedes añadir a través de mi página de configuración.",
	"Directions to Home" : "Cómo llegar a su casa",
	"to" : "a", //Detect request for directions to specific address
	"Recalculating..." : "Recálculo...",
	"I believe you're asking me for directions but I couldn't quite make out the address. Please try again!" : "Creo que me estás preguntando por direcciones, pero no pude descifrar la dirección. Por favor, inténtelo de nuevo!",
	"I'm lost!!!" : "¡¡¡Estoy perdido!!!",
	"I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?" : "No he podido encontrar indicaciones para llegar a esa dirección.",
	"It seems you don't have GPS enabled, so I can't tell you how to get from here to there if I don't know where 'here' is!" : "Parece que no tienes habilitado para GPS. No puedo decirle a llegar desde aquí hasta allí si no sé donde 'aquí' es!",
	
	//Note
	"Note taken!" : "¡Nota añadida!",
	"Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!" : "Algo salió mal - no he pillado lo que me has dicho. ¡Tengo que trabajar en mis habilidades tomando notas!",
	
	//Reminder
	"Ok, I'll remind you!" : "Vale, te lo recordaré!",
	"Reminder to \"" : "Recordatorio para \"",
	"\" set for " : "\" establecido para ",
	"Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again." : "Algo salió mal - de verdad que quiero recordarte que hagas algo a esa hora, pero tendrás que intentarlo de nuevo.",
	"Reminder!" : "Recordatorio!",
	
	//Calendar
	"Something went wrong - That sounds like an important event to add to your calendar, though! Please try again." : "Algo salió mal - pero suena como si fuese un evento importante que añadir a tu calendario. Por favor inténtalo de nuevo.",
	"Ok, calendar updated!" : "Vale, ¡Calendario actualizado!",
	"\" from " : "\" de ",
	" to " : " a ",
	" on " : " el ",
	"Meeting!" : "Reunión",
	
	//Cancel
	"Ok, pin removed!" : "Ok, pin eliminado!",
	"I've removed the pin for \"" : "He quitado el pasador para \"",
	"\" from your timeline." : "\" de su timeline.",
	"Like finding a pin in a haystack!" : "Como encontrar una aguja en un pajar!",
	"I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event." : "No he podido encontrar ninguna patilla recientes para eliminar, lo siento!\n\nRecuerde, la \"Cancelar Eso\" comando sólo se puede utilizar para eliminar el Recordatorio o más reciente Calendario de Eventos.",
	"That's one persistent pin!" : "Esa es una pin persistente",
	"Something went wrong with your request, and I couldn't remove that pin from your timeline!" : "Algo salió mal con su solicitud, y no podía quitar ese pin de timeline.",
	
	//Calculate
	"$" : "€", //Default currency symbol
	"% of $" : "% de €",
	" = $" : " = €",
	"% of " : "% de",
	"Error" : "Error",
	"Sorry, I don't know how to do that kind of math." : "Lo siento, no sé cómo hacer esa clase de cálculos.",
	"Something went wrong - you stumped me! Try the calculation again." : "Algo salió mal - ¡me has dejado perplejo! Prueba el cálculo de nuevo.",
	
	//Random
	" between " : " entre ", //Indicates first number in range
	" and " : " y ", //Indicates second number in range
	"The answer is 42..." : "La respuesta es 42...",
	"...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds." : "...Pero parece que usted no sabe cuál es la pregunta! Se tiene que especificar dos números para los límites inferior y superior.",
	"Hmmm, how about " : "Hmmm, que tal ",
	"No range was specified, so I picked 1 and 100 as bounds!" : "No se ha especificado rango, por lo que tomó 1 y 100 como límites!",
	"! Definitely " :  ", definitivamente ",
	"Go with " : "Ir con ",
	"NaNaNaNaNa... Batman!" : "NaNaNaNaNa... Batman!",
	"Something went wrong, please try again..." : "Algo salió mal - por favor, vuelva a intentarlo...",
	
	//Coin Flip
	"Aaaannnddd..." : "La moneda está...",
	"...it's Heads!" : "...Cabezas!",
	"...it's Tails!" : "...Colas!!!",
	"...it's Heads...I think. Something went wrong - so you might want to try again." : "...Cabezas...creo. Algo salió mal - por lo que es posible que desee volver a intentarlo.",
	
	//Weather WU
	"It seems you don't have GPS enabled, so I can't tell the weather!" : "Parece que no tienes activado el GPS, ¡así que no puedo decirte que tiempo hace!",
	" home" : " casa",
	"Which one?" : "Cúal?",
	"I see multiple results for that location! Could you be more specific? Maybe mention the state or country..." : "Veo varios resultados de ese lugar! ¿Podría ser más específico? Tal vez mencionar el estado o país...",
	"Weather for " : "Tiempo para la ciudad de ",
	"Rain" : "Lluvia",
	"Don't forget your umbrella!" : "¡No olvides el paraguas!",
	"Yikes, it's hot!" : "Vaya, ¡Hace calor!",
	"Brrr, it's cold!" : "Brrr ¡Hace frío fuera!",
	"Temp: " : "Temp: ",
	"Status: " : "Estado: ",
	"Feels Like: " : "Se siente como: ",
	"Humidity: " : "Humedad: ",
	"Wind: " : "Viento: ",
	"Gust: " : "Ráfaga: ",
	"Direction: " : "Dirección: ",
	" in " : " en ",
	" for " : " para ",
	
	//Weather Open
	"\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again." : "\n\nPara las previsiones más detalladas, se puede añadir su propia clave Weather Underground en mi página de configuración! Si ya lo ha hecho, entonces algo salió mal con su solicitud. Compruebe su clave, y vuelve a intentarlo.",
	"Something went wrong with my radar! Try asking me about the weather again." :  "¡Algo fue mal con mi radar! Prueba a preguntarme por el tiempo de nuevo.",
	
	//Forecast WU
	"Forecast" : "Pronóstico",
	"High: " : "Máxima: ",
	"Low: " : "Mínima: ",
	"3-Day Forecast" : "Pronóstico del Día 3",
	
	//Forecast Open
	"Forecast for " : "Pronóstico de ",
	"Something went wrong with my radar! Try asking me about the forecast again." : "¡Algo fue mal con mi radar! Prueba a preguntarme la previsión de nuevo.",	
	
	//Translate
	"Sorry, I don't speak " : "Lo siento, no hablo ",
	"Try another language, or speak more clearly." : "Prueba otro idioma, o habla más claro.",
	"If you want me to learn " : "Si quieres que aprenda ",
	", use the Contact Developer link in the Pebble Appstore." : " usa el link 'Contact Developer' de la Pebble AppStore",
	"Hmmm..." : "Hmmm...",
	"I'm sorry, but I don't know' how to say \"" : "Lo siento, pero no se como se dice \"",
	"\" in " : "\" en ",
	"\n\n(Conf: " : "\n\n(Conf: ",
	"Lost in Translation..." : "Lost in Translation...",
	"...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again." : "...fue una buena película, y algo que acaba de pasar. ¡Lo siento! Prueba a pedirme que te lo traduzca otra vez.",
	
	//Define
	"I couldn't find a definition for " : "Lo siento - no he podido encontrar una es definición para ",
	"I lost my dictionary! Try asking me again and I'll see if I can find it this time..." : "He perdido mi diccionario ! Trate de preguntar a mí otra vez y voy a ver si puedo encontrar esta vez...",
	
	//Stock
	"Waiting for an IPO?" : "¿Estás esperando a un IPO?",
	"Sorry, I couldn't locate a stock symbol for \"" : "Lo siento, no pude encontrar un símbolo de cotización para \"",
	"\". Are you sure they're public?" : "\". ¿Estás seguro de que son públicos?",
	"\n\nNow: $" : "\n\nAhora: $",
	"\nChange: " : "\nCambio: ",
	"%\n\nOpen: $" : "%\n\nSalida: $",
	"\nHigh: $" : "\nMáxima: $",
	"\nLow: $" : "\nMínima: $",
	"\n\nLast Update: " : "\n\nÚltima Actualización: ",
	"Ding ding ding...dong?" : "Ding ding ding...dong?",
	"Sorry, something went wrong when I tried to look up that company. Please try again." : "Lo siento, algo salió mal cuando traté de buscar esa empresa. Por favor, inténtelo de nuevo.",
	
	//Add to List
	"List Updated!" : "¡Lista actualizada!",
	"Added \"" : "Añadido \"",
	"Added " : "Añadidas",
	"Something went wrong - and I don't want to forget to add that to your list! Please try again." : "Algo salió mal - ¡y no quiero olvidarme de añadirlo en tu lista! Por favor inténtalo de nuevo.",
	
	//Check List
	"Your list is empty!" : "Tu lista está vacía.",
	"List" : "Lista",
	"Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it." : "Algo salió mal - Sé que puse tu lista por aquí, en alguna parte...preguntame de nuevo e intentaré encontrarla.",
	
	//Remove from List
	"Removed \"" : "Eliminado \"",
	"I couldn't find " : "No pude encontrar ",
	" on your list." : "en tu lista.",
	"Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!" : "Algo salió mal - sé que quieres eliminar eso, pero necesitarás intentarlo de nuevo. ¡Lo siento!",
	
	//Clear List
	"Your list has been cleared." : "Tu lista ha sido borrada.",
	"Something went wrong - I tried to clear your list but couldn't. Please try again!" : "Algo salió mal - Intenté limpiar tu lista pero no pude. Por favor ¡Inténtalo de nuevo!",
	
	//Conversion
	"fahrenheit" : "fahrenheit",
	"celsius" : "centígrados",
	"kelvin" : "kelvin",
	"degrees " : "grados",
	"liters" : "litros",
	"milliliters" : "mililitros",
	"kilograms" : "kilos",
	"grams" : "gramos",
	"centimeters" : "centímetros",
	"meters" : "metros",
	"kilometers" : "kilómetros",
	"fluid ounces" : "fluido oz",
	"fluid-ounces" : "fluido-oz",
	" feet " : " pies ",
	"to inches" : "a pulgadas",
	"foot" : "pie",
	"feet" : "pies",
	"inch" : "pulgada",
	"inches" : "pulgadas",
	" Kelvin" : " Kelvin",
	"I don't recognize the units you're using (" : "No reconozco las unidades que está utilizando (",
	"), sorry!" : ") , lo siento!",
	"Apples to Oranges" : "Manzanas con Naranjas",
	"Sorry, either " : "Lo siento, ya sea ",
	" isn't a valid conversion, or I don't know how to convert them." : " no es una conversión válida, o no saben cómo convertir ellos.",
	"I don't think I know how to convert that!" : "No creo que sé cómo convertir eso!",
	"yards" : "yardas",
	"miles" : "millas",
	"millimeters" : "milímetros",
	"pounds" : "gramos",
	"ounces" : "onzas",
	"gallons" : "galones",
	"quarts" : "cuartos-de-galón",
	"pints" : "pintas",
	"cups" : "tazas",
	"tablespoons" : "cucharadas",
	"teaspoons" : "cucharaditas",
	
	//Health
	"goal" : "meta", //Detect request for step goal
	"steps" : "pasos", //Detect request for # of steps
	"far" : "lejos", //Detect request for distance
	"distance" : "distancia", //Detect request for distance
	"sleep" : "dormir", //Detect request for sleep
	"last night" : "anoche", //Detect request for sleep
	"I don't understand..." : "No entiendo...",
	"I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today." : "No creo que rastrea Pebble Health! Usted me puede preguntar cuántos pasos que has dado, o lo lejos que ha caminado en la actualidad.",
	"Something went wrong, but don't let that mess up your workout!" : "Algo salió mal, pero no dejes que estropear su entrenamiento!",
	
	//Sports
	"Are they in the minors?" : "¿Están en la liga menor de edad?",
	"Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Lo siento, no pude encontrar ese equipo! Tal vez intente de nuevo? Yo sé de fútbol, American fútbol, hockey, béisbol, y el baloncesto.",
	"I'm seeing double!" : "Yo estoy viendo doble!",
	"There are at least two teams with that name! Do you mean the " : "Hay por lo menos dos equipos con ese nombre! ¿Se refiere a los ",
	" or the " : " o los ",
	"? Please ask again with the full team name." : "? Por favor, pregunte de nuevo con el nombre del equipo completo.",
	"Too much data!" : "Demasiados datos!",
	"I can't access my sports database right now! Maybe try again later?" : "No puedo acceder a mi base de datos de los deportes en este momento! Tal vez intente de nuevo más tarde?",
	"score" : "puntuación", //Keyword for detecting score request
	"First Game of the Season:\n" : "En primer partido de la temporada:\n",
	"Preseason" : "Pretemporada",
	"Preseason\n" : "Pretemporada\n",
	"Final" : "Final",
	"Offseason" : "Fuera de temporada",
	"Looks like the season is over! Hope the " : "Parece que la temporada ha terminado! La esperanza de los ",
	" do well next year!" : " les va bien el año que viene!",
	"when" : "cuando",
	"next" : "próximo",
	"Next Game\n" : "Siguiente Juego\n",
	"Is it sports trivia night?" : "¿Es el deporte trivia noche?",
	"I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Sé que me estás pidiendo algo relacionado con los deportes, pero no sé cómo responder a esa pregunta! Tal vez intente de nuevo? Yo sé de fútbol, American fútbol, hockey, béisbol, y el baloncesto.",
	"Penalty!" : "¡Pena!",
	"Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!" : "Lo siento - algo salió mal mientras yo estaba mirando ese equipo. Por favor, inténtelo de nuevo.\n\nSi el problema persiste por un equipo específico, por favor, que mi desarrollador sabe!",
	
	//IFTTT
	"If this, then huh?" : "If this, then eh?",
	"To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page." : "Para integrar Snowy con IFTTT, tendrá que introducir su Maker Key en la página de configuración.",
	"Something went wrong with your Maker Channel. Please try again.\n\nError\n" : "Algo salió mal con su Channel Maker. Por favor, inténtelo de nuevo.\n\nError\n",
	"Event Fired!" : "¡Evento lanzado!",
	"Ok, I've asked IFTTT to set your thermostat to " : "Vale, le he pedido a IFTTT que ajuste tu termostato a ",
	" degrees.\n[snowy_thermostat]" : " grados.\n[snowy_thermostat]",
	"Recipe failed!" : "Acción fracasó",
	"on" : "encendidas",
	"off" : "apagadas",
	"Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]" : "Vale, le he pedido a IFTTT que encienda las luces.\n[snowy_lights_on]",
	"Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]" : "Vale, le he pedido a IFTTT que apague las luces.\n[snowy_lights_off]",
	"Sorry - I didn't understand what you wanted to do." : "Lo siento - No entendí lo que quires hacer.",
	"Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]" : "Vale, le he pedido a IFTTT que te llame al móvil para que puedas encontrarlo.\n[snowy_find_my_phone]",
	"saying" : "que dice",
	"Ok, I've asked IFTTT to trigger the event 'snowy_" : "Vale, le he pedido a IFTTT que lance el evento 'snowy_",
	"Something went wrong with your request. The event 'snowy_" : "Algo salió mal con su solicitud. El evento 'snowy_",
	"' was not recognized by the IFTTT server." : "' no fue reconocido por el IFTTT servidor.",
	"values" : "valores",
	"thermostat" : "termostato",
	"phone" : "móvil",
	"call" : "llame",
	
	//Habits
	"list" : "lista",
	"all" : "todas",
	"(Enabled)" : "(Habilitado)",
	"(Disabled)" : "(Discapacitado)",
	"\n  - Count: " : "\n - Contar: ",
	"\n  - Current: " : "\n - Corriente: ",
	"\n  - Longest: " : "\n - Más Largo: ",
	"streak" : "racha",
	"Don't pick up any bad habits!" : "No recoger los malos hábitos!",
	"I couldn't find that particular habit!" : "No pude encontrar ese hábito particular.",
	"Current: " : "Corriente: ",
	"\nLongest: " : "\nMás Largo: ",
	"count" : "contrar",
	"Count: " : "Contrar: ",
	"Next Habit" : "Hábito Siguiente",
	" at " : "a", //Habit at Time
	"Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next." : "Lo siento, no estoy seguro de saber lo que el hábito que estás buscando. Recuerde, usted puede pedir un recuento actual o carne por su nombre hábito, obtener una lista de todos sus hábitos, o averiguar cuál es la siguiente.",
	"I promise this won't become a habit!" : "Prometo que esto no se convierta en un hábito!",
	"Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." : "Algo salió mal con su solicitud! Recuerde, usted puede pedir un recuento actual o una raya por su nombre hábito, obtener una lista de todos sus hábitos, o averiguar cuál es la siguiente.",
	
	//Timeline
	"Timeline Down!" : "¡Timeline Caido!",
	"Pebble's servers are down at the moment. Please try your request again later!" : "Los servidores están inactivos en el momento. Inténtalo de nuevo más tarde!",
	"Timeline Error!" : "¡Timeline Error!",
	"Something's not quite right with that Timeline Pin!\nError: " : "Algo no está del todo bien con ese Timeline Pin.\nError: ",
	"Something went wrong with your Timeline. Try again?" : "Algo salió mal con su Timeline. ¿Inténtalo de nuevo?",
	
	
	//Language Names
	"french" : "francés",
	"spanish" : "español",
	"german" : "alemán",
	"italian" : "italiano",
	"czech" : "checo",
	"dutch" : "holandés",
	"finnish" : "finlandés",
	"hungarian" : "húngaro",
	"albanian" : "albanés",
	"bosnian" : "bosnio",
	"catalan" : "catalán",
	"croatian" : "croata",
	"danish" : "danés",
	"estonian" : "estonio",
	"icelandic" : "islandés",
	"latvian" : "letón",
	"lithuanian" : "lituano",
	"malay" : "malayo",
	"maltese" : "maltés",
	"polish" : "polaco",
	"portuguese" : "portugués",
	"romanian" : "rumano",
	"slovak" : "eslovaco",
	"swedish" : "sueco",
	"turkish" : "turco",
	"english" : "inglés",
	"indonesian" : "indonesio",
	"norwegian" : "noruego",
	
	//Get Opinion
	", but there may be better options available." : ", pero no puede ser mejor gracias opciones disponibles.",
	" that looks good to me!" : " que se ve bien para mí!",
	" that looks really good to me!" : " que se ve muy bien para mí!",
	" that looks excellent!" : " que se ve excelente!",
	
	//Parsing
	"January" : "Enero",
	"February" : "Febrero",
	"March" : "Marzo",
	"April" : "Abril",
	"May" : "Mayo",
	"June" : "Junio",
	"July" : "Julio",
	"August" : "Agosto",
	"September" : "Septiembre",
	"October" : "Octubre",
	"November" : "Noviembre",
	"December" : "Diciembre",
	"Sunday" : "Domingo",
	"Monday" : "Lunes",
	"Tuesday" : "Martes",
	"Wednesday" : "Miércoles",
	"Thursday" : "Jueves",
	"Friday" : "Viernes",
	"Saturday" : "Sábado",
	"one" : "uno",
	"two" : "dos",
	"three" : "tres",
	"four" : "cuatro",
	"five" : "cinco",
	"six" : "seis",
	"seven" : "siete",
	"eight" : "ocho",
	"nine" : "nueve",
	"ten" : "diez",
	"Jan" : "Ene",
	"Feb" : "Feb",
	"Mar" : "Mar",
	"Apr" : "Abr",
	"Jun" : "Jun",
	"Jul" : "Jul",
	"Aug" : "Ago",
	"Sep" : "Sep",
	"Oct" : "Oct",
	"Nov" : "Nov",
	"Dec" : "Dic",
	
	//pebble.js
	"Something went wrong - although I'm not sure what. If this keeps happening, use the Contact Developer link in the app description.\n\nError: " : "Algo salió mal - aunque no estoy seguro de qué. Si esto sigue ocurriendo, utilice el enlace Contactar al desarrollador en la descripción de la aplicación.",
	"Settings Saved!" : "¡Ajustes guardados!",
	"I'm having trouble opening my Settings page right now, maybe try again later?" : "Estoy teniendo problemas para abrir mi página de configuración en este momento, tal vez tratar más adelante?",
	"For some reason, your Settings weren't saved correctly. Please try again." : "Por alguna razón, los ajustes no se han guardado correctamente. Por favor, inténtelo de nuevo.",
	"Your settings have been updated!\n\nFont Size: " : "¡Sus ajustes se han actualizado!\n\nTamaño de fuente: ",
	"Small" : "Pequeña",
	"Large" : "Grande",
	"\nTemp Unit: " : "\nUnidad (Temp): ",
	"\nDistance: " : "\nUnidad (Dist): ",
	"Imperial" : "Imperial",
	"Metric" : "Métrico",
	"\nConfirm: " : "\nConfirmar: ",
	"Yes" : "Sí",
	"No" : "No",
	"\nQuick-Exit: " : "\nSalida: ",
	"\nFlick: " : "\nGirar: ",
	"\nHands-Free: " : "\nManos-Libres: ",
	"\nTime: " : "\nHora: ",
	"\nHealth: " : "\nHealth: ",
	"Disabled" : "No",
	"Enabled" : "Sí",
	"\nStep Goal: " : "\nMeta de Pasos: ",
	"\nMaker Key: " : "\nMaker Key: ",
	"Invalid" : "Inválido",
	"Valid" : "Válido",
	"\nWolfram Key: " : "\nWolfram Key: ",
	"\nWU Key: " : "\nWU Key: ",
	"Default" : "Defecto",
	"Custom" : "Personalizado",
	"\n\nHome Address:\n" : "\nDireccion de Casa:\n",
	
	//URL Shorteners
	"\n\nFor more info, visit " : "\n\nPara más información , visite "
};

var dict_french = {
	"Thank You!" : "Merci!",
	"Thank you for supporting Snowy! Please give it a ❤ if you haven't already. There are some exciting features in Version 3.3 - check MyDogSnowy.com/changelog for more info." : "Nous te remercions de soutenir Snowy! S'il te plaît donner un ❤ si vous ne l'avez pas déja fait. Il y a quelques fonctionnalités intéressantes dans la version 3.3 - allez voir MyDogSnowy.com/changelog pour en savoir plus.",
	
	"I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information." : "Je ne pense pas que je peux le faire. S'il te plaît essayer de nouveau, ou visitez mydogsnowy.com /fr/commandes pour plus d'informations.",
	
	//IFTTT Plus
	"snowy_reminder" : "snowy_rappels",
	"snowy_calendar" : "snowy_calendrier",
	"snowy_alarm" : "snowy_alarmes",
	"snowy_note" : "snowy_notes",
	
	//Introduce	
	"Hi, I'm Snowy!" : "Salut, je suis Snowy!",
	"I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?" : "Je suis un assistant personnel pour Pebble Time. J'ai été créé à la Pebble Developer Retreat 2015 et j'adore aider les gens! Que puis-je faire pour toi?",
	
	//Description
	"I can do lots of things!" : "Je sais faire beaucoup de choses!",
	"Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com" : "Faire un appui long sur le bouton Down pour voir des examples de commandes. Tu peux aussi aller sur : MyDogSnowy.com/fr",
	
	//Spell
	"Sorry..." : "Désolé...",
	"I'm afraid I don't know how to spell that! Could you please try again?" : "J'ai peur de ne savoir épeler ça! Peux-tu réessayer?",
	
	//Time
	"The time is " : "Il est ",
	"The time is now!" : "Il est maintenant!",
	"Sorry, I don't know what time it is in " : "Désolé, je ne sais pas quelle heure il est à ",
	"Local Time in " : "Heure locale à ",
	"Uh-oh" : "Uh-oh",
	"Something went wrong - I don't know what time it is! Ironic, huh?" : "Petit problème - je ne sais pas quelle heure il est, c'est drôle non?",
	"in" : "à", //Detect request for time in specific city
	
	//Date
	"Today is " : "Aujourd'hui, on est le ",
	"Something went wrong - I don't know what today's date is!" : "Petit problème - je ne connais pas la date d'aujourd'hui!",
	
	//Set Alarm
	"tomorrow" : "demain", //Detect keyword 'tomorrow', add 1 day to time
	"at" : "pour", //Detect specific time
	"Alarm" : "Alarme", //Timeline Pin title
	"via Snowy" : "via Snowy", //Timeline Pin subtitle
	"Open Snowy" : "Ouvrir Snowy", //Timeline Pin action
	"Ok, alarm set!" : "OK, alarme reglée!",
	"Alarm set for " : "Alarme reglée pour ",
	"Wait!" : "Attends!",
	"I didn't set an alarm because I couldn't tell what time you wanted it." : "Je n'ai pas programmé d'alarme, je n'ai pas compris quand tu la voulais.",
	
	//Cancel Alarm
	"Ok, alarm cancelled!" : "OK, alarme annulée!",
	"You don't have an alarm set!" : "Il n'y a pas d'alarme programmée!",
	
	//Set Timer
	"Countdown time!" : "Le compte à rebours a commencé!",
	"Timer set for " : "Minuteur lancé pour ",
	" minute(s)." : " minute(s).",
	" hour(s)." : " heure(s).",
	" hour(s) and " : " heure(s) et ",
	"Sorry! I think you're trying to set a timer but I didn't understand what you said." : "Pardon! Je crois que tu essaye de régler le minuteur, mais je n'ai pas compris ce que tu as dit.",
	
	//Check Timer
	" hour" : " heure",
	" hours" : " heures",
	" minute" : " minute",
	" minutes" : " minutes",
	" second" : " seconde",
	" seconds" : " secondes",
	"No timer" : "Pas de minuteur",
	"Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example." : "Désolé, je n'ai pas trouvé de minuteur actif. Pour créer un minuteur, dis 'Lance un minuteur de 5 minutes' par example.",
	"Time remaining" : "Temps restant",
	"Something went wrong - maybe you haven't set a timer yet?" : "Quelque chose a mal - peut-être vous n'avez pas encore régler une minuteur?",
	
	//Cancel Timer
	"Ok, timer cancelled!" : "OK, minuteur annulé!",
	"You don't have a timer set!" : "Il n'y a pas de minuteur programmée!",
	
	//Eat
	"Where am I?" : "Où suis-je?",
	"It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!" : "Le GPS semble désactivé, je ne peux pas te dire où manger!",
	"There don't seem to be any restaurants nearby." : "Il n'y aurait pas de restaurant dans les environs.",
	" miles away." : " miles d'ici.",
	" kilometers away." : " kilomètres d'ici.",
	"\n\nFor walking directions, just ask me \"How do I get there?\"" : "\n\nPour les directions de marche, juste me demander \"Comment aller là bas?\"",
	"...is a nearby " : "... est à côté ",
	"restaurant" : "restaurant",
	"\n\nIt's located at " : "C'est situé à ",
	"Something went wrong - there might be tasty food nearby but I can't seem to find it!" : "Petit problème - il y a sûrement un super resto pas loin mais je ne le trouve pas!",
	
	//Directions
	"there" : "bas", //Detect request for directions to restaurant
	"Missing Address" : "Manquant Adresse",
	"You need to find a restaurant first! Ask me \"Where should I eat?\" to find one." : "Vous devez trouver un restaurant de première! Demandez-moi \"Où dois-je manger?\" pour trouver un.",
	" (See map for details)" : " (Voir la carte pour plus de détails)", //Text returned by API to be removed from results
	"Directions to " : "Rentrer à la",
	"home" : "maison", //Detect request for directions to home address
	"I don't have your home address on file! You can add it via my Settings page." : "Je n'ai pas votre adresse de domicile dans le dossier! Vous pouvez l'ajouter via ma page Paramètres.",
	"Directions to Home" : "Rentrer à la Domicile",
	"to" : "à la", //Detect request for directions to specific address
	"Recalculating..." : "Recalcul...",
	"I believe you're asking me for directions but I couldn't quite make out the address. Please try again!" : "Je crois que vous me demandez une direction, mais je n'ai pas pu déterminer l'adresse. Veuillez réessayer!",
	"I'm lost!!!" : "Je suis perdu!",
	"I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?" : "Désolé, je ne trouve pas l'itinéraire vers cette destination. Essaye encore!",
	
	//Note
	"Note taken!" : "Note enregistrée!",
	"Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!" : "Petit problème - Je ne t'ai pas compris. Je dois travailler ma prise de note!",
	
	//Reminder
	"Ok, I'll remind you!" : "D'accord, je vais te le rappeler!",
	"Reminder to \"" : "Rappel à \"",
	"\" set for " : "\" programmé pour ",
	"Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again." : "Petit problème - je voudrais vraiment te rappeler de faire ça mais tu dois réessayer.",
	"Reminder!" : "Rappel!",
	"your" : "",
	
	
	//Calendar
	"Something went wrong - That sounds like an important event to add to your calendar, though! Please try again." : "Petit problème - c'est pourtant un évènement important à mettre dans le calendrier, non? Essaye encore.",
	"Ok, calendar updated!" : "D'accord, calendrier mis à jour!",
	"\" from " : "\" de ",
	" to " : " à ",
	" on " : " le ",
	"Meeting!" : "Réunion!",
	
	//Cancel
	"Ok, pin removed!" : "OK, évènement supprimé!",
	"I've removed the pin for \"" : "J'ai enlevé l'évènement \"",
	"\" from your timeline." : "\" de votre timeline.",
	"Like finding a pin in a haystack!" : "Comme trouver une épingle dans une botte de foin!",
	"I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event." : "Je trouve pas d'évènement récent à supprimer, désolé!\n\nNB, la commande \"Enlever ça\" ne peut être utilisée que pour supprimer le plus récent rappel ou évènement du calentdrier.",
	"That's one persistent pin!" : "C'est un évènement permanent!",
	"Something went wrong with your request, and I couldn't remove that pin from your timeline!" : "Petit problème avec votre requête, je ne peux pas retirer cet évènement de votre timeline!",
	
	//Calculate
	"$" : "€", //Default currency symbol
	"% of $" : "% de €",
	" = $" : " = €",
	"% of " : "% de ",
	"Error" : "Erreur",
	"Sorry, I don't know how to do that kind of math." : "Désolé, je ne sais pas faire ce genre de calcul.",
	"Something went wrong - you stumped me! Try the calculation again." : "Petit problème - je suis perplexe! Essaye encore.",
	
	//Random
	" between " : " entre ", //Indicates first number in range
	" and " : " et ", //Indicates second number in range
	"The answer is 42..." : "La réponse est 42...",
	"...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds." : "Petit problème - Ce n'est pas un nombre au hasard, juste mon préféré...",
	"Hmmm, how about " : "Que dis-tu de ",
	"No range was specified, so I picked 1 and 100 as bounds!" : "Aucune plage n'a été spécifié, alors je pris 1 et 100 comme des limites!",
	"! Definitely " : "! Précisément ",
	"Go with " : "Va avec ",
	"NaNaNaNaNa... Batman!" : "NaNaNaNaNa... Batman!",
	"Something went wrong, please try again..." : "Petit problème, essaye encore.",
	
	//Coin Flip
	"Aaaannnddd..." : "Suspens...",
	"...it's Heads!" : "...Pile!",
	"...it's Tails!" : "...Face!",
	"...it's Heads...I think. Something went wrong - so you might want to try again." : "Pile... Je crois. Il y a eu un problème, tu devrais réessayer.",
	
	//Weather WU
	"It seems you don't have GPS enabled, so I can't tell the weather!" : "Le GPS semble désactivé, je ne peux pas trouver la météo!",
	" home" : " maison",
	"Which one?" : "Laquelle?",
	"I see multiple results for that location! Could you be more specific? Maybe mention the state or country..." : "Je vois plusieurs résultats pour cet endroit! Pourriez-vous être plus précis? Peut-être parler de l'état ou le pays...",
	"Weather for " : "La Météo pour ",
	"Rain" : "Pleuvoir",
	"Don't forget your umbrella!" : "N'oublie pas ton parapluie!",
	"Yikes, it's hot!" : "Oh la la, il fait chaud!",
	"Brrr, it's cold!" : "Brrr, Il fait froid dehors!",
	"Temp: " : "Temp: ",
	"Status: " : "Statut: ",
	"Feels Like: " : "Ressenti: ",
	"Humidity: " : "Humidité: ",
	"Wind: " : "Vent: ",
	"Gust: " : "Rafale: ",
	"Direction: " : "Direction: ",
	" in " : " à ",
	" for " : " pour ",
	
	//Weather Open
	"\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again." : "",
	"Something went wrong with my radar! Try asking me about the weather again." : "Petit problème avec mon radar! Redemandez moi la météo.",
	
	//Forecast WU
	"Forecast" : "Prévisions",
	"High: " : "Max: ",
	"Low: " : "Min: ",
	"3-Day Forecast" : "Prévisions sur 3 Jours",
	
	//Forecast Open
	"Forecast for " : "Prévisions pour ",
	"Something went wrong with my radar! Try asking me about the forecast again." : "Petit problème avec mon radar! Redemande moi la prévisions.",	
	
	//Translate
	"Sorry, I don't speak " : "Désolé, je ne parle pas ",
	"Try another language, or speak more clearly." : "Essaye une autre langue, ou parle plus clairement.",
	"If you want me to learn " : "Si tu veux que j'apprenne ",
	", use the Contact Developer link in the Pebble Appstore." : ", utilise le lien Contact Developer dans l'Appstore",
	"Hmmm..." : "Mmmm...",
	"I'm sorry, but I don't know' how to say \"" : "Désolé, je ne sais pas comment dire \"",
	"\" in " : "\" dans ",
	"\n\n(Conf: " : "\n\n(Conf: ",
	"Lost in Translation..." : "Je ne sais pas traduire ça...",
	"...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again." : "Désolé! Redemande moi de traduire ces mots.",
	
	//Define
	"I couldn't find a definition for " : "Je n'ai pas trouvé la définition de ",
	"I lost my dictionary! Try asking me again and I'll see if I can find it this time..." : "Essaie de me demander encore une fois, et je vais voir si je peux trouver cette fois-ci.",
	
	//Stock
	"Waiting for an IPO?" : "Attente pour une IPO?",
	"Sorry, I couldn't locate a stock symbol for \"" : "Désolé, je ne pouvais pas trouver \"",
	"\". Are you sure they're public?" : "\". Êtes -vous sûr qu'ils sont publics?",
	"\n\nNow: $" : "\n\nMaintenant: $",
	"\nChange: " : "\n\nVariation: ",
	"%\n\nOpen: $" : "%\n\nOuvert: $",
	"\nHigh: $" : "\nÉlevé: $",
	"\nLow: $" : "\nBas: $",
	"\n\nLast Update: " : "\n\nDernière mise à jour: ",
	"Ding ding ding...dong?" : "Ding ding ding...dong?",
	"Sorry, something went wrong when I tried to look up that company. Please try again." : "Désolé, quelque chose allait mal quand j'essayé de regarder cette socieété. Essaye encore.",
	
	//Add to List
	"List Updated!" : "Liste mise à jour!",
	"Added \"" : "ajouté.",
	"Added " : "ajoutés.",
	"Something went wrong - and I don't want to forget to add that to your list! Please try again." : "Petit problème - et je ne veux pas oublier ça sur la liste! Essaye encore.",
	
	//Check List
	"Your list is empty!" : "La liste est vide!",
	"List" : "Liste",
	"Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it." : "Petit probème - J'ai pourtant mis cette liste quelque part... Essaye encore et je vais la trouver.",
	
	//Remove from List
	"Removed \"" : " supprimé.",
	"I couldn't find " : "Je ne trouve pas ",
	" on your list." : " dans ta liste.",
	"Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!" : "Petit problème - je comprends que tu veux supprimer ça mais réessaye.",
	
	//Clear List
	"Your list has been cleared." : "La liste a été vidée.",
	"Something went wrong - I tried to clear your list but couldn't. Please try again!" : "Petit problème - je n'ai pas pu vidé la liste. Essaye encore!",
	
	//Conversion
	"fahrenheit" : "fahrenheit",
	"celsius" : "celsius",
	"kelvin" : "kelvin",
	"degrees " : "degrés",
	"liters" : "litres",
	"milliliters" : "millilitres",
	"kilograms" : "kilogrammes",
	"grams" : "grammes",
	"centimeters" : "centimètres",
	"meters" : "mètres",
	"kilometers" : "kilomètres",
	"fluid ounces" : "onces liquides",
	"fluid-ounces" : "onces-liquides",
	" feet " : " pieds ",
	"to inches" : "en pouces",
	"foot" : "pied",
	"feet" : "pieds",
	"inch" : "pouce",
	"inches" : "pouces",
	" Kelvin" : " Kelvin",
	"I don't recognize the units you're using (" : "Je ne reconnais pas ces unités (",
	"), sorry!" : "), désolé!",
	"Apples to Oranges" : "Pomme à Oranges",
	"Sorry, either " : "Désolé, soit ",
	" isn't a valid conversion, or I don't know how to convert them." : " est pas une conversion valide, ou je ne sais pas comment le faire.",
	"I don't think I know how to convert that!" : "Je ne sais pas comment convertir ce!",
	"yards" : "yards",
	"miles" : "miles",
	"millimeters" : "millimètros",
	"pounds" : "livres",
	"ounces" : "onces",
	"gallons" : "gallons",
	"quarts" : "quarts",
	"pints" : "pintes",
	"cups" : "tasses",
	"tablespoons" : "cuillères de service",
	"teaspoons" : "cuillères à café",
	
	//Health
	"goal" : "objectif", //Detect request for step goal
	"steps" : "pas", //Detect request for # of steps
	"far" : "mesure", //Detect request for distance
	"distance" : "distance", //Detect request for distance
	"sleep" : "dormi", //Detect request for sleep
	"last night" : "hier soir", //Detect request for sleep
	"I don't understand..." : "Je ne comprends pas...",
	"I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today." : "Petit problème - Pebble Bien-Etre est activé?",
	"Something went wrong, but don't let that mess up your workout!" : "Petit problème - Pebble Bien-Etre est activé?",
	
	//Sports
	"Are they in the minors?" : "",
	"Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "",
	"I'm seeing double!" : "",
	"There are at least two teams with that name! Do you mean the " : "",
	" or the " : "",
	"? Please ask again with the full team name." : "",
	"Too much data!" : "",
	"I can't access my sports database right now! Maybe try again later?" : "",
	"score" : "", //Keyword for detecting score request
	"First Game of the Season:\n" : "",
	"Preseason" : "",
	"Preseason\n" : "",
	"Final" : "",
	"Offseason" : "",
	"Looks like the season is over! Hope the " : "",
	" do well next year!" : "",
	"when" : "",
	"next" : "",
	"Next Game\n" : "",
	"Is it sports trivia night?" : "",
	"I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "",
	"Penalty!" : "",
	"Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!" : "",
	
	//IFTTT
	"If this, then huh?" : "If this, then quoi?",
	"To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page." : "Pour intégrer Snowy avec IFTTT, tu dois entrer ta clé dans les configurations.",
	"Something went wrong with your Maker Channel. Please try again.\n\nError\n" : "Petit problème sur IFTTT - Essaye encore.\n\nErruer\n",
	"Event Fired!" : "C'est Parti!",
	"Ok, I've asked IFTTT to set your thermostat to " : "Ok, j'ai demandé à IFTTT de régler le thermostat à ",
	" degrees.\n[snowy_thermostat]" : " degrés.\n[snowy_thermostat]",
	"Recipe failed!" : "Recipe échoué!",
	"on" : "allumer",
	"off" : "éteindre",
	"thermostat" : "thermostat",
	"Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]" : "Ok, j'ai demandé à IFTTT d'allumer les lumières.\n[snowy_lights_on]",
	"Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]" : "Ok, j'ai demandé à IFTTT d'éteindre les lumières.\n[snowy_lights_off]",
	"Sorry - I didn't understand what you wanted to do." : "Désolé, je ne comprends pas ce que tu veux faire.",
	"Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]" : "Ok, j'ai demandé à IFTTT d'appeler ton téléphone.\n[snowy_find_my_phone]",
	"saying" : "disant",
	"Ok, I've asked IFTTT to trigger the event 'snowy_" : "Ok, j'ai demandé à IFTTT de lancer l'évèmenent 'snowy_",
	"Something went wrong with your request. The event 'snowy_" : "Petit problème sur IFTTT - l'évèmenent 'snowy_",
	"' was not recognized by the IFTTT server." : "' n'a pas été reconnu par IFTTT.",
	"values" : "valeurs",
	
	//Habits
	"list" : "",
	"all" : "",
	"(Enabled)" : "",
	"(Disabled)" : "",
	"\n  - Count: " : "",
	"\n  - Current: " : "",
	"\n  - Longest: " : "",
	"streak" : "",
	"Don't pick up any bad habits!" : "",
	"I couldn't find that particular habit!" : "",
	"Current: " : "",
	"\nLongest: " : "",
	"count" : "",
	"Count: " : "",
	"Next Habit" : "",
	" at " : "", //Habit at Time
	"Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next." : "",
	"I promise this won't become a habit!" : "",
	"Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." : "",
	
	//Timeline
	"Timeline Down!" : "",
	"Pebble's servers are down at the moment. Please try your request again later!" : "",
	"Timeline Error!" : "",
	"Something's not quite right with that Timeline Pin!\nError: " : "",
	"Something went wrong with your Timeline. Try again?" : "",
	
	
	//Language Names
	"french" : "français",
	"spanish" : "espanol",
	"german" : "allemand",
	"italian" : "italien",
	"czech" : "tchèque",
	"dutch" : "néerlandais",
	"finnish" : "finlandais",
	"hungarian" : "hongrois",
	"albanian" : "albanais",
	"bosnian" : "bosniaque",
	"catalan" : "catalan",
	"croatian" : "croate",
	"danish" : "danois",
	"estonian" : "estonien",
	"icelandic" : "islandais",
	"latvian" : "latvien",
	"lithuanian" : "lituanien",
	"malay" : "malais",
	"maltese" : "maltais",
	"polish" : "polonais",
	"portuguese" : "portugais",
	"romanian" : "roumain",
	"slovak" : "slovaque",
	"swedish" : "suédois",
	"turkish" : "turc",
	"english" : "anglais",
	"indonesian" : "indonésien",
	"norwegian" : "norvégien",
	
	//Get Opinion
	", but there may be better options available." : ", mais il peut y avoir de meilleures options disponibles.",
	" that looks good to me!" : " qui me semble bon.",
	" that looks really good to me!" : " qui ressemble vraiment bon pour moi.",
	" that looks excellent!" : " qui semble excellent.",
	
	//Parsing
	"January" : "Janvier",
	"February" : "Février",
	"March" : "Mars",
	"April" : "Avril",
	"May" : "Mai",
	"June" : "Juin",
	"July" : "Juillet",
	"August" : "Août",
	"September" : "Septembre",
	"October" : "Octobre",
	"November" : "Novembre",
	"December" : "Décembre",
	"Sunday" : "Dimanche",
	"Monday" : "Luni",
	"Tuesday" : "Mardi",
	"Wednesday" : "Mercredi",
	"Thursday" : "Jeudi",
	"Friday" : "Vendredi",
	"Saturday" : "Samedi",
	"one" : "un",
	"two" : "deux",
	"three" : "trois",
	"four" : "quatre",
	"five" : "cinq",
	"six" : "six",
	"seven" : "sept",
	"eight" : "huit",
	"nine" : "neuf",
	"ten" : "dix",
	"Jan" : "Jan",
	"Feb" : "Fév",
	"Mar" : "Mar",
	"Apr" : "Avr",
	"Jun" : "Jui",
	"Jul" : "Jul",
	"Aug" : "Aoû",
	"Sep" : "Sep",
	"Oct" : "Oct",
	"Nov" : "Nov",
	"Dec" : "Déc",
	
	//PebbleKit JS
	"Something went wrong - although I'm not sure what. If this keeps happening, use the Contact Developer link in the app description.\n\nError: " : "",
	"Settings Saved!" : "Paramètres Sauvegardés!",
	"I'm having trouble opening my Settings page right now, maybe try again later?" : "",
	"For some reason, your Settings weren't saved correctly. Please try again." : "",
	"Your settings have been updated!\n\nFont Size: " : "Vos paramètres ont été mis à jour!\n\nTaille de Police: ",
	"Small" : "Petite",
	"Large" : "Large",
	"\nTemp Unit: " : "\nUnité de Temp: ",
	"\nDistance: " : "\nUnité de Dist: ",
	"Imperial" : "Impérial",
	"Metric" : "Métrique",
	"\nConfirm: " : "\nConfirm: ",
	"Yes" : "Oui",
	"No" : "Non",
	"\nQuick-Exit: " : "\nSortie Rapide: ",
	"\nFlick: " : "\nFlick: ",
	"\nHands-Free: " : "\nMains-Libres: ",
	"\nTime: " : "\nHeure: ",
	"\nHealth: " : "\nBien-Etre: ",
	"Disabled" : "Désactivé",
	"Enabled" : "Activée",
	"\nStep Goal: " : "\nObjectif de Pas: ",
	"\nMaker Key: " : "\nClé Maker: ",
	"Invalid" : "Invalide",
	"Valid" : "Valide",
	"\nWolfram Key: " : "",
	"\nWU Key: " : "\nClé WU: ",
	"Default" : "Défaut",
	"Custom" : "Personnelle",
	"\n\nHome Address:\n" : "\n\nAdresse du Domicile:\n",
	
	//URL Shorteners
	"\n\nFor more info, visit " : "\n\nPour plus d'informations, visitez "
};

var dict_german = {
	"Thank You!" : "Vielen Dank!",
	"Thank you for supporting Snowy! Please give it a ❤ if you haven't already. There are some exciting features in Version 3.3 - check MyDogSnowy.com/changelog for more info." : "Vielen Dank für die Unterstützung von Snowy! Bitte bewerte es mit einem ❤, falls du das noch nicht getan hast. Es gibt ein paar spannende Features in Version 3.3 - besuche MyDogSnowy.com/changelog für mehr Informationen.",
	
	"I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information." : "Ich kann den Befehl leider nicht ausführen. Bitte versuche es erneut, oder besuche mydogsnowy.com /de/commands für mehr Informationen",
	
	//IFTTT Plus
	"snowy_reminder" : "snowy_erinnerungen",
	"snowy_calendar" : "snowy_kalender",
	"snowy_alarm" : "snowy_alarme",
	"snowy_note" : "snowy_notizen",
	
	//Introduce
	"Hi, I'm Snowy!" : "Hi, ich bin Snowy!",
	"I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?" : "Ich bin ein persönlicher Assistent für deine Pebble Time. Ich entstand auf dem Pebble Developer Retreat 2015 und liebe es Menschen zu helfen! Was kann ich für dich tun?",
	
	//Description
	"I can do lots of things!" : "Ich kann eine Menge an Sachen!",
	"Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com" : "Drücke den Runter-Knopf auf dem Home-Bildschirm für ein paar Befehlsbeispiele. Du kannst auch meine Webseite besuchen: MyDogSnowy.com",
	
	//Spell
	"Sorry..." : "Entschuldige...",
	"I'm afraid I don't know how to spell that! Could you please try again?" : "Ich habe dich leider nicht verstanden. Versuch es bitte erneut",
	
	//Time
	"The time is " : "Es ist",
	"The time is now!" : "Die Zeit ist gekommen!",
	"Sorry, I don't know what time it is in " : "Entschuldige, ich weiß nicht wie viel Uhr es in” +LOCATION …. “ist.",
	"Local Time in " : "Ortszeit in ",
	"Uh-oh" : "Oh-oh",
	"Something went wrong - I don't know what time it is! Ironic, huh?" : "Etwas ist schief gelaufen, ich weiß nicht wie spät es ist! Ironisch, oder?",
	"in" : "in", //Detect request for time in specific city
	
	//Date
	"Today is " : "Heute ist ",
	"Something went wrong - I don't know what today's date is!" : "Etwas ist schief gegangen, ich weiß das heutige Datum nicht!",
	
	//Set Alarm
	"tomorrow" : "morgen", //Detect keyword 'tomorrow', add 1 day to time
	"at" : "um", //Detect specific time
	"Alarm" : "Wecker", //Timeline Pin title
	"via Snowy" : "über Snowy", //Timeline Pin subtitle
	"Open Snowy" : "Öffne Snowy", //Timeline Pin action
	"Ok, alarm set!" : "Ok, Wecker gestellt!",
	"Alarm set for " : " Der Wecker wurde für %% gestellt ",
	"Wait!" : "Warte!",
	"I didn't set an alarm because I couldn't tell what time you wanted it." : "Ich konnte den Wecker nicht stellen, da ich die gewünschte Uhrzeit nicht kenne",
	
	//Cancel Alarm
	"Ok, alarm cancelled!" : "Ok, Wecker gelöscht!",
	"You don't have an alarm set!" : "Du hast keine Wecker gestellt!",
	
	//Set Timer
	"Countdown time!" : "Timer",
	"Timer set for " : "Timer gestellt für ",
	" minute(s)." : " Minute(n).",
	" hour(s)." : " Stunde(n).",
	" hour(s) and " : " Stunde(n) und ",
	"Sorry! I think you're trying to set a timer but I didn't understand what you said." : "Entschuldige! Ich hab dich leider nicht verstanden. Der Timer konnte nicht gestellt werden.",
	
	//Check Timer
	" hour" : " Stunde",
	" hours" : " Stunden",
	" minute" : " Minute",
	" minutes" : " Minuten",
	" second" : " Sekunde",
	" seconds" : " Sekunden",
	"No timer" : "Kein Timer vorhanden",
	"Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example." : "Ich konnte leider keine aktiven Timer finden. Sag zum Beispiel: \"Timer für 5 Minuten stellen\", um einen Timer  zu stellen.",
	"Time remaining" : "Zeit verbleibend",
	"Something went wrong - maybe you haven't set a timer yet?" : "Etwas ist schief gegangen - vielleicht hast du noch keinen Timer gestellt?",
	
	//Cancel Timer
	"Ok, timer cancelled!" : "Ok, Timer gelöscht!",
	"You don't have a timer set!" : "Du hast keinen Timer gestellt!",
	
	//Eat
	"Where am I?" : "Wo bin ich?",
	"It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!" : "Es sieht so aus, als ob du GPS deaktiviert hast, also kann ich dir nicht sagen, wo du etwas gutes zu Essen finden kannst",
	"There don't seem to be any restaurants nearby." : "Es sieht so aus, als ob es in deiner Nähe keine Restaurants gibt.",
	" miles away." : " Meilen entfernt.",
	" kilometers away." : " Kilometer entfernt.",
	"\n\nFor walking directions, just ask me \"How do I get there?\"" : "\n\nFür eine Wegbeschreibung, frag mich einfach \"Wie komme ich da hin?\"",
	"...is a nearby " : "... ist ein nahes ",
	"restaurant" : "Restaurant",
	"\n\nIt's located at " : "\n\nBefindet sich bei ",
	"Something went wrong - there might be tasty food nearby but I can't seem to find it!" : "Etwas ist schief gegangen - es gibt vielleicht leckeres Essen in deiner Nähe aber ich kann es nicht finden",
	
	//Directions
	"there" : "Dort", //Detect request for directions to restaurant
	"Missing Address" : "Fehlende Adresse",
	"You need to find a restaurant first! Ask me \"Where should I eat?\" to find one." : "Du musst zuerst ein Restaurant finden! Frag mich:  \"Wo kann ich essen?\", um eines zu finden.",
	" (See map for details)" : " (Siehe Karte für Details)", //Text returned by API to be removed from results
	"Directions to " : "Wegbeschreibung zu ",
	"home" : "nach Hause", //Detect request for directions to home address
	"I don't have your home address on file! You can add it via my Settings page." : "Ich kenne dein Zuhause nicht! Du kannst es in meinen Einstellungen eingeben",
	"Directions to Home" : "Weg nach Hause",
	"to" : "zu / zum", //Detect request for directions to specific address
	"Recalculating..." : "Neu berechnen...",
	"I believe you're asking me for directions but I couldn't quite make out the address. Please try again!" : "Ich glaube, du fragst mich nach einer Wegbeschreibung, aber ich kann die Adresse nicht verstehen. Versuche es bitte noch einmal!",
	"I'm lost!!!" : "Ich habe mich verlaufen!!!",
	"I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?" : "Ich konnte zu dieser Adresse keine Wegbeschreibung finden. Vielleicht ist es ja Zeit, die gute alte faltbare Karte rauszuholen?",
	
	//Note
	"Note taken!" : "Notiz gespeichert!",
	"Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!" : "Etwas ist schief gelaufen - ich habe dich nicht verstanden. Ich muss wohl noch etwas mein Textverständnis üben",
	
	//Reminder
	"Ok, I'll remind you!" : "Ok, ich werde dich erinnern!",
	"Reminder to \"" : "Erinnerung an \"",
	"\" set for " : "\" gesetzt für ",
	"Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again." : "Irgend etwas ist schief gegangen - Ich würde dich wirklich gerne daran erinnern, woran auch immer, aber du musst es leider noch einmal versuchen.",
	"Reminder!" : "Erinnerung!",
	"your" : "dein",
	
	//Calendar
	"Something went wrong - That sounds like an important event to add to your calendar, though! Please try again." : "Etwas ist schiefgegangen - es scheint sich aber um einen wichtigen Termin für einen Kalender zu handeln! Bitte versuche es erneut",
	"Ok, calendar updated!" : "Ok, Kalender aktualisiert!",
	"\" from " : "\" von ",
	" to " : " bis ",
	" on " : " am ",
	"Meeting!" : "Meeting!",
	
	//Cancel
	"Ok, pin removed!" : "Ok, Pin entfernt.",
	"I've removed the pin for \"" : "Ich habe den Pin für \" entfernt",
	"\" from your timeline." : "\" von deiner Timeline.",
	"Like finding a pin in a haystack!" : "Das ist genau wie eine Nadel im Heuhaufen zu suchen!",
	"I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event." : "Entschuldige, Ich konnte keine kürzlich hinzugefügten Pins zum Entfernen finden!\n\nDenke daran, der \"Ereignis löschen\" Befehl kann nur für die zuletzt hinzugefügten Erinnerungen oder Kalendereinträge genutzt werden.",
	"That's one persistent pin!" : "Das ist ein permanenter Pin!",
	"Something went wrong with your request, and I couldn't remove that pin from your timeline!" : "Etwas ist mit deiner Anfrage schiefgegangen. Ich konnte den Pin nicht von deiner Timeline entfernen! ",
	
	//Calculate
	"$" : "€", //Default currency symbol
	"% of $" : "% von €",
	" = $" : " = €",
	"% of " : "% von",
	"Error" : "Error",
	"Sorry, I don't know how to do that kind of math." : "Sorry, ich weiß nicht, wie man das berechnet",
	"Something went wrong - you stumped me! Try the calculation again." : "Etwas ist schiefgegangen - ich bin überfragt! Versuche die Berechnung erneut.",
	
	//Random
	" between " : " zwischen ", //Indicates first number in range
	" and " : " und ", //Indicates second number in range
	"The answer is 42..." : "Die Antwort ist 42...",
	"...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds." : "...aber es sieht so aus, als wüsstest du nicht, was die Frage ist! Du musst zwei Nummern festlegen, eine für die untere und eine für die obere Grenze",
	"Hmmm, how about " : "Hmmm, wie wäre es mit ",
	"No range was specified, so I picked 1 and 100 as bounds!" : "Es wurde kein Bereich festgelegt, daher hab ich 1 und 100 als Grenzen gewählt ",
	"! Definitely " : "! Nehme auf jeden Fall ",
	"Go with " : "Nimm ",
	"NaNaNaNaNa... Batman!" : "NaNaNaNa… Batman",
	"Something went wrong, please try again..." : "Etwas ist schiefgegangen, bitte versuche es erneut",
	
	//Coin Flip
	"Aaaannnddd..." : "Uuuuunnnndddd...",
	"...it's Heads!" : "... es ist Kopf!",
	"...it's Tails!" : "... es is Zahl!",
	"...it's Heads...I think. Something went wrong - so you might want to try again." : "...es ist Kopf... Glaube Ich. Irgendetwas ist schief gegangen - versuch es am besten erneut.",
	
	//Weather WU
	"It seems you don't have GPS enabled, so I can't tell the weather!" : "Ich kann dir das Wetter nicht sagen, du scheinst GPS deaktiviert zu haben.",
	" home" : " zu Hause",
	"Which one?" : "Welches?",
	"I see multiple results for that location! Could you be more specific? Maybe mention the state or country..." : "Ich habe mehrere Ergebnisse für diesen Standort! Kannst du etwas genauer sein? Vielleicht durch Nennung des Bundeslandes oder Landes...",
	"Weather for " : "Wetter für ",
	"Rain" : "Regen",
	"Don't forget your umbrella!" : "Vergiss deinen Regenschirm nicht!",
	"Yikes, it's hot!" : "Uff, es ist heiß!",
	"Brrr, it's cold!" : "Brr, es ist kalt!",
	"Temp: " : "Temperatur: ",
	"Status: " : "Status: ",
	"Feels Like: " : "Gefühlt wie: ",
	"Humidity: " : "Luftfeuchtigkeit: ",
	"Wind: " : "Wind: ",
	"Gust: " : "Böe: ",
	"Direction: " : "Richtung: ",
	" in " : " in ",
	" for " : " für ",
	
	//Weather Open
	"\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again." : "Für eine detailliertere Vorhersage kannst du deinen persönlichen Weather Underground Schlüssel in meiner Einstellungsseite hinterlegen! Falls du das schon getan hast, ist etwas mit deiner Anfrage schiefgegangen. Überprüfe deinen Schlüssel und versuche es erneut",
	"Something went wrong with my radar! Try asking me about the weather again." : "Etwas ist mit meinem Radar schiefgegangen! Frag mich einfach erneut nach dem Wetter",
	
	//Forecast WU
	"Forecast" : "Vorhersage",
	"High: " : "Hoch: ",
	"Low: " : "Tief: ",
	"3-Day Forecast" : "3-Tages-Vorhersage",
	
	//Forecast Open
	"Forecast for " : "Vorhersage für ",
	"Something went wrong with my radar! Try asking me about the forecast again." : "Etwas ist mit meinem Radar schiefgegangen! Frag mich einfach erneut nach der Vorhersage",	
	
	//Translate
	"Sorry, I don't speak " : "Entschuldige, ich spreche kein ",
	"Try another language, or speak more clearly." : "Versuche eine andere Sprache, oder sprich deutlicher",
	"If you want me to learn " : "Falls du willst, dass ich ",
	", use the Contact Developer link in the Pebble Appstore." : " lerne, nutze den “Supportanfrage an Entwickler” Link im Pebble Appstore.",
	"Hmmm..." : "Hmmm...",
	"I'm sorry, but I don't know' how to say \"" : "Es tut mir leid aber ich weiß nicht wie man \" sagt ",
	"\" in " : "\" auf ",
	"\n\n(Conf: " : "\n\n(Conf:",
	"Lost in Translation..." : "Bei der Übersetzung verloren gegangen",
	"...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again." : "...war ein guter Film und auch was gerade passiert ist. Entschuldige! Versuche mich erneut nach der Übersetzung zu fragen",
	
	//Define
	"I couldn't find a definition for " : "Ich konnte keine Definition für [word] finden",
	"I lost my dictionary! Try asking me again and I'll see if I can find it this time..." : "Ich habe mein Wörterbuch verloren. Frag mich erneut und ich versuche, es dieses Mal zu finden.",
	
	//Stock
	"Waiting for an IPO?" : "Wartest du auf einen Börsengang?",
	"Sorry, I couldn't locate a stock symbol for \"" : "Entschuldige, ich konnte kein Aktiensymbol für \"",
	"\". Are you sure they're public?" : "Bist du sicher, dass diese Firma an der Börse notiert ist?",
	"\n\nNow: $" : "\n\nJetzt: $",
	"\nChange: " : "\nÄnderung: ",
	"%\n\nOpen: $" : "%\n\nOffen: $",
	"\nHigh: $" : "\nHoch: $",
	"\nLow: $" : "\nTief: $",
	"\n\nLast Update: " : "\n\nLetzte Aktualisierung: ",
	"Ding ding ding...dong?" : "Ding ding ding...dong?",
	"Sorry, something went wrong when I tried to look up that company. Please try again." : "Entschuldige, irgendwas ist schief gelaufen, als ich versucht habe, dieses Unternehmen nachzuschlagen. Versuch es bitte nochmal.",
	
	//Add to List
	"List Updated!" : "Liste aktualisiert!",
	"Added \"" : "Hinzugefügt \”",
	"Added " : "Hinzugefügt ",
	"Something went wrong - and I don't want to forget to add that to your list! Please try again." : "Etwas ist schief gegangen - und ich will auf keinen Fall vergessen, das zu deiner Liste hinzuzufügen! Bitte versuche es noch einmal.",
	
	//Check List
	"Your list is empty!" : "Deine Liste ist leer!",
	"List" : "Liste",
	"Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it." : "Irgendetwas ist schief gegangen - Ich hatte deine Liste doch hier irgendwo hingelegt… Frag mich noch einmal und ich werde versuchen, sie zu finden.",
	
	//Remove from List
	"Removed \"" : "Entfernt \”",
	"I couldn't find " : "Ich konnte ",
	" on your list." : " nicht auf deiner Liste finden.",
	"Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!" : "Etwas ist schief gegangen - ich weiß, dass du es entfernen willst, aber du musst es nochmal versuchen. Sorry!",
	
	//Clear List
	"Your list has been cleared." : "Deine Liste wurde geleert.",
	"Something went wrong - I tried to clear your list but couldn't. Please try again!" : "Etwas ist schief gegangen - Ich habe vergeblich versucht, die Listen zu leeren. Bitte versuche es noch einmal!",
	
	//Conversion
	"fahrenheit" : "fahrenheit",
	"celsius" : "celsius",
	"kelvin" : "klvin",
	"degrees " : "grad",
	"liters" : "liter",
	"milliliters" : "milliliter",
	"kilograms" : "kilogramm",
	"grams" : "gramm",
	"centimeters" : "zentimeter",
	"meters" : "meter",
	"kilometers" : "kilometer",
	"fluid ounces" : "flüssige unze",
	"fluid-ounces" : "flüssige-unze",
	" feet " : " fuß",
	"to inches" : "in zoll",
	"foot" : "fuß",
	"feet" : "fuß",
	"inch" : "zoll",
	"inches" : "zoll",
	" Kelvin" : " Kelvin",
	"I don't recognize the units you're using (" : "Ich kenne diese Einheit nicht (",
	"), Sorry!" : ")!",
	"Apples to Oranges" : "Äpfel mit Birnen vergleichen",
	"Sorry, either " : "Sorry, entweder ",
	" isn't a valid conversion, or I don't know how to convert them." : " ist keine gültige Umwandlung oder ich weiß nicht, wie man sie konvertiert",
	"I don't think I know how to convert that!" : "Ich glaube nicht, dass ich weiß, wie man das konvertiert.",
	"yards" : "yards",
	"miles" : "meilen",
	"millimeters" : "millimeter",
	"pounds" : "pfund",
	"ounces" : "unzen",
	"gallons" : "gallonen",
	"quarts" : "quart",
	"pints" : "pint",
	"cups" : "tasse",
	"tablespoons" : "esslöffel",
	"teaspoons" : "teelöffel",
	
	//Health
	"goal" : "siel", //Detect request for step goal
	"steps" : "schritt", //Detect request for # of steps
	"far" : "weit", //Detect request for distance
	"distance" : "distanz", //Detect request for distance
	"sleep" : "schlaf", //Detect request for sleep
	"last night" : "letzte nacht", //Detect request for sleep
	"I don't understand..." : "Ich verstehe dich nicht...",
	"I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today." : "Ich glaube nicht, dass Pebble Health das aufzeichnet! Du kannst mich fragen, wie viele Schritte du gemacht hast oder wie weit du heute gelaufen bist.",
	"Something went wrong, but don't let that mess up your workout!" : "Irgendetwas ist schief gegangen. Aber lass das nicht dein Workout beeinflussen!",
	
	//Sports
	"Are they in the minors?" : "Spielen die in der zweiten Liga?",
	"Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Entschuldigung, Ich konnte das Team nicht finden! Versuch es vielleicht nochmal? Ich kenn mich mit Football, Fußball, Hockey, Baseball und Basketball aus.",
	"I'm seeing double!" : "Ich sehe doppelt!",
	"There are at least two teams with that name! Do you mean the " : "Es gibt mindestens zwei Teams mit diesem Namen! Meinst du die ",
	" or the " : " oder die ",
	"? Please ask again with the full team name." : "? Bitte frag noch einmal und verwende den ganzen Namen des Teams.",
	"Too much data!" : "Zu viele Informationen!",
	"I can't access my sports database right now! Maybe try again later?" : "Ich kann gerade nicht auf die Sportdatenbank zugreifen! Kannst du es später noch einmal versuchen?",
	"score" : "Spielstand", //Keyword for detecting score request
	"First Game of the Season:\n" : "Erstes Spiel der Saison:\n",
	"Preseason" : "Freundschaftsspiel",
	"Preseason\n" : "Freundschaftsspiel\n",
	"Final" : "Finale",
	"Offseason" : "Saisonende",
	"Looks like the season is over! Hope the " : "Sieht so aus, als wäre die Saison vorbei! Ich hoffe die",
	" do well next year!" : " schlagen sich nächstes Jahr gut!",
	"when" : "wann",
	"next" : "nächstes",
	"Next Game\n" : "Nächstes Spiel\n",
	"Is it sports trivia night?" : "Ist heute Sport-Nacht?",
	"I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Ich weiß, dass du mich etwas über Sport gefragt hast, aber ich weiß nicht, wie ich die Frage beantworten soll! Probier’s vielleicht noch einmal? Ich kenn mich mit Football, Fußball, Hockey, Baseball und Basketball aus.",
	"Penalty!" : "Foul!",
	"Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!" : "Entschuldigung - etwas ist schief gegangen während ich Infos zu dieser Mannschaft gesucht habe. Bitte probiere es noch einmal.\n\nFalls dieses Problem bei dieser Mannschaft immer aufritt, dann lass es meinen Entwickler wissen!",
	
	//IFTTT
	"If this, then huh?" : "Wenn dies, dann huh?",
	"To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page." : "Um IFTTT mit Snowy zu nutzen, musst du deinen Maker Key in den Einstellungen eintragen",
	"Something went wrong with your Maker Channel. Please try again.\n\nError\n" : "Mit deinem Maker Channel ist etwas schief gegangen. Bitte probiere es noch einmal. \n\nError\n",
	"Event Fired!" : "Event gestartet!",
	"Ok, I've asked IFTTT to set your thermostat to " : "Ok, ich hab IFTTT gebeten, dein Thermostat einzustellen auf ",
	" degrees.\n[snowy_thermostat]" : " Grad.\n[snowy_termostat]",
	"Recipe failed!" : "Rezept fehlgeschlagen!",
	"on" : "An",
	"off" : "Aus",
	"Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]" : "Ok, ich habe IFTTT gebeten, das Licht anzuschalten.\n[snowy_lights_on]",
	"Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]" : "Ok, ich habe IFTTT gebeten, das Licht auszuschalten.\n[snowy_lights_off]",
	"Sorry - I didn't understand what you wanted to do." : "Entschuldigung, ich habe nicht verstanden, was du tun wolltest",
	"Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]" : "Ok, ich habe IFTTT gebeten, dein Handy anzurufen, damit du es finden kannst.\n[snowy_find_my_phone]",
	"saying" : "mit dem Inhalt",
	"Ok, I've asked IFTTT to trigger the event 'snowy_" : "Okay ich habe IFTTT befohlen, das Event” + ‘snowy_ “zu starten",
	"Something went wrong with your request. The event 'snowy_" : "Etwas ist mit deiner Anfrage schiefgegangen. Das Event ‘snowy_",
	"' was not recognized by the IFTTT server." : "” wurde nicht vom IFTTT Server erkannt.",
	
	//Habits
	"list" : "zeige",
	"all" : "Alle",
	"(Enabled)" : "(Aktiviert)",
	"(Disabled)" : "(Deaktiviert)",
	"\n  - Count: " : "\n  - Anzahl: ",
	"\n  - Current: " : "\n - Aktuelles: ",
	"\n  - Longest: " : "\n - Längster: ",
	"streak" : "Streak",
	"Don't pick up any bad habits!" : "Gewöhn dir nichts Schlechtes an!",
	"I couldn't find that particular habit!" : "Ich konnte dieses Habit nicht finden!",
	"Current: " : "Momentaner: ",
	"\nLongest: " : "\nLängster: ",
	"count" : "Anzahl",
	"Count: " : "Anzahl: ",
	"Next Habit" : "Nächstes Habit",
	" at " : " um ", //Habit at Time
	"Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next." : "Entschuldige, ich bin mir nicht sicher, nach welchem Habit du suchst.  Denk dran, du kannst nach einem aktuellen Streak Zähler fragen, eine Liste aller Habits bekommen, oder herausfinden, welche als nächstes ansteht.",
	"I promise this won't become a habit!" : "Ich kann dir versprechen, dass wird keine Angewohnheit werden!",
	"Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." : "Etwas ist mit deiner Anfrage schief gelaufen! Denk dran, du kannst nach einem aktuellen Streak Zähler fragen, eine Liste aller Habits bekommen, oder herausfinden, welche als nächstes ansteht.",
	
	//Timeline
	"Timeline Down!" : "Timeline offline!",
	"Pebble's servers are down at the moment. Please try your request again later!" : "Pebble’s Server sind aktuell offline. Bitte versuche es später erneut!",
	"Timeline Error!" : "Timeline Fehler!",
	"Something's not quite right with that Timeline Pin!\nError: " : "Irgendetwas stimmt mit dem Timeline Pin nicht!\nError: ",
	"Something went wrong with your Timeline. Try again?" : "Etwas ist mit deiner Timeline schief gegangen. Versuch es nochmal.",
	
	
	//Language Names
	"french" : "französisch",
	"spanish" : "spanisch",
	"german" : "deutsch",
	"italian" : "italienisch",
	"czech" : "tschechisch",
	"dutch" : "niederländisch",
	"finnish" : "finnisch",
	"hungarian" : "ungarisch",
	"albanian" : "albanisch",
	"bosnian" : "bosnisch",
	"catalan" : "katalanisch",
	"croatian" : "kroatisch",
	"danish" : "dänisch",
	"estonian" : "estländisch",
	"icelandic" : "isländisch",
	"latvian" : "lettisch",
	"lithuanian" : "litauisch",
	"malay" : "malaiisch",
	"maltese" : "maltesisch",
	"polish" : "polnisch",
	"portuguese" : "portugiesisch",
	"romanian" : "romänisch",
	"slovak" : "slowakisch",
	"swedish" : "schwedisch",
	"turkish" : "türkisch",
	"english" : "englisch",
	"indonesian" : "indonesisch",
	"norwegian" : "norwegisch",
	
	//Get Opinion
	", but there may be better options available." : ", aber es gibt vielleicht bessere Optionen.",
	" that looks good to me!" : " Das sieht gut aus!",
	" that looks really good to me!" : " Das sieht sehr gut aus!",
	" that looks excellent!" : " Das sieht perfekt aus!",
	
	//Parsing
	"January" : "Januar",
	"February" : "Februar",
	"March" : "März",
	"April" : "April",
	"May" : "Mai",
	"June" : "Juni",
	"July" : "Juli",
	"August" : "August",
	"September" : "September",
	"October" : "Oktober",
	"November" : "November",
	"December" : "Dezember",
	"Sunday" : "Sonntag",
	"Monday" : "Montag",
	"Tuesday" : "Dienstag",
	"Wednesday" : "Mittwoch",
	"Thursday" : "Donnerstag",
	"Friday" : "Freitag",
	"Saturday" : "Samstag",
	"one" : "eins",
	"two" : "zwei",
	"three" : "drei",
	"four" : "vier",
	"five" : "fünf",
	"six" : "sechs",
	"seven" : "sieben",
	"eight" : "acht",
	"nine" : "neun",
	"ten" : "zehn",
	"Jan" : "Jan",
	"Feb" : "Feb",
	"Mar" : "Mar",
	"Apr" : "Apr",
	"Jun" : "Jun",
	"Jul" : "Jul",
	"Aug" : "Aug",
	"Sep" : "Sep",
	"Oct" : "Okt",
	"Nov" : "Nov",
	"Dec" : "Dez",
	
	//pebble.js
	"Something went wrong - although I'm not sure what. If this keeps happening, use the Contact Developer link in the app description.\n\nError: " : "Etwas ist schief gelaufen, ich weiß aber nicht genau, was. Rufe bitte den Entwickler-kontaktieren-Link in der App Beschreibung auf, wenn das Problem weiterhin auftritt.",
	"Settings Saved!" : "Einstellungen gespeichert!",
	"I'm having trouble opening my Settings page right now, maybe try again later?" : "Ich habe momentan Probleme mit dem Öffnen der Einstellungsseite, vielleicht versuchst du es später nochmal?",
	"For some reason, your Settings weren't saved correctly. Please try again." : "Aus irgendeinem Grund wurden deine Einstellungen nicht richtig gespeichert. Bitte versuche es noch einmal.",
	"Your settings have been updated!\n\nFont Size: " : "Deine Einstellungen wurden aktualisiert!\n\nSchriftgröße:",
	"Small" : "Klein",
	"Large" : "Groß",
	"\nTemp Unit: " : "\nTemperatur Einheit: ",
	"\nDistance: " : "\nDistanz: ",
	"Imperial" : "Imperial",
	"Metric" : "Metrisch",
	"\nConfirm: " : "\nBestätigen: ",
	"Yes" : "Ja",
	"No" : "Nein",
	"\nQuick-Exit: " : "\nSofort beenden: ",
	"\nFlick: " : "\nSchütteln: ",
	"\nHands-Free: " : "\nFreisprechmodus: ",
	"\nTime: " : "\nZeit: ",
	"\nHealth: " : "\nHealth: ",
	"Disabled" : "Deaktiviert",
	"Enabled" : "Aktiviert",
	"\nStep Goal: " : "\nSchrittziel: ",
	"\nMaker Key: " : "\nMaker Key: ",
	"Invalid" : "Ungültig",
	"Valid" : "Gültig",
	"\nWolfram Key: " : "\nWolfram Key: ",
	"\nWU Key: " : "\nWU Key: ",
	"Default" : "Standard",
	"Custom" : "Benutzerdefiniert",
	"\n\nHome Address:\n" : "\n\nHeimatadresse:\n",
	
	//URL Shorteners
	"\n\nFor more info, visit " : "\n\nFür mehr Informationen besuche "
};

var dict_portuguese = {
	"Thank You!" : "Obrigado!",
	"Thank you for supporting Snowy! Please give it a ❤ if you haven't already. There are some exciting features in Version 3.3 - check MyDogSnowy.com/changelog for more info." : "Obrigado por apoiar o Snowy! Se você ainda não deu um ❤, por favor, faça isso! Há muitas novas funcionalidades na Versão 3.3 - acesse MyDogSnowy.com/changelog para mais informação.",
	
	"I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information." : "Eu acho que não posso fazer o que você está me pedindo. Por favor, tente novamente ou visite mydogsnowy.com/commands pra mais informações.",
	
	//Introduce
	"Hi, I'm Snowy!" : "Oi, eu sou o Snowy!",
	"I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?" : "Eu sou um assistente pessoal pro Pebble Time. Nasci no Pebble Developer Retreat de 2015, e adoro ajudar pessoas! Como posso te ajudar?",
	
	//Description
	"I can do lots of things!" : "Eu posso fazer várias coisas!",
	"Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com" : "Aperte o botão para baixo na Tela Inicial para ver alguns exemplos de comandos. Você também pode visitar meu site: MyDogSnowy.com",
	
	//Spell
	"Sorry..." : "Desculpa...",
	"I'm afraid I don't know how to spell that! Could you please try again?" : "Eu acho que não sei soletrar isso! Você pode tentar denovo?",
	
	//Time
	"The time is " : "São",
	"The time is now!" : "A hora é agora!",
	"Sorry, I don't know what time it is in " : "Desculpa, eu não sei que horas são em",
	"Local Time in " : "Horário local em",
	"Uh-oh" : "Opa!",
	"Something went wrong - I don't know what time it is! Ironic, huh?" : "Alguma coisa deu errado - Eu não sei que horas são! Irônico, né?",
	"in" : "em", //Detect request for time in specific city
	
	//Date
	"Today is " : "Hoje é ",
	"Something went wrong - I don't know what today's date is!" : "Alguma coisa deu errado - Eu não sei que dia é hoje!",
	
	//Set Alarm
	"tomorrow" : "amanhã", //Detect keyword 'tomorrow', add 1 day to time
	"at" : "em", //Detect specific time
	"Alarm" : "Alarme", //Timeline Pin title
	"via Snowy" : "via Snowy", //Timeline Pin subtitle
	"Open Snowy" : "Abrir Snowy", //Timeline Pin action
	"Ok, alarm set!" : "Ok, alarme marcado!",
	"Alarm set for " : "Alarme marcado para",
	"Wait!" : "Espere!",
	"I didn't set an alarm because I couldn't tell what time you wanted it." : "Eu não marquei um alarme porque não consegui entender que horas você queria.",
	
	//Cancel Alarm
	"Ok, alarm cancelled!" : "Ok, alarme cancelado!",
	"You don't have an alarm set!" : "Você não tem um alarme configurado!",
	
	//Set Timer
	"Countdown time!" : "Timer!",
	"Timer set for " : "Timer configurado para ",
	" minute(s)." : " minuto(s)",
	" hour(s)." : " hora(s)",
	" hour(s) and " : " hora(s) e ",
	"Sorry! I think you're trying to set a timer but I didn't understand what you said." : "Desculpe! Acho que você quer marcar um timer mas eu não entendi o que você disse.",
	
	//Check Timer
	" hour" : " hora",
	" hours" : " horas",
	" minute" : " minuto",
	" minutes" : " minutos",
	" second" : " segundo",
	" seconds" : " segundos",
	"No timer" : "Nenhum timer",
	"Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example." : "Desculpe, não detectei nenhum timer rodando. Para marcar um timer , apenas diga \"Marcar timer para 5 minutos\", por exemplo.",
	"Time remaining" : "Tempo restante",
	"Something went wrong - maybe you haven't set a timer yet?" : "Algo deu errado - talvez você não tenha marcado um timer ainda?",
	
	//Cancel Timer
	"Ok, timer cancelled!" : "Ok, timer cancelado!",
	"You don't have a timer set!" : "Você não tem um timer marcado ainda!",
	
	//Eat
	"Where am I?" : "Onde eu estou?",
	"It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!" : "Parece que seu GPS está desabilitado, então eu não posso saber onde encontrar um lugar bom pra comer!",
	"There don't seem to be any restaurants nearby." : "Parece que não tem nenhum restaurante por perto!",
	" miles away." : "milhas de distância.",
	" kilometers away." : "quilômetros de distância.",
	"\n\nFor walking directions, just ask me \"How do I get there?\"" : "\n\nPara rotas a pé, apenas me pergunte \"Como eu chego lá?\"",
	"...is a nearby " : "... é próximo ",
	"restaurant" : "restaurante",
	"\n\nIt's located at " : "\n\nFica em ",
	"Something went wrong - there might be tasty food nearby but I can't seem to find it!" : "Alguma coisa deu errado - deve ter comida gostosa por perto mas eu não consigo encontrar!",
	
	//Directions
	"there" : "lá", //Detect request for directions to restaurant
	"Missing Address" : "Faltando Endereço",
	"You need to find a restaurant first! Ask me \"Where should I eat?\" to find one." : "Você precisa achar um restaurante primeiro! Me pergunte \"Aonde eu deveria comer?\" para encontrar um.",
	" (See map for details)" : " (Veja o mapa para detalhes)", //Text returned by API to be removed from results
	"Directions to " : "Rota para ",
	"home" : "casa", //Detect request for directions to home address
	"I don't have your home address on file! You can add it via my Settings page." : "Não tenho seu endereço de casa gravado! Você pode adicionar na página de Configurações.",
	"Directions to Home" : "Rota para casa",
	"to" : "para", //Detect request for directions to specific address
	"Recalculating..." : "Recalculando...",
	"I believe you're asking me for directions but I couldn't quite make out the address. Please try again!" : "Acho que você está me perguntando uma rota mas eu não entendi o endereço. Por favor tente de novo!",
	"I'm lost!!!" : "Estou perdido!!!",
	"I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?" : "Não conseguir encontrar uma rota para este endereço. Talvez seja hora de desdobrar aquele velho mapa de papel?",
	
	//Note
	"Note taken!" : "Anotado!",
	"Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!" : "Algo deu errado - Não entendi bem o que você disse. Tenho que melhorar minhas habilidades de anotação!",
	
	//Reminder
	"Ok, I'll remind you!" : "Ok, vou te lembrar!",
	"Reminder to \"" : "Lembrete para \"",
	"\" set for " : "\" configurado para ",
	"Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again." : "Alguma coisa deu errado - eu realmente queria te lembrar você de fazer aquela coisa aquela hora, mas você vai ter que tentar de novo.",
	"Reminder!" : "Lembrete!",
	"your" : "seu",
	
	
	//Calendar
	"Something went wrong - That sounds like an important event to add to your calendar, though! Please try again." : "Alguma coisa deu errado - Mas parece um evento importante para adicionar na sua agenda! Tente novamente por favor.",
	"Ok, calendar updated!" : "Ok, calendário atualizado!",
	"\" from " : "\" de ",
	" to " : " para ",
	" on " : " em ",
	"Meeting!" : "Encontro!",
	
	//Cancel
	"Ok, pin removed!" : "Ok, pin removido!",
	"I've removed the pin for \"" : "Eu removi o pin para \”",
	"\" from your timeline." : "\" da sua timeline.",
	"Like finding a pin in a haystack!" : "Como achar uma agulha num palheiro”",
	"I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event." : "Eu não encontrei nenhum pin recente para remover, desculpa”\n\nLembre-se, o comando \"Cancele Isso\" só pode ser usado para remover o seu lembrete ou evento mais recente.",
	"That's one persistent pin!" : "Esse é um pin persistente!",
	"Something went wrong with your request, and I couldn't remove that pin from your timeline!" : "Algo deu errado com o seu pedido, e eu não pude remover o pin da sua timeline!",
	
	//Calculate
	"$" : "R$", //Default currency symbol
	"% of $" : "% de $",
	" = $" : " = R$",
	"% of " : "% de ",
	"Error" : "Erro",
	"Sorry, I don't know how to do that kind of math." : "Desculpe, não sei fazer esse tipo de conta.",
	"Something went wrong - you stumped me! Try the calculation again." : "Alguma coisa deu errado - me confundi! Vamos tentar calcular de novo.",
	
	//Random
	" between " : " entre ", //Indicates first number in range
	" and " : " e ", //Indicates second number in range
	"The answer is 42..." : "A resposta é 42...",
	"...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds." : "... mas parece que você não sabe qual é a pergunta! Você tem que especificar dois números para os limites inferior e superior.",
	"Hmmm, how about " : "Hmmm, que tal ",
	"No range was specified, so I picked 1 and 100 as bounds!" : "Nenhum intervalo foi especificado, então eu escolhi 1 e 100 como os limites!",
	"! Definitely " : "! Definitivamente ",
	"Go with " : "Vai com ",
	"NaNaNaNaNa... Batman!" : "NaNaNaNaNa... Batman!",
	"Something went wrong, please try again..." : "Alguma coisa deu errado, por favor tente novamente...",
	
	//Coin Flip
	"Aaaannnddd..." : "Eeeeeee...",
	"...it's Heads!" : "... é Cara!",
	"...it's Tails!" : "é Coroa!",
	"...it's Heads...I think. Something went wrong - so you might want to try again." : "...É cara… eu acho. Alguma coisa deu errado - por favor tente novamente.",
	
	//Weather WU
	"It seems you don't have GPS enabled, so I can't tell the weather!" : "Parece que você não está com o GPS ativo, então não posso te dizer o clima!",
	" home" : " casa",
	"Which one?" : "Qual?",
	"I see multiple results for that location! Could you be more specific? Maybe mention the state or country..." : "Vejo múltiplos resultados para essa localização! Você pode ser mais específico? Talvez mencionar o estado ou país...",
	"Weather for " : "Clima para ",
	"Rain" : "Chuva",
	"Don't forget your umbrella!" : "Não esqueça o seu guarda-chuva!",
	"Yikes, it's hot!" : "Eita, tá quente!",
	"Brrr, it's cold!" : "Brrr, que frio!",
	"Temp: " : "Temp: ",
	"Status: " : "Status: ",
	"Feels Like: " : "Sensação térmica: ",
	"Humidity: " : "Umidade: ",
	"Wind: " : "Vento: ",
	"Gust: " : "Brisa: ",
	"Direction: " : "Direção: ",
	" in " : " em ",
	" for " : " para ",
	
	//Weather Open
	"\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again." : "Para previsões do tempo mais detalhadas, você pode adicionar sua própria chave do Weather Underground nas configurações! Se você já fez isso, então alguma coisa deu errado. Verifique sua chave, e tente novamente.",
	"Something went wrong with my radar! Try asking me about the weather again." : "Alguma coisa deu errada com o meu radar! Tente me perguntar sobre o clima de novo!",
	
	//Forecast WU
	"Forecast" : "Previsão do tempo",
	"High: " : "Alta: ",
	"Low: " : "Baixa: ",
	"3-Day Forecast" : "Previsão de 3 dias",
	
	//Forecast Open
	"Forecast for " : "Previsão do tempo para ",
	"Something went wrong with my radar! Try asking me about the forecast again." : "Alguma coisa deu errado no meu radar! Por favor pergunte sobre a previsão do tempo novamente.",	
	
	//Translate
	"Sorry, I don't speak " : "Desculpe, eu não falo ",
	"Try another language, or speak more clearly." : "Tente outra língua, ou fale mais claramente.",
	"If you want me to learn " : "Se você quiser que eu aprenda ",
	", use the Contact Developer link in the Pebble Appstore." : ", use o link \"Contact Developer\" na Pebble Appstore.",
	"Hmmm..." : "Hmmm...",
	"I'm sorry, but I don't know' how to say \"" : "Me desculpe, mas eu não sei dizer \"",
	"\" in " : "\" em ",
	"\n\n(Conf: " : "\n\n(Conf: ",
	"Lost in Translation..." : "Perdido na tradução...",
	"...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again." : "...foi um ótimo filme, e o que acabou de acontecer. Desculpe! Por favor me peça para traduzir suas palavras novamente.",
	
	//Define
	"I couldn't find a definition for " : "Não conseguir encontrar uma definição para ",
	"I lost my dictionary! Try asking me again and I'll see if I can find it this time..." : "Eu perdi meu dicionário! Por favor me pergunte novamente e eu vou tentar encontrar dessa vez...",
	
	//Stock
	"Waiting for an IPO?" : "Esperando por um IPO?",
	"Sorry, I couldn't locate a stock symbol for \"" : "Desculpe, não consegui encontrar ações para \"",
	"\". Are you sure they're public?" : "\". Tem certeza que eles estão na bolsa?",
	"\n\nNow: $" : "\n\nAgora: $",
	"\nChange: " : "\nMudança:",
	"%\n\nOpen: $" : "%\n\nAberto: $",
	"\nHigh: $" : "\nAlta: $",
	"\nLow: $" : "\nBaixa: $",
	"\n\nLast Update: " : "\n\nÚltima Atualização: ",
	"Ding ding ding...dong?" : "Ding ding ding...dong?",
	"Sorry, something went wrong when I tried to look up that company. Please try again." : "Desculpe, algo deu errado quando tentei procurar por essa empresa. Por favor tente novamente.",
	
	//Add to List
	"List Updated!" : "Lista Atualizada!",
	"Added \"" : "Adicionado \"",
	"Added " : "Adicionado ",
	"Something went wrong - and I don't want to forget to add that to your list! Please try again." : "Algo deu errado - e eu não quero esquecer de adicionar isso na sua lista! Por favor tente novamente.",
	
	//Check List
	"Your list is empty!" : "Sua lista está vazia!",
	"List" : "Lista",
	"Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it." : "Algo deu errado - eu sei que coloquei a sua lista por aqui em algum lugar… me pergunte novamente e eu vou tentar achar.",
	
	//Remove from List
	"Removed \"" : "Removido \"",
	"I couldn't find " : "Eu não pude encontrar ",
	" on your list." : " na sua lista",
	"Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!" : "Algo deu errado - Eu sei que você quer remover essa coisa, mas você vai precisar tentar denovo. Desculpa!",
	
	//Clear List
	"Your list has been cleared." : "Sua lista foi limpa.",
	"Something went wrong - I tried to clear your list but couldn't. Please try again!" : "Algo deu errado - Eu tentei limpar sua lista, mas não consegui. Por favor tente novamente!",
	
	//Conversion
	"fahrenheit" : "fahrenheit",
	"celsius" : "celsius",
	"kelvin" : "kelvin",
	"degrees " : "graus ",
	"liters" : "litros",
	"milliliters" : "milímetros",
	"kilograms" : "quilogramas",
	"grams" : "gramas",
	"centimeters" : "centímetros",
	"meters" : "metros",
	"kilometers" : "quilômetros",
	"fluid ounces" : "onças líquidas",
	"fluid-ounces" : "onças líquidas",
	" feet " : " pés ",
	"to inches" : "para polegadas",
	"foot" : "pé",
	"feet" : "pés",
	"inch" : "polegada",
	"inches" : "polegadas",
	" Kelvin" : " Kelvin",
	"I don't recognize the units you're using (" : "Eu não entendo as unidades que você está usando (",
	"), sorry!" : "), desculpa!",
	"Apples to Oranges" : "Maçãs para Laranjas",
	"Sorry, either " : "Desculpe, ou ",
	" isn't a valid conversion, or I don't know how to convert them." : " não é uma conversão válida, ou eu não sei como converter.",
	"I don't think I know how to convert that!" : "Eu acho que não sei converter isso!",
	"yards" : "jardas",
	"miles" : "milhas",
	"millimeters" : "milímetros",
	"pounds" : "libras",
	"ounces" : "onças",
	"gallons" : "galões",
	"quarts" : "quartos",
	"pints" : "pints",
	"cups" : "copos",
	"tablespoons" : "colheres de sopa",
	"teaspoons" : "colheres de chá",
	
	//Health
	"goal" : "meta", //Detect request for step goal
	"steps" : "passos", //Detect request for # of steps
	"far" : "longe", //Detect request for distance
	"distance" : "distância", //Detect request for distance
	"sleep" : "dormi", //Detect request for sleep
	"last night" : "noite passada", //Detect request for sleep
	"I don't understand..." : "Eu não entendo...",
	"I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today." : "Eu acho que o Pebble Health não registra isso! Você pode me perguntar quantos passos deu, ou quão longe andou hoje.",
	"Something went wrong, but don't let that mess up your workout!" : "Algo deu errado, mas não deixe isso estragar seu exercício!",
	
	//Sports
	"Are they in the minors?" : "Eles são populares?",
	"Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Desculpe, eu não consegui encontrar esse time. Talvez se você tentar denovo? Eu conheço Futebol Americano, Futebol, Hockey, Baseball e Basquete.",
	"I'm seeing double!" : "Achei dois times!",
	"There are at least two teams with that name! Do you mean the " : "Tem dois times com esse nome! Você quis dizer o ",
	" or the " : " ou o ",
	"? Please ask again with the full team name." : "? Por favor, pregunte novamente com o nome completo do time.",
	"Too much data!" : "Muita informação!",
	"I can't access my sports database right now! Maybe try again later?" : "Não consigo acessar o banco de dados de esportes agora! Talvez se você pudesse tentar mais tarde?",
	"score" : "pontos", //Keyword for detecting score request
	"First Game of the Season:\n" : "Primeiro jogo da temporada:\n",
	"Preseason" : "Pré-temporada",
	"Preseason\n" : "Pré-temporada\n",
	"Final" : "Final",
	"Offseason" : "Baixa temporada",
	"Looks like the season is over! Hope the " : "Parece que a temporada acabou! Espero que os ",
	" do well next year!" : " joguem bem ano que vem!",
	"when" : "quando",
	"next" : "próximo",
	"Next Game\n" : "Próximo Jogo\n",
	"Is it sports trivia night?" : "Você está em algum tipo de quiz?",
	"I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Sei que você está perguntando algo sobre esportes, mas eu não sei a resposta para essa pergunta! Talvez se você tentar denovo? Eu conheço Futebol Americano, Futebol, Hockey, Baseball e Basquete.",
	"Penalty!" : "Penalidade!",
	"Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!" : "Desculpe - algo deu errado enquanto eu estava procurando por esse time. Por favor, tente denovo.\n\nSe esse problema persistir para um time específico, por favor contate o meu Desenvolvedor!",
	
	//IFTTT
	"If this, then huh?" : "Se isso, então o quê?",
	"To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page." : "Para integrar o Snowy com o IFTTT, você precisa entrar sua Maker Key na página de configurações. ",
	"Something went wrong with your Maker Channel. Please try again.\n\nError\n" : "Algo deu errado com o Maker Channel. Por favor tente de novo.\n\nErro\n",
	"Event Fired!" : "Evento acionado!",
	"Ok, I've asked IFTTT to set your thermostat to " : "Ok, eu pedi para o IFTTT colocar o seu termostato em ",
	" degrees.\n[snowy_thermostat]" : " graus\n[snowy_thermostat]",
	"Recipe failed!" : "A receita falhou!",
	"on" : "ligar",
	"off" : "desligar",
	"Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]" : "Ok, eu pedi para o IFTTT ligar suas luzes.\n[snowy_lights_on]",
	"Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]" : "Ok, eu pedi para o IFTTT desligar suas luzes.\n[snowy_lights_off]",
	"Sorry - I didn't understand what you wanted to do." : "Desculpe - Eu não entendi o que você quer fazer",
	"Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]" : "Ok, eu pedi para o IFTTT ligar pro seu celular para que você possa acha-lo\n",
	"saying" : "dizendo",
	"Ok, I've asked IFTTT to trigger the event 'snowy_" : "Ok, eu pedi pro IFTTT acionar o evento ‘snowy_",
	"Something went wrong with your request. The event 'snowy_" : "Algo deu errado com o seu pedido. O evento ‘snowy_",
	"' was not recognized by the IFTTT server." : " não foi reconhecido pelo servidor do IFTTT.",
	
	//Habits
	"list" : "lista",
	"all" : "todos",
	"(Enabled)" : "(Habilitado)",
	"(Disabled)" : "(Desabilitado)",
	"\n  - Count: " : "\n - Contagem: ",
	"\n  - Current: " : "\n - Atual: ",
	"\n  - Longest: " : "\n - Maior: ",
	"streak" : "sequência",
	"Don't pick up any bad habits!" : "Não pegue nenhum hábito ruim!",
	"I couldn't find that particular habit!" : "Não consegui encontrar esse hábito!",
	"Current: " : "Atual: ",
	"\nLongest: " : "\nMaior: ",
	"count" : "contagem",
	"Count: " : "Contagem",
	"Next Habit" : "Próximo Hábito",
	" at " : " as ", //Habit at Time
	"Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next." : "Desculpe, eu não tenho certeza de qual hábito você está procurando. Lembre-se, você pode me perguntar por uma contagem ou sequência pelo nome do hábito, obter uma lista de todos seus hábitos, ou descobrir qual o próximo.",
	"I promise this won't become a habit!" : "Prometo que isso não vai virar um hábito!",
	"Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." : "Algo deu errado com o seu pedido! Lembre-se, você pode me perguntar por uma contagem ou sequência pelo nome do hábito, obter uma lista de todos seus hábitos, ou descobrir qual o próximo.",
	
	//Timeline
	"Timeline Down!" : "Timeline fora do ar!",
	"Pebble's servers are down at the moment. Please try your request again later!" : "Os servidores da Pebble estão fora no momento. Por favor, tente novamente mais tarde!",
	"Timeline Error!" : "Erro na timeline!",
	"Something's not quite right with that Timeline Pin!\nError: " : "Algo não está muito certo com esse pin!\nErro: ",
	"Something went wrong with your Timeline. Try again?" : "Algo deu errado com a sua timeline. Pode tentar denovo?",
	
	
	//Language Names
	"french" : "francês",
	"spanish" : "espanhol",
	"german" : "alemão",
	"italian" : "italiano",
	"czech" : "tcheco",
	"dutch" : "holandês",
	"finnish" : "finlandês",
	"hungarian" : "húngaro",
	"albanian" : "albanês",
	"bosnian" : "bósnio",
	"catalan" : "catalão",
	"croatian" : "croata",
	"danish" : "dinamarquês",
	"estonian" : "estoniano",
	"icelandic" : "islandês",
	"latvian" : "letão",
	"lithuanian" : "lituano",
	"malay" : "malaio",
	"maltese" : "maltês",
	"polish" : "polonês",
	"portuguese" : "português",
	"romanian" : "romeno",
	"slovak" : "eslovaco",
	"swedish" : "sueco",
	"turkish" : "turco",
	"english" : "inglês",
	"indonesian" : "indonésio",
	"norwegian" : "norueguês",
	
	//Get Opinion
	", but there may be better options available." : ", mas podem ter opções melhores disponíveis.",
	" that looks good to me!" : " isso parece bom pra mim",
	" that looks really good to me!" : "isso parece muito bom pra mim",
	" that looks excellent!" : " isso parece excelente!",
	
	//Parsing
	"January" : "Janeiro",
	"February" : "Fevereiro",
	"March" : "Março",
	"April" : "Abril",
	"May" : "Maio",
	"June" : "Junho",
	"July" : "Julho",
	"August" : "Agosto",
	"September" : "Setembro",
	"October" : "Outubro",
	"November" : "Novembro",
	"December" : "Dezembro",
	"Sunday" : "Domingo",
	"Monday" : "Segunda-feira",
	"Tuesday" : "Terça-feira",
	"Wednesday" : "Quarta-feira",
	"Thursday" : "Quinta-feira",
	"Friday" : "Sexta-feira",
	"Saturday" : "Sábado",
	"one" : "um",
	"two" : "dois",
	"three" : "três",
	"four" : "quatro",
	"five" : "cinco",
	"six" : "seis",
	"seven" : "sete",
	"eight" : "oito",
	"nine" : "nove",
	"ten" : "dez",
	"Jan" : "Jan",
	"Feb" : "Fev",
	"Mar" : "Mar",
	"Apr" : "Abr",
	"Jun" : "Jun",
	"Jul" : "Jul",
	"Aug" : "Ago",
	"Sep" : "Set",
	"Oct" : "Out",
	"Nov" : "Nov",
	"Dec" : "Dez",
	
	//pebble.js
	"Something went wrong - although I'm not sure what. If this keeps happening, use the Contact Developer link in the app description.\n\nError: " : "Algo deu errado - Na verdade eu não sei o que. Se isso continuar acontecendo, por favor use o link \"Contact Developer\" na descrição do app.\n\nError: ",
	"Settings Saved!" : "Configurações Salvas!",
	"I'm having trouble opening my Settings page right now, maybe try again later?" : "Tive problemas ao abrir a página de Configurações agora, vamos tentar de novo mais tarde?",
	"For some reason, your Settings weren't saved correctly. Please try again." : "Por algum motivo, suas Configurações não foram salvas corretamente. Por favor tente de novo.",
	"Your settings have been updated!\n\nFont Size: " : "Suas configurações foram atualizadas!\n\nTamanho da Fonte:",
	"Small" : "Pequena",
	"Large" : "Grande",
	"\nTemp Unit: " : "\nUnidade de Temperatura: ",
	"\nDistance: " : "\nDistância: ",
	"Imperial" : "Imperial",
	"Metric" : "Métrica",
	"\nConfirm: " : "\nConfirmar: ",
	"Yes" : "Sim",
	"No" : "Não",
	"\nQuick-Exit: " : "\nSaída Rápida: ",
	"\nFlick: " : "\nMovimento Rápido: ",
	"\nHands-Free: " : "\nMãos Livres: ",
	"\nTime: " : "\nTempo: ",
	"\nHealth: " : "\nSaúde: ",
	"Disabled" : "Desativado",
	"Enabled" : "Ativado",
	"\nStep Goal: " : "\nObjetivo de Passos: ",
	"\nMaker Key: " : "Chave do Maker: ",
	"Invalid" : "Inválido",
	"Valid" : "Válido",
	"\nWolfram Key: " : "\nChave do Wolfram: ",
	"\nWU Key: " : "\n Chave WU: ",
	"Default" : "Padrão",
	"Custom" : "Personalizado",
	"\n\nHome Address:\n" : "\n\nEndereço de Casa:\n",
	
	//URL Shorteners
	"\n\nFor more info, visit " : "\n\nPara mais informações, visite "
};

var dict_danish = {
	"Thank You!" : "Tak!",
	"Thank you for supporting Snowy! Please give it a ❤ if you haven't already. There are some exciting features in Version 3.3 - check MyDogSnowy.com/changelog for more info." : "Tak fordi du støtter Snowy! Giv venligst et ❤️ hvis du ikke allerede har gjort det. Der er nogle spændende funktioner i version 3.3 - se MyDogSnowy.com/changelog for mere information.",
	
	"I don't think I can do what you're asking of me. Please try again, or visit mydogsnowy.com /commands for more information." : "Jeg tror ikke jeg kan gøre hvad du spørger mig om. Prøv igen, eller besøg mydogsnowy.com/commands for mere information.",
	
	//IFTTT Plus
	"snowy_reminder" : "snowy_påmindelse",
	"snowy_calendar" : "snowy_kalender",
	"snowy_alarm" : "snowy_alarm",
	"snowy_note" : "snowy_note",
	
	//Introduce
	"Hi, I'm Snowy!" : "Hej, jeg er Snowy!",
	"I'm a personal assistant for Pebble Time. I was born at the 2015 Pebble Developer Retreat, and I love helping people! How can I help you?" : "Jeg er en personlig assistent til Pebble Time. Jeg blev føret ved Pebble Developer Retreat 2015, og jeg elsker at hjælpe folk! Hvad kan jeg gøre for dig?",
	
	//Description
	"I can do lots of things!" : "Jeg kan mange ting!",
	"Tap the Down button on the Home Screen to see some example commands. You can also visit my website: MyDogSnowy.com" : "Tryk Ned på hjemmeskærmen for at se eksempler på kommandoer. Du kan også besøge min hjemmeside: MyDogSnowy.com",
	
	//Spell
	"Sorry..." : "Beklager...",
	"I'm afraid I don't know how to spell that! Could you please try again?" : "Jeg er bange for at jeg ikke ved hvordan man staver til det! Kan du prøve igen?",
	
	//Time
	"The time is " : "Klokken er ",
	"The time is now!" : "Klokken er nu!",
	"Sorry, I don't know what time it is in " : "Beklager, jeg ved ikke hvad klokken er i ",
	"Local Time in " : "Lokal tid i ",
	"Uh-oh" : "Åh ååh",
	"Something went wrong - I don't know what time it is! Ironic, huh?" : "Noget gik galt - jeg ved ikke hvad klokken er! Ironisk, ikke?",
	"in" : "i", //Detect request for time in specific city
	
	//Date
	"Today is " : "Idag er ",
	"Something went wrong - I don't know what today's date is!" : "Noget gik galt - jeg ved ikke hvad dato det er idag!",
	
	//Set Alarm
	"tomorrow" : "imorgen", //Detect keyword 'tomorrow', add 1 day to time
	"at" : "klokken", //Detect specific time
	"Alarm" : "Alarm", //Timeline Pin title
	"via Snowy" : "med Snowy", //Timeline Pin subtitle
	"Open Snowy" : "Åben Snowy", //Timeline Pin action
	"Ok, alarm set!" : "Ok, alarmen er sat!",
	"Alarm set for " : "Alarm sat til ",
	"Wait!" : "Vent!",
	"I didn't set an alarm because I couldn't tell what time you wanted it." : "Jeg har ikke sat en alarm, for jeg kunne ikke forstå hvornår du ønskede den.",
	
	//Cancel Alarm
	"Ok, alarm cancelled!" : "Ok, alarmen er annulleret!",
	"You don't have an alarm set!" : "Du har ikke sat nogen alarm!",
	
	//Set Timer
	"Countdown time!" : "Nedtælling",
	"Timer set for " : "Nedtælling er sat til ",
	" minute(s)." : " minut(ter)",
	" hour(s)." : " time(r)",
	" hour(s) and " : " time(r) og ",
	"Sorry! I think you're trying to set a timer but I didn't understand what you said." : "Beklager! Jeg tror du prøver at starte nedtælling, men jeg forstod ikke helt hvad du mente.",
	
	//Check Timer
	" hour" : " time",
	" hours" : " timer",
	" minute" : " minut",
	" minutes" : " minutter",
	" second" : " sekund",
	" seconds" : " sekunder",
	"No timer" : "Ingen nedtælling",
	"Sorry, I don't detect any timers currently running. To set a timer, just say \"Set timer for 5 minutes\", for example." : "Beklager, jeg tror ikke der kører nogen nedtælling. For at starte en nedtælling, sig \"Start nedtælling på 5 minutter\", for eksempel.",
	"Time remaining" : "Tid tilbage",
	"Something went wrong - maybe you haven't set a timer yet?" : "Noget gik galt - måske har du ikke startet en nedtælling?",
	
	//Cancel Timer
	"Ok, timer cancelled!" : "Ok, nedtælling annulleret!",
	"You don't have a timer set!" : "Du har ikke startet en nedtælling!",
	
	//Eat
	"Where am I?" : "Hvor er jeg?",
	"It seems you don't have GPS enabled, so I can't tell you where to find something good to eat!" : "Det ser ud som om du ikke har GPS aktiveret, så jeg kan ikke sige dig hvor du kan finde noget at spise!",
	"There don't seem to be any restaurants nearby." : "Der er vidst ikke nogle restauranter i nærheden.",
	" miles away." : " mil væk.",
	" kilometers away." : " kilometer væk.",
	"\n\nFor walking directions, just ask me \"How do I get there?\"" : "\n\nFor at få retningsanvisninger, spørg mig \"Hvordan kommer jeg derhen?\"",
	"...is a nearby " : "...er en nærliggende ",
	"restaurant" : "restaurant",
	"\n\nIt's located at " : "\n\nDen ligger ved ",
	"Something went wrong - there might be tasty food nearby but I can't seem to find it!" : "Noget gik galt - der er muligvis noget god mad i nærheden, men jeg kan vidst ikke finde det!",
	
	//Directions
	"there" : "der", //Detect request for directions to restaurant
	"Missing Address" : "Mangler adresse",
	"You need to find a restaurant first! Ask me \"Where should I eat?\" to find one." : "Du skal finde en restaurant først! Spørg mig \"Hvor kan jeg spise?\" for at finde en.",
	" (See map for details)" : " (Se kort for detaljer)", //Text returned by API to be removed from results
	"Directions to " : "Anvisninger til ",
	"home" : "hjem", //Detect request for directions to home address
	"I don't have your home address on file! You can add it via my Settings page." : "Jeg har ikke gemt din hjem adresse! Du kan tilføje den på min Indstillings side.",
	"Directions to Home" : "Anvisninger til Hjem",
	"to" : "til", //Detect request for directions to specific address
	"Recalculating..." : "Omregner...",
	"I believe you're asking me for directions but I couldn't quite make out the address. Please try again!" : "Jeg tror du spørger mig om vejanvisninger, men jeg kan ikke helt forstå adressen. Prøv igen!",
	"I'm lost!!!" : "Jeg er fortabt!",
	"I couldn't find directions to that address. Maybe it's time to whip out the 'ol unfolding map?" : "Jeg kan ikke finde vejanvisninger til den adresse. Måske er det tid til at finde det gammeldags kort frem?",
	
	//Note
	"Note taken!" : "Note taget!",
	"Something went wrong - I didn't quite catch what you said. I need to work on my note-taking skills!" : "Noget gik galt - jeg fangede ikke helt hvad du sagde. Jeg skal arbejde på mine noterings evner!",
	
	//Reminder
	"Ok, I'll remind you!" : "Ok, jeg påminder dig!",
	"Reminder to \"" : "Påmindelse til at ",
	"\" set for " : "\" sat til ",
	"Something went wrong - I really want to remind you to do that thing at that time, but you'll have to try again." : "Noget gik galt - jeg vil virkelig gerne minde dig om den ting, men du skal lige prøve igen.",
	"Reminder!" : "Påmindelse!",
	"your" : "din",
	
	
	//Calendar
	"Something went wrong - That sounds like an important event to add to your calendar, though! Please try again." : "Noget gik galt - det lød som en vigtig begivenhed der skal i din kalender! Prøv igen!",
	"Ok, calendar updated!" : "Ok, kalenderen er opdateret!",
	"\" from " : "\" fra ",
	" to " : " til ",
	" on " : " den ",
	"Meeting!" : "Aftale!",
	
	//Cancel
	"Ok, pin removed!" : "Ok, markering fjernet!",
	"I've removed the pin for \"" : "Jeg har fjernet markering fra \"",
	"\" from your timeline." : "\" fra tidslinjen.",
	"Like finding a pin in a haystack!" : "Som at finde en nål i en høstak!",
	"I couldn't find any recent pins to remove, sorry!\n\nRemember, the \"Cancel That\" command can only be used to remove your most recent Reminder or Calendar Event." : "Jeg kunne ikke finde nogle nylige markeringer til at fjerne.\n\nHusk på at \"Annuller det\"-kommandoen kan kun bruges til at fjerne den sidste nye påmindelse eller kalender aftale.",
	"That's one persistent pin!" : "Det er en sejlivet markering!",
	"Something went wrong with your request, and I couldn't remove that pin from your timeline!" : "Noget gik galt med din forespørgsel, og jeg kunne ikke fjerne den markering fra din tidslinje!",
	
	//Calculate
	"$" : "kr", //Default currency symbol
	"% of $" : "% af kr",
	" = $" : " = kr",
	"% of " : "% af ",
	"Error" : "Fejl",
	"Sorry, I don't know how to do that kind of math." : "Beklager, jeg tror ikke jeg kender den type matematik.",
	"Something went wrong - you stumped me! Try the calculation again." : "Noget gik galt - du gjorde mig tavs! Prøv regnestykket igen.",
	
	//Random
	" between " : " mellem ", //Indicates first number in range
	" and " : " og", //Indicates second number in range
	"The answer is 42..." : "Svaret er 42...",
	"...but it sounds like you don't know what the question is! You have to specify two numbers for the lower and upper bounds." : "...men det lyder som om du ikke vidste hvad spørgsmålet er! Du skal specificere to tal, den nedre og øvre grænse.",
	"Hmmm, how about " : "Hmmm, hvad med ",
	"No range was specified, so I picked 1 and 100 as bounds!" : "Ingen grænse var specificeret, så jeg valgte 1 og 100 som grænse!",
	"! Definitely " : "! Bestemt ",
	"Go with " : "Gå med",
	"NaNaNaNaNa... Batman!" : "NaNaNaNaNa… Batman!",
	"Something went wrong, please try again..." : "Noget gik galt, prøv igen...",
	
	//Coin Flip
	"Aaaannnddd..." : "Oooogggg...",
	"...it's Heads!" : "...det blev krone!",
	"...it's Tails!" : "...det blev plat!",
	"...it's Heads...I think. Something went wrong - so you might want to try again." : "...det blev krone...tror jeg. Noget gik galt - så prøv igen.",
	
	//Weather WU
	"It seems you don't have GPS enabled, so I can't tell the weather!" : "Det ser ud som om du ikke har GPS aktiveret, så jeg kan ikke fortælle dig hvordan vejret er!",
	" home" : " hjem",
	"Which one?" : "Hvilken?",
	"I see multiple results for that location! Could you be more specific? Maybe mention the state or country..." : "Jeg har fundet flere resultater. Kan du specificere? Måske staten eller landet...",
	"Weather for " : "Vejret for ",
	"Rain" : "Regn",
	"Don't forget your umbrella!" : "Glem ikke din paraply!",
	"Yikes, it's hot!" : "Puuha, det bliver varmt!",
	"Brrr, it's cold!" : "Uuh, det bliver koldt!",
	"Temp: " : "Temp: ",
	"Status: " : "Status: ",
	"Feels Like: " : "Føles som: ",
	"Humidity: " : "Fugtighed: ",
	"Wind: " : "Vind: ",
	"Gust: " : "Vindstød: ",
	"Direction: " : "Retning: ",
	" in " : " i ",
	" for " : " for ",
	
	//Weather Open
	"\n\nFor more detailed forecasts, you can add your own Weather Underground Key in my Settings page! If you've already done so, then something went wrong with your request. Check your key, and try again." : "\n\nFor en mere detaljeret vejrudsigt, kan du tilføje din egen Weather Underground nøgle på min Indstillings side! Hvis du allerede har gjort det, så må noget være gået galt med din forespørgsel. Tjek din nøgle, og prøv igen.",
	"Something went wrong with my radar! Try asking me about the weather again." : "Noget gik galt med min radar! Prøv at spørge mig om vejret igen.",
	
	//Forecast WU
	"Forecast" : "Vejrudsigt",
	"High: " : "Høj: ",
	"Low: " : "Lav: ",
	"3-Day Forecast" : "3-Dages udsigt",
	
	//Forecast Open
	"Forecast for " : "Vejrudsigt for ",
	"Something went wrong with my radar! Try asking me about the forecast again." : "Noget gik galt med min radar! Prøv at spørge mig om vejrudsigten igen.",	
	
	//Translate
	"Sorry, I don't speak " : "Beklager, jeg taler ikke ",
	"Try another language, or speak more clearly." : "Prøv et andet sprog, eller tal mere tydeligt.",
	"If you want me to learn " : "Hvis du vil lære mig ",
	", use the Contact Developer link in the Pebble Appstore." : " så kontakt udvikleren gennem et link i Pebble AppStore.",
	"Hmmm..." : "Hmmm...",
	"I'm sorry, but I don't know' how to say \"" : "Beklager, men jeg ved ikke hvordan man siger \"",
	"\" in " : "\" på ",
	"\n\n(Conf: " : "\n\n(Conf: ",
	"Lost in Translation..." : "Fortabt i oversættelsen...",
	"...was a good movie, and also what just happened. Sorry! Try asking me to translate your words again." : "...det var en god film, og også det der skete. Beklager! Prøv at be mig om at oversætte noget igen.",
	
	//Define
	"I couldn't find a definition for " : "Jeg kunne ikke finde en definition på ",
	"I lost my dictionary! Try asking me again and I'll see if I can find it this time..." : "Jeg har mistet mit leksikon! Prøv at spørge mig igen, og jeg vil prøve at finde det frem igen...",
	
	//Stock
	"Waiting for an IPO?" : "Venter på en IPO",
	"Sorry, I couldn't locate a stock symbol for \"" : "Beklager, jeg kunne ikke finde aktie kursen for \"",
	"\". Are you sure they're public?" : "\". Er du sikker på den er offentlig?",
	"\n\nNow: $" : "\n\nNu: $",
	"\nChange: " : "\nÆndring: ",
	"%\n\nOpen: $" : "%\n\nÅben: $",
	"\nHigh: $" : "\nHøj: $",
	"\nLow: $" : "\nLav: $",
	"\n\nLast Update: " : "\n\nSidst opdateret: ",
	"Ding ding ding...dong?" : "Ding ding ding...dong?",
	"Sorry, something went wrong when I tried to look up that company. Please try again." : "Beklager, noget gik galt da jeg prøvede at finde det firma. Prøv igen.",
	
	//Add to List
	"List Updated!" : "Liste opdateret!",
	"Added \"" : "Tilføjede \"",
	"Added " : "Tilføjet ",
	"Something went wrong - and I don't want to forget to add that to your list! Please try again." : "Noget gik galt - og jeg vil helst ikke glemme noget på listen! Så prøv igen.",
	
	//Check List
	"Your list is empty!" : "Din liste er tom!",
	"List" : "Liste",
	"Something went wrong - I know I put your list around here somewhere...ask me again and I'll try to find it." : "Noget gik galt - jeg ved at jeg lagde din liste et sted…spørg mig igen, så skal jeg prøve at finde den.",
	
	//Remove from List
	"Removed \"" : "Fjernede \"",
	"I couldn't find " : "Jeg kunne ikke finde ",
	" on your list." : " på din liste.",
	"Something went wrong - I know you want to remove that thing, but you'll need to try again. Sorry!" : "Noget gik galt - jeg ved du gerne vil fjerne den ting, men du skal lige prøve igen.",
	
	//Clear List
	"Your list has been cleared." : "Din liste er tømt.",
	"Something went wrong - I tried to clear your list but couldn't. Please try again!" : "Noget gik galt - jeg prøvede at stryge alt på listen, men kunne ikke. Prøv igen!",
	
	//Conversion
	"fahrenheit" : "fahrenheit",
	"celsius" : "celcius",
	"kelvin" : "kelvin",
	"degrees " : "grader",
	"liters" : "liter",
	"milliliters" : "millimeter",
	"kilograms" : "kilo",
	"grams" : "gram",
	"centimeters" : "centimeter",
	"meters" : "meter",
	"kilometers" : "kilometer",
	"fluid ounces" : "flydende ounc",
	"fluid-ounces" : "flydende-ounc",
	" feet " : " fod ",
	"to inches" : "til tommer",
	"foot" : "fod",
	"feet" : "fod",
	"inch" : "tomme",
	"inches" : "tommer",
	" Kelvin" : " Kelvin",
	"I don't recognize the units you're using (" : "Jeg genkender ikke den enhed du bruger (",
	"), sorry!" : "), beklager!",
	"Apples to Oranges" : "Æbler til appelsiner",
	"Sorry, either " : "Beklager, eller er ",
	" isn't a valid conversion, or I don't know how to convert them." : " ikke en rigtig omregning, eller er det bare mig der ikke kan finde ud af det?",
	"I don't think I know how to convert that!" : "Jeg tror ikke jeg ved hvordan man omregner det!",
	"yards" : "yards",
	"miles" : "mil",
	"millimeters" : "millimeter",
	"pounds" : "pund",
	"ounces" : "ounces",
	"gallons" : "gallons",
	"quarts" : "quarts",
	"pints" : "pints",
	"cups" : "kopper",
	"tablespoons" : "spiseskeer",
	"teaspoons" : "teskeer",
	
	//Health
	"goal" : "mål", //Detect request for step goal
	"steps" : "skridt", //Detect request for # of steps
	"far" : "langt", //Detect request for distance
	"distance" : "afstand", //Detect request for distance
	"sleep" : "søvn", //Detect request for sleep
	"last night" : "sidste nat", //Detect request for sleep
	"I don't understand..." : "Jeg forstår ikke...",
	"I don't think Pebble Health tracks that! You can ask me how many steps you've taken, or how far you've walked today." : "Jeg tror ikke Pebble Sundhed måler det! Du kan spørge mig hvor mange skridt du har taget, eller hvor langt du har gået idag.",
	"Something went wrong, but don't let that mess up your workout!" : "Noget gik galt, men lad ikke det hindre din træning!",
	
	//Sports
	"Are they in the minors?" : "Er de af de mindre?",
	"Sorry, I couldn't find that team! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Beklager, jeg kunne ikke finde det hold! Måske prøv igen? I kender til amerikansk fodbold, fodbold, hockey, baseball og basketball.",
	"I'm seeing double!" : "Jeg ser dobbelt!",
	"There are at least two teams with that name! Do you mean the " : "Der er mindst to hold med det navn! Mener du ",
	" or the " : " eller ",
	"? Please ask again with the full team name." : "? Prøv at spørge mig mere specifikt.",
	"Too much data!" : "For meget information!",
	"I can't access my sports database right now! Maybe try again later?" : "Jeg kan ikke læse sports databasen lige nu! Måske prøv igen senere?",
	"score" : "score", //Keyword for detecting score request
	"First Game of the Season:\n" : "Første kamp i sæsonen:\n",
	"Preseason" : "For-sæson",
	"Preseason\n" : "For-sæson\n",
	"Final" : "Finale",
	"Offseason" : "Efter-sæson",
	"Looks like the season is over! Hope the " : "Det ser ud som om sæsonen er færdig! Håber at ",
	" do well next year!" : " klarer sig godt næste år!",
	"when" : "når",
	"next" : "næste",
	"Next Game\n" : "Næste kamp\n",
	"Is it sports trivia night?" : "Er det sports-quiz aften?",
	"I know you're asking me something sports related, but I don't know how to answer that question! Maybe try again? I know Football, Soccer, Hockey, Baseball, and Basketball." : "Jeg ved at du spørger mig om noget sports relateret, men jeg kender ikke svaret! Måske prøv igen? Jeg kender til amerikansk fodbold, fodbold, hockey, baseball og basketball.",
	"Penalty!" : "Straffe!",
	"Sorry - something went wrong while I was looking up that team. Please try again.\n\nIf this problem persists for a specific team, please let my Developer know!" : "Beklager - noget gik galt da jeg undersøgte holdet nærmere. Prøv igen.\n\nHvis problemet varer ved med et bestemt hold, kontakt venligst udvikleren!",
	
	//IFTTT
	"If this, then huh?" : "Hvis dette, så hvad?",
	"To integrate Snowy with IFTTT, you'll need to input your Maker Key on the settings page." : "For at integrere Snowy med IFTTT, skal du skrive din Hoved Nøgle på Indstillings siden.",
	"Something went wrong with your Maker Channel. Please try again.\n\nError\n" : "Noget gik galt med din konto eller kanal. Prøv igen.\n\nFejl\n",
	"Event Fired!" : "Handling udført!",
	"Ok, I've asked IFTTT to set your thermostat to " : "Ok, jeg har spurgt IFTTT om at sætte din termostat til ",
	" degrees.\n[snowy_thermostat]" : " grader.\n[snowy_thermostat]",
	"Recipe failed!" : "Opskrift fejlede!",
	"on" : "tændt",
	"off" : "slukket",
	"Ok, I've asked IFTTT to turn ON your lights.\n[snowy_lights_on]" : "Ok, jeg har bedt IFTTT om at tænde dit lys.\n[snowy_lights_on]",
	"Ok, I've asked IFTTT to turn OFF your lights.\n[snowy_lights_off]" : "Ok, jeg har bedt IFTTT om at slukke dit lys.\n[snowy_lights_off]",
	"Sorry - I didn't understand what you wanted to do." : "Beklager - jeg forstod ikke hvad du mente.",
	"Ok, I've asked IFTTT to call your phone so you can find it.\n[snowy_find_my_phone]" : "Ok, jeg har spurgt IFTTT om at ringe til din mobil, så du kan finde den.\n[snowy_find_my_phone]",
	"saying" : "siger",
	"Ok, I've asked IFTTT to trigger the event 'snowy_" : "Ok, jeg har bedt IFTTT om at udføre handlingen ‘snowy_",
	"Something went wrong with your request. The event 'snowy_" : "Noget gik galt med din forespørgsel. Handlingen ‘snowy_",
	"' was not recognized by the IFTTT server." : " blev ikke genkendt af IFTTT.",
	
	//Habits
	"list" : "liste",
	"all" : "alle",
	"(Enabled)" : "(Aktiveret)",
	"(Disabled)" : "(Deaktiveret)",
	"\n  - Count: " : "\n - Antal: ",
	"\n  - Current: " : "\n - Nuværende: ",
	"\n  - Longest: " : "\n - Længste: ",
	"streak" : "stræk",
	"Don't pick up any bad habits!" : "Få nu ikke nogle dårlige vaner!",
	"I couldn't find that particular habit!" : "Jeg kunne ikke finde den specifikke vane!",
	"Current: " : "Nuværende: ",
	"\nLongest: " : "\nLongest: ",
	"count" : "antal",
	"Count: " : "Antal: ",
	"Next Habit" : "Næste vane",
	" at " : " klokken ", //Habit at Time
	"Sorry, I'm not sure I know what habit you're looking for. Remember, you can ask for a current count or steak by habit name, get a list of all your habits, or find out which one is next." : "Beklager, jeg ved ikke hvilken vane du kigger efter. Husk, du kan spørge efter det nuværende antal eller stræk med vane navn, få en liste over alle dine vaner, eller finde den næste.",
	"I promise this won't become a habit!" : "Jeg lover dig, dette vil ikke blive en vane!",
	"Something went wrong with your request! Remember, you can ask for a current count or streak by habit name, get a list of all your habits, or find out which one is next." : "Noget gik galt med din forespørgsel. Husk, du kan spørge efter det nuværende antal eller stræk med vane navn, få en liste over alle dine vaner, eller finde den næste.",
	
	//Timeline
	"Timeline Down!" : "Tidslinje Ned!",
	"Pebble's servers are down at the moment. Please try your request again later!" : "Pebble’s servere er nede lige nu. Prøv igen senere!",
	"Timeline Error!" : "Tidslinje fejl!",
	"Something's not quite right with that Timeline Pin!\nError: " : "Noget er ikke helt rigtig med Tidslinje markeringen!/nFejl: ",
	"Something went wrong with your Timeline. Try again?" : "Noget gik galt med din Tidslinje. Prøv igen?",
	
	
	//Language Names
	"french" : "fransk",
	"spanish" : "spansk",
	"german" : "tysk",
	"italian" : "italiensk",
	"czech" : "tjekkisk",
	"dutch" : "hollandsk",
	"finnish" : "finsk",
	"hungarian" : "ungarsk",
	"albanian" : "albansk",
	"bosnian" : "bosnisk",
	"catalan" : "katalansk",
	"croatian" : "kroatisk",
	"danish" : "dansk",
	"estonian" : "estisk",
	"icelandic" : "islandsk",
	"latvian" : "lettisk",
	"lithuanian" : "litauisk",
	"malay" : "malaysisk",
	"maltese" : "maltansk",
	"polish" : "polsk",
	"portuguese" : "portugisisk",
	"romanian" : "rumænsk",
	"slovak" : "slovakisk",
	"swedish" : "svensk",
	"turkish" : "tyrkisk",
	"english" : "engelsk",
	"indonesian" : "indonesisk",
	"norwegian" : "norsk",
	
	//Get Opinion
	", but there may be better options available." : ", men der er muligvis bedre muligheder.",
	" that looks good to me!" : " jeg synes det ser godt ud!",
	" that looks really good to me!" : " jeg synes det ser rigtig godt ud!",
	" that looks excellent!" : " det ser perfekt ud!",
	
	//Parsing
	"January" : "Januar",
	"February" : "Februar",
	"March" : "Marts",
	"April" : "April",
	"May" : "Maj",
	"June" : "Juni",
	"July" : "Juli",
	"August" : "August",
	"September" : "September",
	"October" : "Oktober",
	"November" : "November",
	"December" : "December",
	"Sunday" : "Søndag",
	"Monday" : "Mandag",
	"Tuesday" : "Tirsdag",
	"Wednesday" : "Onsdag",
	"Thursday" : "Torsdag",
	"Friday" : "Fredag",
	"Saturday" : "Lørdag",
	"one" : "en",
	"two" : "to",
	"three" : "tre",
	"four" : "fire",
	"five" : "fem",
	"six" : "seks",
	"seven" : "syv",
	"eight" : "otte",
	"nine" : "ni",
	"ten" : "ti",
	"Jan" : "Jan",
	"Feb" : "Feb",
	"Mar" : "Mar",
	"Apr" : "Apr",
	"Jun" : "Jun",
	"Jul" : "Jul",
	"Aug" : "Aug",
	"Sep" : "Sep",
	"Oct" : "Okt",
	"Nov" : "Nov",
	"Dec" : "Dec",
	
	//pebble.js
	"Something went wrong - although I'm not sure what. If this keeps happening, use the Contact Developer link in the app description.\n\nError: " : "Noget gik galt - selvom jeg ved ikke hvad. Hvis dette fortsætter med at ske, så kontakt venligst udvikleren fra Pebble AppStore.\n\nFejl: ",
	"Settings Saved!" : "Indstillinger gemt!",
	"I'm having trouble opening my Settings page right now, maybe try again later?" : "Jeg har lidt svært ved at åbne indstillinger lige nu, måske senere?",
	"For some reason, your Settings weren't saved correctly. Please try again." : "Af en eller anden grund blev dine indstillinger ikke gemt korrekt. Prøv igen.",
	"Your settings have been updated!\n\nFont Size: " : "Dine indstillinger er opdateret!\n\nSkrift størrelse: ",
	"Small" : "Lille",
	"Large" : "Stor",
	"\nTemp Unit: " : "\nTemp enhed: ",
	"\nDistance: " : "\nAfstand: ",
	"Imperial" : "Imperial",
	"Metric" : "Metrisk",
	"\nConfirm: " : "\nBekræft: ",
	"Yes" : "Ja",
	"No" : "Nej",
	"\nQuick-Exit: " : "\nHurtig-Afslut: ",
	"\nFlick: " : "\nRyst: ",
	"\nHands-Free: " : "\nHåndfri: ",
	"\nTime: " : "\nTid: ",
	"\nHealth: " : "\nSundhed: ",
	"Disabled" : "Deaktiveret",
	"Enabled" : "Aktiveret",
	"\nStep Goal: " : "\nSkridt mål: ",
	"\nMaker Key: " : "\nMaker Key: ",
	"Invalid" : "Ikke godkendt",
	"Valid" : "Godkendt",
	"\nWolfram Key: " : "\nWolfram Key: ",
	"\nWU Key: " : "\nWU Key: ",
	"Default" : "Standard",
	"Custom" : "Brugerdefineret",
	"\n\nHome Address:\n" : "\n\nHjemme adresse:\n",
	
	//URL Shorteners
	"\n\nFor more info, visit " : "\n\nFor mere info, se "
};

module.exports = {
	_ : function(string){
		switch(Config.getLang()){
			case "en": return string;
			case "es": return dict_spanish[string] ? dict_spanish[string] : string;
			case "fr": return dict_french[string] ? dict_french[string] : string;
			case "de": return dict_german[string] ? dict_german[string] : string;
			case "pt": return dict_portuguese[string] ? dict_portuguese[string] : string;
			case "da": return dict_danish[string] ? dict_danish[string] : string;
			default: return string;
		}
	}
};