var scTooltipster = function(){
	jQuery('[data-tooltip]').each(function(){
		var t = jQuery(this),
			content = t.data('tooltip'),
			opts = t.data('ttopts'),
			maxwidth = typeof opts.maxwidth != 'undefined' && opts.maxwidth !== '' ? opts.maxwidth : 0,
			animation = typeof opts.animation != 'undefined' && opts.animation !== '' ? opts.animation : 'grow',
			interactive = typeof opts.interactive != 'undefined' && opts.interactive !== '' ? eval(opts.interactive) : false,
			position = typeof opts.position != 'undefined' && opts.position !== '' ? opts.position : 'top',
			speed = typeof opts.speed != 'undefined' && opts.speed !== '' ? opts.speed : 220;
		jQuery('<div />').html(content);
		t.tooltipster({
			animation: animation,
			content: content,
			maxWidth: maxwidth,
			interactive: interactive,
			position: position,
			speed: speed,
			theme: '.tooltipster-default'/*from admin panel*/
		});
	});
};

jQuery(document).ready(function(){
	scTooltipster();
});
jQuery(window).bind('sc_tooltipster',function(){
	scTooltipster();
});
