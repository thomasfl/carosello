;(function(e){"use strict";jQuery.expr[":"].notparents=function(e,t,n){return jQuery(e).parents(n[3]).length<1};(function(e){e.fn.extend({actual:function(t,n){if(!this[t]){throw'$.actual => The jQuery method "'+t+'" you called does not exist'}var r={absolute:false,clone:false,includeMargin:false};var i=e.extend(r,n);var s=this.eq(0);var o,u;if(i.clone===true){o=function(){var e="position: absolute !important; top: -1000 !important; ";s=s.clone().attr("style",e).appendTo("body")};u=function(){s.remove()}}else{var a=[];var f="";var l;o=function(){if(e.fn.jquery>="1.8.0")l=s.parents().addBack().filter(":hidden");else l=s.parents().andSelf().filter(":hidden");f+="visibility: hidden !important; display: block !important; ";if(i.absolute===true)f+="position: absolute !important; ";l.each(function(){var t=e(this);a.push(t.attr("style"));t.attr("style",f)})};u=function(){l.each(function(t){var n=e(this);var r=a[t];if(r===undefined){n.removeAttr("style")}else{n.attr("style",r)}})}}o();var c=/(outer)/g.test(t)?s[t](i.includeMargin):s[t]();u();return c}})})(jQuery);(function(e){function i(e,n){var r=t.scrollTop()-n,i=t.scrollTop()+t.height()+n,s=e.offset().top,o=s+e.outerHeight();return o>=r&&s<=i||o<=i&&s>=r||o>=r&&s<=r}function s(e){if(!r){r=setTimeout(function(){o(e);r=null},300)}}function o(t){e.each(n,function(){if(i(this.element,this.options.tolerance)){if(!this.invp){this.invp=true;if(this.options.scrolledin)this.options.scrolledin.call(this.element,t);this.element.trigger("scrolledin",t)}}else if(this.invp){this.invp=false;if(this.options.scrolledout)this.options.scrolledout.call(this.element,t);this.element.trigger("scrolledout",t)}})}function u(e,t){var r={element:e,options:t,invp:false};n.push(r);return r}function a(e){for(var t=0;t<n.length;t++){if(n[t]===e){n.splice(t,1);e.element=null;break}}}var t=e(window),n=[],r;if(window.addEventListener){window.addEventListener("scroll",s,false)}else if(window.attachEvent){window.attachEvent("onscroll",s)}t.on("resize",s);e(function(){setTimeout(s,0)});var f="pixGridderScrolledIntoView",l={tolerance:null,scrolledin:null,scrolledout:null};e.fn[f]=function(t){var t=e.extend({},l,t);this.each(function(){var n=e(this),r=e.data(this,f);if(r){r.options=t}else{e.data(this,f,u(n,t));n.on("remove",e.proxy(function(){e.removeData(this,f);a(r)},this))}});return this}})(jQuery);var t=window.PIXGRIDDER||{};t.rotatingFrames=function(){var t=e(window);e('.row[style*="rotate"]').addClass("pixgridder_rotate").each(function(){if(!e(".pix_section_video",this).length){if(!e(".rotating-frame",this).length){var n=e(this);n.append('<div class="rotating-frame"><div class="rotating-inside"></div></div>');var r=n.attr("style").match(/rotate\((.+?)deg\)/gi);r=r[0];r=r.replace(/rotate\((.+?)deg\)/gi,"$1");var i=r*-1,s,o,u,a;e(".rotating-frame",n).css({webkitTransform:"rotate("+r+"deg)",mozTransform:"rotate("+r+"deg)",msTransform:"rotate("+r+"deg)",oTransform:"rotate("+r+"deg)",transform:"rotate("+r+"deg)"});e(".rotating-inside",n).css({webkitTransform:"rotate("+i+"deg)",mozTransform:"rotate("+i+"deg)",msTransform:"rotate("+i+"deg)",oTransform:"rotate("+i+"deg)",transform:"rotate("+i+"deg)"});if(typeof n.attr("style")!=="undefined"&&n.attr("style").match(/background-image/)){s=n.css("background-image");n.css("background-image","");e(".rotating-inside",n).css("background-image",s)}if(typeof n.attr("style")!=="undefined"&&n.attr("style").match(/background-repeat/)){o=n.css("background-repeat");n.css("background-repeat","");e(".rotating-inside",n).css("background-repeat",o)}if(typeof n.attr("data-pix-ratio")!=="undefined"){a=n.attr("data-pix-ratio");n.removeAttr("data-pix-ratio");e(".rotating-inside",n).attr("data-pix-ratio",a)}if(typeof n.attr("style")!=="undefined"&&n.attr("style").match(/background-color/)){u=n.css("background-color");n.css("background-color","");e(".rotating-frame",n).css("background-color",u)}}}else{e(this).css({webkitTransform:"rotate(0)",mozTransform:"rotate(0)",msTransform:"rotate(0)",oTransform:"rotate(0)",transform:"rotate(0)"})}t.trigger("pix-parallax")})};t.pixgridderParallax=function(){var t=e(window),n=e("[data-pix-ratio]"),r;n.each(function(){var n=e(this),i=e(".rotating-inside",n).length;n=i?e(".rotating-inside",n):e(this);var s=n.css("background-image"),o=typeof n.css("background-size")=="undefined"||parseFloat(n.css("background-size"))=="0"?"100%":n.css("background-size"),u=typeof n.css("background-repeat")=="undefined"?"no-repeat":n.css("background-repeat"),a=n.attr("data-pix-ratio"),f=/^url\((['"]?)(.*)\1\)$/.exec(s),l,c,h;f=f?f[2]:"";var p=e("<img />").one("load",function(){if(!e("img.pix-parallax",n).length){l='<img src="'+f+'" class="pix-parallax">';c=e(l).naturalWidth();h=e(l).naturalHeight();l=e(l).attr("data-orheight",h).attr("data-orwidth",c).attr("src",pixgridder_blank_gif).css({backgroundImage:s,backgroundSize:o,backgroundRepeat:u,position:"absolute"});n.css({backgroundImage:"",overflow:"hidden"}).prepend(l);t.trigger("pix-parallax")}}).attr("src",f).each(function(){if(this.complete){e(this).load()}});var d=function(){r=window.pageYOffset!==undefined?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;var i=e("img.pix-parallax",n),s=t.height(),o=n.offset().top,u=o+n.outerHeight(),f=(o-r)*a*-1;if(typeof i[0]!=="undefined"){i[0].style["-webkit-transform"]="translate3d(0,"+f+"px,0)";i[0].style["-moz-transform"]="translate3d(0,"+f+"px,0)";i[0].style["-ms-transform"]="translate3d(0,"+f+"px,0)";i[0].style["-o-transform"]="translate3d(0,"+f+"px,0)";i[0].style["transform"]="translate3d(0,"+f+"px,0)"}};var v=function(){var t=e("img.pix-parallax",n);if(typeof t[0]!=="undefined"){t[0].style["-webkit-transform"]="translate3d(0,0,0)";t[0].style["-moz-transform"]="translate3d(0,0,0)";t[0].style["-ms-transform"]="translate3d(0,0,0)";t[0].style["-o-transform"]="translate3d(0,0,0)";t[0].style["transform"]="translate3d(0,0,0)"}};t.on("pix-parallax resize",function(){if(!Modernizr.touch&&t.width()>1024){n.pixGridderScrolledIntoView({tolerance:200,scrolledin:function(){if(window.addEventListener){window.addEventListener("load",d,false);window.addEventListener("scroll",d,false);window.addEventListener("resize",d,false)}else if(window.attachEvent){window.attachEvent("onscroll",d);window.attachEvent("onresize",d)}},scrolledout:function(){if(window.removeEventListener){window.removeEventListener("load",d,false);window.removeEventListener("scroll",d,false);window.removeEventListener("resize",d,false)}else if(window.detachEvent){window.detachEvent("onscroll",d);window.detachEvent("onresize",d)}v()}})}})});t.on("pix-parallax resize",function(){e("img.pix-parallax").each(function(){var n=e(this),r=n.parents("div[data-pix-ratio]").eq(0),i=parseFloat(r.attr("data-pix-ratio")),s="absolute",o=n.parents("div").eq(0),u=o.outerWidth(),a=t.height(),f=o.outerHeight(),l,c=n.data("orwidth"),h=n.data("orheight"),p,d,v,m,g,y=c/h,b;l=a>f?a:f;b=u/l;if(y>b){d=l/h;v=m=g=(u-c*d)*.5;n.css({height:l,left:0,"margin-left":m+"px","margin-right":g+"px","margin-top":0,"max-width":"none",position:s,top:0,width:c*d,"z-Index":"-1"})}else{d=u/c;v=(l-h*d)*.5;n.css({height:h*d,left:0,"margin-left":0,"margin-right":0,"margin-top":v+"px","max-width":"none",position:s,top:0,width:u,"z-Index":"-1"})}})})};t.pixgridderFirstInARow=function(){var t=typeof t!=="undefined"?t:".row .column",n=e(window);var r=function(){var r=0,i=e(t).filter(":notparents(.pix-letmebe)");i.each(function(){var t=e(this),i,s,o=n.width(),u=t.outerWidth();t.removeClass("first-child");i=t.position();s=parseFloat(i.left)+10;if(t.is(":first-child")){t.attr("data-child","first");r=0}else if(s<r){t.addClass("first-child");r=0}r=r+u})};r();n.on("resize",function(){r()})};t.initPixElem=function(){var t=0,n=0,r=100,i,s=typeof s!=="undefined"?s:".row .column",o=jQuery(".pix-fadeIn, .pix-fadeDown, .pix-fadeUp, .pix-fadeLeft, .pix-fadeRight, .pix-zoomIn, .pix-zoomOut, .pix-rotateIn, .pix-rotateOut, .pix-flipClock, .pix-swing, .pix-turnBackward, .pix-turnForward").add(s);e(o).not(".pix-lazy-load").not(".pix-letmebe").filter(":notparents(.pix-letmebe)").pixGridderScrolledIntoView().on("scrolledin",function(){var s=e(this),o=s.data("delay");s.addClass("pix-lazy-load");var u=s.offset(),a=u.top;if(!s.hasClass("none")&&!s.hasClass("bx-clone")){if(typeof o!="undefined"&&o!==""){n=parseFloat(o)}else{if(a!=t){t=a;i=0}else{i=i+200}n=r+i;s.attr("data-delay",n)}}if(!Modernizr.csstransforms3d){s.filter(".pix-flipClock").removeClass("pix-flipClock").addClass("pix-fadeDown");s.filter(".pix-swing").removeClass("pix-swing").addClass("pix-fadeDown");s.filter(".pix-turnBackward").removeClass("pix-turnBackward").addClass("pix-fadeRight");s.filter(".pix-turnForward").removeClass("pix-turnForward").addClass("pix-fadeLeft")}if(!s.is(".none, .available, .pix-fadeIn, .pix-fadeDown, .pix-fadeUp, .pix-fadeLeft, .pix-fadeRight, .pix-zoomIn, .pix-zoomOut, .pix-rotateIn, .pix-rotateOut, .pix-flipClock, .pix-swing, .pix-turnBackward, .pix-turnForward")&&typeof pixgridder_fx!=="undefined"){s.addClass(pixgridder_fx)}var f=function(){s.addClass("pix-transended").removeClass("pix-loaded").removeClass("pix-fadeIn").removeClass("pix-fadeDown").removeClass("pix-fadeUp").removeClass("pix-fadeLeft").removeClass("pix-fadeRight").removeClass("pix-zoomIn").removeClass("pix-zoomOut").removeClass("pix-rotateIn").removeClass("pix-rotateOut").removeClass("pix-flipClock").removeClass("pix-swing").removeClass("pix-turnBackward").removeClass("pix-turnForward")};var l=function(){if(!Modernizr.cssanimations){s.not(".pix-loaded").addClass("pix-loaded-inanim");e("body").removeClass("pix-scroll-load")}else{s.addClass("pix-loaded");s.not(".pix-loaded").not(".available").not(".none").addClass("pix-loaded")}s.off("transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd");s.on("transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd",function(){setTimeout(f,1e3)})};if(!s.hasClass("none")&&!s.hasClass("bx-clone")){setTimeout(l,n)}else{f()}})};t.init=function(){t.rotatingFrames();t.pixgridderParallax();t.pixgridderFirstInARow();t.initPixElem()};e(function(){t.init();e(window).trigger("resize")});e(window).on("pixgridder",function(){t.init();e(window).trigger("resize")})})(jQuery);