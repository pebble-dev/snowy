#include <pebble.h>
#include <pebble-localize/pebble-localize.h>
#include <kiezelpay-core/kiezelpay.h>

#include "ui.h"
#include "widget.h"
#include "lang.h"
#include "main.h"
#include "settings.h"
#include "dictation.h"

//Initialize homeTextBuffer position based on Language

int langOffsetX = 0, langOffsetY = 0;

char homeTextBuffer[32];
char homeTimeBuffer[16];

char titleTimeBuffer[16];

void set_lang_offsets(){
	switch(lang){
		case SPANISH:
		langOffsetX = -6;
		langOffsetY = 2;
		strncpy(homeTextBuffer, "Hola, ¿cómo\nestás?", sizeof(homeTextBuffer));
		break;
		
		case FRENCH:
		langOffsetX = -4;
		langOffsetY = -1;
		strncpy(homeTextBuffer, "Bonjour!\nÇa va bien?", sizeof(homeTextBuffer));
		break;
		
		case ENGLISH:
		strncpy(homeTextBuffer, "How may I\nhelp you?", sizeof(homeTextBuffer));
		break;
		
		case GERMAN:
		langOffsetX = -7;
		langOffsetY = 1;
		strncpy(homeTextBuffer, "Wie kann ich\ndir helfen?", sizeof(homeTextBuffer));
		break;
		
		case PORTUGUESE:
		langOffsetX = 0;
		langOffsetY = 12;
		strncpy(homeTextBuffer, "Como vai?", sizeof(homeTextBuffer));
		break;
		
		case DANISH:
		langOffsetX = -6;
		langOffsetY = 0;
		strncpy(homeTextBuffer, "Hej! Hvordan\nhar du det?", sizeof(homeTextBuffer));
		break;
		
		default: strncpy(homeTextBuffer, "How may I\nhelp you?", sizeof(homeTextBuffer)); break;
	}
}

//Initialize all Windows

extern Window *home_window, *info_window, *window;

GBitmap *bg;

GFont custom_leco;

extern ActionBarLayer *action_layer;

//Draw Home Window

void draw_home_layer(Layer *layer, GContext *ctx){
	graphics_draw_bitmap_in_rect(ctx, bg, layer_get_bounds(layer));
	
	#ifdef PBL_RECT
		graphics_context_set_stroke_color(ctx, GColorBlack);
	
		for(int x = 0; x < layer_get_bounds(layer).size.w; x++){
			if(x%2 == 0) graphics_draw_pixel(ctx, GPoint(x,15));
		}
	#endif
	
	graphics_context_set_text_color(ctx, GColorBlack);
	
	graphics_draw_text(ctx, titleTimeBuffer, fonts_get_system_font(FONT_KEY_GOTHIC_14), GRect(0,PBL_IF_RECT_ELSE(-2,6),layer_get_bounds(layer).size.w - PBL_IF_RECT_ELSE(ACTION_BAR_WIDTH, 0), 16), GTextOverflowModeFill, GTextAlignmentCenter, NULL);
	
	if(current_widget == WidgetNoneText || launch_reason() == APP_LAUNCH_WAKEUP || launch_reason() == APP_LAUNCH_WORKER){
		if(bluetooth_connection_service_peek() || launch_reason() == APP_LAUNCH_WAKEUP || launch_reason() == APP_LAUNCH_WORKER) graphics_draw_text(ctx, homeTextBuffer, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD), GRect(HOME_X + langOffsetX, HOME_Y + langOffsetY, 144 - ACTION_BAR_WIDTH, 60), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
		else graphics_draw_text(ctx, "Zzz...", fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD), GRect(HOME_X, HOME_Y, 144 - ACTION_BAR_WIDTH, 60), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
	}
	else if(current_widget == WidgetNoneTime){
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, homeTimeBuffer, fonts_get_system_font(FONT_KEY_LECO_32_BOLD_NUMBERS), GRect(HOME_X-12, HOME_Y+8, 144 - ACTION_BAR_WIDTH-12, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
  	#elif PBL_ROUND 
			graphics_draw_text(ctx, homeTimeBuffer, fonts_get_system_font(FONT_KEY_LECO_32_BOLD_NUMBERS), GRect(HOME_X -8, HOME_Y+9, 144 - ACTION_BAR_WIDTH-12, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif
	}
	else{
		#ifdef PBL_RECT 
			graphics_draw_text(ctx, homeTimeBuffer, fonts_get_system_font(FONT_KEY_LECO_28_LIGHT_NUMBERS), GRect(HOME_X-12, HOME_Y + (current_widget == WidgetWeather ? -2 : 0), 144 - ACTION_BAR_WIDTH-12, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
  	#elif PBL_ROUND 
			graphics_draw_text(ctx, homeTimeBuffer, fonts_get_system_font(FONT_KEY_LECO_28_LIGHT_NUMBERS), GRect(HOME_X -8, HOME_Y+1  + (current_widget == WidgetWeather ? -2 : 0), 144 - ACTION_BAR_WIDTH-12, 60), GTextOverflowModeTrailingEllipsis, GTextAlignmentCenter, NULL);
		#endif	
		
		graphics_draw_widget(ctx);
	}
	
	if(!bluetooth_connection_service_peek()){
		graphics_context_set_fill_color(ctx, GColorWhite);
		graphics_context_set_stroke_color(ctx, GColorWhite);

		#ifdef PBL_ROUND
			graphics_fill_rect(ctx, GRect(113,133,4,4),0,GCornerNone);
			graphics_fill_rect(ctx, GRect(105,128,2,2),0,GCornerNone);
			graphics_draw_pixel(ctx, GPoint(104,129));
		#elif PBL_RECT
			graphics_fill_rect(ctx, GRect(80,133,4,4),0,GCornerNone);
			graphics_fill_rect(ctx, GRect(72,128,2,2),0,GCornerNone);
			graphics_draw_pixel(ctx, GPoint(71,129));
		#endif
	}
}

#ifdef PBL_ROUND
	GTextAttributes *info_attributes;
#endif

//Draw Info Window

void draw_info_layer(Layer *layer, GContext *ctx){
	graphics_context_set_fill_color(ctx, GColorTiffanyBlue);
	graphics_fill_rect(ctx, layer_get_bounds(layer), 0, GCornerNone);
	
	graphics_context_set_fill_color(ctx, GColorBlack);
	graphics_context_set_text_color(ctx, GColorWhite);
	
	#ifdef PBL_RECT
		graphics_fill_rect(ctx, GRect(14,0,layer_get_bounds(layer).size.w-14,layer_get_bounds(layer).size.h), 0, GCornerNone);
		graphics_fill_radial(ctx, GRect(5,8,5,5), GOvalScaleModeFitCircle, 3, 0, TRIG_MAX_ANGLE);
	
		if(lang == SPANISH) graphics_draw_text(ctx, "Hola, soy Snowy! (Versión 4.0)\n\nPara obtener una lista completa de comandos visita mydogsnowy\n.com/es", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(18,0,layer_get_bounds(layer).size.w-18-4,layer_get_bounds(layer).size.h), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
	 	else if(lang == FRENCH) graphics_draw_text(ctx, "Salut, je suis Snowy! (v4.0)\n\nPour une liste complète des commandes visite mydogsnowy\n.com/fr", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(18,0,layer_get_bounds(layer).size.w-18-4,layer_get_bounds(layer).size.h), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
		else if(lang == GERMAN) graphics_draw_text(ctx, "Hi, ich bin Snowy!\n(Version 4.0)\n\nFür eine Liste von Befehlen, besuche mydogsnowy .com/de", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(18,0,layer_get_bounds(layer).size.w-18-4,layer_get_bounds(layer).size.h), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
		else if(lang == PORTUGUESE) graphics_draw_text(ctx, "Oi, eu sou o Snowy!\n(Versão 4.0)\n\nPara uma lista completa de comandos, visite mydogsnowy .com/pt", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(18,0,layer_get_bounds(layer).size.w-18-4,layer_get_bounds(layer).size.h), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
		else if(lang == DANISH) graphics_draw_text(ctx, "Hej. Jeg er Snowy!\n[Version 4.0]\n\nFor at se en hel liste, gå til mydogsnowy.com/da", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(18,0,layer_get_bounds(layer).size.w-18-4,layer_get_bounds(layer).size.h), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
		else graphics_draw_text(ctx, "Hi, I'm Snowy!\n(Version 4.0)\n\nFor examples of what I can do, press Down on the Home screen. For a full list, visit mydogsnowy.com", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(18,0,layer_get_bounds(layer).size.w-18-4,layer_get_bounds(layer).size.h), GTextOverflowModeWordWrap, GTextAlignmentLeft, NULL);
	#elif PBL_ROUND
		graphics_fill_radial(ctx, GRect(12,12,180-24,180-24), GOvalScaleModeFitCircle, 90-12, 0, TRIG_MAX_ANGLE);
		
		if(lang == SPANISH) graphics_draw_text(ctx, "Hola, soy Snowy! (v4.0)\n\nPara obtener una lista completa de comandos visita mydogsnowy .com/es", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(0,-2,180,180), GTextOverflowModeWordWrap, GTextAlignmentCenter, info_attributes);
		else if(lang == FRENCH) graphics_draw_text(ctx, "Salut, je suis Snowy!\n(Version 4.0)\n\nPour une liste des commandes: mydogsnowy .com/fr", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(0,-2,180,180), GTextOverflowModeWordWrap, GTextAlignmentCenter, info_attributes);
		else if(lang == GERMAN) graphics_draw_text(ctx, "Hi, ich bin Snowy!\n(Version 4.0)\n\nFür eine Liste von Befehlen, besuche mydogsnowy .com/de", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(0,-2,180,180), GTextOverflowModeWordWrap, GTextAlignmentCenter, info_attributes);
		else if(lang == PORTUGUESE) graphics_draw_text(ctx, "Oi, eu sou o Snowy!\n(Versão 4.0)\n\nPara uma lista completa de comandos, visite mydogsnowy .com/pt", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(0,-2,180,180), GTextOverflowModeWordWrap, GTextAlignmentCenter, info_attributes);
		else if(lang == DANISH) graphics_draw_text(ctx, "Hej. Jeg er Snowy!\n[Version 4.0]\n\nFor at se en hel liste, gå til mydogsnowy .com/da", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(0,-2,180,180), GTextOverflowModeWordWrap, GTextAlignmentCenter, info_attributes);
		else graphics_draw_text(ctx, "Hi, I'm Snowy!\n(Version 4.0)\n\nFor a full list of commands, visit mydogsnowy .com", fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD), GRect(0,-2,180,180), GTextOverflowModeWordWrap, GTextAlignmentCenter, info_attributes);
	#endif
}

int scroll = 0;

int titleY, bodyY, timestampY;

GFont titleFont, bodyFont, timestampFont;

GBitmap *icon, *indicator;

#ifdef PBL_ROUND
	GTextAttributes *attributes, *body_attributes;
#endif

//Draw Notification Window

void draw_layer(Layer *layer, GContext *ctx){
	graphics_context_set_fill_color(ctx, settings_night_mode ? GColorBlack : GColorWhite);
	graphics_context_set_text_color(ctx, settings_night_mode ? GColorWhite : GColorBlack);
	graphics_fill_rect(ctx, layer_get_bounds(layer), 0, GCornerNone);
	
	graphics_draw_text(ctx, titleBuffer, titleFont, PBL_IF_RECT_ELSE(GRect(10, titleY + scroll + (settings_fullscreen ? -55 : 0), 124, 336), GRect(0,titleY + scroll - 7 + (settings_fullscreen ? -70 : 0), 180, 360)), GTextOverflowModeWordWrap, PBL_IF_RECT_ELSE(GTextAlignmentLeft, GTextAlignmentCenter), PBL_IF_RECT_ELSE(NULL, attributes));
	graphics_draw_text(ctx, bodyBuffer, bodyFont, PBL_IF_RECT_ELSE(GRect(10, bodyY + scroll + (settings_fullscreen ? -55 : 0), 124, 3360),GRect(0, bodyY + scroll - 7 - 2 + (settings_fullscreen ? -70 : 0), 180, 3600)), GTextOverflowModeWordWrap, PBL_IF_RECT_ELSE(GTextAlignmentLeft, GTextAlignmentCenter), PBL_IF_RECT_ELSE(NULL, body_attributes));
	graphics_draw_text(ctx, timestampBuffer, timestampFont, PBL_IF_RECT_ELSE(GRect(10, timestampY + scroll + (settings_fullscreen ? -55 : 0), 124, 336), GRect(0, timestampY + scroll - 7 - 2 + (settings_fullscreen ? -70 : 0), 180, 360)), GTextOverflowModeWordWrap, PBL_IF_RECT_ELSE(GTextAlignmentLeft, GTextAlignmentCenter), PBL_IF_RECT_ELSE(NULL, attributes));
	
	#ifdef PBL_RECT
	if(!settings_fullscreen){
	#elif PBL_ROUND
		if(!settings_fullscreen && scroll >= -2){
	#endif
		
		graphics_context_set_fill_color(ctx, GColorTiffanyBlue);
		
		#ifdef PBL_RECT
		graphics_fill_rect(ctx, GRect(0,scroll+16,layer_get_bounds(layer).size.w,36), 0, GCornerNone);
		#elif PBL_ROUND
		graphics_fill_radial(ctx, GRect(-50,-220,280,280), GOvalScaleModeFitCircle, 120, TRIG_MAX_ANGLE / 4, 3 * TRIG_MAX_ANGLE / 4);
		#endif
		
		graphics_context_set_compositing_mode(ctx, GCompOpSet);
		graphics_draw_bitmap_in_rect(ctx, icon, PBL_IF_RECT_ELSE(GRect(61,20+scroll,22,25),GRect(79,27,22,25)));
	}
	#ifdef PBL_ROUND
	else if(!settings_fullscreen){
		graphics_context_set_fill_color(ctx, settings_night_mode ? GColorBlack : GColorWhite);
		graphics_fill_rect(ctx, GRect(0,0,180,20),0,GCornerNone);
	}
	#endif
	
	if(!settings_fullscreen){
		#ifdef PBL_RECT
		graphics_context_set_fill_color(ctx, GColorTiffanyBlue);
		graphics_fill_rect(ctx, GRect(0,0,144,16), 0, GCornerNone);
		#endif
		
		graphics_context_set_text_color(ctx, settings_night_mode ? GColorWhite : GColorBlack);
		graphics_draw_text(ctx, titleTimeBuffer, fonts_get_system_font(FONT_KEY_GOTHIC_14), GRect(0,PBL_IF_RECT_ELSE(-2,6),layer_get_bounds(layer).size.w, 16), GTextOverflowModeFill, GTextAlignmentCenter, NULL);
	}
	
		if( kiezelpay_get_status() & KIEZELPAY_LICENSED ){
		graphics_context_set_fill_color(ctx, settings_night_mode ? GColorWhite : GColorBlack);
		graphics_fill_radial(ctx, PBL_IF_RECT_ELSE(GRect(139,71,26,26),GRect(169,78,24,24)), GOvalScaleModeFitCircle, 12, TRIG_MAX_ANGLE / 2, TRIG_MAX_ANGLE);
	}
	
	if( scroll + timestampY + timestampSize + (settings_fullscreen ? PBL_IF_RECT_ELSE(-55,-70) : 0) > PBL_IF_RECT_ELSE(164,182) ){
		graphics_context_set_fill_color(ctx, settings_night_mode ? GColorBlack : GColorWhite);
		graphics_fill_rect(ctx, GRect(0,layer_get_bounds(layer).size.h-16,layer_get_bounds(layer).size.w,16), 0, GCornerNone);
		graphics_draw_bitmap_in_rect(ctx, indicator, PBL_IF_RECT_ELSE(GRect(68,155,9,5),GRect(84,166,12,6)));
	}
}

void set_night_mode_palette(){
	GColor *pal = gbitmap_get_palette(indicator);
	if(settings_night_mode){
		pal[0] = GColorWhite;
		pal[1] = GColorBlack;
		#ifdef PBL_ROUND		
		pal[2] = GColorBlack;
		pal[3] = GColorBlack;
		#endif
	}
	else{
		pal[0] = GColorBlack;
		pal[1] = GColorWhite;
		#ifdef PBL_ROUND
		pal[2] = GColorWhite;
		pal[3] = GColorWhite;
		#endif
	}
}	
	
void init_ui(){
	
	//Initialize Home Window
	
	home_window = window_create();
	
	bg = gbitmap_create_with_resource(RESOURCE_ID_BG);
	
	custom_leco = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_FONT_CUSTOM_LECO_14));
	
	init_widget();	
	
	layer_set_update_proc(window_get_root_layer(home_window), draw_home_layer);
	
	action_layer = action_bar_layer_create();
	
	action_bar_layer_set_icon(action_layer, BUTTON_ID_UP, gbitmap_create_with_resource(RESOURCE_ID_INFO));
	action_bar_layer_set_icon(action_layer, BUTTON_ID_SELECT, gbitmap_create_with_resource(RESOURCE_ID_MIC));
	action_bar_layer_set_icon(action_layer, BUTTON_ID_DOWN, gbitmap_create_with_resource(RESOURCE_ID_SAMPLE));
	
	action_bar_layer_set_click_config_provider(action_layer, home_config);
	action_bar_layer_add_to_window(action_layer, home_window);
	
	window_stack_push(home_window, false);
	
	//Initialize Info Window
	
	#ifdef PBL_ROUND
	info_attributes = graphics_text_attributes_create();
	graphics_text_attributes_enable_screen_text_flow(info_attributes, 14);
	#endif
	
	info_window = window_create();
	layer_set_update_proc(window_get_root_layer(info_window), draw_info_layer);
	
	//Initialize Notification Window
	
	window = window_create();
	window_set_click_config_provider(window,config);
	
	icon = gbitmap_create_with_resource(RESOURCE_ID_ICON);
	
	indicator = gbitmap_create_with_resource(RESOURCE_ID_INDICATOR);
	
	set_night_mode_palette();
	
	#ifdef PBL_ROUND
	attributes = graphics_text_attributes_create();
	graphics_text_attributes_enable_screen_text_flow(attributes, 12);
	graphics_text_attributes_enable_paging(attributes, GPoint(0, settings_fullscreen ? 0 : 77), GRect(0,settings_fullscreen ? 0 : 20,180,settings_fullscreen ? 156 : 136));
	
	body_attributes = graphics_text_attributes_create();
	graphics_text_attributes_enable_screen_text_flow(body_attributes, 12);
	#endif
	
	strncpy(titleBuffer, _("Fetching Data..."), sizeof(titleBuffer));
	//strncpy(bodyBuffer, "Testing how well scrolling works. There's potential that it could continue on to the next page, and maybe the next one or even the one after that! That would certainly be a lot of pages. But even this much text seems to only cover the first two or three pages, at most! I guess I just need to keep typing...", sizeof(bodyBuffer));
	strncpy(timestampBuffer, _("Now"), sizeof(timestampBuffer));
	
	set_size(settings_small_font);
	
	layer_set_update_proc(window_get_root_layer(window), draw_layer);
}

void reinit_round_fullscreen(){
	#ifdef PBL_ROUND
	attributes = graphics_text_attributes_create();
	graphics_text_attributes_enable_screen_text_flow(attributes, 12);
	graphics_text_attributes_enable_paging(attributes, GPoint(0, settings_fullscreen ? 0 : 77), GRect(0,settings_fullscreen ? 0 : 20,180,settings_fullscreen ? 156 : 136));
	
	body_attributes = graphics_text_attributes_create();
	graphics_text_attributes_enable_screen_text_flow(body_attributes, 12);
	#endif
}
	
void deinit_ui(){
	gbitmap_destroy(bg);
	gbitmap_destroy(icon);
	gbitmap_destroy(indicator);
	
	fonts_unload_custom_font(custom_leco);
	
	deinit_widget();
}

//Update Notification Window text

int titleY, bodyY;
GFont titleFont, bodyFont, timestampFont;
int titleSize = 0, bodySize = 0;

void set_size(bool new_value){
	settings_small_font = new_value;
	persist_write_bool(MESSAGE_KEY_FontSize, settings_small_font);
	
	scroll = 0;
	
	if( !(kiezelpay_get_status() & KIEZELPAY_LICENSED) || settings_small_font){
		titleFont = fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD);
		bodyFont = fonts_get_system_font(FONT_KEY_GOTHIC_18);
		timestampFont = fonts_get_system_font(FONT_KEY_GOTHIC_14);
		
		titleSize = 18;
		bodySize = 18;
		timestampSize = 14;
	}
	else{ //size == LARGE
		titleFont = fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD);
		bodyFont = fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD);
		timestampFont = fonts_get_system_font(FONT_KEY_GOTHIC_18);
	
		titleSize = 18;
		bodySize = 24;
		timestampSize = 18;
	}
	
	#ifdef PBL_RECT
		titleY = 55;
		bodyY = graphics_text_layout_get_content_size(titleBuffer, titleFont, GRect(0,0,124,3360), GTextOverflowModeWordWrap, GTextAlignmentLeft).h + titleY + 2;
		timestampY = graphics_text_layout_get_content_size(bodyBuffer, bodyFont, GRect(0,0,124,3360), GTextOverflowModeWordWrap, GTextAlignmentLeft).h + bodyY + 2;
	#elif PBL_ROUND
		titleY = 70;
		bodyY = graphics_text_layout_get_content_size_with_attributes(titleBuffer, titleFont, GRect(0,titleY + titleSize + 2,180,3600), GTextOverflowModeWordWrap, GTextAlignmentCenter, attributes).h + titleY + 2;
	
		if(body_attributes != NULL) graphics_text_attributes_enable_paging(body_attributes, GPoint(0, bodyY - 12 + (settings_fullscreen ? - 70 : 0)), GRect(0,0,180,settings_fullscreen ? 159 : 159));
	
		timestampY = graphics_text_layout_get_content_size_with_attributes(bodyBuffer, bodyFont, GRect(0,bodyY + bodySize + 2,180,3600), GTextOverflowModeWordWrap, GTextAlignmentCenter, body_attributes).h + bodyY + 4;
	#endif
	
	layer_mark_dirty(window_get_root_layer(window));
}

void update_text(const char *title, const char *body){
	strncpy(titleBuffer, title, sizeof(titleBuffer));
	strncpy(bodyBuffer, body, sizeof(bodyBuffer));
	set_size(settings_small_font);
}