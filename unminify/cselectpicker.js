$.fn.CSelectPicker = function(settings){
			
	var selectElem = this;

	if (selectElem) 
	{
		new CSP(settings);
	}else
		console.error('CSP - Not checked elem in setting');

	function CSP(settings)
	{
		var self = this;

		this.settings = {
			multiple: false,
			placehoder: 'Select you value'
		};

		this.createHtml = function()
		{

			if (selectElem.length) 
			{

				selectElem.val("");

				selectElem.wrap('<div class="CSP-wrapper"></div>').hide();

				$('.CSP-wrapper').append('<div class="CSP-select-window"><div class="CSP-label CSP-toggle-dropdown CSP-placehoder">'+this.settings.placehoder+'</div></div>');

				var items = {};

				selectElem.find('option').each(function(index, el) 
				{

					items[index] = {

						value: $(this).val(),

						text: $(this).text()

					}

				});

				if (!$.isEmptyObject(items)) 
				{

					$('.CSP-select-window').append('<div class="CSP-dropdown-window"></div>');

					$.each(items, function(index, item) {

						$('.CSP-dropdown-window').append('<div class="CSP-dropdown-item '+ (!self.settings.multiple ? "CSP-toggle-dropdown" : '') +' '+(!item.value ? 'CSP-empty' : '')+' '+(self.settings.itemsClass || '')+' " data-value="'+item.value+'">'+item.text+' </div>')
						
					});

					if (self.settings.maxDropdownItemsShow) 
					{

						var visibleHeight = 0,
							wrapperHeight = 0;

						$('.CSP-dropdown-item:lt('+self.settings.maxDropdownItemsShow+')').each(function(index, el) {
							visibleHeight +=$(this).outerHeight();
						});
						$('.CSP-dropdown-item').each(function(index, el) {
							wrapperHeight +=$(this).outerHeight();
						});

						var scollBarItemHeight = 100 / (wrapperHeight / visibleHeight);


						if (wrapperHeight != visibleHeight) 
						{
							$('.CSP-dropdown-window').height(visibleHeight).append('<div class="CSP-scrollbar-wrapper"><div class="CSP-scrollbar-item" style="height: '+scollBarItemHeight+'%;"></div></div>');

							var offsetToTop = 0;

							$('.CSP-dropdown-window').on('mousewheel', function(event) {
								var statusToScroll = (event.originalEvent.wheelDelta < 0) ? 'up' : 'down';


								if (statusToScroll == "up") {
									if ( offsetToTop > -(wrapperHeight - visibleHeight) ) {
										offsetToTop -= 29;
									}
								}else{
									if (offsetToTop < 0 ) {
										offsetToTop += 29;
									}
								}

								var offsetToScrollBar = (-offsetToTop) * (100 / wrapperHeight);

								$('.CSP-dropdown-item:first-child').css({'margin-top': offsetToTop+'px'});

								$('.CSP-scrollbar-item').css({'top': offsetToScrollBar+'%'})
							    
							    if (self.settings.onScrollDropdown) 
							    	self.settings.onScrollDropdown(statusToScroll);
							});

						}
						
					}

					$('.CSP-toggle-dropdown').click(function(event) {
						self.toogleDropDown(false);
					});

					$(document).click( function(event) { 
					    if( !$(event.target).closest('.CSP-toggle-dropdown').length && !$(event.target).is('.CSP-dropdown-item') && !$(event.target).is('.CSP-toggle-dropdown') && !$(event.target).is('.CSP-scrollbar-item') && $('.CSP-dropdown-window').hasClass('CSP-dropdown-window-show') ) 
					    {
					        self.toogleDropDown(true);
					    }        
					});

					var values = {};

					var label = $('.CSP-label');

					values[selectElem.attr('name')] = [];

					$('.CSP-dropdown-item').click(function(event) {

						var itemValue = $(this).data('value'),

						itemText = $(this).text();

						
						var option = selectElem.find('option[value="'+itemValue+'"]');

						if (self.settings.multiple) 
						{

							if (itemValue) {
								if ($(this).hasClass('CSP-active')) 
								{
									var i = values[selectElem.attr('name')].indexOf(''+itemValue+'');

									if(i != -1) 
										values[selectElem.attr('name')].splice(i, 1);

									$(this).removeClass('CSP-active')
								}
								else
								{
									
									values[selectElem.attr('name')].push(''+itemValue+'');

									$(this).addClass('CSP-active');
								}

								if (!values[selectElem.attr('name')].length) 
								{
									label.addClass('CSP-placehoder').text(self.settings.placehoder)
								}
								else
								{
									var text = "";

									$.each(values[selectElem.attr('name')], function(index, val) {

										text += '<span class="CSP-multiple-item-value">'+selectElem.find('option[value="'+val+'"]').text()+'<span class="CSP-remove-item" data-remove="'+val+'">&#10005</span></span>';

									});

									label.removeClass('CSP-placehoder').html(text);
								}

								selectElem.val(values[selectElem.attr('name')]);
							}
							
						}
						else
						{
							$('.CSP-dropdown-item').removeClass('CSP-active');

							if (!itemValue) 
								label.addClass('CSP-placehoder').text(self.settings.placehoder)
							else
								label.removeClass('CSP-placehoder').html('<span class="CSP-item-value">'+itemText+'</span>');

							if (option.length) 
							{
								selectElem.val(itemValue)
							}
							$(this).addClass('CSP-active');
						}

						if (self.settings.onChange) 
						{
							self.settings.onChange(selectElem);
						}

					});

					$(document).on('click', '.CSP-remove-item', function(event) {

						var dataRemove = $(this).data('remove');

						var elementToRemove = $('.CSP-dropdown-item[data-value="'+dataRemove+'"]');

						if (elementToRemove.hasClass('CSP-active')) 
						{
							elementToRemove.removeClass('CSP-active');

							var valuesSelect = self.removeToItemInArray(selectElem.val(), '"'+dataRemove+'"');

							var i = values[selectElem.attr('name')].indexOf(''+dataRemove+'');

							if(i != -1) 
								values[selectElem.attr('name')].splice(i, 1);

							if (!values[selectElem.attr('name')].length) 
							{
								label.addClass('CSP-placehoder').text(self.settings.placehoder)
							}

							selectElem.val(valuesSelect);

							$(this).parent('.CSP-multiple-item-value').remove();
						}

						


					});

				}else
					console.warn('CSP - Options is select is empty');

			}else
				console.error('CSP - Not found elem')
					
		}

		this.removeToItemInArray = function(array, remove){

			var i = array.indexOf(remove);
			if(i != -1) 
				array.splice(i, 1);

			return array;
		}

		this.toogleDropDown = function(status)
		{
			var dropdownWrapper = $('.CSP-dropdown-window');

			if (!status)
			{
				dropdownWrapper.toggleClass('CSP-dropdown-window-show');	
			} 
			else
			{
				dropdownWrapper.removeClass('CSP-dropdown-window-show');
			}

			if (self.settings.dropdownStatus) 
			{
				var status = $('.CSP-dropdown-window').hasClass('CSP-dropdown-window-show') ? 'open' : 'close';

				self.settings.dropdownStatus(status);
			}
		}

		construct(settings);

		function construct(settings)
		{
			if (!settings) 
				settings = {};

			$.extend(self.settings, settings);

			self.createHtml();

			if (settings.onReady) 
				settings.onReady();
		}
		
	}
};
