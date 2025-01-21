/* Page config --> Begin */

var config = {
	skin : {
		colors: {
			name : 'Theme Color',
			id : 'theme_color',
			list : {
				1 : {
					name : 'color 1',
					className : 'color-1',
					color : '#63c3d7'
				},
				2 : {
					name : 'color 2',
					className : 'color-2',
					color : '#61b4ba'
				},
				3 : {
					name : 'color 3',
					className : 'color-3',
					color : '#3476A6'
				},
				4 : {
					name : 'color 4',
					className : 'color-4',
					color : '#827b71'
				},
				5 : {
					name : 'color 5',
					className : 'color-5',
					color : '#8ec954'
				},
				6 : {
					name : 'color 6',
					className : 'color-6',
					color : '#bac637'
				},
				7 : {
					name : 'color 7',
					className : 'color-7',
					color : '#bf4423'
				},
				8 : {
					name : 'color 8',
					className : 'color-8',
					color : '#cc6a28'
				},
				9 : {
					name : 'color 9',
					className : 'color-9',
					color : '#7c291c'
				},
				10 : {
					name : 'color 10',
					className : 'color-10',
					color : '#d8b929'
				}
			}
		}	
	},
	styles : {
		headingStyle : {
			name : 'Heading Font',
			id : 'heading_style',
			list : {
				1 : {
					name : 'Open Sans',
					className : 'h-style-1'
				},
				2 : {
					name : 'Oswald',
					className : 'h-style-2'
				},
				3 : {
					name : 'Lato',
					className : 'h-style-3'
				},
				4 : {
					name : 'Ubuntu',
					className : 'h-style-4'
				}
				
			}
		},
		textStyle : {
			name : 'Content Font',
			id : 'text_style',
			list : {
				1 : {
					name : 'Arial',
					className : 'text-1'
				},
				2 : {
					name : 'Tahoma',
					className : 'text-2'
				},
				3 : {
					name : 'Verdana',
					className : 'text-3'
				}
			}
		}
	}
}

/* Config --> End */

jQuery(document).ready(function($){

	/* Theme controller --> Begin */

	var $body = $('body'),
		$themePanel = $('<div id="control_panel" />').addClass('control_panel'),
		$theme_control_panel_label = $('<a href="#" id="control_label" />');
		$themePanel.append($theme_control_panel_label);
		
	var $color = $.cookie('color'),
		$heading = $.cookie('heading'),
		$text = $.cookie('text');
		
	function changeBodyClass(className, classesArray) {
		$.each(classesArray,function(idx, val) {
			$body.removeClass(val);
		});
		$body.addClass(className);
	}
	

	if (typeof config != 'undefined' && $themePanel) {
		
		var defaultSettings = {};
		
		if (config.skin) {
			var $block_skin;
			var $label_skin;
			var $ul;
			var html_skin;
			var theme_classes = [];
			$.each(config.skin, function(index, value) {
				$block_skin = $('<div/>').addClass('style_block').attr({
					id : value.id
				});
				$label_skin = $('<span>' + value.name + '</span>');
				$ul = $('<ul/>');
				html_skin = '';
				$.each(value.list,function(skin_list_idx, skin_list_val) {
					html_skin += '<li class="'+ skin_list_val.className +'" value="' + skin_list_val.className + '"><a  href="' + skin_list_val.className + '" style="background-color: ' + skin_list_val.color  + '">' + skin_list_val.name + '</a></li>';
					defaultSettings[index] = skin_list_idx;
					theme_classes.push(skin_list_val.className);
				});
				$ul.html(html_skin);
				$block_skin.append($label_skin, $ul);
				$themePanel.append($block_skin);
				
				$block_skin.find('a').click(function() {

					var nextClassName = $(this).attr('href');
					
					$.cookie('color', nextClassName);

					if (!$body.hasClass(nextClassName)) {
						changeBodyClass(nextClassName, theme_classes);
						$block_skin.find('.active').removeClass('active');
						$(this).parent().addClass('active');			
					}
					return false;
				});	
				
				if($color) {
					if (!$body.hasClass($color)) {
						$body.removeClass(theme_classes).addClass($color);
					}
				}
							
			});
			
		}

		if (config.styles) {
			var $block_styles;
			var $label_styles;
			var $select;
			var html_styles;
			var headingStyle = [];
			var textStyle = [];
			$.each(config.styles, function(idx, val) {
				$block_styles = $('<div/>').addClass('style_block').attr({
					id : val.id
					});
				$label_styles = $('<span>' + val.name + '</span>');
				$select = $('<select/>');
				html_styles = '';
				$.each(val.list,function(list_idx, list_val) {
					if ($body.hasClass(list_val.className)) {
						html_styles += '<option class="'+ list_val.className +'" value="' + list_val.className + '" selected>' + list_val.name + '</option>';
						defaultSettings[idx] = list_idx;
					} else {
						html_styles += '<option class="'+ list_val.className +'" value="' + list_val.className + '">' + list_val.name + '</option>';
					}
				});
				$select.html(html_styles);
				$block_styles.append($label_styles, $select);
				$themePanel.append($block_styles);
			});
			
			
		}
		
		/* Reset Settings  --> Begin */
	
		var setDefaultsSettings = function() {
			$.cookie('color', null);
			$.cookie('heading', null);
			$.cookie('text', null);
			$themePanel.find('select').val(0);
			changeBodyClass(config.skin.colors.list[defaultSettings.headingStyle].className, theme_classes);
			changeBodyClass(config.styles.headingStyle.list[defaultSettings.headingStyle].className, headingStyle);
			changeBodyClass(config.styles.textStyle.list[defaultSettings.textStyle].className, textStyle);
			$themePanel.find('.active').removeClass();
			return false;
		};

		var $restore_button_wrapper = $('<div/>').addClass('restore_button_wrapper');
		var $restore_button = $('<a/>').text('Reset').attr('id','restore_button').addClass('button default small').click(setDefaultsSettings);
		$restore_button_wrapper.append($restore_button);
		$themePanel.append($restore_button_wrapper);

		/* Reset Settings  --> Begin */

		
		/* Control Panel Label --> Begin */		

		$theme_control_panel_label.click(function() {
			if ($themePanel.hasClass('visible')) {
				$themePanel.animate({
					left: -220
				}, 400, function() {
					$themePanel.removeClass('visible');
				});
			} else {
				$themePanel.animate({
					left: 0
				}, 400, function() {
					$themePanel.addClass('visible');
				});
			}
			return false;
		});
		
		/* Control Panel Label --> End */
	
	}
		
	$body.append($themePanel);
	
	/* Heading Fonts --> Begin */
	
	$.each(config.styles.headingStyle.list, function(idx, val) {
		headingStyle.push(val.className);
	});
	
	jQuery('#heading_style select').change(function() {
		$.cookie('heading', $(this).val());
		
		if (!$body.hasClass($(this).val())) {
			changeBodyClass($(this).val(), headingStyle);
		}
	});

	function addHeadingFont() {
		changeBodyClass($heading,headingStyle);
	}
	if ($heading) addHeadingFont();

	/* Text Fonts --> Begin */

	$.each(config.styles.textStyle.list, function(idx, val) {
		textStyle.push(val.className);
	});

	$('#text_style select').change(function() {
		$.cookie('text', $(this).val());
		if (!$body.hasClass($(this).val())) {
			changeBodyClass($(this).val(), textStyle);
		}
	});

	function addTextFont() {
		changeBodyClass($text,textStyle);
	}
	if ($text) addTextFont();	
	
/* Theme controller --> End */

});
