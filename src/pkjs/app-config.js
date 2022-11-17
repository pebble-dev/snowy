module.exports = [
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "Options"
			},
			{
				"type" : "select",
				"messageKey" : "TemperatureUnit",
				"label" : "Temperature",
				"defaultValue" : "f",
				"options" : [
					{
						"label" : "Fahrenheit",
						"value" : "f"
					},
					{
						"label" : "Celsius",
						"value" : "c"
					}
				]
			},
			{
				"type" : "select",
				"messageKey" : "FontSize",
				"label" : "Font Size",
				"defaultValue" : 1,
				"options" : [
					{
						"label" : "Small",
						"value" : 1
					},
					{
						"label" : "Large",
						"value" : 0
					}
				]
			},
			{
				"type" : "select",
				"messageKey" : "DistanceUnit",
				"label" : "Distance",
				"defaultValue" : 0,
				"options" : [
					{
						"label" : "Imperial",
						"value" : 0
					},
					{
						"label" : "Metric",
						"value" : 1
					}
				]
			}
		]
	},
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "Features"
			},	
			{
				"type" : "toggle",
				"messageKey" : "HandsFree",
				"label" : "Hands Free Mode",
				"description" : "Launch Snowy with a flick of the wrist, and flick again to speak a command."
			},
			{
				"type" : "toggle",
				"messageKey" : "FlickToDismiss",
				"label" : "Flick to Dismiss",
				"description" : "Once you receive a reply from Snowy, flick your wrist to dismiss it."
			},
			{
				"type" : "toggle",
				"messageKey" : "QuickExit",
				"label" : "Quick Exit",
				"description" : "Once you receive a reply from Snowy, hitting the Back button will exit the app."
			},
			{
				"type" : "toggle",
				"messageKey" : "ConfirmDictation",
				"label" : "Confirm Dictation",
				"description" : "After you speak a command, your speech will be displayed on-screen before Snowy receives it."
			},
			{
				"type" : "toggle",
				"messageKey" : "Fullscreen",
				"label" : "Fullscreen Replies",
				"description" : "Replies will take up the entire screen, rather than the default Notification style."
			},
			{
				"type" : "toggle",
				"messageKey" : "NightMode",
				"label" : "Night Mode",
				"description" : "Replies will appear in White text on a Black background."
			}
		]
	},
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "Home Screen"
			},
			{
				"type" : "select",
				"messageKey" : "Widget",
				"defaultValue" : 0,
				"id" : "widget",
				"label" : "Widget",
				"description" : "<em>* Requires appropriate API Key.</em>",
				"options" : [
					{
						"label" : "None (Text)",
						"value" : 0
					},
					{
						"label" : "None (Time)",
						"value" : 1
					},
					/*{
						"label" : "Timer",
						"value" : 2
					},*/
					{
						"label" : "Countdown",
						"value" : 3
					},
					{
						"label" : "Date (JAN 1)",
						"value" : 4
					},
					{
						"label" : "Date (TUESDAY)",
						"value" : 5
					},
					{
						"label" : "Date (TUES, JAN 1)",
						"value" : 18
					},
					{
						"label" : "Date (10/25/16)",
						"value" : 6
					},
					{
						"label" : "Date (25-10-16)",
						"value" : 7
					},
					{
						"label" : "Steps",
						"value" : 8
					},
					{
						"label" : "Distance",
						"value" : 9
					},
					/*{
						"label" : "Heart Rate",
						"value" : 10
					},*/
					/*{
						"label" : "Travel*",
						"value" : 11
					},*/
					{
						"label" : "Weather*",
						"value" : 12
					},
					{
						"label" : "Stock Price",
						"value" : 13
					},
					/*{
						"label" : "Commute Time**",
						"value" : 14
					},*/
					{
						"label" : "Alt. Timezone",
						"value" : 15
					},
					{
						"label" : "Watch Battery %",
						"value" : 16
					},
					/*{
						"label" : "Smart Widget (Beta)",
						"value" : 17
					}*/
				]
			},
			{
				"type" : "input",
				"id" : "countdownInput",
				"label" : "Countdown Date",
				"attributes" : {
					"placeholder" : "e.g. December 25"
				}
			},
			{
				"type" : "input",
				"id" : "stockInput",
				"label" : "Stock Symbol",
				"attributes" : {
					"placeholder" : "e.g. AAPL",
					"maxlength" : 5
				}
			},
			{
				"type" : "select",
				"id" : "timezoneInput",
				"options" : [
					{
						"value" : "-12",
						"label" : "UTC-12"
					},
					{
						"value" : "-11",
						"label" : "UTC-11"
					},
					{
						"value" : "-10",
						"label" : "UTC-10 (e.g. Papeete, Honolulu)"
					},
					{
						"value" : "-9",
						"label" : "UTC-9 (e.g. Anchorage)"
					},
					{
						"value" : "-8",
						"label" : "UTC-8 (e.g. Los Angeles, Vancouver)"
					},
					{
						"value" : "-7",
						"label" : "UTC-7 (e.g. Phoenix, Calgary)"
					},
					{
						"value" : "-6",
						"label" : "UTC-6 (e.g. Chicago, Guatemala City)"
					},
					{
						"value" : "-5",
						"label" : "UTC-5 (e.g. New York, Lima, Toronto)"
					},
					{
						"value" : "-4",
						"label" : "UTC-4 (e.g. Santiago, La Paz, Manaus)"
					},
					{
						"value" : "-3",
						"label" : "UTC-3 (e.g. Buenos Aires, São Paulo)"
					},
					{
						"value" : "-2",
						"label" : "UTC-2"
					},
					{
						"value" : "-1",
						"label" : "UTC-1"
					},
					{
						"value" : "0",
						"label" : "UTC±0 (e.g. Casablanca, Dublin, London)"
					},
					{
						"value" : "1",
						"label" : "UTC+1 (e.g. Berlin, Madrid, Paris, Rome)"
					},
					{
						"value" : "2",
						"label" : "UTC+2 (e.g. Athens, Cairo, Istanbul)"
					},
					{
						"value" : "3",
						"label" : "UTC+3 (e.g. Moscow, Nairobi, Baghdad)"
					},
					{
						"value" : "4",
						"label" : "UTC+4 (e.g. Dubai)"
					},
					{
						"value" : "5",
						"label" : "UTC+5 (e.g. Karachi, Yekaterinburg)"
					},
					{
						"value" : "6",
						"label" : "UTC+6 (e.g. Almaty, Dhaka, Omsk)"
					},
					{
						"value" : "7",
						"label" : "UTC+7 (e.g. Jakarta, Bangkok, Hanoi)"
					},
					{
						"value" : "8",
						"label" : "UTC+8 (e.g. Beijing, Taipei, Singapore)"
					},
					{
						"value" : "9",
						"label" : "UTC+9 (e.g. Seoul, Tokyo)"
					},
					{
						"value" : "10",
						"label" : "UTC+10 (e.g. Sydney, Melbourne)"
					},
					{
						"value" : "11",
						"label" : "UTC+11 (e.g. Noumea)"
					},
					{
						"value" : "12",
						"label" : "UTC+12 (e.g. Auckland, Suva)"
					},
					{
						"value" : "13",
						"label" : "UTC+13"
					},
					{
						"value" : "14",
						"label" : "UTC+14"
					}
				]
			}
		]
	},
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "Health"
			},
			{
				"type" : "input",
				"messageKey" : "StepGoal",
				"label" : "Step Goal",
				"attributes" : {
					"type" : "number"
				}
			},
			{
				"type" : "toggle",
				"messageKey" : "InactivityMonitor",
				"label" : "Inactivity Monitor",
				"id" : "inactivityMonitor",
				"description" : "Snowy will ask you to go for a walk if you've been mostly inactive for an hour."
			},
			{
				"type" : "input",
				"label" : "Start Time",
				"id" : "inactivityStart",
				"messageKey" : "InactivityStart",
				"attributes" : {
					"type" : "time"
				}
			},
			{
				"type" : "input",
				"label" : "End Time",
				"id" : "inactivityEnd",
				"messageKey" : "InactivityEnd",
				"attributes" : {
					"type" : "time"
				}
			}
		]
	},
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "Custom Commands"
			},
			{
				"type" : "text",
				"defaultValue" : "Set up to four custom commands to appear in the Sample Command Menu (Down on the Home Screen)."
			},
			{
				"type" : "input",
				"messageKey" : "Custom[0]",
				"attributes" : {
					"placeholder" : "e.g. Remind me to call the office at 2 pm"
				}
			},
			{
				"type" : "input",
				"messageKey" : "Custom[1]",
				"attributes" : {
					"placeholder" : "e.g. Set a timer for 20 minutes"
				}
				
			},
			{
				"type" : "input",
				"messageKey" : "Custom[2]",
				"attributes" : {
					"placeholder" : "e.g. Please turn my lights on"
				}
			},
			{
				"type" : "input",
				"messageKey" : "Custom[3]",
				"attributes" : {
					"placeholder" : "e.g. Tell me the capital of Argentina"
				}
			},
			{
				"type" : "input",
				"messageKey" : "Reddit",
				"defaultValue" : "news",
				"label" : "Set a custom subreddit for \"What's new?\" command.",
				"attributes" : {
					"placeholder" : "e.g. news (default), worldnews, pebble, etc."
				}
			}
		]
	},
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "Locations"
			},
			{
				"type" : "input",
				"messageKey" : "HomeAddress",
				"label" : "Home Address"
			},
			{
				"type" : "input",
				"messageKey" : "WorkAddress",
				"label" : "Work Address"
			}
		]
	},
	{
		"type" : "section",
		"items" : [
			{
				"type" : "heading",
				"defaultValue" : "API Keys"
			},
			{
				"type" : "toggle",
				"id" : "master",
				"messageKey" : "MasterKeyEnabled",
				"label" : "Enter API Keys via Master Key",
				"description" : "Please visit https://pmkey.xyz for more info.",
				"defaultValue" : true
			},
			{
				"type" : "input",
				"label" : "Master Key Email",
				"id" : "masterEmail",
				"messageKey" : "MasterKeyEmail",
				"attributes" : {
					"type" : "email"
				}
			},
			{
				"type" : "input",
				"label" : "Master Key PIN",
				"id" : "masterPIN",
				"messageKey" : "MasterKeyPIN",
				"attributes" : {
					"type" : "number"
				}
			},
			{
				"type" : "button",
				"id" : "masterButton",
				"defaultValue" : "Sync API Keys"
			},
			{
				"type" : "input",
				"label" : "IFTTT",
				"messageKey" : "IftttKey",
				"description" : "Use Snowy to trigger IFTTT Recipes! More information at mydogsnowy.com/ifttt.",
				"id" : "ifttt"
			},
			{
				"type" : "toggle",
				"label" : "IFTTT Plus",
				"messageKey" : "IftttPlus",
				"id" : "iftttPlus",
				"description" : "Automatically send an event to your Maker Channel with every Reminder (snowy_reminder), Calendar Event (snowy_calendar), and Alarm (snowy_alarm).",
				"defaultValue" : true
			},
			{
				"type" : "input",
				"label" : "Weather Underground",
				"messageKey" : "WuKey",
				"description" : "Snowy has a default Weather Underground API Key, but in order to receive more detailed weather reports and use the Weather widget, you'll need your own (it's free).",
				"id" : "weather"
			},
			{
				"type" : "input",
				"label" : "Wolfram Alpha",
				"messageKey" : "WolframKey",
				"description" : "Snowy has a default Wolfram Alpha API Key, but if you'd like to track your own usage or just help relieve the burden on Snowy, you can provide your own.",
				"id" : "wolfram"
			},
			{
				"type" : "input",
				"label" : "Travel Priority Access",
				"messageKey" : "TravelKey",
				"description" : "If you're a First Class user of Ronny Carr's Travel App, you can provide Snowy with your Travel ID to ask about flight times or gate information!",
				"id" : "travel"
			},
			{
				"type" : "input",
				"label" : "My Habits",
				"messageKey" : "HabitsKey",
				"description" : "If you use Habits by Stephen Rees-Carter and have the My Habits upgrade, you can use Snowy to check in your current progress or streak count!",
				"id" : "habits"
			}
		]
	},
	{
		"type" : "submit",
		"defaultValue" : "Save Settings"
	}
];