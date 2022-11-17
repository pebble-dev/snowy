#include <pebble.h>
#include "lang.h"

const char *LANG_LIST[NUM_LANG] = {"English","Deutsch","Español","Français","Dansk (Beta)","Português (Beta)"};

int lang = -1;

int get_lang_resource(){
	switch(lang){
		case ENGLISH: return RESOURCE_ID_DICT_ENGLISH;
		case SPANISH: return RESOURCE_ID_DICT_SPANISH;
		case FRENCH: return RESOURCE_ID_DICT_FRENCH;
		case GERMAN: return RESOURCE_ID_DICT_GERMAN;
		case PORTUGUESE: return RESOURCE_ID_DICT_PORTUGUESE_BETA;
		case DANISH: return RESOURCE_ID_DICT_DANISH_BETA;
		default: return RESOURCE_ID_DICT_ENGLISH;
	}
}