#pragma once

void send_request(const char *transcript);

void inbox(DictionaryIterator *iter, void *context);

void timeout_check();

void init_messaging();
void deinit_messaging();