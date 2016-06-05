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

function Step(filename, text, action) {
  var bgImageFilename = filename;
  var stepText = text;
  var callToAction = action;
  var callToActionType = undefined;
  if (callToAction) {
    callToActionType = callToAction.type;
  }
  var buttonText = undefined;
  if (callToAction) {
    buttonText = callToAction.buttonText;
  }
  var gifAssetFilename = undefined;
  if (callToAction) {
    gifAssetFilename = callToAction.gifAssetFilename;
  }
  var timerDoneText = undefined;
  if (callToAction) {
    timerDoneText = callToAction.timerDoneText;
  }
  // Duration of timer in milliseconds
  var duration = undefined;
  if (callToActionType == "timer") {
    var durStr = callToAction.duration;
    var endHours = durStr.indexOf(":");
    var hourStr = durStr.substring(0, endHours);
    var hours = parseInt(hourStr);
    duration = hours * 60 * 60 * 1000;
    durStr = durStr.substring(endHours + 1);
    var endMins = durStr.indexOf(":");
    var minStr = durStr.substring(0, endMins);
    var mins = parseInt(minStr);
    duration += mins * 60 * 1000;
    durStr = durStr.substring(endMins + 1);
    var secStr = durStr;
    var secs = parseInt(secStr);
    duration += secs * 1000;
  }
  var timer = undefined;
  if (callToActionType == "timer") {
    timer = new GingerTimer();
  }

  this.getBackground = function() {
    return bgImageFilename;
  }

  this.getStepText = function() {
    return stepText;
  }

  this.hasCallToAction = function() {
    return callToAction != undefined;
  };

  this.getButtonText = function() {
    return buttonText;
  }

  this.getGifAssetFilename = function() {
    return gifAssetFilename;
  }

  this.getCallToActionType = function() {
    return callToActionType;
  }

  this.getTimerDoneText = function() {
    return timerDoneText;
  }

  this.getDuration = function() {
    return duration;
  }

  this.getTimer = function() {
    return timer;
  }

  this.getCallToActionText = function() {
    if (callToAction) {
      if (callToAction.type == "timer") {
        if (timer.isOn()) {
          return "View Timer";
        } else {
          return "Start Timer";
        }
      } else if (callToAction.type == "showMeHow") {
        return "Show Me How";
      } else if (callToAction.type == "start") {
        return "Get Cookin'";
      } else if (callToAction.type == "smartThing") {
        return buttonText;
      }
    }
    return "";
  }
}

