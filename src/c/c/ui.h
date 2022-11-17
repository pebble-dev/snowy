#pragma once

#ifdef PBL_RECT
	#define HOME_X 18
	#define HOME_Y 38
#elif PBL_ROUND
	#define HOME_X 36
	#define HOME_Y 45
#endif

bool error;

int timestampY, timestampSize;

char titleBuffer[128], bodyBuffer[1024], timestampBuffer[16];

extern GFont custom_leco;

extern int scroll;

extern int langOffsetX, langOffsetY;

extern char homeTextBuffer[32];
extern char homeTimeBuffer[16];

extern char titleTimeBuffer[16];

void set_lang_offsets();

void update_text(const char *title, const char *body);

void set_night_mode_palette();

void set_size(bool new);

void init_ui();
void reinit_round_fullscreen();
void deinit_ui();