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
		row.append("td").text(_data[i].shape.toUpperCase());
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


var button = document.getElementById("filter-btn");

var input = document.getElementById("datetime");

// var filtered_dates = data.filter(filter_dates);

button.addEventListener("click", function() {
	if(input.value.length > 0 && date_check(input.value)) {
		erase_table();
		var filtered_data = ufo_data.filter(function(_data) {
			return _data.datetime === input.value;
		});
		fill_table(filtered_data);	
	}
	else {

		var available_dates = ufo_data.map(item => item.datetime).filter((value, index, self) => self.indexOf(value) === index)
		// alert_str = 'The date is not valid. Please select the available date. Available dates are {}'.format(available_dates); 
		alert("Your input date is not present in our database. Please choose from available dates below: \n" + available_dates.join("\n"));
	}
	

})

fill_table(ufo_data);