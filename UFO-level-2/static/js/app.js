// from data.js

ufo_data = data;

// Use d3 to create a bootstrap striped table

var table = d3.select("table");

// Use d3 to create a bootstrap striped table...This is already done in html file but is a good practice to have this piece of code
// http://getbootstrap.com/docs/3.3/css/#tables-striped
table.attr("class", "table table-striped");

// Use D3 to select the table body


function create_row(){

		var tbody = d3.select('#tbody');
		var row = tbody.append('tr');	
		return row;
}


function fill_table(_data){

	for (var i = 0; i < _data.length; i++){
		row = create_row()

		row.append("td").text(_data[i].datetime);
		row.append("td").text(_data[i].city.replace( /\b./g, function(a){ return a.toUpperCase(); } ));
		row.append("td").text(_data[i].state.toUpperCase());
		row.append("td").text(_data[i].country.toUpperCase());
		row.append("td").text(_data[i].shape);
		row.append("td").text(_data[i].durationMinutes);
		row.append("td").text(_data[i].comments);

	}

}



function erase_table(){
	
	// Remove elements in table before populating filtered data

	table = d3.select("#tbody")
	rows = table.selectAll("tr").remove();

}

function date_check(date){
	for (var i = 0; i < ufo_data.length; i++){
		if (ufo_data[i].datetime === date){
			return true;
		}
	}
	return false;
}

function city_check(city){
	for (var i = 0; i < ufo_data.length; i++){
		if (ufo_data[i].city === city){
			return true;
		}
	}
	return false;
}

function state_check(state){
	for (var i = 0; i < ufo_data.length; i++){
		if (ufo_data[i].state === state){
			return true;
		}
	}
	return false;
}

function country_check(country){
	for (var i = 0; i < ufo_data.length; i++){
		if (ufo_data[i].country === country){
			return true;
		}
	}
	return false;
}

function shape_check(shape){
	for (var i = 0; i < ufo_data.length; i++){
		if (ufo_data[i].shape === shape){
			return true;
		}
	}
	return false;
}

var button = d3.select("#filter-btn");
var input = d3.select("#datetime");


button.on("click", function() {
	dataset_chosen = d3.select("#sel_data").node().value;
	console.log(dataset_chosen);
	if (dataset_chosen === "date"){
		if(input.property("value").length > 0 && date_check(input.property("value"))) {
			erase_table();
			var filtered_data = ufo_data.filter(function(_data) {
				return _data.datetime === input.property("value");
			});
			fill_table(filtered_data);	
		}
		else {

			var available_dates = ufo_data.map(item => item.datetime).filter((value, index, self) => self.indexOf(value) === index)
			// alert_str = 'The date is not valid. Please select the available date. Available dates are {}'.format(available_dates); 
			alert("Your input date is not present in our database. Please choose from available dates below: \n" + available_dates.join("\n"));
		}
	}

	else if (dataset_chosen === "city"){
		if(input.property("value").length > 0 && city_check(input.property("value"))) {
			erase_table();
			var filtered_data = ufo_data.filter(function(_data) {
				return _data.city === input.property("value");
			});
			fill_table(filtered_data);	
		}
		else {

			var available_cities = ufo_data.map(item => item.city).filter((value, index, self) => self.indexOf(value) === index)
			// alert_str = 'The date is not valid. Please select the available date. Available dates are {}'.format(available_dates); 
			alert("Your input city is not present in our database. Please choose from available cities below: \n" + available_cities.join("\n"));
		}
	}

	else if (dataset_chosen === "state"){
		if(input.property("value").length > 0 && state_check(input.property("value"))) {
			erase_table();
			var filtered_data = ufo_data.filter(function(_data) {
				return _data.state === input.property("value");
			});
			fill_table(filtered_data);	
		}
		else {

			var available_states = ufo_data.map(item => item.state).filter((value, index, self) => self.indexOf(value) === index)
			// alert_str = 'The date is not valid. Please select the available date. Available dates are {}'.format(available_dates); 
			alert("Your input state is not present in our database. Please choose from available states below: \n" + available_states.join("\n"));
		}
	}

	else if (dataset_chosen === "country"){
		if(input.property("value").length > 0 && country_check(input.property("value"))) {
			erase_table();
			var filtered_data = ufo_data.filter(function(_data) {
				return _data.country === input.property("value");
			});
			fill_table(filtered_data);	
		}
		else {

			var available_countries = ufo_data.map(item => item.country).filter((value, index, self) => self.indexOf(value) === index)
			// alert_str = 'The date is not valid. Please select the available date. Available dates are {}'.format(available_dates); 
			alert("Your input country is not present in our database. Please choose from available countries below: \n" + available_countries.join("\n"));
		}
	}
	else {
		if(input.property("value").length > 0 && shape_check(input.property("value"))) {
			erase_table();
			var filtered_data = ufo_data.filter(function(_data) {
				return _data.shape === input.property("value");
			});
			fill_table(filtered_data);	
		}
		else {

			var available_shapes = ufo_data.map(item => item.shape).filter((value, index, self) => self.indexOf(value) === index)
			// alert_str = 'The date is not valid. Please select the available date. Available dates are {}'.format(available_dates); 
			alert("Your input shape is not present in our database. Please choose from available shapes below: \n" + available_shapes.join("\n"));
		}
	}
	

})


// Change label and PlaceHolder values
d3.selectAll("#sel_data").on("change", function jsFunction(){
	// var dropdownMenu = d3.select("#sel_data")
	// var dataset = dropdownMenu.property("value");
	dataset = d3.select(this).property("value");
	console.log(dataset);
	var label = d3.select("#custom_label");
	if (dataset === 'date'){
		label.node().innerHTML = "Enter a Date";
		input.attr("placeholder", ufo_data[0].datetime);
	}
	else if (dataset === 'city'){
		label.node().innerHTML = "Enter a City";
		input.attr("placeholder", ufo_data[0].city);		
	}
	else if (dataset === 'state'){
		label.node().innerHTML = "Enter a State";
		input.attr("placeholder", ufo_data[0].state);		
	}
	else if (dataset === 'country'){
		label.node().innerHTML = "Enter a Country";		
		input.attr("placeholder", ufo_data[0].country);
		
	}
	else {
		label.node().innerHTML = "Enter a Shape";
		input.attr("placeholder", ufo_data[0].shape);		
		
	}
	
});

// function jsFunction(){
// 	var dropdownMenu = d3.select("#sel_data")
// 	var dataset = dropdownMenu.property("value");
// 	console.log(dataset)
// }

fill_table(ufo_data);