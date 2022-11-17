#pragma once

enum {
	WidgetNoneText = 0,
	WidgetNoneTime = 1,
	WidgetTimer = 2,
	WidgetCountdown = 3,
	WidgetDate1 = 4,
	WidgetDate2 = 5,
	WidgetDate3 = 6,
	WidgetDate4 = 7,
	WidgetSteps = 8,
	WidgetDistance = 9,
	WidgetHeartRate = 10,
	WidgetTravel = 11,
	WidgetWeather = 12,
	WidgetStockPrice = 13,
	WidgetCommute = 14,
	WidgetTimezone = 15,
	WidgetBattery = 16,
	WidgetSmartWidget = 17,
	WidgetDate5 = 18
};

extern int current_widget;

void init_widget();
void deinit_widget();

void set_widget(int num);

void graphics_draw_widget(GContext *ctx);