"use strict";angular.module("com.2fdevs.videogular.plugins.controls",[]).run(["$templateCache",function(e){e.put("vg-templates/vg-controls",'<div class="controls-container" ng-mousemove="onMouseMove()" ng-class="animationClass" ng-transclude></div>')}]).directive("vgControls",["$timeout","VG_STATES",function(e,t){return{restrict:"E",require:"^videogular",transclude:!0,templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-controls"},scope:{vgAutohide:"=?",vgAutohideTime:"=?"},link:function(n,o,u,i){var a,r=2e3;n.API=i,n.onMouseMove=function(){n.vgAutohide&&n.showControls()},n.setAutohide=function(o){o&&i.currentState==t.PLAY?a=e(n.hideControls,r):(n.animationClass="",e.cancel(a),n.showControls())},n.setAutohideTime=function(e){r=e},n.hideControls=function(){n.animationClass="hide-animation"},n.showControls=function(){n.animationClass="show-animation",e.cancel(a),n.vgAutohide&&i.currentState==t.PLAY&&(a=e(n.hideControls,r))},i.isConfig?n.$watch("API.config",function(){if(n.API.config){var e=n.API.config.plugins.controls.autohide||!1,t=n.API.config.plugins.controls.autohideTime||2e3;n.vgAutohide=e,n.vgAutohideTime=t,n.setAutohideTime(t),n.setAutohide(e)}}):(void 0!=n.vgAutohide&&n.$watch("vgAutohide",n.setAutohide),void 0!=n.vgAutohideTime&&n.$watch("vgAutohideTime",n.setAutohideTime)),n.$watch(function(){return i.currentState},function(e,t){n.vgAutohide&&n.showControls()})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-fullscreen-button",'<button class="iconButton" ng-click="onClickFullScreen()" ng-class="fullscreenIcon" aria-label="Toggle full screen" type="button"> </button>')}]).directive("vgFullscreenButton",[function(){return{restrict:"E",require:"^videogular",scope:{},templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-fullscreen-button"},link:function(e,t,n,o){e.onChangeFullScreen=function(t){e.fullscreenIcon={enter:!t,exit:t}},e.onClickFullScreen=function(){o.toggleFullScreen()},e.fullscreenIcon={enter:!0},e.$watch(function(){return o.isFullScreen},function(t,n){t!=n&&e.onChangeFullScreen(t)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-play-pause-button",'<button class="iconButton" ng-click="onClickPlayPause()" ng-class="playPauseIcon" aria-label="Play/Pause" type="button"></button>')}]).directive("vgPlayPauseButton",["VG_STATES",function(e){return{restrict:"E",require:"^videogular",scope:{},templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-play-pause-button"},link:function(t,n,o,u){t.setState=function(n){switch(n){case e.PLAY:t.playPauseIcon={pause:!0};break;case e.PAUSE:case e.STOP:t.playPauseIcon={play:!0}}},t.onClickPlayPause=function(){u.playPause()},t.playPauseIcon={play:!0},t.$watch(function(){return u.currentState},function(e,n){t.setState(e)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-playback-button",'<button class="playbackValue iconButton" ng-click="onClickPlayback()">{{playback}}x</button>')}]).directive("vgPlaybackButton",[function(){return{restrict:"E",require:"^videogular",templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-playback-button"},scope:{vgSpeeds:"=?"},link:function(e,t,n,o){e.playback="1",e.setPlayback=function(t){e.playback=t,o.setPlayback(parseFloat(t))},e.onClickPlayback=function(){var t=e.vgSpeeds||["0.5","1","1.5","2"],n=t.indexOf(e.playback.toString())+1;n>=t.length?e.playback=t[0]:e.playback=t[n],e.setPlayback(e.playback)},e.$watch(function(){return o.playback},function(t,n){t!=n&&e.setPlayback(t)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgScrubBarBuffer",[function(){return{restrict:"E",require:"^videogular",link:function(e,t,n,o){var u=0;e.onUpdateBuffer=function(e){"number"==typeof e&&o.totalTime?(u=e/o.totalTime*100,t.css("width",u+"%")):t.css("width",0)},e.$watch(function(){return o.bufferEnd},function(t,n){e.onUpdateBuffer(t)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-scrub-bar-cue-points",'<div class="cue-point-timeline"><div ng-repeat="cuePoint in vgCuePoints" class="cue-point" ng-style="cuePoint.$$style"></div></div>')}]).directive("vgScrubBarCuePoints",[function(){return{restrict:"E",require:"^videogular",templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-scrub-bar-cue-points"},scope:{vgCuePoints:"="},link:function(e,t,n,o){e.onPlayerReady=function(){e.updateCuePoints(e.vgCuePoints)},e.updateCuePoints=function(e){if(e){parseInt(t[0].clientWidth);for(var n=0,u=e.length;n<u;n++){var i=e[n].timeLapse.end>=0?e[n].timeLapse.end:e[n].timeLapse.start+1,a=1e3*(i-e[n].timeLapse.start),r=100*e[n].timeLapse.start/Math.round(o.totalTime/1e3)+"%",l=0;"number"==typeof a&&o.totalTime&&(l=100*a/o.totalTime+"%"),e[n].$$style={width:l,left:r}}}},e.$watch("vgCuePoints",e.updateCuePoints),e.$watch(function(){return o.totalTime},function(t,n){t>0&&e.onPlayerReady()})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgScrubBarCurrentTime",[function(){return{restrict:"E",require:"^videogular",link:function(e,t,n,o){var u=0;e.onUpdateTime=function(e){"number"==typeof e&&o.totalTime?(u=e/o.totalTime*100,t.css("width",u+"%")):t.css("width",0)},e.$watch(function(){return o.currentTime},function(t,n){e.onUpdateTime(t)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-scrub-bar-thumbnails",'<div class="vg-thumbnails" ng-show="thumbnails" ng-style="thumbnailContainer"><div class="image-thumbnail" ng-style="thumbnails"></div></div><div class="background"></div>')}]).directive("vgScrubBarThumbnails",["VG_UTILS",function(e){return{restrict:"E",require:"^videogular",templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-scrub-bar-thumbnails"},scope:{vgThumbnails:"="},link:function(t,n,o,u){var i=0,a=0,r=n[0].querySelector(".background"),l="string"==typeof t.vgThumbnails;t.thumbnails=!1,t.thumbnailContainer={},t.getOffset=function(e){for(var t=e.target,n=0;t&&!isNaN(t.offsetLeft);)n+=t.offsetLeft-t.scrollLeft,t=t.offsetParent;return e.clientX-n},t.onLoadThumbnails=function(e){i=e.currentTarget.naturalWidth,a=i/100},t.onLoadThumbnail=function(e){a=e.currentTarget.naturalWidth},t.updateThumbnails=function(e){var n=Math.round(100*e/(u.totalTime/1e3)),o=r.scrollWidth*n/100-a/2;if(l){var c=Math.round(i*n/100);t.thumbnailContainer={width:a+"px",left:o+"px"},t.thumbnails={"background-image":'url("'+t.vgThumbnails+'")',"background-position":-c+"px 0px"}}else{var s=u.totalTime/r.scrollWidth/1e3,m={start:Math.floor(e-s/2),end:Math.ceil(e)};if(m.start<0&&(m.start=0),m.end>u.totalTime&&(m.end=u.totalTime),t.thumbnailContainer={left:o+"px"},t.thumbnails={"background-image":"none"},t.vgThumbnails)for(var v=0,d=t.vgThumbnails.length;v<d;v++){var f=t.vgThumbnails[v];if(f.timeLapse.end>=0){if(m.start>=f.timeLapse.start&&(m.end<=f.timeLapse.end||m.end<=f.timeLapse.start)){t.thumbnails={"background-image":'url("'+f.params.thumbnail+'")'};break}}else if(f.timeLapse.start>=m.start&&f.timeLapse.start<=m.end){t.thumbnails={"background-image":'url("'+f.params.thumbnail+'")'};break}}}},t.onMouseMove=function(e){var n=Math.round(e.offsetX*u.mediaElement[0].duration/r.scrollWidth);t.updateThumbnails(n),t.$digest()},t.onTouchMove=function(e){var n=e.touches,o=t.getOffset(n[0]),i=Math.round(o*u.mediaElement[0].duration/r.scrollWidth);t.updateThumbnails(i),t.$digest()},t.onMouseLeave=function(e){t.thumbnails=!1,t.$digest()},t.onTouchLeave=function(e){t.thumbnails=!1,t.$digest()},t.onDestroy=function(){n.unbind("touchmove",t.onTouchMove),n.unbind("touchleave",t.onTouchLeave),n.unbind("touchend",t.onTouchLeave),n.unbind("mousemove",t.onMouseMove),n.unbind("mouseleave",t.onMouseLeave)};var c;l?(c=new Image,c.onload=t.onLoadThumbnails.bind(t),c.src=t.vgThumbnails):(c=new Image,c.onload=t.onLoadThumbnail.bind(t),c.src=t.vgThumbnails[0].params.thumbnail),e.isMobileDevice()?(n.bind("touchmove",t.onTouchMove),n.bind("touchleave",t.onTouchLeave),n.bind("touchend",t.onTouchLeave)):(n.bind("mousemove",t.onMouseMove),n.bind("mouseleave",t.onMouseLeave)),t.$on("destroy",t.onDestroy.bind(t))}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-scrub-bar",'<div role="slider" aria-valuemax="{{ariaTime(API.totalTime)}}" aria-valuenow="{{ariaTime(API.currentTime)}}" aria-valuemin="0" aria-label="Time scrub bar" tabindex="0" ng-keydown="onScrubBarKeyDown($event)"></div><div class="container" ng-transclude></div>')}]).directive("vgScrubBar",["VG_STATES","VG_UTILS",function(e,t){return{restrict:"E",require:"^videogular",transclude:!0,templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-scrub-bar"},scope:{vgThumbnails:"="},link:function(n,o,u,i){var a=!1,r=!1,l=!1,c=0,s=0,m=o[0].querySelector("div[role=slider]");if(n.thumbnails=!1,n.thumbnailContainer={},n.API=i,n.onLoadThumbnails=function(e){c=e.path[0].naturalWidth,s=c/100},n.ariaTime=function(e){return Math.round(e/1e3)},n.getOffset=function(e){for(var t=e.target,n=0;t&&!isNaN(t.offsetLeft);)n+=t.offsetLeft-t.scrollLeft,t=t.offsetParent;return e.clientX-n},n.onScrubBarTouchStart=function(e){var t=e.originalEvent||e,o=t.touches,u=n.getOffset(o[0]);a=!0,r&&(l=!0),i.pause(),i.seekTime(u*i.mediaElement[0].duration/m.scrollWidth),n.$digest()},n.onScrubBarTouchEnd=function(e){e.originalEvent;l&&(l=!1,i.play()),a=!1,n.$digest()},n.onScrubBarTouchMove=function(e){var t=e.originalEvent||e,o=t.touches,u=n.getOffset(o[0]);if(n.vgThumbnails&&n.vgThumbnails.length){var r=Math.round(u*i.mediaElement[0].duration/m.scrollWidth),l=Math.round(100*r/(i.totalTime/1e3));n.updateThumbnails(l)}a&&i.seekTime(u*i.mediaElement[0].duration/m.scrollWidth),n.$digest()},n.onScrubBarTouchLeave=function(e){a=!1,n.thumbnails=!1,n.$digest()},n.onScrubBarMouseDown=function(e){e=t.fixEventOffset(e),a=!0,r&&(l=!0),i.pause(),i.seekTime(e.offsetX*i.mediaElement[0].duration/m.scrollWidth),n.$digest()},n.onScrubBarMouseUp=function(e){l&&(l=!1,i.play()),a=!1,n.$digest()},n.onScrubBarMouseMove=function(e){if(n.vgThumbnails&&n.vgThumbnails.length){var o=Math.round(e.offsetX*i.mediaElement[0].duration/m.scrollWidth),u=Math.round(100*o/(i.totalTime/1e3));n.updateThumbnails(u)}a&&(e=t.fixEventOffset(e),i.seekTime(e.offsetX*i.mediaElement[0].duration/m.scrollWidth)),n.$digest()},n.onScrubBarMouseLeave=function(e){a=!1,n.thumbnails=!1,n.$digest()},n.onScrubBarKeyDown=function(e){var t=i.currentTime/i.totalTime*100;37===e.which||37===e.keyCode?(i.seekTime(t-5,!0),e.preventDefault()):39!==e.which&&39!==e.keyCode||(i.seekTime(t+5,!0),e.preventDefault())},n.updateThumbnails=function(e){var t=Math.round(c*e/100),o=m.scrollWidth*e/100-s/2;n.thumbnailContainer={width:s+"px",left:o+"px"},n.thumbnails={"background-image":'url("'+n.vgThumbnails+'")',"background-position":-t+"px 0px"}},n.setState=function(t){if(!a)switch(t){case e.PLAY:r=!0;break;case e.PAUSE:case e.STOP:r=!1}},n.onDestroy=function(){o.unbind("touchstart",n.onScrubBarTouchStart),o.unbind("touchend",n.onScrubBarTouchEnd),o.unbind("touchmove",n.onScrubBarTouchMove),o.unbind("touchleave",n.onScrubBarTouchLeave),o.unbind("mousedown",n.onScrubBarMouseDown),o.unbind("mouseup",n.onScrubBarMouseUp),o.unbind("mousemove",n.onScrubBarMouseMove),o.unbind("mouseleave",n.onScrubBarMouseLeave)},n.$watch(function(){return i.currentState},function(e,t){e!=t&&n.setState(e)}),n.vgThumbnails){var v=new Image;v.onload=n.onLoadThumbnails.bind(n),v.src=n.vgThumbnails}t.isMobileDevice()?(o.bind("touchstart",n.onScrubBarTouchStart),o.bind("touchend",n.onScrubBarTouchEnd),o.bind("touchmove",n.onScrubBarTouchMove),o.bind("touchleave",n.onScrubBarTouchLeave)):(o.bind("mousedown",n.onScrubBarMouseDown),o.bind("mouseup",n.onScrubBarMouseUp),o.bind("mousemove",n.onScrubBarMouseMove),o.bind("mouseleave",n.onScrubBarMouseLeave)),n.$on("destroy",n.onDestroy.bind(n))}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgTimeDisplay",[function(){return{require:"^videogular",restrict:"E",link:function(e,t,n,o){e.currentTime=o.currentTime,e.timeLeft=o.timeLeft,e.totalTime=o.totalTime,e.isLive=o.isLive,e.$watch(function(){return o.currentTime},function(t,n){e.currentTime=t}),e.$watch(function(){return o.timeLeft},function(t,n){e.timeLeft=t}),e.$watch(function(){return o.totalTime},function(t,n){e.totalTime=t}),e.$watch(function(){return o.isLive},function(t,n){e.isLive=t})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-mute-button",'<button type="button" class="iconButton" ng-class="muteIcon" ng-click="onClickMute()" ng-focus="onMuteButtonFocus()" ng-blur="onMuteButtonLoseFocus()" ng-mouseleave="onMuteButtonLeave()" ng-keydown="onMuteButtonKeyDown($event)" aria-label="Mute"></button>')}]).directive("vgMuteButton",[function(){return{restrict:"E",require:"^videogular",templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-mute-button"},link:function(e,t,n,o){var u=!1;e.onClickMute=function(){u?e.currentVolume=e.defaultVolume:(e.currentVolume=0,e.muteIcon={mute:!0}),u=!u,o.setVolume(e.currentVolume)},e.onMuteButtonFocus=function(){e.volumeVisibility="visible"},e.onMuteButtonLoseFocus=function(){e.volumeVisibility="hidden"},e.onMuteButtonLeave=function(){document.activeElement.blur()},e.onMuteButtonKeyDown=function(e){var t,n=null!=o.volume?o.volume:1;38===e.which||38===e.keyCode?(t=n+.05,t>1&&(t=1),o.setVolume(t),e.preventDefault()):40!==e.which&&40!==e.keyCode||(t=n-.05,t<0&&(t=0),o.setVolume(t),e.preventDefault())},e.onSetVolume=function(t){e.currentVolume=t,u=0===e.currentVolume,u?t>0&&(e.defaultVolume=t):e.defaultVolume=t;var n=Math.round(100*t);0==n?e.muteIcon={mute:!0}:n>0&&n<25?e.muteIcon={level0:!0}:n>=25&&n<50?e.muteIcon={level1:!0}:n>=50&&n<75?e.muteIcon={level2:!0}:n>=75&&(e.muteIcon={level3:!0})},e.defaultVolume=1,e.currentVolume=e.defaultVolume,e.muteIcon={level3:!0},e.onSetVolume(o.volume),e.$watch(function(){return o.volume},function(t,n){t!=n&&e.onSetVolume(t)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").run(["$templateCache",function(e){e.put("vg-templates/vg-volume-bar",'<div class="verticalVolumeBar">              <div class="volumeBackground" ng-click="onClickVolume($event)" ng-mousedown="onMouseDownVolume()" ng-mouseup="onMouseUpVolume()" ng-mousemove="onMouseMoveVolume($event)" ng-mouseleave="onMouseLeaveVolume()">                <div class="volumeValue"></div>                <div class="volumeClickArea"></div>              </div>            </div>')}]).directive("vgVolumeBar",["VG_UTILS",function(e){return{restrict:"E",require:"^videogular",templateUrl:function(e,t){return t.vgTemplate||"vg-templates/vg-volume-bar"},link:function(t,n,o,u){var i=!1,a=angular.element(n[0].getElementsByClassName("volumeBackground")),r=angular.element(n[0].getElementsByClassName("volumeValue"));t.onClickVolume=function(t){t=e.fixEventOffset(t);var n=parseInt(a.prop("offsetHeight")),o=100*t.offsetY/n,i=1-o/100;u.setVolume(i)},t.onMouseDownVolume=function(){i=!0},t.onMouseUpVolume=function(){i=!1},t.onMouseLeaveVolume=function(){i=!1},t.onMouseMoveVolume=function(t){if(i){t=e.fixEventOffset(t);var n=parseInt(a.prop("offsetHeight")),o=100*t.offsetY/n,r=1-o/100;u.setVolume(r)}},t.updateVolumeView=function(e){e*=100,r.css("height",e+"%"),r.css("top",100-e+"%")},t.onChangeVisibility=function(e){n.css("visibility",e)},n.css("visibility",t.volumeVisibility),t.$watch("volumeVisibility",t.onChangeVisibility),t.updateVolumeView(u.volume),t.$watch(function(){return u.volume},function(e,n){e!=n&&t.updateVolumeView(e)})}}}]),angular.module("com.2fdevs.videogular.plugins.controls").directive("vgVolume",["VG_UTILS",function(e){return{restrict:"E",link:function(t,n,o){t.onMouseOverVolume=function(){t.$evalAsync(function(){t.volumeVisibility="visible"})},t.onMouseLeaveVolume=function(){t.$evalAsync(function(){t.volumeVisibility="hidden"})},t.onDestroy=function(){n.unbind("mouseover",t.onScrubBarTouchStart),n.unbind("mouseleave",t.onScrubBarTouchEnd)},e.isMobileDevice()?n.css("display","none"):(t.volumeVisibility="hidden",n.bind("mouseover",t.onMouseOverVolume),n.bind("mouseleave",t.onMouseLeaveVolume)),t.$on("destroy",t.onDestroy.bind(t))}}}]);