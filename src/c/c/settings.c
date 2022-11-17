#include <pebble.h>
#include "settings.h"

void init_settings(){
	settings_night_mode = persist_exists(MESSAGE_KEY_NightMode) ? persist_read_bool(MESSAGE_KEY_NightMode) : false;
	settings_fullscreen = persist_exists(MESSAGE_KEY_Fullscreen) ? persist_read_bool(MESSAGE_KEY_Fullscreen) : false;
	settings_small_font = persist_exists(MESSAGE_KEY_FontSize) ? persist_read_bool(MESSAGE_KEY_FontSize) : true;
	settings_hands_free = persist_exists(MESSAGE_KEY_HandsFree) ? persist_read_bool(MESSAGE_KEY_HandsFree) : false;
	settings_confirm_dictation = persist_exists(MESSAGE_KEY_ConfirmDictation) ? persist_read_bool(MESSAGE_KEY_ConfirmDictation) : false;
	settings_quick_exit = persist_exists(MESSAGE_KEY_QuickExit) ? persist_read_bool(MESSAGE_KEY_QuickExit) : false;
	settings_flick_dismiss = persist_exists(MESSAGE_KEY_FlickToDismiss) ? persist_read_bool(MESSAGE_KEY_FlickToDismiss) : false;
}