/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau */
/*jshint unused: vars*/

(function() {
    /**
    * Event handler for tizenhwkey
    * Terminates the 'alarm' application when the tizenhwkey event triggered and triggered key was a back key.
    * @param {Object} event - tizenhwkey event object
    */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            var page = document.getElementsByClassName('ui-page-active')[0],
                pageid;

            pageid = page ? page.id : "";

            if (pageid === "main-page") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
            } else {
                tau.changePage("#main-page");
            }
        }
    }

    /**
    * Click event handler for 'add-alarm-button'
    * Change as 'alarm-set-page' when the 'add-alarm-button' is clicked.
     */
    function clickAddAlarmButtonHandler() {
        tau.changePage("#alarm-set-page");
    }
    
    function clickAddTimeHandler(){
    	var time=document.querySelector("#inputalarm")
    	tau.changePage("#main-page");
    	alert("New alarm"+time.value);
    	newDataAlarm(time.value);
        function newDataAlarm(data){
        	var o=document.createElement('li');
        	var la=document.createElement('label');
        	var q=document.createElement('div');
        	var sp=document.createElement('span');
        	var ch=document.createElement('div');
        	var inp=document.createElement('input');
        	var qew=document.createElement('div');
        	o.class="li-has-multiline li-has-toggle";
        	q.class="alarm-list ";
        	ch.class="ui-toggleswitch"
        	sp.class="time";
        	inp.class="ui-switch-input";
        	qew.class="ui-switch-button";
        	inp.type="checkbox";
        	sp.innerHTML=data;
        	listq.appendChild(o);
        	o.appendChild(la);
        	la.appendChild(q);
        	q.appendChild(sp);
        	la.appendChild(ch);
        	ch.appendChild(inp);
        	ch.appendChild(qew);
        }
        var at = new Date();
		at.setHours(time.value.substr(0,2));
		var q=Number(time.value.split(":")[0]);
		var w=Number(time.value.split(":")[1]);
        var alarm = new tizen.AlarmAbsolute(new Date(2017, 6, 21, q, w));
        var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
        tizen.alarm.add(alarm, tizen.application.getCurrentApplication().appInfo.id, appControl);
        console.log("Alarm added with id: " + alarm.id);
    }

    /**
     *                         <div class="alarm-list ">
                                <span class="time">7:45</span>    var at = new Date();
                                									at.setHours(time.value);
                                									at.setMins();
                        </div>
                        <div class="ui-toggleswitch">
                            <input type="checkbox" class="ui-switch-input">
                            <div class="ui-switch-button"></div>
                        </div>
    * Click event handler for 'repeat' button in alarm-set-page
    * State for alarm on / off is toggled when 'repeat' button is clicked.
    * @param {Object} event - click event object
    */
    function toggleRepeatButtonHandler(event) {
        if (event.target.getAttribute("data-status") === "0") {
            event.target.setAttribute("data-status", "1");
            event.target.style.backgroundColor = "rgba(18,180,255,100)";
            event.target.style.backgroundImage = "none";
        } else {
            event.target.setAttribute("data-status", "0");
            event.target.style.backgroundColor="transparent";
            event.target.style.backgroundImage = "url('./image/alarm_repeat_bg.png')";
        }
    }

    /**
    * Initiate function for binding event listener
    * If you execute 'alarm' application, this function will be called at first.
     */
    function init() {
        var addAlarmButton = document.querySelector("#add-alarm-button"),
            i,
            repeatToggle,
            addTimeButton = document.querySelector("#alarm-set-page-footer-button");

        window.addEventListener("tizenhwkey", keyEventHandler);

        addAlarmButton.addEventListener("click", clickAddAlarmButtonHandler);
        addTimeButton.addEventListener("click", clickAddTimeHandler);

        // Bind event for toggling repeat button in 'alarm-set-page'
        // There are 7 toggle buttons for Monday, Tuesday, Wednesday,Thursday, Friday, and Saturday.
        for (i = 1; i <= 7 ; i++) {
            repeatToggle = document.querySelector("#repeat" + i);
            repeatToggle.addEventListener("click", toggleRepeatButtonHandler);
        }
    }

    // When page will be loaded, call 'init' function
    window.onload = init();
}());
