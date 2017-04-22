!function(){"use strict";angular.module("ngMagnify",[]).directive("ngMagnify",function(){return{restrict:"EA",replace:!0,template:'<div class="magnify-container" data-ng-style="getContainerStyle()"><div class="magnify-glass" data-ng-style="getGlassStyle()"></div><img class="magnify-image" data-ng-src="{{ imageSrc }}"/></div>',scope:{imageSrc:"@",imageWidth:"=",imageHeight:"=",glassWidth:"=",glassHeight:"="},link:function(t,e){var i,a,n,g,s=e.find("div"),o=e.find("img");"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch||(e.on("mousemove",function(a){i=angular.extend(t.getOffset(e[0]),{width:e[0].offsetWidth,height:e[0].offsetHeight,imageWidth:o[0].offsetWidth,imageHeight:o[0].offsetHeight,glassWidth:s[0].offsetWidth,glassHeight:s[0].offsetHeight}),(g=t.magnify(a))&&s.css(g)}).on("mouseout",function(){s.on("mouseleave",function(){s.css({opacity:0,filter:"alpha(opacity=0)"})})}),t.magnify=function(e){var g,o,h,c,f,d,l,r;if(a||n)return g=e.pageX?e.pageX-i.left:e.x,o=e.pageY?e.pageY-i.top:e.y,g<i.width&&o<i.height&&g>0&&o>0?(s.css({opacity:1,"z-index":1,filter:"alpha(opacity=100)"}),h=-1*Math.round(g/i.imageWidth*a-i.glassWidth/2),c=-1*Math.round(o/i.imageHeight*n-i.glassHeight/2),l=h+"px "+c+"px",f=g-i.glassWidth/2,d=o-i.glassHeight/2,{left:f+"px",top:d+"px",backgroundPosition:l}):void s.css({opacity:0,"z-index":-1,filter:"alpha(opacity=0)"});r=new Image,r.onload=function(){a=r.width,n=r.height},r.src=t.imageSrc},t.getOffset=function(t){var e=document.documentElement,i=t.getBoundingClientRect();return{top:i.top+window.pageYOffset-e.clientTop,left:i.left+window.pageXOffset-e.clientLeft}},t.getContainerStyle=function(){return{width:t.imageWidth?t.imageWidth+"px":"",height:t.imageHeight?t.imageHeight+"px":""}},t.getGlassStyle=function(){return{background:'url("'+t.imageSrc+'") no-repeat',width:t.glassWidth?t.glassWidth+"px":"",height:t.glassHeight?t.glassHeight+"px":""}})}}})}();