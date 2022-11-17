#include <pebble.h>
#include <pebble-localize/pebble-localize.h>
#include "health.h"
#include "messaging.h"
#include "ui.h"
#include "main.h"
#include "lang.h"

HealthValue num_steps, num_meters, num_sleep, num_deep_sleep, num_hr;
float num_meters_fractional;
char healthTitle[64], healthBody[128];

HealthMinuteData *data;

int goal = 0;

char stepTitle[16];
char sleepBody[128];

extern Window *window;

extern bool is_vibrating;

void show_sleep(){
	HealthServiceAccessibilityMask sleep = health_service_metric_accessible(HealthMetricSleepSeconds, time_start_of_today(), time(NULL));
	if(sleep & HealthServiceAccessibilityMaskAvailable){
		num_sleep = health_service_sum_today(HealthMetricSleepSeconds);//, time_start_of_today() - 12*60*60, time_start_of_today() + 12*60*60);
			
		if(num_sleep == 0){
			update_text(_("Well, your Pebble slept well!"), _("I don't see any sleep data from last night - you'll need to wear your Pebble for it to record your sleep!"));
			return;
		}
			
		HealthServiceAccessibilityMask deep_sleep = health_service_metric_accessible(HealthMetricSleepRestfulSeconds, time_start_of_today(), time(NULL));
		if(deep_sleep & HealthServiceAccessibilityMaskAvailable){
			//Sleep + Deep Sleep
			num_deep_sleep = health_service_sum_today(HealthMetricSleepRestfulSeconds);//, time_start_of_today() - 12*60*60, time_start_of_today() + 12*60*60);
				
			if(num_deep_sleep != 0) snprintf(sleepBody, sizeof(sleepBody), _("...for %d hours and %d minutes, %d hours and %d minutes of which were in deep sleep."), (int)(num_sleep/3600), (int)(num_sleep%3600)/60, (int)(num_deep_sleep/3600), (int)(num_deep_sleep%3600)/60);
			else snprintf(sleepBody, sizeof(sleepBody), _("...for %d hours and %d minutes."), (int)(num_sleep/3600), (int)(num_sleep%3600)/60);
		}
		else{
			//Sleep
			snprintf(sleepBody, sizeof(sleepBody), _("...for %d hours and %d minutes."), (int)(num_sleep/3600), (int)(num_sleep%3600)/60);
		}
		update_text(_("Last night, you slept..."), sleepBody);
	}
	else{
		switch(sleep){
			case HealthServiceAccessibilityMaskNotAvailable:
				strncpy(healthTitle, _("Data Not Available"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems there is no Health data available from last night."), sizeof(healthBody));				
			break;
			case HealthServiceAccessibilityMaskNotSupported:
				strncpy(healthTitle, _("Data Not Supported"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems that Health data is unsupported on this device."), sizeof(healthBody));
			break;
			case HealthServiceAccessibilityMaskNoPermission:
				strncpy(healthTitle, _("Health Disabled"), sizeof(healthTitle));
				strncpy(healthBody, _("To give me permission to check Pebble Health for you, please grant me permission in the Pebble Time app."), sizeof(healthBody));
			break;
			default:
				strncpy(healthTitle, _("Unknown Error"), sizeof(healthTitle));
				strncpy(healthBody, _("I should have access to your Pebble Health data, but something went wrong!"), sizeof(healthBody));		
				error = true;
			break;
		}
		update_text(healthTitle, healthBody);
	}
}

void show_steps(){
	HealthServiceAccessibilityMask steps = health_service_metric_accessible(HealthMetricStepCount, time_start_of_today(), time(NULL));
	if(steps & HealthServiceAccessibilityMaskAvailable){
			
		num_steps = health_service_sum_today(HealthMetricStepCount);
			
		if(num_steps >= 1000) snprintf(healthTitle, sizeof(healthTitle), _("%d,%03d Steps"), (int)(num_steps/1000), (int)(num_steps%1000));
		else snprintf(healthTitle, sizeof(healthTitle), _("%d Steps"), (int)num_steps);
			
		if(num_steps == 0){
			strncpy(healthBody, _("Every day is a great day to be active! How far will you go today?"), sizeof(healthBody));
		}
		else if(num_steps >= 10000){
			strncpy(healthBody, _("Wow, that's a lot of steps! Keep going strong!!!"), sizeof(healthBody));
		}
		else if(num_steps >= 8000){
			strncpy(healthBody, _("Awesome job, keep it up!"), sizeof(healthBody));
		}
		else if(num_steps >= 6000){
			strncpy(healthBody, _("Great work! How much farther can you go tomorrow?"), sizeof(healthBody));
		}
		else if(num_steps >= 4000){
			strncpy(healthBody, _("Keep it up! You're doing great."), sizeof(healthBody));
		}
		else if(num_steps >= 2000){
			strncpy(healthBody, _("Start strong, and never give up!"), sizeof(healthBody));
		}
		else{
			strncpy(healthBody, _("Good work, keep going!"), sizeof(healthBody));	
		}
		update_text(healthTitle, healthBody);
	}
	else{
		switch(steps){
			case HealthServiceAccessibilityMaskNotAvailable:
				strncpy(healthTitle, _("Data Not Available"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems there is no Health data available for today."), sizeof(healthBody));				
			break;
			case HealthServiceAccessibilityMaskNotSupported:
				strncpy(healthTitle, _("Data Not Supported"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems that Health data is unsupported on this device."), sizeof(healthBody));
				break;
			case HealthServiceAccessibilityMaskNoPermission:
				strncpy(healthTitle, _("Health Disabled"), sizeof(healthTitle));
				strncpy(healthBody, _("To give me permission to check Pebble Health for you, please grant me permission in the Pebble Time app."), sizeof(healthBody));
			break;
			default:
				strncpy(healthTitle, _("Unknown Error"), sizeof(healthTitle));
				strncpy(healthBody, _("I should have access to your Pebble Health data, but something went wrong!"), sizeof(healthBody));		
				error = true;
			break;
		}
		update_text(healthTitle, healthBody);
	}
}

void show_distance(){
	HealthServiceAccessibilityMask distance = health_service_any_activity_accessible(HealthMetricWalkedDistanceMeters, time_start_of_today(), time(NULL));
	if(distance & HealthServiceAccessibilityMaskAvailable){
		num_meters = health_service_sum_today(HealthMetricWalkedDistanceMeters);
		
		bool is_imperial = health_service_get_measurement_system_for_display(HealthMetricWalkedDistanceMeters) == MeasurementSystemImperial;
		
		if(is_imperial){
			num_meters_fractional = (float)(num_meters * 0.000621371f);
		}
		else{
			num_meters_fractional = (float)(num_meters * 0.001f);
		}
		
		if( (int)(num_meters_fractional * 100) % 10 >= 5 ) num_meters_fractional += 0.05f;
			
		snprintf(healthTitle, sizeof(healthTitle), _("%d.%01d %s"), (int)(num_meters_fractional), (int)(num_meters_fractional*10)%10,  is_imperial ? _("Miles") : _("Kilometers"));
		if(num_meters == 0){
			strncpy(healthBody, _("Every day is a great day to be active! How far will you go today?"), sizeof(healthBody));
		}
		else if( (!is_imperial && num_meters_fractional >= 6) || (is_imperial && num_meters_fractional >= 4) ){
			strncpy(healthBody, _("Wow, that's pretty far! Keep going strong!!!"), sizeof(healthBody));
		}
		else if( (!is_imperial && num_meters_fractional >= 5) || (is_imperial && num_meters_fractional >= 3) ){
			strncpy(healthBody, _("Awesome job, keep it up!"), sizeof(healthBody));
		}
		else if( (!is_imperial && num_meters_fractional >= 3) || (is_imperial && num_meters_fractional >= 2) ){
			strncpy(healthBody, _("Great work! How much farther can you go tomorrow?"), sizeof(healthBody));
		}
		else if( (!is_imperial && num_meters_fractional >= 2) || (is_imperial && num_meters_fractional >= 1) ){
			strncpy(healthBody, _("Keep it up! You're doing great."), sizeof(healthBody));
		}
		else if( (!is_imperial && num_meters_fractional >= 1) || (is_imperial && num_meters_fractional >= 0.5f) ){
			strncpy(healthBody, _("Start strong, and never give up!"), sizeof(healthBody));
		}
		else{
			strncpy(healthBody, _("Good work, keep going!"), sizeof(healthBody));	
		}
		update_text(healthTitle, healthBody);
	}
	else{
		switch(distance){
			case HealthServiceAccessibilityMaskNotAvailable:
				strncpy(healthTitle, _("Data Not Available"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems there is no Health data available for today."), sizeof(healthBody));				
			break;
			case HealthServiceAccessibilityMaskNotSupported:
				strncpy(healthTitle, _("Data Not Supported"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems that Health data is unsupported on this device."), sizeof(healthBody));
			break;
			case HealthServiceAccessibilityMaskNoPermission:
				strncpy(healthTitle, _("Health Disabled"), sizeof(healthTitle));
				strncpy(healthBody, _("To give me permission to check Pebble Health for you, please grant me permission in the Pebble Time app."), sizeof(healthBody));
			break;
			default:
				strncpy(healthTitle, _("Unknown Error"), sizeof(healthTitle));
				strncpy(healthBody, _("I should have access to your Pebble Health data, but something went wrong!"), sizeof(healthBody));		
				error = true;
			break;
		}
		update_text(healthTitle, healthBody);
	}	
}
/*
void show_heart_rate(){
	HealthServiceAccessibilityMask heart = health_service_metric_accessible(HealthMetricHeartRateBPM, time_start_of_today(), time(NULL));
	if(heart & HealthServiceAccessibilityMaskAvailable){
	  
		num_hr = health_service_peek_current_value(HealthMetricHeartRateBPM);
			
		int data_points = health_service_get_minute_history(data, 12*60*60, time_start_of_today(), time(NULL));
      
    int max_bpm = 0, sum_bpm = 0, avg_bpm = 0, valid_data_points = 0;
      
    for(int i = 0; i < data_points; i++){
    	if(!data[i].is_invalid){
				if(data[i].heart_rate_bpm > max_bpm) max_bpm = data[i].heart_rate_bpm;
				sum_bpm += data[i].heart_rate_bpm;
				valid_data_points++;
			}
		}
      
		avg_bpm = sum_bpm / valid_data_points;
      
		snprintf(healthBody, sizeof(healthBody), "Current: %d BPM\n\nAverage: %d BPM\nPeak: %d BPM", (int)num_hr, avg_bpm, max_bpm);
      
		update_text("Heart Rate", healthBody);
	}
	else{
		switch(heart){
			case HealthServiceAccessibilityMaskNotAvailable:
				strncpy(healthTitle, _("Data Not Available"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems there is no Health data available for today."), sizeof(healthBody));				
			break;
			case HealthServiceAccessibilityMaskNotSupported:
				strncpy(healthTitle, _("Data Not Supported"), sizeof(healthTitle));
				strncpy(healthBody, _("Sorry, it seems that Health data is unsupported on this device."), sizeof(healthBody));
			break;
			case HealthServiceAccessibilityMaskNoPermission:
				strncpy(healthTitle, _("Health Disabled"), sizeof(healthTitle));
				strncpy(healthBody, _("To give me permission to check Pebble Health for you, please grant me permission in the Pebble Time app."), sizeof(healthBody));
			break;
			default:
				strncpy(healthTitle, _("Unknown Error"), sizeof(healthTitle));
				strncpy(healthBody, _("I should have access to your Pebble Health data, but something went wrong!"), sizeof(healthBody));		
				error = true;
			break;
		}
		update_text(healthTitle, healthBody);
	}
}
*/
void show_step_goal(){
	if(goal != 0){			
		if(goal < 1000) snprintf(stepTitle, sizeof(stepTitle), _("%d Steps"), goal);
		else snprintf(stepTitle, sizeof(stepTitle), _("%d,%03d Steps"), (int)(goal/1000), (int)(goal%1000));
			
		update_text(stepTitle, _("That's a great goal! I know you can do it!!!"));
	}
	else{
		//No Step Goal
		update_text(_("No Step Goal"), _("To add a Step Goal, please use my Settings page! Challenge yourself to reach your limits! You can do it!!!"));
	}	
}

void health_handler(){
	if(persist_exists(MESSAGE_KEY_HealthNotified) && persist_read_bool(MESSAGE_KEY_HealthNotified)) return;
	
	persist_write_bool(MESSAGE_KEY_HealthStepGoalReached, true);
	
	if(goal < 1000) snprintf(stepTitle, sizeof(stepTitle), _("%d Steps"), goal);
	else snprintf(stepTitle, sizeof(stepTitle), _("%d,%03d Steps"), (int)(goal/1000), (int)(goal%1000));
	
	error = false;
	update_text(stepTitle, _("Congratulations! You reached your step goal for today!!!"));
		
	if(!window_stack_contains_window(window)) window_stack_push(window, true);
					
	is_vibrating = true;
	//app_timer_register(3000, incoming_message, NULL);
		
	vibes_long_pulse();
					
	persist_write_bool(MESSAGE_KEY_HealthNotified, true);
}

void set_goal(int new_goal){
	goal = new_goal;
	persist_write_int(MESSAGE_KEY_StepGoal, goal);
}

void init_health(){
	goal = persist_exists(MESSAGE_KEY_StepGoal) ? persist_read_int(MESSAGE_KEY_StepGoal) : 0;
}