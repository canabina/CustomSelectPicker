# CustomSelectPicker
Very small jquery plugin for customize you selectpickers

Requirements 
------------

Jquery 2.0 and higher


Usage
------------
Include minify or unminify plugin assets in head tag

**Example**
```HTML
<html>
  <head>
    //Jquery require
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    
    //Plugin assets
    <link rel="stylesheet" href="cselectpicker.min.css" type='text/css'/>
    <script src="cselectpicker.min.js" type="text/javascript"></script>
  </head>
  <body>
  
    <select name='example'>
  		<option value="">No selected</option>
  		<option value="first">first</option>
  		<option value="second">second</option>
  	</select>
  	
	//Init plugin	
  	<script type="text/javascript">
  	  $('select').CSelectPicker();
  	</script>
		
  </body>
</html>
```

Options and Events example
------------
```JavaScript
$('select').CSelectPicker({
	//Optionals
	placehoder: 'Select your value',
	multiple: true,
	itemsClass: 'my-custom-class',
	maxDropdownItemsShow: 7,

	//Events  
	onChange: function(element){
		// console.log('Value selectbox is - ('+element.val()+')');
	},
	onReady: function(){
		// console.log('Plugin is Ready');
	},
	onScrollDropdown: function(status){
		// console.log('Dropdown scrolling is - ('+status+')')
	},
	dropdownStatus: function(status){
		// console.log('Dropdown status is - ('+status+')');
	},
});
```
Events 
------------
| Event name  | description |
| ------------- | ------------- |
| onChange  | Call when select change state. Takes jquery object select element |
| onReady  | Call when plugin redy to work. Nothin takes |
| onScrollDropdown  | Call when in dropdown happens scroll event. Takes state on scroll in dropdown (up or down)  |
| dropdownStatus  | Call when dropdown change state. Takes state in dropdown (show or hide)  |

Options 
------------
| Option name  | description |
| ------------- | ------------- |
| placehoder  | (string) Placeholder text in selectpicker. No required |
| multiple  | (boolean) Change selectpicker on multiselect.  No required |
| itemsClass  |  (string) Added custom class in the item-option on dropdown window.  No required  |
| maxDropdownItemsShow  | (number) Sets max number to show option items in dropdown window. Create scrollbar .No required   |


