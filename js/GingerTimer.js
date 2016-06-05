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

function GingerTimer() {
    var visible = false;
    var hoursElem;
    var minutesElem;
    var secondsElem;
    var milliseconds;
    var callback;
    var isOn = false;
    var endtime;
    var interval;

    this.startTimer = function(hr, min, sec, milli, clbck){
        hoursElem = hr;
        minutesElem = min;
        secondsElem = sec;
        milliseconds = milli;
        callback = clbck;
        isOn = true;
        var now = new Date();
        endtime = new Date(now.getTime() + milliseconds);
        interval = setInterval(updateClock, 1000);
        updateClock();
    }

    this.isOn = function() {
        return isOn;
    }

    this.setVisible = function() {
        visible = true;
        updateClock();
    }

    this.setInvisible = function() {
        visible = false;
    }

    function updateClock() {
        var totalTime = Date.parse(endtime) - Date.parse(new Date());
        if (visible) {
            var seconds = Math.floor((totalTime/1000) % 60);
            secondsElem.innerHTML = ('0' + seconds).slice(-2);
            var minutes = Math.floor((totalTime/(1000*60)) % 60);
            minutesElem.innerHTML = ('0' + minutes).slice(-2);
            var hours = Math.floor(totalTime/(1000*60*60));
            hoursElem.innerHTML = hours;
        }
        if(totalTime <= 0){
            clearInterval(interval);
            isOn = false;
            callback();
        }
    }
}
