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

var toggleSmartThings = function() {
	$.ajax({
	    type: 'GET',
	    url: 'https://graph.api.smartthings.com/api/smartapps/installations/dfd8b019-a7e7-4f34-82bb-2fbbebe73367/switches/toggle',
	    dataType: 'json',
	    //whatever you need
	    beforeSend: function (xhr) {
	        xhr.setRequestHeader('Authorization', 'Bearer 0a712545-29e9-4221-bd7a-43c69fc00923');
	    },
	    success: function () {console.log('SmartThings communication successful!')}
	});
};