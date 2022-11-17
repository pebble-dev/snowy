#include <pebble.h>
#include <pebble-localize/pebble-localize.h>
#include "actionmenu.h"
#include "ui.h"
#include "messaging.h"
#include "lang.h"
#include "dash.h"

extern Window *window;

extern char homeTextBuffer[32];

ActionMenu *amenu;
ActionMenuLevel *alevel, *alevel2, *alevel3, *customlevel;

char custom[4][64];

int custom_size = 0;

typedef enum {
	ActionTypeFunFact,
	ActionTypeWeather,
	ActionTypeReminder,
	ActionTypeDefine,
	ActionTypeMore,
	ActionTypeTranslate,
	ActionTypeCalculate,
	ActionTypeEat,
	ActionTypeNote,
	ActionTypeSteps,
	ActionTypeConvert,
	ActionTypeHome,
	ActionTypeTip,
	ActionTypeNull,
	ActionTypeCustom1,
	ActionTypeCustom2,
	ActionTypeCustom3,
	ActionTypeCustom4
} ActionType;

ActionType ActionTypesCustom[4] = {ActionTypeCustom1, ActionTypeCustom2, ActionTypeCustom3, ActionTypeCustom4};

bool is_action_menu_open = false;

void acb(ActionMenu *action_menu, const ActionMenuItem *action, void *context){
	ActionType type = (ActionType)action_menu_item_get_action_data(action);
	
	if(type == ActionTypeFunFact){
		send_request(_("tell me current us president"));
	}
	else if(type == ActionTypeWeather){
		send_request(_("what is the weather"));
	}
	else if(type == ActionTypeReminder){
		send_request(_("remind me to call Mom at 2 pm tomorrow"));
	}
	else if(type == ActionTypeDefine){	
		send_request(_("define artificial intelligence"));
	}
	else if(type == ActionTypeTranslate){
		send_request(_("how do you say hello in french"));
	}
	else if(type == ActionTypeCalculate){
		send_request(lang == ENGLISH ? "what is new today" : _("calculate 2+2"));
	}
	else if(type == ActionTypeEat){
		send_request(_("where should i eat"));
	}
	else if(type == ActionTypeNote){
		send_request(_("take a note Pebble rocks"));
	}
	else if(type == ActionTypeSteps){
		send_request(_("how many steps have i walked today"));
	}
	else if(type == ActionTypeConvert){
		send_request(_("convert 5 kilometers to miles"));
	}
	else if(type == ActionTypeHome){
		send_request(_("how do i get home"));
	}
	else if(type == ActionTypeTip){
		send_request(_("what is 20 % of $17.95"));
	}
	else if(type == ActionTypeCustom1){
		APP_LOG(APP_LOG_LEVEL_DEBUG, "Custom 0: %s", custom[0]);
		send_request(custom[0]);
	}
	else if(type == ActionTypeCustom2){
		send_request(custom[1]);
	}
	else if(type == ActionTypeCustom3){
		send_request(custom[2]);
	}
	else if(type == ActionTypeCustom4){
		send_request(custom[3]);
	}
	
	if(type != ActionTypeNull){
		error = false;
		update_text(_("Fetching data..."), "");
		
		window_stack_push(window, true);
	}
}

void show_action_menu(){	
	ActionMenuConfig aconfig = (ActionMenuConfig){
		.root_level = custom_size > 0 ? customlevel : alevel,
		.colors = {
			.background = GColorTiffanyBlue,
			.foreground = GColorBlack
		},
			.align = ActionMenuAlignTop
	};
	
	APP_LOG(APP_LOG_LEVEL_DEBUG, "A CONFIG: %d", (int)heap_bytes_free());
	
	amenu = action_menu_open(&aconfig);
	
	APP_LOG(APP_LOG_LEVEL_DEBUG, "A MENU: %d", (int)heap_bytes_free());
	
	is_action_menu_open = true;
}

bool hide_action_menu(){
	if(is_action_menu_open){
		action_menu_close(amenu, false);
		is_action_menu_open = false;
		return true;
	}
	return false;
}

void init_action_menu(){
	custom_size = persist_exists(MESSAGE_KEY_CustomCount) ? persist_read_int(MESSAGE_KEY_CustomCount) : 0;
	
	if(custom_size > 0) customlevel = action_menu_level_create(custom_size+1);
		
	for(int i = 0; i < custom_size; i++){
		persist_read_string(MESSAGE_KEY_Custom + i, custom[i-1], sizeof(custom[i-1]));
		action_menu_level_add_action(customlevel, custom[i-1], acb, (void *)ActionTypesCustom[i-1]);
	}
	
	alevel = action_menu_level_create(6);
	
	if(custom_size > 0) action_menu_level_add_child(customlevel, alevel, _("More Commands"));
	
	action_menu_level_add_action(alevel, _("Tell me: Current US President"), acb, (void *)ActionTypeFunFact);
	action_menu_level_add_action(alevel, _("What is the weather?"), acb, (void *)ActionTypeWeather);
	action_menu_level_add_action(alevel, _("Remind me to call Mom tomorrow."), acb, (void *)ActionTypeReminder);
	action_menu_level_add_action(alevel, lang == GERMAN ? "Definiere Intelligenz" : _("Define artificial intelligence."), acb, (void *)ActionTypeDefine);
	
	alevel2 = action_menu_level_create(6);
	
	action_menu_level_add_child(alevel, alevel2, _("More Commands"));
	
	if(custom_size > 0) action_menu_level_add_action(alevel, _("Back to Home screen"), acb, (void *)ActionTypeNull);
	
	action_menu_level_add_action(alevel2, _("How do you say 'Hello' in French?"), acb, (void *)ActionTypeTranslate);
	action_menu_level_add_action(alevel2, lang == ENGLISH ? "What's new today?" : _("What is 2 + 2?"), acb, (void *)ActionTypeCalculate);
	action_menu_level_add_action(alevel2, _("Where should I eat lunch?"), acb, (void *)ActionTypeEat);
	action_menu_level_add_action(alevel2, _("Take a note: Pebble rocks!"), acb, (void *)ActionTypeNote);
	
	alevel3 = action_menu_level_create(5);
	
	action_menu_level_add_child(alevel2, alevel3, _("More Commands"));
	
	action_menu_level_add_action(alevel2, _("Back to Home screen"), acb, (void *)ActionTypeNull);
	
	action_menu_level_add_action(alevel3, _("How many steps have I walked?"), acb, (void *)ActionTypeSteps);
	action_menu_level_add_action(alevel3, "5 KM -> Mi", acb, (void *)ActionTypeConvert);
	action_menu_level_add_action(alevel3, _("How do I get home?"), acb, (void *)ActionTypeHome);
	action_menu_level_add_action(alevel3, _("What is 20% of $17.95?"), acb, (void *)ActionTypeTip);
	
	action_menu_level_add_action(alevel3, _("Back to Home screen"), acb, (void *)ActionTypeNull);
}

void deinit_action_menu(){
	action_menu_hierarchy_destroy(custom_size > 0 ? customlevel : alevel, NULL, NULL);
}