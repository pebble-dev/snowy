#include <pebble_worker.h>

#define MESSAGE_KEY_WorkerLaunchReason 10058
#define MESSAGE_KEY_StepGoal 10018
#define MESSAGE_KEY_HandsFree 10010
#define MESSAGE_KEY_InactivityMonitor 10020
#define MESSAGE_KEY_InactivityStart 10034
#define MESSAGE_KEY_InactivityEnd 10035
#define MESSAGE_KEY_StepGoalNotified 10059
#define MESSAGE_KEY_InactivityLastAlert 10060

int goal;

int start_hour, start_min, end_hour, end_min;

HealthMinuteData *minute_data;
const uint32_t max_records = 60;

int average_steps = 0;

int sum_steps = 0, num_valid = 1;

void tap_handler(AccelAxisType axis, int32_t direction){
	if(persist_exists(MESSAGE_KEY_HandsFree) && persist_read_bool(MESSAGE_KEY_HandsFree) && bluetooth_connection_service_peek()){
		persist_write_int(MESSAGE_KEY_WorkerLaunchReason, 0);
		worker_launch_app();
	}
}

void time_handle_tick(struct tm *tick_time, TimeUnits units){
	if(persist_exists(MESSAGE_KEY_StepGoal) && persist_read_int(MESSAGE_KEY_StepGoal) > 0){
		HealthServiceAccessibilityMask steps = health_service_metric_accessible(HealthMetricStepCount, time_start_of_today(), time(NULL));
		if(steps & HealthServiceAccessibilityMaskAvailable){
			int num_steps = health_service_sum_today(HealthMetricStepCount);
			if(num_steps > goal){
				if(!persist_exists(MESSAGE_KEY_StepGoalNotified) || !persist_read_bool(MESSAGE_KEY_StepGoalNotified)){
					persist_write_int(MESSAGE_KEY_WorkerLaunchReason, 1);
					persist_write_bool(MESSAGE_KEY_StepGoalNotified, true);
					worker_launch_app();
					return;
				}
			}
			else{
				persist_write_bool(MESSAGE_KEY_StepGoalNotified, false);
			}
		}
	}

	if(persist_exists(MESSAGE_KEY_InactivityMonitor) && persist_read_bool(MESSAGE_KEY_InactivityMonitor)){
		if( (tick_time->tm_hour > start_hour) || (tick_time->tm_hour = start_hour && tick_time->tm_min >= start_min) ){
			if( (tick_time->tm_hour < end_hour) || (tick_time->tm_hour = end_hour && tick_time->tm_min < end_min) ){
				if(!persist_exists(MESSAGE_KEY_InactivityLastAlert) || persist_read_int(MESSAGE_KEY_InactivityLastAlert)+(60*60) <= time(NULL)){
				
					time_t end = time(NULL);
					time_t start = end - SECONDS_PER_HOUR;
					
					uint32_t num_records = health_service_get_minute_history(minute_data, max_records, &start, &end);
					
					sum_steps = 0;
					num_valid = 1;
					
					for(uint32_t i = 0; i < num_records; i++){
						sum_steps += minute_data[i].steps;
						num_valid++;
					}
					
					if(num_valid > 1 ) num_valid--;
					average_steps = sum_steps / num_valid;
					
					if(average_steps < 8){
						persist_write_int(MESSAGE_KEY_WorkerLaunchReason, 2);
						persist_write_int(MESSAGE_KEY_InactivityLastAlert, time(NULL));
						worker_launch_app();
						return;
					}
				}
			}	
		}
	}
}

void worker_init(){	
	accel_tap_service_subscribe(tap_handler);

	goal = persist_exists(MESSAGE_KEY_StepGoal) ? persist_read_int(MESSAGE_KEY_StepGoal) : 0; 
		
	start_hour = persist_exists(MESSAGE_KEY_InactivityStart) ? (persist_read_int(MESSAGE_KEY_InactivityStart)/100) + 1 : 0;
	start_min = persist_exists(MESSAGE_KEY_InactivityStart) ? persist_read_int(MESSAGE_KEY_InactivityStart)%100 : 0;
	
	end_hour = persist_exists(MESSAGE_KEY_InactivityEnd) ? persist_read_int(MESSAGE_KEY_InactivityEnd)/100 : 0;
	end_min = persist_exists(MESSAGE_KEY_InactivityEnd) ? persist_read_int(MESSAGE_KEY_InactivityEnd)%100 : 0;
	
	time_t now = time(NULL);
	struct tm *ltime = localtime(&now);
	time_handle_tick(ltime, MINUTE_UNIT);
	
	tick_timer_service_subscribe(MINUTE_UNIT, time_handle_tick);
}

void worker_deinit(){
	accel_tap_service_unsubscribe();
	tick_timer_service_unsubscribe();
}

int main(void){
	worker_init();
	worker_event_loop();
	worker_deinit();
}