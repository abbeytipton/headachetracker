// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery3
//= require activestorage
//= require turbolinks
//= require_tree .

window.onload = function () {

// Hover function for the divs holding each graph //
//$('.children').hover(function() {
//	$(this).toggleClass("childrenHover");
//});

// Access the spans in the HTML to get each piece of info about the user //
// Multiply by 100 so it will show up as percentage correctly //
var total = $('#total').text();
var chocolate = $('#chocolate').text() / total * 100;
var dehydrated = $('#dehydrated').text() / total * 100;
var alcohol = $('#alcohol').text() / total * 100;
var stressed = $('#stressed').text() / total * 100;
var sleep = $('#sleep').text() / total * 100;
var lights = $('#lights').text() / total * 100;
var eye_strain = $('#eye_strain').text() / total * 100;
var exercise = $('#exercise').text() / total * 100;
var period = $('#period').text() / total * 100;
var overeating = $('#overeating').text() / total * 100;
var medicine = $('#medicine').text();
var medicine_helped = $('#medicine_helped').text() / medicine * 100;
var medicine_didnt_help = 100 - medicine_helped;
var no_alcohol = 100 - alcohol;

// All Symptoms chart set up and push to the right div //
var allSymptoms = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
  toolTip:{
    enabled: false,
  },
	data: [{
		type: "doughnut",
    percentFormatString: "#",
		innerRadius: "30%",
		showInLegend: true,
		legendText: "{label}",
    indexLabelFormatter: function(e){
				return e.dataPoint.label + " " + Math.round(e.dataPoint.y) + "%";
			},
    total: total,
		indexLabel: "{label}: ",
		dataPoints: [
			{ label: "Chocolate", y: chocolate },
      { label: "Alcohol", y: alcohol },
      { label: "Stress", y: stressed },
      { label: "Lack of Sleep", y: sleep },
      { label: "Bright Lights", y: lights },
      { label: "Eye Strain", y: eye_strain },
      { label: "Over Exercising", y: exercise },
      { label: "During Period", y: period },
      { label: "Overeating", y: overeating },
			{ label: "Dehydration", y: dehydrated }
		]
	}]
};
$("#allSymptoms").CanvasJSChart(allSymptoms);

// Medicine chart set up and push to the right div //
var medicineGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
  toolTip:{
    enabled: false,
  },
	data: [{
		type: "doughnut",
    percentFormatString: "#",
		innerRadius: "30%",
		showInLegend: true,
		legendText: "{label}",
    indexLabelFormatter: function(e){
				return e.dataPoint.label + " " + Math.round(e.dataPoint.y) + "%";

			},
    total: total,
		indexLabel: "{label}: ",
		dataPoints: [
			{ label: "Medicine Helped", y: medicine_helped },
			{ label: "Medicine Didn't Help", y: medicine_didnt_help }
		]
	}]
};
$("#medicineSymptoms").CanvasJSChart(medicineGraph);

// Alcohol chart set up and push to the right div //
var alcoholGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
  toolTip:{
    enabled: false,
  },
	data: [{
		type: "doughnut",
    percentFormatString: "#",
		innerRadius: "30%",
		showInLegend: true,
		legendText: "{label}",
    indexLabelFormatter: function(e){
				return e.dataPoint.label + " " + Math.round(e.dataPoint.y) + "%";

			},
    total: total,
		indexLabel: "{label}: ",
		dataPoints: [
			{ label: "You Had Alcohol Before the Headache", y: alcohol },
			{ label: "You Didn't Have Alcohol Before the Headache", y: no_alcohol }
		]
	}]
};
$("#alcoholSymptoms").CanvasJSChart(alcoholGraph);

}
