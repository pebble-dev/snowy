#include <pebble.h>
#include <pebble-localize/pebble-localize.h>
#include "dictation.h"
#include "ui.h"
#include "messaging.h"
#include "lang.h"
#include "main.h"
#include "settings.h"

static DictationSession *session;

extern Window *window;

void dscb(DictationSession *session, DictationSessionStatus status, char *transcript, void *context){
	if(status == DictationSessionStatusSuccess){
		send_request(transcript);
		
		error = false;
		update_text(_("Fetching Data..."), "");
	}
	else{
		error = true;
		
		switch(status){
			case DictationSessionStatusFailureTranscriptionRejected: if(launch_reason() != APP_LAUNCH_QUICK_LAUNCH) update_text(_("If at first you don't succeed..."), _("Seems like you cancelled the dictation session. To try again - just click Select.")); break;
			
			case DictationSessionStatusFailureTranscriptionRejectedWithError: update_text(_("If at first you don't succeed..."), _("Seems like something went wrong with the dictation session. To try again - just click Select.")); break;
			
			case DictationSessionStatusFailureNoSpeechDetected:	update_text(_("I promise I don't bite!"), _("I didn't hear you say anything! Maybe speak a little louder, or hold your Pebble closer to your mouth.")); break;
			
			case DictationSessionStatusFailureConnectivityError: update_text(_("If a dog barks in the forest..."), _("I can't seem to connect to the dictation service right now. Maybe make sure the Pebble app is running on your phone?")); break;
			
			case DictationSessionStatusFailureDisabled: update_text(_("I don't know THAT trick!"), _("It looks like you have dictation disabled. To enable dictation, please make sure 'Send Usage Logs to Pebble' is enabled in the phone app.")); break;
			
			case DictationSessionStatusFailureInternalError: update_text(_("Urhhmm, I think I might be sick..."), _("Dictation encountered an internal error. You can retry dictation by clicking Select, or restarting the app.")); break;
			
			default: update_text(_("I'm just as confused as you are."), _("An unknown error occurred with dictation. Try restarting the Pebble app on your phone, or your Pebble watch itself.")); break;
		}
	}
	
	if(launch_reason() != APP_LAUNCH_QUICK_LAUNCH) window_stack_push(window, true);
}

void start_dictation(){
	dictation_session_start(session);
}

void init_dictation(){
	session = dictation_session_create(128, dscb, NULL);
	
	dictation_session_enable_confirmation(session, settings_confirm_dictation);
}

void deinit_dictation(){
	dictation_session_destroy(session);
}