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

$(document).on('turbolinks:load', function() {

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
var medicine_helped = $('#medicine_helped').text() / total * 100;
var medicine_didnt_help = 100 - medicine_helped;
var no_alcohol = 100 - alcohol;
var no_chocolate = 100 - chocolate;
var no_dehydrated = 100 - dehydrated;
var no_overeating = 100 - overeating;
var no_period = 100 - period;
var no_exercise = 100 - exercise;
var no_eyestrain = 100 - eye_strain;
var no_lights = 100 - lights;
var no_sleep = 100 - sleep;
var no_stress = 100 - stressed;

var x = ['Chocolate', 'Alcohol', 'Stress', 'Bright Lights', 'Eye Strain', 'Over Exercising', 'During Period', 'Overeating', 'Dehydration', 'Medicine Helped'];
var y = [chocolate, alcohol, stressed, lights, eye_strain, exercise, period, overeating, dehydrated, medicine_helped ];

var myPlot = document.getElementById('allSymptoms'),
data = [
  {
    x: x,
    y: y,
    type: 'bar',
		marker:{
    color: ['red', 'green', 'blue', 'orange', 'white', 'pink', 'purple', 'brown', 'grey', 'teal']
  },
		hovertemplate:
            "You experienced %{x} before or during a headache %{y} % of the time.<extra></extra>"
  }
],
layout = {
			plot_bgcolor:"transparent",
      paper_bgcolor:"transparent",
			autosize: false,
  		width: 600,
  		height: 400,
			title: "All Triggers",
			hovermode: "closest",
      hoverlabel: {
										width: 75,
										height: 150,
										bgcolor: "#e3e0cc",
										bordercolor: "#e3e0cc",
										font: {color: 'black'}
										},
		 yaxis: {
				 fixedrange: true,
				 range: [0, 100],
				 showTickLabels: false,
				 tickmode: "linear",
    		tick0: 0,
    		dtick: 10,
				 title: "Percentage of the Time This Trigger<br> Was Present Before or During a Headache<br>"
		 },
		 xaxis: {
			  tickangle: 90
		 },
 },
 options = {
		 scrollZoom: false,
		 showLink: false,
		 displaylogo: false,
		 modeBarButtonsToRemove: [
				 'sendDataToCloud',
				 'zoom2d',
				 'pan',
				 'pan2d',
				 'autoScale2d',
				 'lasso2d',
				 'autoScale2d',
				 'resetScale2d',
				 'toggleSpikelines',
				 'dragmode',
				 'select2d',
				 'hoverClosestCartesian',
				 'hoverCompareCartesian',
				 'displaylogo'
		 ]
 };

Plotly.newPlot('allSymptoms', data, layout, options);
myPlot.on('plotly_click', function(d){

var passedData = d.points[0].data.x[d.points[0].pointNumber];
if (passedData == "Alcohol") {
	clickAlcohol();
}
else if (passedData == "Medicine Helped") {
	clickMedicine();
}
else if (passedData == "Chocolate") {
	clickChocolate();
}
else if (passedData == "Stress") {
	clickStress();
}
else if (passedData == "Bright Lights") {
	clickLights();
}
else if (passedData == "Eye Strain") {
	clickEyestrain();
}
else if (passedData == "Over Exercising") {
	clickExercise();
}
else if (passedData == "During Period") {
	clickPeriod();
}
else if (passedData == "Overeating") {
	clickOvereating();
}
else if (passedData == "Dehydration") {
	clickDehydrated();
}
else if (passedData == "Dehydration") {
	clickDehydrated();
}
});

dragLayer = document.getElementsByClassName('nsewdrag')[0]

myPlot.on('plotly_hover', function(data){
  dragLayer.style.cursor = 'pointer'
});

myPlot.on('plotly_unhover', function(data){
  dragLayer.style.cursor = ''
});

// Medicine chart set up and push to the right div //
var medicineGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: medicine_helped, toolTipContent: "Medicine helped your headache {y}% of the time", label: "Medicine helped your headache" },
			{  y: medicine_didnt_help,toolTipContent: "Medicine didn't help your headache {y}% of the time", label: "Medicine didn't help your headache" }
		]
	}]
	};
$("#medicineSymptoms").CanvasJSChart(medicineGraph);

// Alcohol chart set up and push to the right div //
var alcoholGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + e.dataPoint.y + "% of the time";
			},
		dataPoints: [
			{  y: alcohol, toolTipContent: "You drank alcohol before the headache {y}% of the time", label: "You drank alcohol before the headache" },
			{  y: no_alcohol,toolTipContent: "You didn't drink alcohol before the headache {y}% of the time", label: "You didn't drink alcohol before the headache" }
		]
	}]
	};
$("#alcoholSymptoms").CanvasJSChart(alcoholGraph);

// Chocolate chart set up and push to the right div //
var chocolateGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: chocolate, toolTipContent: "You ate chocolate before the headache {y}% of the time", label: "You ate chocolate before the headache" },
			{  y: no_chocolate,toolTipContent: "You didn't eat chocolate before the headache {y}% of the time", label: "You didn't eat chocolate before the headache" }
		]
	}]
	};
$("#chocolateSymptoms").CanvasJSChart(chocolateGraph);

// Dehydrated chart set up and push to the right div //
var dehydratedGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: dehydrated, toolTipContent: "You experienced dehydration before the headache {y}% of the time", label: "You experienced dehydration before the headache" },
			{  y: no_dehydrated,toolTipContent: "You didn't experience dehydration before the headache {y}% of the time", label: "You didn't experience dehydration before the headache" }
		]
	}]
	};
$("#dehydratedSymptoms").CanvasJSChart(dehydratedGraph);

// Overeating chart set up and push to the right div //
var overeatingGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: overeating, toolTipContent: "You were overeating before the headache {y}% of the time", label: "You were overeating before the headache" },
			{  y: no_overeating,toolTipContent: "You weren't overeating before the headache {y}% of the time", label: "You weren't overeating before the headache" }
		]
	}]
	};
$("#overeatingSymptoms").CanvasJSChart(overeatingGraph);

// Period chart set up and push to the right div //
var periodGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: period, toolTipContent: "You were on your period before/during the headache {y}% of the time", label: "You were on your period before/during the headache" },
			{  y: no_period,toolTipContent: "You weren't on your period before/during the headache {y}% of the time", label: "You weren't on your period before/during the headache" }
		]
	}]
	};
$("#periodSymptoms").CanvasJSChart(periodGraph);

// Exercise chart set up and push to the right div //
var exerciseGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: exercise, toolTipContent: "You exercised before the headache {y}% of the time", label: "You exercised before the headache" },
			{  y: no_exercise,toolTipContent: "You didn't exercise before the headache {y}% of the time", label: "You didn't exercise before the headache" }
		]
	}]
	};
$("#exerciseSymptoms").CanvasJSChart(exerciseGraph);

// Eyestrain chart set up and push to the right div //
var eyestrainGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: eye_strain, toolTipContent: "You experienced eyestrain before the headache {y}% of the time", label: "You experienced eyestrain before the headache" },
			{  y: no_eyestrain,toolTipContent: "You didn't experience eyestrain before the headache {y}% of the time", label: "You didn't experience eyestrain before the headache" }
		]
	}]
	};
$("#eyestrainSymptoms").CanvasJSChart(eyestrainGraph);

// Lights chart set up and push to the right div //
var lightsGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: lights, toolTipContent: "You experienced bright lights before the headache {y}% of the time", label: "You experienced bright lights before the headache" },
			{  y: no_lights,toolTipContent: "You didn't experience bright lights before the headache {y}% of the time", label: "You didn't experience bright lights before the headache" }
		]
	}]
	};
$("#lightsSymptoms").CanvasJSChart(lightsGraph);

// Sleep chart set up and push to the right div //
var sleepGraph = {
	animationEnabled: false,
	backgroundColor: "transparent",
	width: 600,
	height: 400,
	toolTip:{
		enabled: true,
	},
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: sleep, toolTipContent: "You experienced lack of sleep before the headache {y}% of the time", label: "You experienced lack of sleep before the headache" },
			{  y: no_sleep,toolTipContent: "You didn't experience lack of sleep before the headache {y}% of the time", label: "You didn't experience lack of sleep before the headache" }
		]
	}]
	};
$("#sleepSymptoms").CanvasJSChart(sleepGraph);

// Stress chart set up and push to the right div //
var stressGraph = {
	animationEnabled: false,
  backgroundColor: "transparent",
	width: 600,
	height: 400,
  toolTip:{
    enabled: true,
  },
	data: [{
		type: "doughnut",
		innerRadius: "30%",
		indexLabelFormatter: function(e){
				return e.dataPoint.label + ": " + Math.round(e.dataPoint.y) + "% of the time";
			},
		dataPoints: [
			{  y: stressed, toolTipContent: "You experienced stress before the headache {y}% of the time", label: "You experienced stress before the headache" },
			{  y: no_stress,toolTipContent: "You didn't experience stress before the headache {y}% of the time", label: "You didn't experience stress before the headache" }
		]
	}]
};
$("#stressSymptoms").CanvasJSChart(stressGraph);

// Click functions for each piece of the all triggers pie //
function clickAlcohol(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#alcoholHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickChocolate(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#chocolateHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickDehydrated(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#dehydratedHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickOvereating(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#overeatingHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickPeriod(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#periodHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickExercise(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#exerciseHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickEyestrain(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#eyestrainHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickLights(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#lightsHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickSleep(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#sleepHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickStress(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#stressHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

function clickMedicine(e) {
	$('.children').fadeOut().promise().done(function () {
    $("#medicineHolder").fadeIn(1000);
		$("#triggerHolder").fadeIn(1000);
});
};

// Toggle the dropdown menu button to show/hide the menu when the button is clicked //
$(document).on("click", "#moreClick", function(e){
  $("#dropdownMenu").toggle();
});

// Modal functions for the instructions and total headaches links //
// Get the modal
var modal = document.getElementById("Modal");

// Get the p inside the modal for text to be placed in //
var p = document.getElementById("pInsideModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Click function for instructions link from drop down menu //
$(document).on("click", "#totalClick", function(e){
  modal.style.display = "block";
	p.innerHTML = "You have logged " + total + " headaches so far.";
});

});
