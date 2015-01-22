/*
 * bootstrap-filestyle
 * http://dev.tudosobreweb.com.br/bootstrap-filestyle/
 *
 * Copyright (c) 2013 Markus Vinicius da Silva Lima
 * Version 1.0.3
 * Licensed under the MIT license.
 */
 ;(function(e){"use strict";var t=function(t,n){this.options=n;this.$elementFilestyle=[];this.$element=e(t)};t.prototype={clear:function(){this.$element.val("");this.$elementFilestyle.find(":text").val("")},destroy:function(){this.$element.removeAttr("style").removeData("filestyle").val("");this.$elementFilestyle.remove()},icon:function(e){if(e===true){if(!this.options.icon){this.options.icon=true;this.$elementFilestyle.find("label").prepend(this.htmlIcon())}}else if(e===false){if(this.options.icon){this.options.icon=false;this.$elementFilestyle.find("i").remove()}}else{return this.options.icon}},input:function(e){if(e===true){if(!this.options.input){this.options.input=true;this.$elementFilestyle.prepend(this.htmlInput());var t="",n=[];if(this.$element[0].files===undefined){n[0]={name:this.$element[0].value}}else{n=this.$element[0].files}for(var r=0;r<n.length;r++){t+=n[r].name.split("\\").pop()+", "}if(t!==""){this.$elementFilestyle.find(":text").val(t.replace(/\, $/g,""))}}}else if(e===false){if(this.options.input){this.options.input=false;this.$elementFilestyle.find(":text").remove()}}else{return this.options.input}},buttonText:function(e){if(e!==undefined){this.options.buttonText=e;this.$elementFilestyle.find("label span").html(this.options.buttonText)}else{return this.options.buttonText}},classButton:function(e){if(e!==undefined){this.options.classButton=e;this.$elementFilestyle.find("label").attr({"class":this.options.classButton});if(this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i)!==-1){this.$elementFilestyle.find("label i").addClass("icon-white")}else{this.$elementFilestyle.find("label i").removeClass("icon-white")}}else{return this.options.classButton}},classIcon:function(e){if(e!==undefined){this.options.classIcon=e;if(this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i)!==-1){this.$elementFilestyle.find("label").find("i").attr({"class":"icon-white "+this.options.classIcon})}else{this.$elementFilestyle.find("label").find("i").attr({"class":this.options.classIcon})}}else{return this.options.classIcon}},classInput:function(e){if(e!==undefined){this.options.classInput=e;this.$elementFilestyle.find(":text").addClass(this.options.classInput)}else{return this.options.classInput}},htmlIcon:function(){if(this.options.icon){var e="";if(this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i)!==-1){e=" icon-white "}return'<i class="'+e+this.options.classIcon+'"></i> '}else{return""}},htmlInput:function(){if(this.options.input){return'<input type="text" class="'+this.options.classInput+'" disabled> '}else{return""}},constructor:function(){var t=this,n="",r=this.$element.attr("id"),i=[];if(r===""||!r){r="filestyle-"+e(".bootstrap-filestyle").length;this.$element.attr({id:r})}n=this.htmlInput()+'<label for="'+r+'" class="'+this.options.classButton+'">'+this.htmlIcon()+"<span>"+this.options.buttonText+"</span>"+"</label>";this.$elementFilestyle=e('<div class="bootstrap-filestyle" style="display: inline;">'+n+"</div>");var s=this.$elementFilestyle.find("label");var o=s.parent();o.attr("tabindex","0").keypress(function(e){if(e.keyCode===13||e.charCode===32){s.click()}});this.$element.css({position:"absolute",clip:"rect(0,0,0,0)"}).attr("tabindex","-1").after(this.$elementFilestyle);this.$element.change(function(){var e="";if(this.files===undefined){i[0]={name:this.value}}else{i=this.files}for(var n=0;n<i.length;n++){e+=i[n].name.split("\\").pop()+", "}if(e!==""){t.$elementFilestyle.find(":text").val(e.replace(/\, $/g,""))}else{t.$elementFilestyle.find(":text").val("")}});if(window.navigator.userAgent.search(/firefox/i)>-1){this.$elementFilestyle.find("label").click(function(){t.$element.click();return false})}}};var n=e.fn.filestyle;e.fn.filestyle=function(n,r){var i="",s=this.each(function(){if(e(this).attr("type")==="file"){var s=e(this),o=s.data("filestyle"),u=e.extend({},e.fn.filestyle.defaults,n,typeof n==="object"&&n);if(!o){s.data("filestyle",o=new t(this,u));o.constructor()}if(typeof n==="string"){i=o[n](r)}}});if(typeof i!==undefined){return i}else{return s}};e.fn.filestyle.defaults={buttonText:"Choose file",input:true,icon:true,classButton:"btn",classInput:"input-large",classIcon:"icon-folder-open"};e.fn.filestyle.noConflict=function(){e.fn.filestyle=n;return this};e(".filestyle").each(function(){var t=e(this),n={buttonText:t.attr("data-buttonText"),input:t.attr("data-input")==="false"?false:true,icon:t.attr("data-icon")==="false"?false:true,classButton:t.attr("data-classButton"),classInput:t.attr("data-classInput"),classIcon:t.attr("data-classIcon")};t.filestyle(n)})})(window.jQuery);