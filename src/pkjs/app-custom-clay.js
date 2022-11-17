module.exports = function(e){
	var clayConfig = this;
	
	clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function(){
		var widget = clayConfig.getItemById('widget');
		
		var countdownInput = clayConfig.getItemById('countdownInput');
		var stockInput = clayConfig.getItemById('stockInput');
		var timezoneInput = clayConfig.getItemById('timezoneInput');
		
		if(widget.get() === 3){ //Countdown
			stockInput.hide();
			timezoneInput.hide();
		}
		else if(widget.get() === 13){ //Stock
			countdownInput.hide();
			timezoneInput.hide();
		}
		else if(widget.get() === 15){ //Timezone
			countdownInput.hide();
			stockInput.hide();
		}
		else{
			countdownInput.hide();
			stockInput.hide();
			timezoneInput.hide();
		}
		
		widget.on('change', function(){
			if(widget.get() === 3){
				countdownInput.show();
				stockInput.hide();
				timezoneInput.hide();
			}
			else if(widget.get() === 13){
				stockInput.show();
				countdownInput.hide();
				timezoneInput.hide();
			}
			else if(widget.get() === 15){
				timezoneInput.show();
				countdownInput.hide();
				stockInput.hide();
			}
			else{
				countdownInput.hide();
				stockInput.hide();
				timezoneInput.hide();
			}
		});
		
		var inactivityMonitor = clayConfig.getItemById('inactivityMonitor');
		
		var inactivityStart = clayConfig.getItemById('inactivityStart');
		var inactivityEnd = clayConfig.getItemById('inactivityEnd');
		
		if(!inactivityMonitor.get()){
			inactivityStart.hide();
			inactivityEnd.hide();
		}
		
		inactivityMonitor.on('change', function(){
			if(!inactivityMonitor.get()){
				inactivityStart.hide();
				inactivityEnd.hide();
			}
			else{
				inactivityStart.show();
				inactivityEnd.show();
			}
		});
		
		var master = clayConfig.getItemById('master');
		
		var masterEmail = clayConfig.getItemById('masterEmail');
		var masterPIN = clayConfig.getItemById('masterPIN');
		var masterButton = clayConfig.getItemById('masterButton');
		
		var ifttt = clayConfig.getItemById('ifttt');
		var iftttPlus = clayConfig.getItemById('iftttPlus');
		var wolfram = clayConfig.getItemById('wolfram');
		var weather = clayConfig.getItemById('weather');
		var habits = clayConfig.getItemById('habits');
		var travel = clayConfig.getItemById('travel');
		
		if(master.get()){
			ifttt.hide();
			iftttPlus.hide();
			wolfram.hide();
			weather.hide();
			habits.hide();
			travel.hide();
		}
		else{
			masterEmail.hide();
			masterPIN.hide();
			masterButton.hide();
		}
		
		master.on('change', function(){
			if(master.get()){
				ifttt.hide();
				iftttPlus.hide();
				wolfram.hide();
				weather.hide();
				habits.hide();
				travel.hide();
				
				masterEmail.show();
				masterPIN.show();
				masterButton.show();
			}
			else{
				ifttt.show();
				iftttPlus.show();
				wolfram.show();
				weather.show();
				habits.show();
				travel.show();
				
				masterEmail.hide();
				masterPIN.hide();
				masterButton.hide();
			}
		});
	
		masterButton.on('click', function(){
			if(masterEmail.get() === ""){
				alert('Missing: email address');
				return;
			}
			if(masterPIN.get() === ""){
				alert('Missing: PIN');
				return;
			}
			
			var xhr = new XMLHttpRequest();
			var url = "https://pmkey.xyz/search/?email=" + masterEmail.get() + "&pin=" + masterPIN.get();
			xhr.open("GET", url, true);
			
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4 && xhr.status === 200){
					var result = JSON.parse(xhr.responseText);
					
					if(result.success){
						ifttt.set(result.keys.web.ifttt);
						wolfram.set(result.keys.web.wolfram);
						weather.set(result.keys.weather.wu);
						habits.set(result.keys.pebble.habits);
						travel.set(result.keys.pebble.travel);
						
						alert('Success!');
					}
					else{
						alert('Error: ' + result.error);
					}
				}
			};
			
			xhr.send();
		});
	});
};