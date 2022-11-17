#pragma once

char widget_date_1[8];
char widget_date_2[16];
char widget_date_3[16];
char widget_date_4[16];
char widget_date_5[16];
char widget_steps[8];
char widget_dist[16];
char widget_hr[16];
char widget_alt_tz[16];
char widget_battery[8];

extern bool is_directions;

void home_config(void *context);
void config(void *context);