#include <pebble.h>
#include "widget.h"
#include "messaging.h"
#include "ui.h"
#include "main.h"

#ifdef PBL_RECT
	#define WIDGET_BOX GRect(19,72,25,25)
	#define WIDGET_WEATHER_BOX GRect(21,72,25,25)
#elif PBL_ROUND
	#define WIDGET_BOX GRect(33,79,25,25)
	#define WIDGET_WEATHER_BOX GRect(34,79,25,25)
#endif

int current_widget;

GBitmap *current_widget_icon;

//Initialize current_widget

void set_widget_icon();

void init_widget(){
	if(persist_exists(MESSAGE_KEY_Widget)) current_widget = persist_read_int(MESSAGE_KEY_Widget);
	else current_widget = WidgetNoneText;
	
	set_widget(current_widget);
	
	switch(current_widget){
		case WidgetWeather: send_request("#weather"); break;
		case WidgetStockPrice: send_request("#stock"); break;
		case WidgetTravel: send_request("#travel"); break;
	}
}

void deinit_widget(){
	if(current_widget == WidgetTimer || current_widget == WidgetSteps || current_widget == WidgetDistance || current_widget == WidgetHeartRate || current_widget == WidgetWeather || current_widget == WidgetCommute){
		gbitmap_destroy(current_widget_icon);
	}
}

//Set new widget

void set_widget(int num){
	current_widget = num;
	
	persist_write_int(MESSAGE_KEY_Widget, num);
	
	set_widget_icon();
	
	APP_LOG(APP_LOG_LEVEL_INFO, "Widget: %d", num);
}

//Set appropriate icon, based on current_widget

void set_widget_icon(){	
	if(current_widget == WidgetTimer){
		//Return Clock icon
		current_widget_icon = gbitmap_create_with_resource(RESOURCE_ID_CLOCK);
	}
	else if(current_widget == WidgetSteps || current_widget == WidgetDistance){
		//Return Shoe icon
		current_widget_icon = gbitmap_create_with_resource(RESOURCE_ID_SHOE);
	}
	else if(current_widget == WidgetHeartRate){
		//Return Heart icon
		current_widget_icon = gbitmap_create_with_resource(RESOURCE_ID_SHOE); //TEMPORARY
	}
	else if(current_widget == WidgetWeather){
		//Return Weather icon
		current_widget_icon = gbitmap_create_with_resource(RESOURCE_ID_PARTLY_CLOUDY);	
	}
	else if(current_widget == WidgetCommute){
		//Return Car icon
		current_widget_icon = gbitmap_create_with_resource(RESOURCE_ID_CAR);
	}
}

//Draw Widget

void graphics_draw_widget(GContext *ctx){

	if(current_widget == WidgetCountdown){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, "52D 3H 2M", custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, "52D 3H 2M", custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else if(current_widget == WidgetDate1){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_date_1, custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_date_1, custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	} 
	else if(current_widget == WidgetDate2){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_date_2, custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_date_2, custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else if(current_widget == WidgetDate3){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_date_3, custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_date_3, custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else if(current_widget == WidgetDate4){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_date_4, custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_date_4, custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else if(current_widget == WidgetDate5){
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_date_5, custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND
			graphics_draw_text(ctx, widget_date_5, custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else if(current_widget == WidgetSteps){ //Shoe Icon
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_steps, custom_leco, GRect(HOME_X-16+38 + 1, HOME_Y + 32 + 5, 144-ACTION_BAR_WIDTH-8-48, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_steps, custom_leco, GRect(HOME_X-14 + 34 + 1, HOME_Y + 33 + 4 + 1, 144-ACTION_BAR_WIDTH-6 - 38, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
		
		graphics_context_set_compositing_mode(ctx, GCompOpSet);
		graphics_draw_bitmap_in_rect(ctx, current_widget_icon, WIDGET_BOX);
	}
	else if(current_widget == WidgetDistance){ //Shoe Icon
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_dist, custom_leco, GRect(HOME_X-16+38 + 1, HOME_Y + 32 + 5, 144-ACTION_BAR_WIDTH-8-48, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_dist, custom_leco, GRect(HOME_X-14 + 34 + 1, HOME_Y + 33 + 4 + 1, 144-ACTION_BAR_WIDTH-6 - 38, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
		
		graphics_context_set_compositing_mode(ctx, GCompOpSet);
		graphics_draw_bitmap_in_rect(ctx, current_widget_icon, WIDGET_BOX);
	}
	/*
	else if(current_widget == WidgetHeartRate){ //Heart Icon
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_hr, custom_leco, GRect(HOME_X-16+38 + 1, HOME_Y + 32 + 5, 144-ACTION_BAR_WIDTH-8-48, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_hr, custom_leco, GRect(HOME_X-14 + 34 + 1, HOME_Y + 33 + 4 + 1, 144-ACTION_BAR_WIDTH-6 - 38, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
		
		graphics_context_set_compositing_mode(ctx, GCompOpSet);
		graphics_draw_bitmap_in_rect(ctx, current_widget_icon, WIDGET_BOX);
	}
	*/
	else if(current_widget == WidgetWeather){ //Appropriate Weather Icon
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, "102* F", custom_leco, GRect(HOME_X-16+38 + 1 + 2, HOME_Y + 32 + 5, 144-ACTION_BAR_WIDTH-8-48, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, "102* F", custom_leco, GRect(HOME_X-14 + 34 + 1 + 2, HOME_Y + 33 + 4 + 1, 144-ACTION_BAR_WIDTH-6 - 38, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
		
		graphics_context_set_compositing_mode(ctx, GCompOpSet);
		graphics_draw_bitmap_in_rect(ctx, current_widget_icon, WIDGET_WEATHER_BOX);
	}
	else if(current_widget == WidgetStockPrice){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, "MSFT 255.42", custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, "MSFT 255.42", custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif	
	}
	else if(current_widget == WidgetTimezone){ //Full Width
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_alt_tz, custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_alt_tz, custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else if(current_widget == WidgetBattery){ //Battery Icon
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, widget_battery, custom_leco, GRect(HOME_X-16+38 + 1 + 4, HOME_Y + 32 + 5, 144-ACTION_BAR_WIDTH-8-48, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, widget_battery, custom_leco, GRect(HOME_X-14 + 34 + 1 + 4, HOME_Y + 33 + 4 + 1, 144-ACTION_BAR_WIDTH-6 - 38, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
		
		graphics_context_set_stroke_color(ctx, GColorBlack);
		graphics_context_set_stroke_width(ctx, 3);
		graphics_draw_rect(ctx, GRect(HOME_X+4,HOME_Y+40+PBL_IF_RECT_ELSE(-1,0),24,14));
		graphics_draw_line(ctx, GPoint(HOME_X+4+24+1,HOME_Y+44+PBL_IF_RECT_ELSE(-1,0)), GPoint(HOME_X+4+24+1,HOME_Y+44+6+PBL_IF_RECT_ELSE(-1,0)));
		
		graphics_context_set_stroke_width(ctx, 1);
		for(int i = 0; i < battery_state_service_peek().charge_percent/10; i++){
			graphics_draw_line(ctx, GPoint(HOME_X+7+(2*i),HOME_Y+42+PBL_IF_RECT_ELSE(-1,0)), GPoint(HOME_X+7+(2*i),HOME_Y+42+10+PBL_IF_RECT_ELSE(-1,0)));
		}
	}
	else if(current_widget == WidgetSmartWidget){ //???
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, "???", custom_leco, GRect(HOME_X-16+38 - 38, HOME_Y + 32 + 5 - 1, 144-ACTION_BAR_WIDTH-8-48 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
	  #elif PBL_ROUND 
			graphics_draw_text(ctx, "???", custom_leco, GRect(HOME_X-14 + 34 - 37, HOME_Y + 33 + 4 + 1 - 1, 144-ACTION_BAR_WIDTH-6 - 38 + 50, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
		
		//graphics_context_set_compositing_mode(ctx, GCompOpSet);
		//graphics_draw_bitmap_in_rect(ctx, current_widget_icon, WIDGET_BOX);
	}
}