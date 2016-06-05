### Watchout
Contains code for the Samsung Gear S2 Watch App, Ginger, which provides step-by-step instructions through cooking recipes and integrates with SmartThings.

### Screenshots
<!--<img src="http://s32.postimg.org/fncmxlxdx/Screen_Shot_2016_05_18_at_1_35_39_PM.png" width="400" height="400 />-->
<!--<img src="http://s32.postimg.org/n7sowd9hh/Screen_Shot_2016_05_18_at_1_36_17_PM.png" width="400" height="400 />-->
<!--<img src="http://s32.postimg.org/3w7lp5d8l/Screen_Shot_2016_05_18_at_1_36_39_PM.png" width="400" height="400 />-->
<!--<img src="http://s32.postimg.org/764uxybt1/Screen_Shot_2016_05_18_at_1_38_25_PM.png" width="400" height="400 />-->
<!--<img src="http://s32.postimg.org/woa8e9cg5/Screen_Shot_2016_05_18_at_1_38_14_PM.png" width="400" height="400 />-->
<!--<img src="http://s32.postimg.org/g4vducxmt/Screen_Shot_2016_05_18_at_1_38_40_PM.png" width="400" height="400 />-->
![Recipe Selector](http://s32.postimg.org/fncmxlxdx/Screen_Shot_2016_05_18_at_1_35_39_PM.png)
![Title Screen](http://s32.postimg.org/n7sowd9hh/Screen_Shot_2016_05_18_at_1_36_17_PM.png)
![Show Me How Screen](http://s32.postimg.org/3w7lp5d8l/Screen_Shot_2016_05_18_at_1_36_39_PM.png)
![View Timer Screen](http://s32.postimg.org/764uxybt1/Screen_Shot_2016_05_18_at_1_38_25_PM.png)
![Timer Screen](http://s32.postimg.org/woa8e9cg5/Screen_Shot_2016_05_18_at_1_38_14_PM.png)
![Regular Screen](http://s32.postimg.org/g4vducxmt/Screen_Shot_2016_05_18_at_1_38_40_PM.png)

### Contents
1. <a href="https://github.com/cs210/kyros-codebase/blob/master/Watchout/index.html" target="_blank">index.html</a>
 * main HTML file for the app
 * contains background, button and text content
2. <a href="https://github.com/cs210/kyros-codebase/blob/master/Watchout/css/style.css" target="_blank">style.css</a>
 * main CSS file for the app
3. <a href="https://github.com/cs210/kyros-codebase/blob/master/Watchout/js/main.js" target="_blank">main.js</a>
 * main JS file for the app
 * creates initial app layout, sets up listeners
4. <a href="https://github.com/cs210/kyros-codebase/blob/master/Watchout/js/swipe.js" target="_blank">swipe.js</a>
 * most of the JS rendering and swipe functionality
 * contains logic for which background images, buttons, and text divs are displayed when
5. <a href="https://github.com/cs210/kyros-codebase/blob/master/Watchout/js/timer.js" target="_blank">timer.js</a>
 * contains the GingerTimer class, which encapsulates the timer logic and functionality
6. <a href="https://github.com/cs210/kyros-codebase/blob/master/Watchout/js/smart-things.js" target="_blank">smart-things.js</a>
 * contains code to send requests to our SmartThings API endpoints (declared in shared <a href="https://github.com/cs210/wumbros" target="_blank">wumbros</a> repository)

