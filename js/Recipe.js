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

function Recipe(jsonFilename, callback) {
    var file = "json/" + jsonFilename;
    var self = this;
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.onload = function(e) {
      var requestStr = this.responseText;
      try {
        var data = JSON.parse(requestStr);
      } catch(err) {
        console.log(err);
        console.log("Unable to read recipe: " + jsonFilename);
      }
      self.init(data);
    }
    request.send();
 
    this.init = function(data) {
      var filePrefix = data.id + "/";
      this.steps = [];
      var firstStepBgImageFilename = filePrefix + "step0.png";
      var startAction = {
        'type': 'start'
      }
      var firstStep = new Step(firstStepBgImageFilename, data.title, startAction);
      this.steps.push(firstStep);
      for (var i = 0; i < data.steps.length; i++) {
        var stepData = data.steps[i];
        var callToAction = undefined;
        if (stepData.callToAction) {
          callToAction = {
            'type': stepData.callToAction,
            'buttonText': stepData.buttonText,
            'gifAssetFilename': stepData.gifAssetFilename,
            'duration': stepData.duration,
            'timerDoneText': stepData.timerDoneText
          };
        }
        var imageNumber = i + 1;
        var bgImageFilename = filePrefix + "step" + imageNumber + ".png";
        var step = new Step(bgImageFilename, stepData.text, callToAction);
        this.steps.push(step);
      }
      var lastStep = new Step(firstStepBgImageFilename, 'bon apétit', undefined);
      this.steps.push(lastStep);
      callback(this);
    }
}

