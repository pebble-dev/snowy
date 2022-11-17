#pragma once

#define NUM_LANG 6

extern const char *LANG_LIST[NUM_LANG];

enum {
	ENGLISH = 0,
	SPANISH = 1,
	FRENCH = 2,
	GERMAN = 3,
	PORTUGUESE = 4,
	DANISH = 5
};
extern int lang;

int get_lang_resource();