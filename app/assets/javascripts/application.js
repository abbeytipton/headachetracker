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
var no_chocolate = 100 - chocolate;
var no_dehydrated = 100 - dehydrated;
var no_overeating = 100 - overeating;
var no_period = 100 - period;
var no_exercise = 100 - exercise;
var no_eyestrain = 100 - eye_strain;
var no_lights = 100 - lights;
var no_sleep = 100 - sleep;
var no_stress = 100 - stressed;

console.log(eye_strain);

// All Symptoms chart set up and push to the right div //
var allSymptoms = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

	options: {
		responsive: true,
		maintainAspectRatio: false
	},
  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
  toolTip:{
    enabled: false,
  },
	axisY:{
 includeZero: true,
 },
	data: [{
		type: "column",
		explodeOnClick: false,
    percentFormatString: "#",
		showInLegend: true,
		legendText: "{label}",
    indexLabelFormatter: function(e){
				return e.dataPoint.label + " " + Math.round(e.dataPoint.y) + "%";
			},
    total: total,
		indexLabel: "{label}: ",
		dataPoints: [
			{ x: 1, label: "Chocolate", y: chocolate, click: clickChocolate },
      { x: 2, label: "Alcohol", y: alcohol, click: clickAlcohol},
      { x: 3, label: "Stress", y: stressed, click: clickStress },
      { x: 4, label: "Lack of Sleep", y: sleep, click: clickSleep },
      { x: 5, label: "Bright Lights", y: lights, click: clickLights },
      { x: 6, label: "Eye Strain", y: eye_strain, click: clickEyestrain },
      { x: 7, label: "Over Exercising", y: exercise, click: clickExercise },
      { x: 8, label: "During Period", y: period, click: clickPeriod },
      { x: 9, label: "Overeating", y: overeating, click: clickOvereating },
			{ x: 10, label: "Dehydration", y: dehydrated, click: clickDehydrated },
			{ x: 11, label: "Medicine", y: medicine_helped, click: clickMedicine }
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
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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

// Chocolate chart set up and push to the right div //
var chocolateGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Had Chocolate Before the Headache", y: chocolate },
			{ label: "You Didn't Have Chocolate Before the Headache", y: no_chocolate }
		]
	}]
};
$("#chocolateSymptoms").CanvasJSChart(chocolateGraph);

// Dehydrated chart set up and push to the right div //
var dehydratedGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Were Dehydrated Before the Headache", y: dehydrated },
			{ label: "You Weren't Dehydrated Before the Headache", y: no_dehydrated }
		]
	}]
};
$("#dehydratedSymptoms").CanvasJSChart(dehydratedGraph);

// Overeating chart set up and push to the right div //
var overeatingGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Were Overeating Before the Headache", y: overeating },
			{ label: "You Weren't Overeating Before the Headache", y: no_overeating }
		]
	}]
};
$("#overeatingSymptoms").CanvasJSChart(overeatingGraph);

// Period chart set up and push to the right div //
var periodGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Were on Your Period Before/During the Headache", y: period },
			{ label: "You Weren't on Your Period Before/During the Headache", y: no_period }
		]
	}]
};
$("#periodSymptoms").CanvasJSChart(periodGraph);

// Exercise chart set up and push to the right div //
var exerciseGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Were Over Excercising Before the Headache", y: exercise },
			{ label: "You Weren't Over Exercising Before the Headache", y: no_exercise }
		]
	}]
};
$("#exerciseSymptoms").CanvasJSChart(exerciseGraph);

// Eyestrain chart set up and push to the right div //
var eyestrainGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Experienced Eyestrain Before the Headache", y: eye_strain },
			{ label: "You Didnt't Experience Eyestrain Before the Headache", y: no_eyestrain }
		]
	}]
};
$("#eyestrainSymptoms").CanvasJSChart(eyestrainGraph);

// Lights chart set up and push to the right div //
var lightsGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Experienced Bright Lights Before the Headache", y: lights },
			{ label: "You Didnt't Experience Bright Lights Before the Headache", y: no_lights }
		]
	}]
};
$("#lightsSymptoms").CanvasJSChart(lightsGraph);

// Sleep chart set up and push to the right div //
var sleepGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Experienced Lack of Sleep Before the Headache", y: sleep },
			{ label: "You Didnt't Experience Lack of Sleep Before the Headache", y: no_sleep }
		]
	}]
};
$("#sleepSymptoms").CanvasJSChart(sleepGraph);

// Stress chart set up and push to the right div //
var stressGraph = {

	animationEnabled: true,
  backgroundColor: "transparent",

	title: {
		text: ""
	},
	width:500,
	height: 400,

  legend: {
		maxWidth: 350,
		itemWidth: 120
	},
	options: {
		responsive: true,
		maintainAspectRatio: false
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
			{ label: "You Experienced Stress Before the Headache", y: stressed },
			{ label: "You Didnt't Experience Stress Before the Headache", y: no_stress }
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

}
