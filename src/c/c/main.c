#include <pebble.h>
#include <pebble-events/pebble-events.h>
#include <pebble-localize/pebble-localize.h>
#include <kiezelpay-core/kiezelpay.h>

#include "main.h"
#include "messaging.h"
#include "lang.h"
#include "ui.h"
#include "actionmenu.h"
#include "widget.h"
#include "dictation.h"
#include "settings.h"
#include "dash.h"
#include "health.h"

Window *lang_window, *home_window, *info_window, *window;

MenuLayer *lang_menu_layer;

ActionBarLayer *action_layer;

int time_remaining = -1;
char timeRemainingBuffer[3];
AppTimer *snooze_timer, *timeout_timer;

bool first_run = true;

char tempDay[8];

void timeout(){
	time_remaining--;
	if(time_remaining == 0) window_stack_pop_all(false);
	else{
		snprintf(timeRemainingBuffer, sizeof(timeRemainingBuffer), "%d", time_remaining);
		layer_mark_dirty(window_get_root_layer(window));
		layer_mark_dirty(window_get_root_layer(home_window));
		
		timeout_timer = app_timer_register(1000, timeout, NULL);
	}
}

//Handle time-related events via Tick Time Handler

void tick(struct tm *tick_time, TimeUnits units){
	
	//Set current time for title bar and home screen
	if(clock_is_24h_style()){
		strftime(homeTimeBuffer, sizeof(homeTimeBuffer), "%H:%M", tick_time);
		strftime(titleTimeBuffer, sizeof(titleTimeBuffer), "%H:%M", tick_time);
	}
	else{
		if(tick_time->tm_hour%12 == 0){
			snprintf(homeTimeBuffer, sizeof(homeTimeBuffer), "12:%02d", tick_time->tm_min);
			snprintf(titleTimeBuffer, sizeof(titleTimeBuffer), "12:%02d %s", tick_time->tm_min, tick_time->tm_hour == 12 ? "PM" : "AM");
		}
		else{
			snprintf(homeTimeBuffer, sizeof(homeTimeBuffer), "%d:%02d", tick_time->tm_hour%12, tick_time->tm_min);
			snprintf(titleTimeBuffer, sizeof(titleTimeBuffer), "%d:%02d %s", tick_time->tm_hour%12, tick_time->tm_min, tick_time->tm_hour > 12 ? "PM" : "AM");
		}
	}

	if(current_widget == WidgetDate1 || current_widget == WidgetDate5){
	//Date 1 Widget
	switch(tick_time->tm_mon){
		case 0: snprintf( widget_date_1, sizeof(widget_date_1), _("JAN %d"), tick_time->tm_mday ); break;
		case 1: snprintf( widget_date_1, sizeof(widget_date_1), _("FEB %d"), tick_time->tm_mday ); break;
		case 2: snprintf( widget_date_1, sizeof(widget_date_1), _("MAR %d"), tick_time->tm_mday ); break;
		case 3: snprintf( widget_date_1, sizeof(widget_date_1), _("APR %d"), tick_time->tm_mday ); break;
		case 4: snprintf( widget_date_1, sizeof(widget_date_1), _("MAY %d"), tick_time->tm_mday ); break;
		case 5: snprintf( widget_date_1, sizeof(widget_date_1), _("JUN %d"), tick_time->tm_mday ); break;
		case 6: snprintf( widget_date_1, sizeof(widget_date_1), _("JUL %d"), tick_time->tm_mday ); break;
		case 7: snprintf( widget_date_1, sizeof(widget_date_1), _("AUG %d"), tick_time->tm_mday ); break;
		case 8: snprintf( widget_date_1, sizeof(widget_date_1), _("SEP %d"), tick_time->tm_mday ); break;
		case 9: snprintf( widget_date_1, sizeof(widget_date_1), _("OCT %d"), tick_time->tm_mday ); break;
		case 10: snprintf(widget_date_1, sizeof(widget_date_1), _("NOV %d"), tick_time->tm_mday ); break;
		case 11: snprintf(widget_date_1, sizeof(widget_date_1), _("DEC %d"), tick_time->tm_mday ); break;
	}
	}
	
	if(current_widget == WidgetDate2 || current_widget == WidgetDate5){
	//Date 2 Widget
	switch(tick_time->tm_wday){
		case 0: strncpy(widget_date_2, "SUNDAY", sizeof(widget_date_2)); break;
		case 1: strncpy(widget_date_2, "MONDAY", sizeof(widget_date_2)); break;
		case 2: strncpy(widget_date_2, "TUESDAY", sizeof(widget_date_2)); break;
		case 3: strncpy(widget_date_2, "WEDNESDAY", sizeof(widget_date_2)); break;
		case 4: strncpy(widget_date_2, "THURSDAY", sizeof(widget_date_2)); break;
		case 5: strncpy(widget_date_2, "FRIDAY", sizeof(widget_date_2)); break;
		case 6: strncpy(widget_date_2, "SATURDAY", sizeof(widget_date_2)); break;
	}
	}
	
	if(current_widget == WidgetDate3){
	//Date 3 Widget
	snprintf(widget_date_3, sizeof(widget_date_3), "%d/%d/%02d", tick_time->tm_mon+1, tick_time->tm_mday, tick_time->tm_year-100);
	}
	
	if(current_widget == WidgetDate4){
	//Date 4 Widget
	snprintf(widget_date_4, sizeof(widget_date_4), "%02d-%02d-%02d", tick_time->tm_mday, tick_time->tm_mon+1, tick_time->tm_year-100);
	}
		
	if(current_widget == WidgetDate5){
	//Date 5 Widget
	strncpy(tempDay, widget_date_2, 3);
	snprintf(widget_date_5, sizeof(widget_date_5), "%s, %s", tempDay, widget_date_1);
	}
		
	if(current_widget == WidgetSteps){
	//Steps Widget
	HealthServiceAccessibilityMask steps = health_service_metric_accessible(HealthMetricStepCount, time_start_of_today(), time(NULL));
	if(steps & HealthServiceAccessibilityMaskAvailable){
		int num_steps = health_service_sum_today(HealthMetricStepCount);
		if(num_steps >= 1000) snprintf(widget_steps, sizeof(widget_steps), _("%d,%03d"), (int)(num_steps/1000), (int)(num_steps%1000));
			else snprintf(widget_steps, sizeof(widget_steps), _("%d"), (int)num_steps);
	}
	else{
		strncpy(widget_steps, "N/A", sizeof(widget_steps));
	}
	}
	
	if(current_widget == WidgetDistance){
	//Distance Widget
	HealthServiceAccessibilityMask dist = health_service_metric_accessible(HealthMetricWalkedDistanceMeters, time_start_of_today(), time(NULL));
	if(dist & HealthServiceAccessibilityMaskAvailable){
		float dist_m = health_service_sum_today(HealthMetricWalkedDistanceMeters);
		
		if(health_service_get_measurement_system_for_display(HealthMetricWalkedDistanceMeters) == MeasurementSystemImperial){
			dist_m = (float)(dist_m * 0.000621371f);
		}
		else{
			dist_m = (float)(dist_m * 0.001f);
		}
		
		if( (int)(dist_m * 100) % 10 >= 5 ) dist_m += 0.05f;
		
		snprintf(widget_dist, sizeof(widget_dist), _("%d.%01d %s"), (int)(dist_m), (int)(dist_m*10)%10, "");
	}
	else{
		strncpy(widget_dist, "N/A", sizeof(widget_dist));
	}
	}
	
	/*
	if(current_widget == WidgetHeartRate){
	//Heart Rate Widget
	HealthServiceAccessibilityMask hr = health_serice_metric_accessible(HealthMetricHeartRateBPM, time_start_of_today(), time(NULL));
	if(hr & HealthServiceAccessibilityMaskAvailable){
		int num_hr = health_service_peek_current_value(HealthMetricHeartRateBPM);
		snprintf(widget_hr, sizeof(widget_hr), "%d BPM", num_hr);
	}
	else{
		strncpy(widget_hr, "N/A", sizeof(widget_hr));
	}
	}
	*/
	
	if(current_widget ==  WidgetBattery){
	//Battery Widget
	if(battery_state_service_peek().is_charging) strncpy(widget_battery, "CHRG", sizeof(widget_battery));
	else snprintf(widget_battery, sizeof(widget_battery), "%d%%", (int)(battery_state_service_peek().charge_percent));
	}
		
	//Weather Widget
	if(current_widget == WidgetWeather && (tick_time->tm_min%15 == 0 || first_run) ){
		send_request("#weather");
		
		if(first_run) first_run = false;
	}
	
	if(current_widget == WidgetTimezone){
		
	}
	
	//Stock Widget
	if(current_widget == WidgetStockPrice && (tick_time->tm_min == 0 || first_run) ){
		send_request("#stock");
		
		if(first_run) first_run = false;
	}
	
	layer_mark_dirty(window_get_root_layer(home_window));
	
	if(current_widget == WidgetDate5 && first_run){
		first_run = false;
		tick(tick_time, units);
	}
}

bool manualBack = false;

void license_timer(void *context){
	if(!manualBack) window_stack_pop(window);
}

bool is_directions = false;

bool is_vibrating = false;

void incoming_message(){
	is_vibrating = false;
}

//Handle animations

bool animating = false;

#define UP 1
#define DOWN -1
int direction = DOWN, target = 0, jumps = 0;

static void animate_transition(){
	animating = true;
	
	jumps++;
	
	if(jumps == 1 || PBL_IF_RECT_ELSE(jumps == 2, false)) scroll += direction * PBL_IF_RECT_ELSE(settings_small_font ? 14 : 28, (180-44) + 2);
	#ifdef PBL_RECT
	else if(jumps == 3) scroll += direction * (settings_small_font ? 4 : 8);
	#endif
	else{
		scroll = target;
		jumps = 0;
	}
	
	layer_mark_dirty(window_get_root_layer(window));
	
	if(scroll != target) app_timer_register(PBL_IF_RECT_ELSE(50,200), animate_transition, NULL);
	else animating = false;
}

//Handle Button Input for Window

void select(ClickRecognizerRef ref, void *context){
	if(animating) return;
	
	if(!(kiezelpay_get_status() & KIEZELPAY_LICENSED) ) return;
	
	is_directions = false;
	
	if(snooze_timer != NULL){
		app_timer_cancel(snooze_timer);
		snooze_timer = NULL;
		vibes_cancel();
	}
	
	if(timeout_timer != NULL) app_timer_cancel(timeout_timer);
	time_remaining = -1;
	layer_mark_dirty(window_get_root_layer(window));
	
	if((kiezelpay_get_status() & KIEZELPAY_LICENSED) && !bluetooth_connection_service_peek()){
		update_text(_("Zzz...ZzzZzz..."), _("Snowy is sleeping right now, since you don't have Bluetooth enabled! Turn on Bluetooth and Snowy will wake up."));
		
		vibes_enqueue_custom_pattern((VibePattern){
			.durations = (uint32_t []){20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,0,1000,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30},
			.num_segments = 82
		});
		layer_mark_dirty(window_get_root_layer(window));
	}
	else{
		start_dictation();
	}
}

void down(ClickRecognizerRef ref, void *context){
	if(animating) return;
	
	if(snooze_timer != NULL){
		app_timer_cancel(snooze_timer);
		snooze_timer = NULL;
		vibes_cancel();
	}
	
	if(timeout_timer != NULL) app_timer_cancel(timeout_timer);
	time_remaining = -1;
	layer_mark_dirty(window_get_root_layer(window));
	
	direction = DOWN;
	
	if(scroll + timestampY + timestampSize <= PBL_IF_RECT_ELSE(164,180)){
	#ifdef PBL_RECT
		return;
	}
	else{
		if(settings_small_font) target = scroll + 33 * direction;
		else target = scroll + 66 * direction;
		animate_transition();
	}
	#elif PBL_ROUND
		jumps = 1;
		target = scroll;
		scroll += direction * 2;
		layer_mark_dirty(window_get_root_layer(window));
		app_timer_register(200, animate_transition, NULL);
	}
	else{
		jumps = 1;
		target = scroll + (180-44 + (settings_fullscreen ? 23 : 23) ) * direction;
		animate_transition();
	}
	#endif
}

void up(ClickRecognizerRef ref, void *context){
	if(animating) return;
	
	if(snooze_timer != NULL){
		app_timer_cancel(snooze_timer);
		snooze_timer = NULL;
		vibes_cancel();
	}
	
	if(timeout_timer != NULL) app_timer_cancel(timeout_timer);
	time_remaining = -1;
	layer_mark_dirty(window_get_root_layer(window));
	
	direction = UP;
	
	if(scroll == 0){		
	#ifdef PBL_RECT
		return;
	}
	else{
		if(settings_small_font) target = scroll + 33 * direction;
		else target = scroll + 66 * direction;
		animate_transition();
	}
	#elif PBL_ROUND
		jumps = 1;
		target = scroll;
		scroll += direction * 2;
		layer_mark_dirty(window_get_root_layer(window));
		app_timer_register(200, animate_transition, NULL);
	}
	else{
		jumps = 1;
		target = scroll + (180-44 + (settings_fullscreen ? 23 : 23) ) * direction;
		animate_transition();
	}
	#endif
}

void back(ClickRecognizerRef ref, void *context){
	if( !(kiezelpay_get_status() & KIEZELPAY_LICENSED) ){
		window_stack_pop_all(false);
		return;
	}
	
	manualBack = true;
	
	is_directions = false;
	
	if(launch_reason() != APP_LAUNCH_QUICK_LAUNCH && launch_reason() != APP_LAUNCH_WORKER && ( !persist_exists(MESSAGE_KEY_QuickExit) || (persist_exists(MESSAGE_KEY_QuickExit) && !persist_read_bool(MESSAGE_KEY_QuickExit) ) ) ){
		if(snooze_timer != NULL){
			app_timer_cancel(snooze_timer);
			snooze_timer = NULL;
			vibes_cancel();
		}
		time_t now = time(NULL);
		struct tm *ltime = localtime(&now);
		tick(ltime, MINUTE_UNIT);
		
		window_stack_pop(window);	
	}
	else{
		if(snooze_timer != NULL){
			app_timer_cancel(snooze_timer);
			snooze_timer = NULL;
			vibes_cancel();
		}
		window_stack_pop_all(false);
	}
}

void config(void *context){
	window_single_click_subscribe(BUTTON_ID_SELECT, select);
	window_single_click_subscribe(BUTTON_ID_DOWN, down);
	window_single_click_subscribe(BUTTON_ID_UP, up);
	window_single_click_subscribe(BUTTON_ID_BACK, back);
}

//Handle Button Input for Home Window

void home_select(ClickRecognizerRef ref, void *context){
	if(timeout_timer != NULL) app_timer_cancel(timeout_timer);
	time_remaining = -1;
	
	if(snooze_timer != NULL){
		app_timer_cancel(snooze_timer);
		snooze_timer = NULL;
		vibes_cancel();
	}
	
	if(!bluetooth_connection_service_peek()){
		update_text(_("Zzz...ZzzZzz..."), _("Snowy is sleeping right now, since you don't have Bluetooth enabled! Turn on Bluetooth and Snowy will wake up."));
		
		vibes_enqueue_custom_pattern((VibePattern){
			.durations = (uint32_t []){20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,0,1000,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30},
			.num_segments = 82
		});
		
		window_stack_push(window, true);
	}
	else{
		start_dictation();
		
		switch(lang){
			case SPANISH: strncpy(homeTextBuffer, "Hola, ¿cómo\nestás?", sizeof(homeTextBuffer)); break;
			case FRENCH: strncpy(homeTextBuffer, "Bonjour!\nÇa va bien?", sizeof(homeTextBuffer)); break;
			case ENGLISH: strncpy(homeTextBuffer, "How may I\nhelp you?", sizeof(homeTextBuffer)); break;
			case GERMAN: strncpy(homeTextBuffer, "Wie kann ich\ndir helfen?", sizeof(homeTextBuffer)); break;
			case PORTUGUESE: strncpy(homeTextBuffer, "Como vai?", sizeof(homeTextBuffer)); break;
			case DANISH: strncpy(homeTextBuffer, "Hej! Hvordan\nhar du det?", sizeof(homeTextBuffer)); break;
			default: strncpy(homeTextBuffer, "How may I\nhelp you?", sizeof(homeTextBuffer)); break;
		}
	}
}

void home_down(ClickRecognizerRef ref, void *context){
	if(timeout_timer != NULL) app_timer_cancel(timeout_timer);
	time_remaining = -1;
	
	if(snooze_timer != NULL){
		app_timer_cancel(snooze_timer);
		snooze_timer = NULL;
		vibes_cancel();
	}
	
	show_action_menu();
}

void home_up(ClickRecognizerRef ref, void *context){
	if(timeout_timer != NULL) app_timer_cancel(timeout_timer);
	time_remaining = -1;
	
	if(snooze_timer != NULL){
		app_timer_cancel(snooze_timer);
		snooze_timer = NULL;
		vibes_cancel();
	}
	
	window_stack_push(info_window, true);
}

void home_back(ClickRecognizerRef ref, void *context){
	vibes_cancel();
	window_stack_pop_all(false);
}

void home_config(void *context){
	window_single_click_subscribe(BUTTON_ID_SELECT, home_select);
	window_single_click_subscribe(BUTTON_ID_DOWN, home_down);
	window_single_click_subscribe(BUTTON_ID_UP, home_up);
	window_single_click_subscribe(BUTTON_ID_BACK, home_back);
}

//Handle KiezelPay Events and display appropriate message

static bool kiezelpay_event_callback(kiezelpay_event e, void* extra_data) {
	
	static char code_title[16];
	int code;
	
	switch (e) {
    case KIEZELPAY_ERROR:
      #if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(): KIEZELPAY_ERROR");
			#endif
		  error = true;
			update_text(_("Something went wrong..."), _("Please restart the Pebble app on your phone, then restart Snowy. If the problem persists, use the Contact Developer link in the Pebble App Store for support."));
		
			vibes_short_pulse();
      break;
    case KIEZELPAY_BLUETOOTH_UNAVAILABLE:
      #if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(): KIEZELPAY_BLUETOOTH_UNAVAILABLE");
	    #endif
		  error = true;
			update_text(_("No Bluetooth"), _("Cannot connect to KiezelPay servers because your Pebble is not connected to your phone."));
		
			vibes_short_pulse();
      break;
    case KIEZELPAY_INTERNET_UNAVAILABLE:
      #if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(): KIEZELPAY_INTERNET_UNAVAILABLE");
		  #endif
		  error = true;
			update_text(_("No Internet"), _("Cannot connect to KiezelPay servers because your phone is not connected to the internet."));
		
			vibes_short_pulse();
      break;
    case KIEZELPAY_CODE_AVAILABLE:
    	#if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(): KIEZELPAY_CODE_AVAILABLE");
			#endif
		
			code = *((uint32_t *)extra_data);
		
			snprintf(code_title, sizeof(code_title), _("Code: %05d"), code);
			error = false;
			update_text(code_title, _("Please visit kiezelpay.com/code and enter the above code to purchase a license for Snowy."));
		
		  vibes_double_pulse();
      break;
    case KIEZELPAY_PURCHASE_STARTED:
      #if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(): KIEZELPAY_PURCHASE_STARTED");
    	#endif
		
			code = *((uint32_t *)extra_data);
		
		  snprintf(code_title, sizeof(code_title), _("Code: %05d"), code);
			error = false;
		  update_text(code_title, _("Almost done! Please complete your purchase: kiezelpay.com/code"));  
		
		  vibes_double_pulse();
		   break;
    case KIEZELPAY_LICENSED:
      #if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(): KIEZELPAY_LICENSED");
			#endif
			error = false;
			update_text(_("Success!!!"), _("Thank you for purchasing a license and supporting Snowy!\n\nYou will be returned to the Home screen in 5 seconds."));
			vibes_long_pulse();
			app_timer_register(5000, license_timer, NULL);
      break;
    default:
    	#if KIEZELPAY_LOG_VERBOSE == 1
				APP_LOG(APP_LOG_LEVEL_DEBUG, "kiezelpay_event_callback(); unknown event");
			#endif
		  error = true;
		  update_text(_("Unknown Error"), _("An unknown error has occurred. Please try again, or use the Contact Developer link to report this issue."));
		  vibes_short_pulse();
      break;
  };
  
  return true;   //prevent the kiezelpay lib from showing messages by signaling it that we handled the event ourselves
}

//Bluetooth handler, simply redraw the screen
void handle_connection(bool connected){
	layer_mark_dirty(window_get_root_layer(home_window));
	layer_mark_dirty(window_get_root_layer(window));
	vibes_short_pulse();
}

void tap(AccelAxisType axis, int32_t direction){
	if(settings_hands_free && launch_reason() == APP_LAUNCH_WORKER){
		start_dictation();
		return;
	}
	
	if(settings_flick_dismiss){
		if(window_is_loaded(window)) window_stack_pop(window);
		else window_stack_pop_all(false);
		return;
	}
}

int num_snooze = 0;

void snooze(){
	num_snooze++;
	
	vibes_enqueue_custom_pattern((VibePattern){
				.durations = (uint32_t []){3000, 500, 3000, 500, 3000},
				.num_segments = 5
			});
			
	if(num_snooze < 11) snooze_timer = app_timer_register(5*60*1000, snooze, NULL);
	else{
		switch(lang){
			case ENGLISH: strncpy(homeTextBuffer, "Missed\nAlarm!!!", sizeof(homeTextBuffer)); break;
			case SPANISH: strncpy(homeTextBuffer, "¡Alarma\nPerdida!", sizeof(homeTextBuffer)); break;
			case FRENCH: strncpy(homeTextBuffer, "Alarme\nRatée!!!", sizeof(homeTextBuffer)); break;
			case GERMAN: strncpy(homeTextBuffer, "Verpasster\nAlarm!!!", sizeof(homeTextBuffer)); break;
			case PORTUGUESE: strncpy(homeTextBuffer, "Alarme\nPerdido!!!", sizeof(homeTextBuffer)); break;
			case DANISH: strncpy(homeTextBuffer, "Ubesvaret\nAlarm!", sizeof(homeTextBuffer)); break;
			default: strncpy(homeTextBuffer, "Missed\nAlarm!!!", sizeof(homeTextBuffer)); break;
		}
		update_text(_("Missed Alarm!"), "");
		layer_mark_dirty(window_get_root_layer(home_window));
	}
}

static void wakeup_handler(WakeupId id, int32_t reason){
	if(persist_exists(MESSAGE_KEY_Timer) && id == persist_read_int(MESSAGE_KEY_Timer)){
		 update_text(_("Timer done!"), "");
	
	  if(!window_stack_contains_window(window)) window_stack_push(window, true);

	  vibes_enqueue_custom_pattern((VibePattern){
		  .durations = (uint32_t []){400,100,400,100,400,100, 800,200},
		  .num_segments = 8
	  });
	
	  send_request(_("finish timer"));
	}
	else if(persist_exists(MESSAGE_KEY_Alarm) && id == persist_read_int(MESSAGE_KEY_Alarm)){
		update_text(_("Riiinnng!!!"), "");
		
		if(!window_stack_contains_window(window)) window_stack_push(window, true);
		
		vibes_enqueue_custom_pattern((VibePattern){
			.durations = (uint32_t []){3000,500,3000,500,3000},
				.num_segments = 5
		});
		
		snooze_timer = app_timer_register(5*60*1000, snooze, NULL);
	}
}

EventHandle tick_handle, connection_handle, tap_handle, battery_handle, message_handle;

//Initialize the app
void init(){
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 1: %d", (int)heap_bytes_free());
	app_worker_kill();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 2: %d", (int)heap_bytes_free());
	set_lang_offsets();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 3: %d", (int)heap_bytes_free());
	init_settings();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 4: %d", (int)heap_bytes_free());
	localize_init(get_lang_resource());
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 5: %d", (int)heap_bytes_free());
	init_ui();
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 6: %d", (int)heap_bytes_free());
	init_action_menu();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 7: %d", (int)heap_bytes_free());
	kiezelpay_set_event_handler(kiezelpay_event_callback);
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 8: %d", (int)heap_bytes_free());
	kiezelpay_init();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 9: %d", (int)heap_bytes_free());
	init_dash_api();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 10: %d", (int)heap_bytes_free());
	events_app_message_request_inbox_size(1024);
	events_app_message_request_outbox_size(128);
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 11: %d", (int)heap_bytes_free());
	message_handle = events_app_message_register_inbox_received(inbox, NULL);
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 12: %d", (int)heap_bytes_free());
	events_app_message_open();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 13: %d", (int)heap_bytes_free());
	DictionaryIterator *request;
	app_message_outbox_begin(&request);
	Tuplet lang_tuplet = TupletInteger(MESSAGE_KEY_Lang, lang);
	dict_write_tuplet(request, &lang_tuplet);
	dict_write_end(request);
	app_message_outbox_send();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 14: %d", (int)heap_bytes_free());
	tap_handle = events_accel_tap_service_subscribe(tap);
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 15: %d", (int)heap_bytes_free());
	init_dictation();
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 16: %d", (int)heap_bytes_free());
	init_health();
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 17: %d", (int)heap_bytes_free());
	time_t now = time(NULL);
	struct tm *ltime = localtime(&now);
	tick(ltime, MINUTE_UNIT);
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 18: %d", (int)heap_bytes_free());
	tick_handle = events_tick_timer_service_subscribe(MINUTE_UNIT, tick);
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 19: %d", (int)heap_bytes_free());
	if( (kiezelpay_get_status() & KIEZELPAY_LICENSED) && !bluetooth_connection_service_peek()){
		vibes_enqueue_custom_pattern((VibePattern){
			.durations = (uint32_t []){20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,0,1000,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30,20,30},
			.num_segments = 82
		});
	}
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 20: %d", (int)heap_bytes_free());
	connection_handle = events_connection_service_subscribe((ConnectionHandlers) {
		.pebble_app_connection_handler = handle_connection
	});
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 21: %d", (int)heap_bytes_free());
	if( !(kiezelpay_get_status() & KIEZELPAY_LICENSED) ){
		update_text(_("Checking for license..."), "");
		window_stack_push(window, true);
		kiezelpay_start_purchase();
		return;
	}
	else{
		if(launch_reason() == APP_LAUNCH_WAKEUP){
			WakeupId launch_id = 0;
			int32_t reason = 0;
			
			wakeup_get_launch_event(&launch_id, &reason);
			
			if(persist_exists(MESSAGE_KEY_Timer) && launch_id == persist_read_int(MESSAGE_KEY_Timer)){
				switch(lang){
					case ENGLISH: strncpy(homeTextBuffer, "Your timer\nis done!", sizeof(homeTextBuffer)); break;
					case SPANISH: strncpy(homeTextBuffer, "¡Hecho!", sizeof(homeTextBuffer)); break;
					case FRENCH: strncpy(homeTextBuffer, "Temps\nécoulé!!!", sizeof(homeTextBuffer)); break;
					case GERMAN: strncpy(homeTextBuffer, "Dein Timer\nist fertig!", sizeof(homeTextBuffer)); break;
					case PORTUGUESE: strncpy(homeTextBuffer, "Timer\nfeito!", sizeof(homeTextBuffer)); break;
					case DANISH: strncpy(homeTextBuffer, "Timer\ngjort!!!", sizeof(homeTextBuffer)); break;
					default: strncpy(homeTextBuffer, "Your timer\nis done!", sizeof(homeTextBuffer));
				}
				
				vibes_enqueue_custom_pattern((VibePattern){
					.durations = (uint32_t []){400,100,400,100,400,100, 800,200},
					.num_segments = 8
				});
			
				send_request(_("finish timer"));
			}
			else if(persist_exists(MESSAGE_KEY_Alarm) && launch_id == persist_read_int(MESSAGE_KEY_Alarm)){
				strncpy(homeTextBuffer, "Riiinnng!!!", sizeof(homeTextBuffer));
				
				vibes_enqueue_custom_pattern((VibePattern){
					.durations = (uint32_t []){3000, 500, 3000, 500, 3000},
					.num_segments = 5
				});
			
				snooze_timer = app_timer_register(5*60*1000, snooze, NULL);
			}
		}
		else if(launch_reason() == APP_LAUNCH_WORKER){
			if(persist_exists(MESSAGE_KEY_WorkerLaunchReason)){
				switch(persist_read_int(MESSAGE_KEY_WorkerLaunchReason)){
					case 0 /*Hands Free*/:
						time_remaining = 6;
						timeout_timer = app_timer_register(1000, timeout, NULL);
					break;
					
					case 1 /*Step Goal*/:
						switch(lang){
							case ENGLISH: strncpy(homeTextBuffer, "Step goal\nreached!", sizeof(homeTextBuffer)); break;
							case SPANISH: strncpy(homeTextBuffer, "¡Objectivo\nAlcanzado!", sizeof(homeTextBuffer)); break;
							case FRENCH: strncpy(homeTextBuffer, "Objectif\natteint!", sizeof(homeTextBuffer)); break;
							case GERMAN: strncpy(homeTextBuffer, "Schrittziel\nerreicht!", sizeof(homeTextBuffer)); break;
							case PORTUGUESE: strncpy(homeTextBuffer, "Meta\nalcançada!", sizeof(homeTextBuffer)); break;
							case DANISH: strncpy(homeTextBuffer, "Trin mål\nnået!", sizeof(homeTextBuffer)); break;
							default: strncpy(homeTextBuffer, "Step goal\nreached!", sizeof(homeTextBuffer)); break;
						}
				
						vibes_long_pulse();
				
						time_remaining = 11;
						timeout_timer = app_timer_register(1000, timeout, NULL);
					break;
					
					case 2 /*Inactivity Monitor*/:
						switch(lang){
							case ENGLISH: strncpy(homeTextBuffer, "Time for\na walk?", sizeof(homeTextBuffer)); break;
							case SPANISH: strncpy(homeTextBuffer, "Tiempo para\ncaminar?", sizeof(homeTextBuffer)); break;
							case FRENCH: strncpy(homeTextBuffer, "Temps de\nmarche?", sizeof(homeTextBuffer)); break;
							case GERMAN: strncpy(homeTextBuffer, "Zeit, zu\ngehen?", sizeof(homeTextBuffer)); break;
							case PORTUGUESE: strncpy(homeTextBuffer, "Tempo para\num passeio?", sizeof(homeTextBuffer)); break;
							case DANISH: strncpy(homeTextBuffer, "Tid til\nen tur?", sizeof(homeTextBuffer)); break;
							default: strncpy(homeTextBuffer, "Time for\na walk?", sizeof(homeTextBuffer)); break;
						}
					
						layer_mark_dirty(window_get_root_layer(home_window));
						vibes_long_pulse();
					break;
				}
			}
		}
		else if(launch_reason() == APP_LAUNCH_QUICK_LAUNCH){
			start_dictation();
			update_text(_("Fetching Data..."), "");
			window_stack_push(window, false);
		}
		wakeup_service_subscribe(wakeup_handler);
	}
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Init 22: %d", (int)heap_bytes_free());
	layer_mark_dirty(window_get_root_layer(home_window));
	layer_mark_dirty(window_get_root_layer(window));
}
	
void deinit(){
	window_destroy(home_window);
	window_destroy(info_window);
	window_destroy(window);
								 
	action_bar_layer_destroy(action_layer);
	
	kiezelpay_deinit();
	
	deinit_action_menu();
	
	localize_deinit();
	
	deinit_ui();
	
	events_connection_service_unsubscribe(connection_handle);
	events_tick_timer_service_unsubscribe(tick_handle);
	events_app_message_unsubscribe(message_handle);
	events_accel_tap_service_unsubscribe(tap_handle);
}

//On first-run only, ask for Language
static uint16_t lang_num_rows(MenuLayer *menu_layer, uint16_t section_index, void *data){
	return NUM_LANG;
}

void lang_draw_row(GContext *ctx, const Layer *cell_layer, MenuIndex *index, void *data){
	menu_cell_basic_draw(ctx, cell_layer, LANG_LIST[index->row], NULL, NULL);
}

static void lang_click(MenuLayer *menu_layer, MenuIndex *cell_index, void *data){
	switch(cell_index->row){
		case 0: lang = ENGLISH; break;
		case 1: lang = GERMAN; break;
		case 2: lang = SPANISH; break;
		case 3: lang = FRENCH; break;
		case 4: lang = DANISH; break;
		case 5: lang = PORTUGUESE; break;
		default:lang = ENGLISH; break;
	}
	
	menu_layer_destroy(lang_menu_layer);
	window_destroy(lang_window);
	
	init();
}

void lang_init(){
	if(persist_exists(MESSAGE_KEY_Lang)){
		lang = persist_read_int(MESSAGE_KEY_Lang);
		init();
	}
	else{
		lang_window = window_create();
		window_set_background_color(lang_window, GColorLightGray);
		
		lang_menu_layer = menu_layer_create(layer_get_bounds(window_get_root_layer(lang_window)));
		menu_layer_set_callbacks(lang_menu_layer, NULL, (MenuLayerCallbacks){
			.draw_row = lang_draw_row,
			.get_num_rows = lang_num_rows,
			.select_click = lang_click
		});
		menu_layer_set_normal_colors(lang_menu_layer, GColorLightGray, GColorBlack);
		menu_layer_set_highlight_colors(lang_menu_layer, GColorBlack, GColorWhite);
		menu_layer_pad_bottom_enable(lang_menu_layer, false);
		menu_layer_reload_data(lang_menu_layer);
		menu_layer_set_click_config_onto_window(lang_menu_layer, lang_window);
		
		layer_add_child(window_get_root_layer(lang_window), menu_layer_get_layer(lang_menu_layer));
		window_stack_push(lang_window, true);
	}
}

void lang_deinit(){
	if(lang >= 0){
		deinit();
	}
	
	if(!persist_exists(MESSAGE_KEY_Lang)){
		//menu_layer_destroy(lang_menu_layer);
		//window_destroy(lang_window);
		if(lang >= 0) persist_write_int(MESSAGE_KEY_Lang, lang);
	}
	
	if( (persist_exists(MESSAGE_KEY_HandsFree) && persist_read_bool(MESSAGE_KEY_HandsFree)) || 
		  (persist_exists(MESSAGE_KEY_StepGoal) && persist_read_int(MESSAGE_KEY_StepGoal) > 0) ||
		  (persist_exists(MESSAGE_KEY_InactivityMonitor) && persist_read_bool(MESSAGE_KEY_InactivityMonitor)) ){
		app_worker_launch();
	}
}

//App Entry Point
int main(void){
	lang_init();
	app_event_loop();
	lang_deinit();
}