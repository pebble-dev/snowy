#pragma once

#define SILENT 0
#define VIBRATE 1
#define LOUD 2

void init_dash_api();
void get_battery_via_dash();
void set_wifi_via_dash(bool on);
void set_ringer_via_dash(int ring);
void set_hotspot_via_dash(bool on);
void get_sms_count_via_dash();
void get_calendar_via_dash();