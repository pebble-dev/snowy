/*
* KiezelPay Integration Library - v2.0 - Copyright Kiezel 2016
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO 
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE 
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT 
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS" 
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, 
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL 
* NECESSARY SERVICING, REPAIR OR CORRECTION.
* 
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN 
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY 
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE 
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, 
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR 
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY 
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

#include <pebble.h>
#include <kiezelpay-core/kiezelpay.h>

/**
  Set to 1 to enable verbose logging, handy for tracking down issues with the kiezelpay integration
  
  Set to 0 before releasing
*/
#define KIEZELPAY_LOG_VERBOSE 0

/**
  When set to 1, you can test the purchasing of your app without having to pay for real.
  When set to 1, trial times will always be 30 seconds (only when time trial is enabled here and on the server)
  When set to 1, periodic status re-checks will happen every 60 seconds (only when enabled)
  
  Test purchases only, set to 0 before releasing or users can get your app for free!
*/
#define KIEZELPAY_TEST_MODE 0

/**
  Set to 1 to remove all code which has to do with the time based trial. This saves memory and code space in case you don't use it.
  You need to manually signal that the trial is over and purchase needs to start by calling kiezelpay_start_purchase();

  Set to 0 to let kiezelpay automatically initiate the purchase as soon as the time-based trial configured on the server has ended.
  In case no time based trial is configured on the server, this will require the user to purchase the app immediately after installing it.
*/
#define KIEZELPAY_DISABLE_TIME_TRIAL 1

/**
  Set to 1 when you want to remove all code that has to do with message display to save memory and code space, in this mode the message display needs to be handled by yourself!
  
  Set to 0 to let the kiezelpay lib show messages itself in case you don't handle them (e.g. purchasing, messages about internet connection issues, ...)
*/
#define KIEZELPAY_DISABLE_MESSAGES 1

/**
  Set to 1 to disable period re-checks of the licensed status on the server. This saves memory and code space.

  RECOMMENDED: Set to 0 to let kiezelpay automatically recheck the licensed state of this app online after it was purchased,
  this prevents users from tampering with the stored license data (e.g. copy it from another licensed device) and makes it more secure.
  The duration between these checks is managed by the KiezelPay server, but will always be 24 hours or longer.
  This check will not lock down the app in case there is no internet available or the server cannot be reached for any other reason, 
  only when the kiezelpay effectively returns the status "unlicensed" will the user be shown the purchase dialog
*/
#define KIEZELPAY_DISABLE_PERIODIC_CHECKS 0


/**
  Default messages shown to the user in different stages of the purchase or when errors occur.
  Only used when the default KiezelPay messages are enabled (#define KIEZELPAY_DISABLE_MESSAGES 0)
  
  You can change the messages to your liking here. Make sure to check if the changed message still fits the display of all different pebble watches.
*/
#define KIEZELPAY_UNKNOWN_ERROR_MSG "An unknown error occurred"
#define KIEZELPAY_BLUETOOTH_UNAVAILABLE_MSG "There is a problem with the connection between your watch and your phone"
#define KIEZELPAY_INTERNET_UNAVAILABLE_MSG "There is a problem with the internet connection of your phone"
/** 
  It is also possible to configure a custom url in your product settings on our website so its shows your personalized purchase page to the customers.
  if you do so, remember to also change the URL below so it matches.
*/
#define KIEZELPAY_CODE_AVAILABLE_MSG "To continue using Snowy please visit kzl.io/snowy and enter this code:"
#define KIEZELPAY_PURCHASE_STARTED_MSG "Please complete the purchase process to unlock Snowy"
#define KIEZELPAY_LICENSED_MSG "Thank you for your purchase!"







/***************************************************/
/* KIEZELPAY GENERATED CODE BELOW - DO NOT MODIFY! */
/***************************************************/

#define KP_GENERATED_MAJOR 2

#define KIEZELPAY_APPID 1668121194


static uint8_t kiezelpay_secret[16] = {22, 230, 212, 72, 59, 104, 63, 217, 148, 8, 8, 237, 139, 81, 122, 233};

#include <kiezelpay-core/kiezelpay-core.h>

static bool kiezelpay_validate_msg(kiezelpay_msg_data *msg) {
	LOG("%s", __func__);
	//before checking the hash, do some sanity checks
	bool valid_format = (msg != NULL && msg->checksum != NULL);

	if (!valid_format) {
		return false;
	}
	//prepare sha-256 context
	SHA256_CTX ctx_msg_check;
	sha256_init(&ctx_msg_check);
	uint32_t int_for_bytes;
	sha256_update(&ctx_msg_check, kiezelpay_secret + 6, 1);
	int_for_bytes = msg->status;
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes, 1);
	int_for_bytes = kiezelpay_get_status_flags();
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 2, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 0, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 3, 1);
	sha256_update(&ctx_msg_check, (uint8_t*)&kiezelpay_msg_random + 0, 1);
	if (msg->status == 0) {          //unlicensed
	int_for_bytes = msg->purchase_code;
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 2, 1);
	}
	sha256_update(&ctx_msg_check, kiezelpay_secret + 10, 1);
	if (msg->status == 0) {          //unlicensed
	int_for_bytes = msg->purchase_code;
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 1, 1);
	}
	#if KIEZELPAY_DISABLE_TIME_TRIAL == 0
	if (msg->status == 1) {      //trial
	sha256_update(&ctx_msg_check, (uint8_t*)&(msg->trial_duration) + 1, 1);
	}
	#endif
	int_for_bytes = kiezelpay_get_status_flags();
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 3, 1);
	if (msg->status == 1 || msg->status == 2) {      //trial or licensed
	sha256_update(&ctx_msg_check, (uint8_t*)&(msg->validity_period), 1);
	}
	sha256_update(&ctx_msg_check, (uint8_t*)&kiezelpay_msg_random + 1, 1);
	#if KIEZELPAY_DISABLE_TIME_TRIAL == 0
	if (msg->status == 1) {      //trial
	sha256_update(&ctx_msg_check, (uint8_t*)&(msg->trial_duration) + 3, 1);
	}
	#endif
	sha256_update(&ctx_msg_check, kiezelpay_secret + 2, 1);
	sha256_update(&ctx_msg_check, (uint8_t*)&(kiezelpay_current_state.device_id) + 1, 1);
	#if KIEZELPAY_DISABLE_TIME_TRIAL == 0
	if (msg->status == 1) {      //trial
	sha256_update(&ctx_msg_check, (uint8_t*)&(msg->trial_duration) + 2, 1);
	}
	#endif
	sha256_update(&ctx_msg_check, kiezelpay_secret + 8, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 13, 1);
	int_for_bytes = kiezelpay_get_status_flags();
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 1, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 12, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 11, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 14, 1);
	#if KIEZELPAY_DISABLE_TIME_TRIAL == 0
	if (msg->status == 1) {      //trial
	sha256_update(&ctx_msg_check, (uint8_t*)&(msg->trial_duration) + 0, 1);
	}
	#endif
	if (msg->status == 0) {          //unlicensed
	int_for_bytes = msg->purchase_code;
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 0, 1);
	}
	sha256_update(&ctx_msg_check, kiezelpay_secret + 1, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 9, 1);
	sha256_update(&ctx_msg_check, (uint8_t*)&(kiezelpay_current_state.device_id) + 3, 1);
	int_for_bytes = kiezelpay_get_status_flags();
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 0, 1);
	if (msg->status == 0) {          //unlicensed
	int_for_bytes = msg->purchase_code;
	sha256_update(&ctx_msg_check, (uint8_t*)&int_for_bytes + 3, 1);
	}
	sha256_update(&ctx_msg_check, kiezelpay_secret + 15, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 5, 1);
	sha256_update(&ctx_msg_check, (uint8_t*)&(kiezelpay_current_state.device_id) + 2, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 4, 1);
	sha256_update(&ctx_msg_check, kiezelpay_secret + 7, 1);
	sha256_update(&ctx_msg_check, (uint8_t*)&(kiezelpay_current_state.device_id) + 0, 1);
	//calculate sha-256 hash
	uint8_t hash[SHA256_BLOCK_SIZE];
	sha256_final(&ctx_msg_check, hash);

	//compare this hash with the checksum returned by the server
	for (uint32_t i = 0; i < SHA256_BLOCK_SIZE; i++) {
		if (msg->checksum[i] != hash[i]) return false;
	}
	return true;
}

void kiezelpay_init() {
  kiezelpay_internal_init(KIEZELPAY_APPID, kiezelpay_secret, kiezelpay_validate_msg);
}