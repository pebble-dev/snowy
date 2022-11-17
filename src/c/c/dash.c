#include <pebble.h>
#include <pebble-dash-api/pebble-dash-api.h>
#include "dash.h"
#include "ui.h"

char dash_title[32], dash_body[64];

static void dash_get_data_callback(DataType type, DataValue result){
	strncpy(dash_title, "Dash API", sizeof(dash_title));
	
	switch(type){
		case DataTypeBatteryPercent: 
		snprintf(dash_body, sizeof(dash_body), "Phone Battery is at %d%%.", result.integer_value);
		break;
		
		case DataTypeUnreadSMSCount:
		snprintf(dash_body, sizeof(dash_body), "You have %d unread messages.", result.integer_value);
		break;
		
		case DataTypeNextCalendarEventOneLine:
		snprintf(dash_body, sizeof(dash_body), "Your next Calendar Event is: %s", result.string_value);
		break;
		
		case DataTypeNextCalendarEventTwoLine: APP_LOG(APP_LOG_LEVEL_INFO, "Next Calendar Event is %s", result.string_value); break;
		case DataTypeWifiNetworkName: APP_LOG(APP_LOG_LEVEL_INFO, "Wifi Network: %s", result.string_value); break;
		case DataTypeStoragePercentUsed: APP_LOG(APP_LOG_LEVEL_INFO, "Storage Free: %d%%", result.integer_value); break;
		case DataTypeStorageFreeGBString: APP_LOG(APP_LOG_LEVEL_INFO, "Storage Free (GB): %s", result.string_value); break;
		case DataTypeGSMOperatorName: APP_LOG(APP_LOG_LEVEL_INFO, "Operator Name: %s", result.string_value); break;
		case DataTypeGSMStrength: APP_LOG(APP_LOG_LEVEL_INFO, "Operator Strength: %d", result.integer_value); break;
	}
	
	update_text(dash_title, dash_body);
}
/*
static void dash_get_feature_callback(FeatureType type, FeatureState state){
	switch(type){
		case FeatureTypeWifi: APP_LOG(APP_LOG_LEVEL_INFO, "Wifi is %s", state == FeatureStateOn ? "ON" : "OFF"); break;
		case FeatureTypeBluetooth: APP_LOG(APP_LOG_LEVEL_INFO, "Bluetooth is %s", state == FeatureStateOn ? "ON" : "OFF"); break;
		case FeatureTypeRinger: APP_LOG(APP_LOG_LEVEL_INFO, "Ringer is %s", state == FeatureStateRingerLoud ? "Loud" : state == FeatureStateRingerVibrate ? "Vibrate" : "Silent"); break;
		case FeatureTypeAutoSync: APP_LOG(APP_LOG_LEVEL_INFO, "Auto Sync is %s", state == FeatureStateOn ? "ON" : "OFF"); break;
		case FeatureTypeHotSpot: APP_LOG(APP_LOG_LEVEL_INFO, "HotSpot is %s", state == FeatureStateOn ? "ON" : "OFF"); break;
		case FeatureTypeAutoBrightness: APP_LOG(APP_LOG_LEVEL_INFO, "Auto Brightness is %s", state == FeatureStateOn? "ON" : "OFF"); break;
	}
}
*/
static void dash_set_feature_callback(FeatureType type, FeatureState state){
	strncpy(dash_title, "Dash API", sizeof(dash_title));
	
	switch(type){
		case FeatureTypeWifi: 
		snprintf(dash_body, sizeof(dash_body), "WiFi is %s.", state == FeatureStateOn ? "on" : "off");
		break;
		
		case FeatureTypeHotSpot: 
		snprintf(dash_body, sizeof(dash_body), "Hotspot is %s.", state == FeatureStateOn ? "on" : "off");
		break;
		
		case FeatureTypeRinger: 
		snprintf(dash_body, sizeof(dash_body), "Ringer set to %s.", state == FeatureStateRingerLoud ? "loud" : state == FeatureStateRingerVibrate ? "vibrate" : "silent");
		break;
		
		case FeatureTypeBluetooth: APP_LOG(APP_LOG_LEVEL_INFO, "Bluetooth is %s", state == FeatureStateOn ? "ON" : "OFF"); break;
		case FeatureTypeAutoSync: APP_LOG(APP_LOG_LEVEL_INFO, "Auto Sync is %s", state == FeatureStateOn ? "ON" : "OFF"); break;
		case FeatureTypeAutoBrightness: APP_LOG(APP_LOG_LEVEL_INFO, "Auto Brightness is %s", state == FeatureStateOn? "ON" : "OFF"); break;
	}	
	
	update_text(dash_title, dash_body);
}

static void dash_error_callback(ErrorCode code){
	switch(code){
		case ErrorCodeSuccess: APP_LOG(APP_LOG_LEVEL_INFO, "Success!"); break;
		
		case ErrorCodeSendingFailed: 
		APP_LOG(APP_LOG_LEVEL_ERROR, "Error: Send Failed");
		error = true;
		update_text("Dash API Error", "Error: Send Failed");
		break;
		
		case ErrorCodeUnavailable: 
		APP_LOG(APP_LOG_LEVEL_ERROR, "Error: Unavailable"); 
		error = true;
		update_text("Dash API Error", "Error: Unavailable");
		break;
		
		case ErrorCodeNoPermissions: 
		APP_LOG(APP_LOG_LEVEL_ERROR, "Error: No Permission"); 
		error = true;
		update_text("Dash API Error", "Error: No Permission");
		break;
		
		case ErrorCodeWrongVersion: 
		APP_LOG(APP_LOG_LEVEL_ERROR, "Error: Wrong Version"); 
		error = true;
		update_text("Dash API Error", "Error: Wrong Version");
		break;
	}
}

void get_battery_via_dash(){
	dash_api_get_data(DataTypeBatteryPercent, dash_get_data_callback);
}

void set_wifi_via_dash(bool on){
	dash_api_set_feature(FeatureTypeWifi, on ? FeatureStateOn : FeatureStateOff, dash_set_feature_callback);
}

void set_ringer_via_dash(int ring){
	switch(ring){
		case SILENT: dash_api_set_feature(FeatureTypeRinger, FeatureStateRingerSilent, dash_set_feature_callback); break;
		case VIBRATE: dash_api_set_feature(FeatureTypeRinger, FeatureStateRingerVibrate, dash_set_feature_callback); break;
		case LOUD: dash_api_set_feature(FeatureTypeRinger, FeatureStateRingerLoud, dash_set_feature_callback); break;
	}
}

void set_hotspot_via_dash(bool on){
	dash_api_set_feature(FeatureTypeHotSpot, on ? FeatureStateOn : FeatureStateOff, dash_set_feature_callback);
}

void get_sms_count_via_dash(){
	dash_api_get_data(DataTypeUnreadSMSCount, dash_get_data_callback);
}

void get_calendar_via_dash(){
	dash_api_get_data(DataTypeNextCalendarEventOneLine, dash_get_data_callback);
}

void init_dash_api(){
	dash_api_init("Snowy", dash_error_callback);
}