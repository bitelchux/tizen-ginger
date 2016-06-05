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

function GingerController(idToJsonMap) {
	var self = this;

	this.setNextStep = function() {
		if (!recipeSelected) return;
		if (currStep < recipe.steps.length - 1) currStep++;
		showStep(recipe.steps[currStep]);
	}

	this.setPrevStep = function() {
		if (!recipeSelected) return;
		if (currStep > 0) currStep--;
		showStep(recipe.steps[currStep]);
	}

	var btnElem = document.getElementById('btn');
	var btnTxtElem = document.getElementById('btn-txt');
	var textContentElem = document.getElementById('content-text');
	var hoursSpan = document.getElementById('hours');
	var minutesSpan = document.getElementById('minutes');
	var secondsSpan = document.getElementById('seconds');
	var recipe;
	var recipeSelected = false;
	var currStep = 0;
	var displayedTimer = undefined;
	for (var key in idToJsonMap) {
		if (idToJsonMap.hasOwnProperty(key)) {
			var recipeElem = document.getElementById(key);
			if (!recipeElem) {
				console.error('No list item to match key: ', key);
				continue;
			}
			recipeElem.addEventListener('click', function(e) {
				startRecipe(idToJsonMap[e.srcElement.id]);
			});
		}
	}
	
	var startRecipe = function(jsonFilename) {
		recipe = new Recipe(jsonFilename, function(recipe) {
			recipeSelected = true;
			document.getElementById('step-content').style.display = "inline";
			document.getElementById('menu-content').style.display = "none";
			showStep(recipe.steps[0]);
		});
	}

	var showStep = function(step) {
		removeEventListeners();
		document.body.style.backgroundImage = "url(images/" + step.getBackground() + ")";
		document.getElementById('overlay').className = 'dark-overlay';
		document.getElementById('timer-text').style.display = 'none';
		btnTxtElem.textContent = step.getCallToActionText();
		textContentElem.style.display = 'inline';
		textContentElem.textContent = step.getStepText();
		var callToActionType = step.getCallToActionType();
		if (callToActionType) {
			btnElem.style.display = 'inline';
			if (callToActionType == "timer") {
				btnElem.addEventListener('click', function() {
					showTimer(step);
				});
			} else if (callToActionType == "showMeHow") {
				btnElem.addEventListener('click', function(e) {
					showGif(step.getGifAssetFilename(), e);
				});
			} else if (callToActionType == "start") {
				btnElem.addEventListener('click', function() {
					self.setNextStep();
				});
			} else if (callToActionType == "smartThing") {
				btnElem.addEventListener('click', function() {
					toggleSmartAppliance();
				});
			}
		} else {
			btnElem.style.display = 'none';
		}
		if (displayedTimer) {
			displayedTimer.setInvisible();
		}
	}

	var showTimer = function(step) {
		removeEventListeners();
		btnElem.style.display = 'none';
		btnTxtElem.textContent = '';
		textContentElem.textContent = '';
		document.getElementById('timer-text').style.display = 'inline';
		var timer = step.getTimer();
		if (!timer.isOn()) {
			timer.startTimer(hoursSpan, minutesSpan, secondsSpan, step.getDuration(), function() {
				timer.setInvisible();
				displayNotification(step, currStep);
			});
		}
		timer.setVisible();
		displayedTimer = timer;
	}

	var showGif = function(image_file, e) {
		e.cancelBubble = true;
		removeEventListeners();
		btnElem.style.display = 'none';		
		btnTxtElem.textContent = '';
		textContentElem.style.display = 'none';
		document.body.style.backgroundImage = "url('images/gifs/" + image_file + "')";
		document.body.addEventListener('click', resumeDirections);	
		document.getElementById('overlay').className = 'no-overlay';
	}

	var toggleSmartAppliance = function() {
		toggleSmartThings();
	}

	var displayNotification = function(timerStep, timerStepNum) {
		var returnStep = currStep;
		currStep = timerStepNum;
		removeEventListeners();
		btnElem.style.display = 'inline';		
		document.getElementById('timer-text').style.display = 'none';
		btnTxtElem.textContent = 'Dismiss';
		btnElem.addEventListener('click', function() {
			showStep(recipe.steps[returnStep]);
		});
		textContentElem.style.display = 'inline';
		textContentElem.textContent = timerStep.getTimerDoneText();
		document.body.style.backgroundImage = "url(images/" + timerStep.getBackground() + ")";
	}

	var resumeDirections = function() {
		removeEventListeners()
		document.getElementById('overlay').className = 'dark-overlay';
		showStep(recipe.steps[currStep]);
	}

	var removeEventListeners = function() {
		var btnElemClone = btnElem.cloneNode(true);
		if (!btnElem.parentNode) return;
		btnElem.parentNode.replaceChild(btnElemClone, btnElem);
		btnElem = document.getElementById('btn');
		btnTxtElem = document.getElementById('btn-txt');
		document.body.removeEventListener('click', resumeDirections);	
	}
}