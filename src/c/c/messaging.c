#include <pebble.h>
#include <pebble-localize/pebble-localize.h>
#include "messaging.h"
#include "dictation.h"
#include "lang.h"
#include "settings.h"
#include "main.h"
#include "ui.h"
#include "widget.h"
#include "actionmenu.h"
#include "dash.h"
#include "health.h"

extern Window *home_window, *window;
extern bool error;

char temp_title[64], temp_body[2048];

void send_request(const char *transcript){
	Tuplet transcript_tuplet = TupletCString(MESSAGE_KEY_Transcript, transcript);
	DictionaryIterator *request;
	app_message_outbox_begin(&request);
	dict_write_tuplet(request, &transcript_tuplet);
	dict_write_end(request);
	app_message_outbox_send();
}

void inbox(DictionaryIterator *iter, void *context){
	error = false;
	
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Incoming Message...");
	
	/*
	Tuple *t = dict_read_first(iter);
	while(t != NULL){
		APP_LOG(APP_LOG_LEVEL_DEBUG, "Key: %d, Int Value: %d, CString Value: %s", (int)t->key, (int)t->value->int32, t->value->cstring);
		t = dict_read_next(iter);
	}
	*/
	
	//Settings Keys
	
	if(dict_find(iter, MESSAGE_KEY_Settings)){
		APP_LOG(APP_LOG_LEVEL_DEBUG, "Settings Received");
		Tuple *font_size_t = dict_find(iter, MESSAGE_KEY_FontSize);
		if(font_size_t){
			settings_small_font = font_size_t->value->int32;
			persist_write_bool(MESSAGE_KEY_FontSize, settings_small_font);
			
			set_size(settings_small_font);
		}
	
		Tuple *hands_free_t = dict_find(iter, MESSAGE_KEY_HandsFree);
		if(hands_free_t){
			settings_hands_free = hands_free_t->value->int32;
			persist_write_bool(MESSAGE_KEY_HandsFree, settings_hands_free);
		}
	
		Tuple *flick_dismiss_t = dict_find(iter, MESSAGE_KEY_FlickToDismiss);
		if(flick_dismiss_t){
			settings_flick_dismiss = flick_dismiss_t->value->int32;
			persist_write_bool(MESSAGE_KEY_FlickToDismiss, settings_flick_dismiss);
		}
	
		Tuple *quick_exit_t = dict_find(iter, MESSAGE_KEY_QuickExit);
		if(quick_exit_t){
			settings_quick_exit = quick_exit_t->value->int32;
			persist_write_bool(MESSAGE_KEY_QuickExit, settings_quick_exit);
		}
	
		Tuple *confirm_t = dict_find(iter, MESSAGE_KEY_ConfirmDictation);
		if(confirm_t){
			settings_confirm_dictation = confirm_t->value->int32;
			persist_write_bool(MESSAGE_KEY_ConfirmDictation, settings_confirm_dictation);
			
			deinit_dictation();
			init_dictation();
		}
	
		Tuple *fullscreen_t = dict_find(iter, MESSAGE_KEY_Fullscreen);
		if(fullscreen_t){
			settings_fullscreen = fullscreen_t->value->int32;
			persist_write_bool(MESSAGE_KEY_Fullscreen, settings_fullscreen);
			
			reinit_round_fullscreen();
		}
		
		Tuple *night_mode_t = dict_find(iter, MESSAGE_KEY_NightMode);
		if(night_mode_t){
			settings_night_mode = night_mode_t->value->int32;
			persist_write_bool(MESSAGE_KEY_NightMode, settings_night_mode);
			
			set_night_mode_palette();
		}	
	
		Tuple *widget_t = dict_find(iter, MESSAGE_KEY_Widget);
		if(widget_t){
			set_widget(atoi(widget_t->value->cstring));
		
			Tuple *widget_extra_t = dict_find(iter, MESSAGE_KEY_WidgetExtra);
			if(widget_extra_t){
				
			}
		}
		
		Tuple *step_goal_t = dict_find(iter, MESSAGE_KEY_StepGoal);
		if(step_goal_t){
			persist_write_int(MESSAGE_KEY_StepGoal, atoi(step_goal_t->value->cstring));
			init_health();
		}
	
		//TODO
		Tuple *inactivity_t = dict_find(iter, MESSAGE_KEY_InactivityMonitor);
		if(inactivity_t){
				
			Tuple *inactivity_start_t = dict_find(iter, MESSAGE_KEY_InactivityStart);
			if(inactivity_start_t){
				persist_write_int(MESSAGE_KEY_InactivityStart, atoi(inactivity_start_t->value->cstring));
			}
		
			Tuple *inactivity_end_t = dict_find(iter, MESSAGE_KEY_InactivityEnd);
			if(inactivity_end_t){
				persist_write_int(MESSAGE_KEY_InactivityEnd, atoi(inactivity_end_t->value->cstring));
			}
			
			persist_write_bool(MESSAGE_KEY_InactivityMonitor, inactivity_t->value->int32);
		}
	
		int custom_count = 0;
		for(int i = 0; i < 4; i++){
			Tuple *custom_t = dict_find(iter, MESSAGE_KEY_Custom + i);
			if(custom_t && strlen(custom_t->value->cstring) != 0){
				APP_LOG(APP_LOG_LEVEL_DEBUG, "Custom %d: %s", (int)i, custom_t->value->cstring);
				persist_write_string(MESSAGE_KEY_Custom + i, custom_t->value->cstring);
				custom_count++;
			}
			else{
				i = 5;
			}
		}
		
		persist_write_int(MESSAGE_KEY_CustomCount, custom_count);

		hide_action_menu();
		deinit_action_menu();
		init_action_menu();
	}
	
	//Message Keys
	
	if(dict_find(iter, MESSAGE_KEY_Message)){
		APP_LOG(APP_LOG_LEVEL_DEBUG, "Message Received");
		//TODO
		Tuple *title_t = dict_find(iter, MESSAGE_KEY_Title);
		if(title_t){
			strncpy(temp_title, title_t->value->cstring, sizeof(temp_title));
			
			Tuple *body_t = dict_find(iter, MESSAGE_KEY_Body);
			if(body_t){
				strncpy(temp_body, body_t->value->cstring, sizeof(temp_body));
			}
			else{
				strncpy(temp_body, "", sizeof(temp_body));
			}
			
			Tuple *directions_t = dict_find(iter, MESSAGE_KEY_Directions);
			if(directions_t){
				is_directions = directions_t->value->int32;
			}
			
			update_text(temp_title, temp_body);
		}
	
		Tuple *alarm_t = dict_find(iter, MESSAGE_KEY_Alarm);
		if(alarm_t){
			int minutes = atoi(alarm_t->value->cstring);
			
			if(minutes > 0){
				time_t alarm_end = minutes;
				WakeupId alarm_id = wakeup_schedule(alarm_end, 1, true);
				
				persist_write_int(MESSAGE_KEY_Alarm, alarm_id);
			}
			else{
				if(persist_exists(MESSAGE_KEY_Alarm)){
					wakeup_cancel(persist_read_int(MESSAGE_KEY_Alarm));
				}
			}
		}
	
		Tuple *timer_t = dict_find(iter, MESSAGE_KEY_Timer);
		if(timer_t){
			int minutes = atoi(timer_t->value->cstring);
			
			if(minutes > 0){
				time_t timer_end = time(NULL) + minutes * 60;
				WakeupId timer_id = wakeup_schedule(timer_end, 0, true);
				
				persist_write_int(MESSAGE_KEY_Timer, timer_id);
			}
			else{
				if(persist_exists(MESSAGE_KEY_Timer)){
					wakeup_cancel(persist_read_int(MESSAGE_KEY_Timer));
				}
			}
		}
		
		Tuple *error_t = dict_find(iter, MESSAGE_KEY_Error);
		if(error_t){
			error = true;
		}

		vibes_short_pulse();
		
		window_stack_push(window, true);
	}
	
	//Request Keys
	
	if(dict_find(iter, MESSAGE_KEY_Request)){
		APP_LOG(APP_LOG_LEVEL_DEBUG, "Request Received");
		//TODO
		Tuple *step_goal_request_t = dict_find(iter, MESSAGE_KEY_StepGoalRequest);
		if(step_goal_request_t){
			show_step_goal();
		}
		
		//TODO
		Tuple *steps_request_t = dict_find(iter, MESSAGE_KEY_StepsRequest);
		if(steps_request_t){
			show_steps();
		}
		
		//TODO
		Tuple *distance_request_t = dict_find(iter, MESSAGE_KEY_DistanceRequest);
		if(distance_request_t){
			show_distance();
		}
		
		//TODO
		Tuple *heart_request_t = dict_find(iter, MESSAGE_KEY_HeartRateRequest);
		if(heart_request_t){
			//show_heart_rate();
		}
		
		//TODO
		Tuple *sleep_request_t = dict_find(iter, MESSAGE_KEY_SleepRequest);
		if(sleep_request_t){
			show_sleep();
		}
		
		//TODO
		Tuple *location_request_t = dict_find(iter, MESSAGE_KEY_LocationRequest);
		if(location_request_t){
			
		}
		
		//TODO
		Tuple *charge_request_t = dict_find(iter, MESSAGE_KEY_PALChargeRequest);
		if(charge_request_t){
			
		}
		
		Tuple *dash_battery_request_t = dict_find(iter, MESSAGE_KEY_DashBatteryRequest);
		if(dash_battery_request_t){
			get_battery_via_dash();
		}
		
		Tuple *dash_set_wifi_request_t = dict_find(iter, MESSAGE_KEY_DashSetWifiRequest);
		if(dash_set_wifi_request_t){
			set_wifi_via_dash(dash_set_wifi_request_t->value->int32);
		}
		
		Tuple *dash_set_ringer_request_t = dict_find(iter, MESSAGE_KEY_DashSetRingerRequest);
		if(dash_set_ringer_request_t){
			set_ringer_via_dash(atoi(dash_set_ringer_request_t->value->cstring));
		}
		
		Tuple *dash_set_hotspot_request_t = dict_find(iter, MESSAGE_KEY_DashSetHotspotRequest);
		if(dash_set_hotspot_request_t){
			set_hotspot_via_dash(dash_set_hotspot_request_t->value->int32);
		}
		
		Tuple *dash_sms_request_t = dict_find(iter, MESSAGE_KEY_DashSMSRequest);
		if(dash_sms_request_t){
			get_sms_count_via_dash();
		}
		
		Tuple *dash_calendar_t = dict_find(iter, MESSAGE_KEY_DashCalendarRequest);
		if(dash_calendar_t){
			get_calendar_via_dash();
		}
		
	}
	
	layer_mark_dirty(window_get_root_layer(home_window));
	layer_mark_dirty(window_get_root_layer(window));
}

void init_messaging(){
	
}