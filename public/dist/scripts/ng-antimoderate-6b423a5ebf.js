!function(e){"use strict";e.module("ngAntimoderate",[]).directive("ngAntimoderate",[function(){return{restrict:"A",replace:!1,scope:{ngAntimoderate:"@",filter:"@",transition:"@",loadingClass:"@",loadedClass:"@"},transclude:!1,link:function(i,s,t){var a=s[0],n={},o=[];n.micro_src=i.ngAntimoderate||"",n.filter=i.filter||"",n.transition=i.transition||"",n.loading_class=i.loadingClass||"loading",n.loaded_class=i.loadedClass||"loaded";var r=function(i,s,a){var n=i[0],r=new Image;r.onload=function(){var s=t.src;if(null!==s&&""!==s){i.removeClass(a.loaded_class),i.addClass(a.loading_class);var l=new Image;l.onload=function(){i.removeClass(a.loading_class),i.addClass(a.loaded_class),n.src=s,o.push(n.src),e.isDefined(objectFitImages)&&e.isFunction(objectFitImages)&&objectFitImages("img.antimoderate"),a.transition&&(n.style.transition=a.transition),a.filter&&(n.style.filter="none ")},l.src=s}n.src=r.src,e.isDefined(objectFitImages)&&e.isFunction(objectFitImages)&&objectFitImages("img.antimoderate"),a.filter&&(n.style.filter=a.filter)},r.src=s};e.isDefined(a.src)&&(s.addClass("antimoderate"),o.indexOf(a.src)===-1&&r(s,n.micro_src,n),i.$watch("ngAntimoderate",function(e){o.indexOf(a.src)===-1&&r(s,e,n)}))}}}])}(window.angular);