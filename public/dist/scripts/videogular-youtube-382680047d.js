"use strict";angular.module("info.vietnamcode.nampnq.videogular.plugins.youtube",[]).run(["$rootScope","$window",function(e,t){e.youtubeApiReady=!1,t.onYouTubeIframeAPIReady=function(){e.$apply(function(){e.youtubeApiReady=!0})};var n=document.createElement("script");n.src="https://www.youtube.com/iframe_api";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a)}]).directive("vgYoutube",["$rootScope","$window","$timeout","$interval","VG_STATES",function(e,t,n,a,i){return{restrict:"A",require:"^videogular",link:function(t,n,a,r){function u(e){return e.match(h)[2]}function o(t){p?p.cueVideoById({videoId:u(t)}):e.$watch("youtubeApiReady",function(e){e&&(p=new YT.Player(r.mediaElement[0],{videoId:u(t),playerVars:g,events:{onReady:l,onStateChange:f}}))})}function c(){p.destroy()}function l(){r.mediaElement[0].__defineGetter__("currentTime",function(){return p.getCurrentTime()}),r.mediaElement[0].__defineSetter__("currentTime",function(e){return p.seekTo(e,!0)}),r.mediaElement[0].__defineGetter__("duration",function(){return p.getDuration()}),r.mediaElement[0].__defineGetter__("paused",function(){return p.getPlayerState()!=YT.PlayerState.PLAYING}),r.mediaElement[0].__defineGetter__("videoWidth",function(){return p.a.width}),r.mediaElement[0].__defineGetter__("videoHeight",function(){return p.a.height}),r.mediaElement[0].__defineGetter__("volume",function(){return p.getVolume()/100}),r.mediaElement[0].__defineSetter__("volume",function(e){return p.setVolume(100*e)}),r.mediaElement[0].play=function(){p.playVideo()},r.mediaElement[0].pause=function(){p.pauseVideo()},d(),angular.element(p.getIframe()).css({width:"100%",height:"100%"});var e=new CustomEvent("canplay");r.mediaElement[0].dispatchEvent(e)}function d(){r.onUpdateTime({target:r.mediaElement[0]})}function m(e){y&&s(),y=setInterval(d,e)}function s(){y&&clearInterval(y)}function f(e){e.target;switch(e.data){case YT.PlayerState.ENDED:s(),r.onComplete();break;case YT.PlayerState.PLAYING:var e=new CustomEvent("playing");r.mediaElement[0].dispatchEvent(e),r.setState(i.PLAY),m(600);break;case YT.PlayerState.PAUSED:r.currentState==i.PLAY&&r.setState(i.PAUSE),s();break;case YT.PlayerState.BUFFERING:var e=new CustomEvent("waiting");r.mediaElement[0].dispatchEvent(e);break;case YT.PlayerState.CUED:}}function _(e){return!!e&&e.match(h)}function v(e){_(e)?o(e):p&&c()}var p,y,E,g,h=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;E=null!==a.vgYoutube?a.vgYoutube.split(";"):null,g={controls:0,showinfo:0,rel:0,autoplay:0,start:0},null!==E&&E.forEach(function(e){var t=e.split("=");g.hasOwnProperty(t[0])&&(g[t[0]]=t[1]||0)}),t.$watch(function(){return r.sources},function(e,t){v(e&&e.length>0&&e[0].src?e[0].src.toString():null)}),t.$on("$destroy",function(){s()})}}}]);