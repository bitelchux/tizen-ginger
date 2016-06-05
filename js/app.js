/*
Copyright 2016 Kyros (Jessie Alvarez, Varun Gupta, Nadav Hollander, Whitney LaRow, Vijay Singh)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
'use strict';

window.onload = function() {
	var gingerController = new GingerController({
		'spinach_balls': 'spinach_balls.json',
		'chicken_lettuce_wraps': 'chicken_lettuce_wraps.json',
		'mushroom_pork_chops': 'mushroom_pork_chops.json',
		'grilled_chicken_tikka': 'grilled_chicken_tikka.json'
	});

	document.addEventListener('tizenhwkey', function(event) {
		if (event.keyName === "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {}
		}
	});

	// Add bezzel detection
	document.addEventListener("rotarydetent", function(event) {
		if (event.detail.direction === "CW") { 
			gingerController.setNextStep();
		} else { 
			gingerController.setPrevStep();
		}
	}, false);

	$(function(){
		// Bind the swipeleftHandler callback function to the swipe event on div.box
		$(window).on("swipeleft", swipeleftHandler);
		$(window).on("swiperight", swiperightHandler);
		// Callback function references the event target and adds the 'swipeleft' class to it
		function swipeleftHandler(event) {
			gingerController.setNextStep();
		}
		// Callback function references the event target and adds the 'swiperight' class to it
		function swiperightHandler(event) {
			gingerController.setPrevStep();
		}
	});

	// For web browser testing
	document.onkeydown = function(e) {
		e = e || window.event;
		if (e.keyCode == '37') {
			gingerController.setPrevStep();
		} else if (e.keyCode == '39') {
			gingerController.setNextStep();
		}
	}
};

