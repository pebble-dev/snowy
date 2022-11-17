var _ = require('./app-localize')._;

module.exports = [
	{
		name :_("meters"), //
		options : [
			{
				name :_("yards"),
				multiplier : 1.09361
			},
			{
				name :_("kilometers"),
				multiplier : 0.001
			},
			{
				name :_("feet"),
				multiplier : 3.28084
			},
			{
				name :_("inches"),
				multiplier : 39.3701
			},
			{
				name :_("miles"),
				multiplier : 0.000621371
			},
			{
				name :_("centimeters"),
				multiplier : 100
			},
			{
				name :_("millimeters"),
				multiplier : 1000
			}
		]
	},
	{
		name :"kilometers",
		options : [
			{
				name :"meters",
				multiplier : 1000
			},
			{
				name :"centimeters",
				multiplier : 100000
			},
			{
				name :"millimeters",
				multiplier : 1000000
			},
			{
				name :"miles",
				multiplier : 0.621371
			},
			{
				name :"yards",
				multiplier : 1093.61
			},
			{
				name :"feet",
				multiplier : 3280.84
			},
			{
				name :"inches",
				multiplier : 39370.1
			}
		]
	},
	{
		name :_("centimeters"),
		options : [
			{
				name :_("kilometers"),
				multiplier : 0.00001
			},
			{
				name :_("millimeters"),
				multiplier : 0.1
			},
			{
				name :_("meters"),
				multiplier : 0.01
			},
			{
				name :_("miles"),
				multiplier : 0.0000062137
			},
			{
				name :_("yards"),
				multiplier : 0.0109361
			},
			{
				name :_("feet"),
				multiplier : 0.0328084
			},
			{
				name :_("inches"),
				multiplier : 0.393701
			}
		]
	},
	{
		name :_("miles"),
		options : [
			{
				name :_("kilometers"),
				multiplier : 1.60934
			},
			{
				name :_("meters"),
				multiplier : 1609.34
			},
			{
				name :_("centimeters"),
				multiplier : 160934
			},
			{
				name :_("millimeters"),
				multiplier : 1609340
			},
			{
				name :_("yards"),
				multiplier : 1760
			},
			{
				name :_("feet"),
				multiplier : 5280
			},
			{
				name :_("inches"),
				multiplier : 63360
			}			
		]
	},
	{
		name :_("yards"),
		options : [
			{
				name :_("kilometers"),
				multiplier : 0.0009144
			},
			{
				name :_("meters"),
				multiplier : 0.9144
			},
			{
				name :_("miles"),
				multiplier : 0.000568182
			},
			{
				name :_("centimeters"),
				multiplier : 91.44
			},
			{
				name :_("millimeters"),
				multiplier : 914.4
			},
			{
				name :_("feet"),
				multiplier : 3
			},
			{
				name :_("inches"),
				multiplier : 36
			}			
		]
	},
	{
		name :_("feet"),
		options : [
			{
				name :_("kilometers"),
				multiplier : 0.0003048
			},
			{
				name :_("meters"),
				multiplier : 0.3048
			},
			{
				name :_("miles"),
				multiplier : 0.000189394
			},
			{
				name :_("centimeters"),
				multiplier : 30.48
			},
			{
				name :_("millimeters"),
				multiplier : 304.8
			},
			{
				name :_("yards"),
				multiplier : 0.333333
			},
			{
				name :_("inches"),
				multiplier : 12
			}					
		]
	},
	{
		name :_("inches"),
		options : [
			{
				name :_("kilometers"),
				multiplier : 0.0000254
			},
			{
				name :_("meters"),
				multiplier : 0.0254
			},
			{
				name :_("miles"),
				multiplier : 0.000015783
			},
			{
				name :_("centimeters"),
				multiplier : 2.54
			},
			{
				name :_("millimeters"),
				multiplier : 25.4
			},
			{
				name :_("feet"),
				multiplier : 0.0833333
			},
			{
				name :_("yards"),
				multiplier : 0.0277778
			}					
		]
	},
	{
		name :_("millimeters"),
		options : [
			{
				name :_("kilometers"),
				multiplier : 0.000001
			},
			{
				name :_("centimeters"),
				multiplier : 0.1
			},
			{
				name :_("meters"),
				multiplier : 0.001
			},
			{
				name :_("miles"),
				multiplier : 0.00000062137
			},
			{
				name :_("yards"),
				multiplier : 0.00109361
			},
			{
				name :_("feet"),
				multiplier : 0.00328084
			},
			{
				name :_("inches"),
				multiplier : 0.0393701
			}
		]
	},
	{
		name :_("pounds"), //
		options : [
			{
				name :_("ounces"),
				multiplier : 16
			},
			{
				name :_("grams"),
				multiplier : 453.592
			},
			{
				name :_("kilograms"),
				multiplier : 0.453592
			}
		]
	},
	{
		name :_("ounces"),
		options : [
			{
				name :_("pounds"),
				multiplier : 0.0625
			},
			{
				name :_("grams"),
				multiplier : 28.3495
			},
			{
				name :_("kilograms"),
				multiplier : 0.0283495
			}
		]
	},
	{
		name :_("grams"),
		options : [
			{
				name :_("pounds"),
				multiplier : 0.00220462
			},
			{
				name :_("ounces"),
				multiplier : 0.035274
			},
			{
				name :_("kilograms"),
				multiplier : 0.001
			}
		]
	},
	{
		name :_("kilograms"),
		options : [
			{
				name :_("grams"),
				multiplier : 1000
			},
			{
				name :_("ounces"),
				multiplier : 35.274
			},
			{
				name :_("pounds"),
				multiplier : 2.20462
			}
		]
	},
	{
		name :_("gallons"),
		options : [
			{
				name :_("quarts"),
				multiplier :  4
			},
			{
				name :_("pints"),
				multiplier : 8
			},
			{
				name :_("cups"),
				multiplier : 15.7725
			},
			{
				name :_("fluid-ounces"),
				multiplier : 128
			},
			{
				name :_("tablespoons"),
				multiplier : 256
			},
			{
				name :_("teaspoons"),
				multiplier : 768
			},
			{
				name :_("liters"),
				multiplier : 3.78541
			},
			{
				name :_("milliliters"),
				multiplier : 3785.41
			}
		]
	},
	{
		name :_("quarts"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.25
			},
			{
				name :_("pints"),
				multiplier : 2
			},
			{
				name :_("cups"),
				multiplier : 3.94314
			},
			{
				name :_("fluid-ounces"),
				multiplier : 32
			},
			{
				name :_("tablespoons"),
				multiplier : 64
			},
			{
				name :_("teaspoons"),
				multiplier : 192
			},
			{
				name :_("liters"),
				multiplier : 0.946353
			},
			{
				name :_("milliliters"),
				multiplier : 946.353
			}
		]
	},
	{
		name :_("pints"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.125
			},
			{
				name :_("quarts"),
				multiplier : 0.5
			},
			{
				name :_("cups"),
				multiplier : 1.97157
			},
			{
				name :_("fluid-ounces"),
				multiplier : 16
			},
			{
				name :_("tablespoons"),
				multiplier : 32
			},
			{
				name :_("teaspoons"),
				multiplier : 96
			},
			{
				name :_("liters"),
				multiplier : 0.473176
			},
			{
				name :_("milliliters"),
				multiplier : 473.176
			}
		]
	},
	{
		name :_("cups"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.0634013
			},
			{
				name :_("quarts"),
				multiplier : 0.253605
			},
			{
				name :_("pints"),
				multiplier : 0.50721
			},
			{
				name :_("fluid-ounces"),
				multiplier : 8.11537
			},
			{
				name :_("tablespoons"),
				multiplier : 16.2307
			},
			{
				name :_("teaspoons"),
				multiplier : 48.6922
			},
			{
				name :_("liters"),
				multiplier : 0.24
			},
			{
				name :_("milliliters"),
				multiplier : 240
			}
		]
	},
	{
		name :_("fluid-ounces"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.0078125
			},
			{
				name :_("quarts"),
				multiplier : 0.03125
			},
			{
				name :_("pints"),
				multiplier : 0.0625
			},
			{
				name :_("cups"),
				multiplier : 0.123223
			},
			{
				name :_("tablespoons"),
				multiplier : 2
			},
			{
				name :_("teaspoons"),
				multiplier : 6
			},
			{
				name :_("liters"),
				multiplier : 0.0295735
			},
			{
				name :_("milliliters"),
				multiplier : 29.5735
			}
		]
	},
	{
		name :_("tablespoons"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.00390625
			},
			{
				name :_("quarts"),
				multiplier : 0.015625
			},
			{
				name :_("pints"),
				multiplier : 0.03125
			},
			{
				name :_("cups"),
				multiplier : 0.0616115
			},
			{
				name :_("fluid-ounces"),
				multiplier : 0.5
			},
			{
				name :_("teaspoons"),
				multiplier : 3
			},
			{
				name :_("liters"),
				multiplier : 0.0147868
			},
			{
				name :_("milliliters"),
				multiplier : 14.7868
			}
		]
	},
	{
		name :_("teaspoons"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.00130208
			},
			{
				name :_("quarts"),
				multiplier : 0.00520833
			},
			{
				name :_("pints"),
				multiplier : 0.0104167
			},
			{
				name :_("cups"),
				multiplier : 0.0205372
			},
			{
				name :_("fluid-ounces"),
				multiplier : 0.166667
			},
			{
				name :_("tablespoons"),
				multiplier : 0.333333
			},
			{
				name :_("liters"),
				multiplier : 0.00492892
			},
			{
				name :_("milliliters"),
				multiplier : 4.92892
			}
		]
	},
	{
		name :_("liters"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.264172
			},
			{
				name :_("quarts"),
				multiplier : 1.05669
			},
			{
				name :_("pints"),
				multiplier : 2.11338
			},
			{
				name :_("cups"),
				multiplier : 4.16667
			},
			{
				name :_("fluid-ounces"),
				multiplier : 33.814
			},
			{
				name :_("tablespoons"),
				multiplier : 67.628
			},
			{
				name :_("teaspoons"),
				multiplier : 202.884
			},
			{
				name :_("millileters"),
				multiplier : 1000
			}
		]
	},
	{
		name :_("milliliters"),
		options : [
			{
				name :_("gallons"),
				multiplier : 0.000264172
			},
			{
				name :_("quarts"),
				multiplier : 0.00105669
			},
			{
				name :_("pints"),
				multiplier : 0.00211338
			},
			{
				name :_("cups"),
				multiplier : 0.00416667
			},
			{
				name :_("fluid-ounces"),
				multiplier : 0.033814
			},
			{
				name :_("tablespoons"),
				multiplier : 0.067628
			},
			{
				name :_("teaspoons"),
				multiplier : 0.202884
			},
			{
				name :_("liters"),
				multiplier : 0.001
			}
		]
	},
	{
		name :_("fahrenheit"), //
		options : [
			{
				name :_("celsius"),
				multiplier : 1
			},
			{
				name :_("kelvin"),
				multiplier : 1
			}
		],
		tempFlag : true
	},
	{
		name :_("celsius"),
		options : [
			{
				name :_("fahrenheit"),
				multiplier : 1
			},
			{
				name :_("kelvin"),
				multiplier : 1
			}
		],
		tempFlag : true
	},
	{
		name :_("kelvin"),
		options : [
			{
				name :_("fahrenheit"),
				multiplier : 1
			},
			{
				name :_("celsius"),
				multiplier : 1
			}
		],
		tempFlag : true
	}
];