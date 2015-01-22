if (!jQuery.support.transition) jQuery.fn.transition = jQuery.fn.animate;

// Tabedelic tabs version 0.0.1 - simple tabs and accordion, based on jQuery 1.9+
// Copyright (c) 2013 by Manuel Masia - www.pixedelic.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
;(function($){$.fn.tabedelic = function(opts, callback) {

	$(this).each(function(){
		var target = $(this).addClass('tabedelic').data('tab',true),
			defaults = {
				type: 'tabs',
				speed: 250,
				easing: 'easeOutSine',
				fx: '',
				active: 1,
				height: 'content',
				header: '> a.tab',
				panel: '> div',
				minwidth: 0
			};
		opts = $.extend({}, defaults, target.data('opts'), opts);

		var headers;

		opts.header = target.find(opts.header);
		opts.panel = target.find(opts.panel);
		opts.active = opts.type!='accordion' && (isNaN(parseFloat(opts.active)) || opts.active=='false' || opts.active==-1) ? 0 : parseFloat(opts.active);

		target.wrapInner('<div class="tabedelic-headers" />');
		headers = $('.tabedelic-headers', target);

		if ( opts.type=='accordion' ) {
			target.addClass('accordion').data('tab',false);
		} else {
			target.addClass('tabs');
		}

		$(opts.panel).each(function(){
			if ( opts.type=='accordion' ) {
				var inPan = opts.panel.index($(this));
				opts.header.eq(inPan).after($(this));
			} else {
				target.append($(this));
			}
			$(this).wrapInner('<div class="inner-panel" />').addClass('tabedelic-panel');
		});
		if ( opts.active != -1) {
			$(opts.panel).eq(opts.active).addClass('panel-active');
		}

		$(opts.header).each(function(){
			var ind = opts.header.index($(this));
			$(this)
			.addClass('tabedelic-header')
			.click(function(e){
				e.preventDefault();
				if (!$(this).hasClass('header-active')) {

					$(opts.header).removeClass('header-active');
					$(this).addClass('header-active');
					$(opts.panel).eq(ind).each(function(){
						var t = $(this),
							h = t.outerHeight(),
							w = t.outerWidth(),
							panActive = $(opts.panel).filter('.panel-active'),
							panNotActive = $(opts.panel).not().filter('.panel-active'),
							oldH = panActive.outerHeight(),
							trans;

						if ( opts.fx !== '' ) {
							var fx = opts.fx.split(',');
							fx = shuffle(fx);
							fx = fx[0];


							switch (fx) {
								case 'upwards':
									trans = { y: '-'+(h/2)+'px', opacity: 0 };
									break;
								case 'downwards':
									trans = { y: (h/2), opacity: 0 };
									break;
								case 'rightwards':
									trans = { x: (w/2), opacity: 0 };
									break;
								case 'leftwards':
									trans = { x: '-'+(w/2)+'px', opacity: 0 };
									break;
								case 'zoomout':
									trans = { scale: 1.15, opacity: 0 };
									break;
								case 'zoomin':
									trans = { scale: 0.85, opacity: 0 };
									break;
								default:
									trans = { opacity: 0 };
									break;
							}
						}

						target.find('.tabedelic-panel').css({ overflow: 'hidden' });

						if ( opts.fx === '' ) {
							$(opts.panel).removeClass('panel-active');
							t.addClass('panel-active');
							$(window).trigger('resize');
							$(window).trigger('shortcodelic_ev');
						} else {
							if ( target.hasClass('accordion') ) {
								t.css({ height:0 }).addClass('panel-active');
								panActive.css({ height:oldH }).transition({ height : 0 }, opts.speed, opts.easing);
								$('> .inner-panel', panNotActive).css({position : 'absolute'}).transition(trans, opts.speed/2, opts.easing);
								t.transition({ height : h }, opts.speed, opts.easing, function(){
									panActive.removeClass('panel-active');
									$(opts.panel).css({height:'auto'});
									$('> .inner-panel', opts.panel).css({position : 'relative'});
								});
								$('> .inner-panel', t).css(trans).transition({ scale: 1, opacity: 1, x: 0, y: 0 }, opts.speed, opts.easing, function(){ 
									target.find('.tabedelic-panel').css({ overflow: 'visible' }); 
									$(window).trigger('resize');
									$(window).trigger('shortcodelic_ev');
								});
							} else {
								panActive.css({ height : oldH });
								$('> .inner-panel', opts.panel).css({position : 'absolute'}).transition(trans, opts.speed/2, opts.easing);
								panActive.transition({ height : h }, opts.speed, opts.easing, function(){
									$(opts.panel).removeClass('panel-active').css({height:'auto'});
									t.addClass('panel-active').css({height:'auto'});
									$('> .inner-panel', opts.panel).css({position : 'relative'}).transition({ scale: 1, opacity: 1, x: 0, y: 0 }, opts.speed, opts.easing, function(){ target.find('.tabedelic-panel').css({ overflow: 'visible' });
										$(window).trigger('resize');
										$(window).trigger('shortcodelic_ev');
									 });
								});
							}
						}

					});
					/*var h = $(opts.panel).eq(ind).find('.inner-panel').actual('outerHeight');
					$(opts.panel).eq(ind).css({height:h});
					//if (Modernizr.csstransitions) {
						$(opts.panel).transition({
							scale: 1.15, opacity: 0
						}, opts.speed, opts.easing, function(){
							$(opts.panel).removeClass('panel-active')
								.eq(ind).addClass('panel-active');
							var h = $(opts.panel).eq(ind).actual('outerHeigth');

							/*	.transition({
								scale: 1, opacity: 1
							}, opts.speed, opts.easing);*/
						//});
					//}

				} else {
					if ( target.hasClass('accordion') ) {
						var t = $(this),
							h = t.outerHeight(),
							w = t.outerWidth(),
							panActive = $(opts.panel).filter('.panel-active'),
							oldH = panActive.outerHeight(),
							trans;
						if ( opts.fx === '' ) {
							t.removeClass('header-active');
							panActive.removeClass('panel-active');
							$(window).trigger('resize');
							$(window).trigger('shortcodelic_ev');
						} else {
							t.removeClass('header-active');
							panActive.css({ height:oldH }).transition({ height : 0 }, opts.speed, opts.easing, function(){
								panActive.removeClass('panel-active');
								$(opts.panel).css({height:'auto'});
								$(window).trigger('resize');
								$(window).trigger('shortcodelic_ev');
							});
						}
					}
				}
			});
		});

		/*if ( target.hasClass('simple') ) {
			var lineHeight = 0;
			$(opts.header).each(function(){
				var lH = $(this).outerHeight();
				lineHeight = lH > lineHeight ? lH : lineHeight;
			});
			$(opts.header).css({
				lineHeight : lineHeight+'px'
			});
		}*/

		if ( opts.active != -1) {
			$(opts.header).eq(opts.active).addClass('header-active');
		}

		var resizeTabs = function(){
			if ( opts.minwidth !== '' && !isNaN(parseFloat(opts.minwidth)) ) {
				if ( target.width() > parseFloat(opts.minwidth) && target.data('tab') === true && target.hasClass('accordion') ) {
					if ( target.hasClass('exsimple') ) {
						target.addClass('simple');
					}
					target.removeClass('accordion').addClass('tabs');
					$(opts.panel).each(function(){
						target.append($(this));
					});
				} else if ( target.width() <= parseFloat(opts.minwidth) && target.data('tab') === true && !target.hasClass('accordion') ) {
					target.removeClass('tabs').removeClass('simple').addClass('accordion');
					$(opts.panel).each(function(){
						var inPan = opts.panel.index($(this));
						opts.header.eq(inPan).after($(this));
					});
				}
			}

			var align, css;
			if ( target.hasClass('tabsleft') ) {
				align = 'left';
			} else {
				align = 'right';
			}
			if ( target.hasClass('columned') && !target.hasClass('accordion') ) {
				var wUl = parseFloat($(headers).outerWidth()),
					hUl = parseFloat($(headers).outerHeight()),
					border = parseFloat($(opts.header).css('border-'+align+'-width')),
					w = parseFloat(target.width())+border;
				css = {'width':w-wUl };
				css['margin-'+align] = '-'+(border+1)+'px';
				css['min-height'] = hUl;
				$(headers).css({width:wUl});
				$(opts.panel).css(css);
			} else {
				css = {'width':'100%' };
				css['margin-'+align] = 0;
				$(opts.panel).css(css);
			}
		};

		$(window).bind('resize load', function(){
			resizeTabs();
		}).triggerHandler('resize');

	});
};})(jQuery);

jQuery(function() {
	jQuery( ".pix_tabs" ).each(function(){
		var t = jQuery(this),
			active = parseFloat(t.data('active'))-1;
		t.tabedelic();
	});
});