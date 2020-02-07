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


// All Symptoms (Trigger) graph - these are x and y coordinates //
var xAllSymptoms = ['Chocolate', 'Alcohol', 'Stress', 'Bright Lights', 'Eye Strain', 'Over Exercising', 'During Period', 'Overeating', 'Dehydration', 'Medicine Helped'];
var yAllSymptoms = [chocolate, alcohol, stressed, lights, eye_strain, exercise, period, overeating, dehydrated, medicine_helped ];
// Get the div where the graph goes //
if (document.getElementById('allSymptoms') != null) {
var AllSymptoms = document.getElementById('allSymptoms'),
// Set up data set coordinates, set to bar graph, set colors of bars //
dataAllSymptoms = [{
    x: xAllSymptoms,
    y: yAllSymptoms,
    type: 'bar',
    // Filter out items that are less than 1 - this means all triggers that aren't included by this user and items that are at 0 //
    transforms: [{
    type: 'filter',
    target: 'y',
    operation: '>',
    value: 1}],
		marker:{ color: ['red', 'green', 'blue', 'orange', 'white', 'pink', 'purple', 'brown', 'grey', 'teal']},
  // Set the hover template to show the right data //
		hovertemplate: "You experienced %{x} before or during a headache %{y}% of the time.<extra></extra>"
  }],
layoutAllSymptoms = {
      // Set background color, size, font //
			plot_bgcolor: "transparent",
      paper_bgcolor: "transparent",
			autosize: false,
  		width: 600,
  		height: 500,
			font: {family: 'Poppins'},
			title: "All Triggers",
      // Set the hovermode to only show the x coordinate and set label styling //
			hovermode: "closest",
      hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
		  yaxis: {
         // Set up y axis, set to linear and set tick0 and dtick so the intervals will be right //
				 fixedrange: true,
				 range: [0, 100],
				 showTickLabels: false,
				 tickmode: "linear",
				 showgrid: false,
    		 tick0: 0,
    		 dtick: 10,
				 automargin: true,
				 title: "Percentage of the Time This Trigger<br> Was Present Before or During a Headache<br>"  },
		   xaxis: {
        // Set the angle so the labels all fit //
			  tickangle: 80,
				automargin: true },
 },
 optionsAllSymptoms = {
     // Turn off certain mode bar buttons //
		 scrollZoom: false,
		 showLink: false,
		 displaylogo: false,
		 modeBarButtonsToRemove: [ 'sendDataToCloud', 'zoom2d', 'pan', 'pan2d','autoScale2d', 'lasso2d', 'autoScale2d','resetScale2d', 'toggleSpikelines','dragmode', 'select2d', 'hoverClosestCartesian','hoverCompareCartesian', 'displaylogo']
 };
// Set up the new graph with the data, layout, and options //
Plotly.newPlot('allSymptoms', dataAllSymptoms, layoutAllSymptoms, optionsAllSymptoms);
// Click function on the bars - get the x axis of what is clicked //
AllSymptoms.on('plotly_click', function(d){
  var passedData = d.points[0].data.x[d.points[0].pointNumber];
  // If statements for each possible bar - call that click function when it's that item //
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
// Sets the cursor to be a pointer when you mouseover a bar //
dragLayer = document.getElementsByClassName('nsewdrag')[0]
AllSymptoms.on('plotly_hover', function(data){
  dragLayer.style.cursor = 'pointer'
});
AllSymptoms.on('plotly_unhover', function(data){
  dragLayer.style.cursor = ''
});

// Medicine chart set up and push to the right div //
var datamedicineSymptoms = [{
  values: [medicine_helped, medicine_didnt_help],
  labels: ['Medicine helped your headache', 'Medicine didn\'t help your headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutmedicineSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Medicine Helped",
};
var optionsmedicineSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('medicineSymptoms', datamedicineSymptoms, layoutmedicineSymptoms, optionsmedicineSymptoms);

// Alcohol chart set up and push to the right div //
var dataalcoholSymptoms = [{
  values: [alcohol, no_alcohol],
  labels: ['You had alcohol before the headache', 'You didn\'t have alcohol before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutalcoholSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Alcohol",
};
var optionsalcoholSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('alcoholSymptoms', dataalcoholSymptoms, layoutalcoholSymptoms, optionsalcoholSymptoms);

// Chocolate chart set up and push to the right div //
var datachocolateSymptoms = [{
  values: [chocolate, no_chocolate],
  labels: ['You had chocolate before the headache', 'You didn\'t have chocolate before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutchocolateSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Chocolate",
};
var optionschocolateSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('chocolateSymptoms', datachocolateSymptoms, layoutchocolateSymptoms, optionschocolateSymptoms);

// Dehydrated chart set up and push to the right div //
var datadehydratedSymptoms = [{
  values: [dehydrated, no_dehydrated],
  labels: ['You were dehydrated before the headache', 'You weren\'t dehydrated before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutdehydratedSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Dehydration",
};
var optionsdehydratedSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('dehydratedSymptoms', datadehydratedSymptoms, layoutdehydratedSymptoms, optionsdehydratedSymptoms);

// Overeating chart set up and push to the right div //
var dataovereatingSymptoms = [{
  values: [overeating, no_overeating],
  labels: ['You were overeating before the headache', 'You weren\'t overeating before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutovereatingSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Overeating",
};
var optionsovereatingSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('overeatingSymptoms', dataovereatingSymptoms, layoutovereatingSymptoms, optionsovereatingSymptoms);

// Period chart set up and push to the right div //
var dataperiodSymptoms = [{
  values: [period, no_period],
  labels: ['You were on your period before the headache', 'You weren\'t on your period before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutperiodSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Period",
};
var optionsperiodSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('periodSymptoms', dataperiodSymptoms, layoutperiodSymptoms, optionsperiodSymptoms);

// Exercise chart set up and push to the right div //
var dataexerciseSymptoms = [{
  values: [exercise, no_exercise],
  labels: ['You were over exercising before the headache', 'You weren\'t over exercising before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutexerciseSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Over Exercising",
};
var optionsexerciseSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('exerciseSymptoms', dataexerciseSymptoms, layoutexerciseSymptoms, optionsexerciseSymptoms);

// Eyestrain chart set up and push to the right div //
var dataeyestrainSymptoms = [{
  values: [eye_strain, no_eyestrain],
  labels: ['You experienced eyestrain before the headache', 'You didnt\'t experience eyestrain before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layouteyestrainSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Eye Strain",
};
var optionseyestrainSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('eyestrainSymptoms', dataeyestrainSymptoms, layouteyestrainSymptoms, optionseyestrainSymptoms);

// Lights chart set up and push to the right div //
var datalightsSymptoms = [{
  values: [lights, no_lights],
  labels: ['You experienced bright lights before the headache', 'You didnt\'t experience bright lights before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutlightsSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Bright Lights",
};
var optionslightsSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('lightsSymptoms', datalightsSymptoms, layoutlightsSymptoms, optionslightsSymptoms);

// Sleep chart set up and push to the right div //
var datasleepSymptoms = [{
  values: [sleep, no_sleep],
  labels: ['You experienced lack of sleep before the headache', 'You didnt\'t experience lack of sleep before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutsleepSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Lack of Sleep",
};
var optionssleepSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('sleepSymptoms', datasleepSymptoms, layoutsleepSymptoms, optionssleepSymptoms);

// Stress chart set up and push to the right div //
var datastressSymptoms = [{
  values: [stressed, no_stress],
  labels: ['You experienced stress before the headache', 'You didnt\'t experience stress before the headache'],
  type: 'pie',
  textinfo: 'none',
  hovertemplate: "%{label} %{value}% of the time <extra></extra>",
  marker: { colors: ['purple', 'teal']}
}];
var layoutstressSymptoms = {
  height: 500,
  width: 600,
  hovermode: "closest",
  xaxis: { domain: 550 },
  hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
  // Set background color, size, font //
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  autosize: false,
  showlegend: true,
	legend: {"orientation": "h"},
  font: {family: 'Poppins'},
  title: "Stress",
};
var optionsstressSymptoms = {
    // Turn off certain mode bar buttons //
    displaylogo: false,
};
Plotly.newPlot('stressSymptoms', datastressSymptoms, layoutstressSymptoms, optionsstressSymptoms);

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
}

// Log customization page starts here //

// Start button click function //

// When the one next button is clicked, start this function //
$(document).on("click", "#startBtn", function(e){
    // Fade out the first div and fade in the second //
    $("#startDiv").fadeOut(function() {
    $("#one").fadeIn(1500);
});
});

// When the one next button is clicked, start this function //
$(document).on("click", "#oneNextYes, #oneNextNo", function(e){
  // Checking for null values //
  if ($(".oneField").val() != "") {
    // Fade out the first div and fade in the second //
    $("#one").fadeOut(function() {
    $("#two").fadeIn(1500);
});
  }
});

// When the two next button is clicked, start this function //
$(document).on("click", "#twoNextYes, #twoNextNo", function(e){
  // Checking for null values //
  if ($(".twoField").val() != "") {
    // Fade out the first div and fade in the second //
    $("#two").fadeOut(function() {
    $("#three").fadeIn(1500);
});
  }
});

// When the three next button is clicked, start this function //
$(document).on("click", "#threeNextYes, #threeNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#three").fadeOut(function() {
    $("#four").fadeIn(1500);
  });
});

// When the four next button is clicked, start this function //
$(document).on("click", "#fourNextYes, #fourNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#four").fadeOut(function() {
        $("#five").fadeIn(1500);
});
});

// When the five next button is clicked, start this function //
$(document).on("click", "#fiveNextYes, #fiveNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#five").fadeOut(function() {
        $("#six").fadeIn(1500);
});
});

// When the six next button is clicked, start this function //
$(document).on("click", "#sixNextYes, #sixNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#six").fadeOut(function() {
        $("#seven").fadeIn(1500);
});
});

// When the seven next button is clicked, start this function //
$(document).on("click", "#sevenNextYes, #sevenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#seven").fadeOut(function() {
        $("#eight").fadeIn(1500);
});
});

// When the eight next button is clicked, start this function //
$(document).on("click", "#eightNextYes, #eightNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#eight").fadeOut(function() {
        $("#nine").fadeIn(1500);
});
});

// When the nine next button is clicked, start this function //
$(document).on("click", "#nineNextYes, #nineNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#nine").fadeOut(function() {
        $("#ten").fadeIn(1500);
});
});

// When the ten next button is clicked, start this function //
$(document).on("click", "#tenNextYes, #tenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#ten").fadeOut(function() {
    $("#eleven").fadeIn(1500);
});
});

// When the eleven next button is clicked, start this function //
$(document).on("click", "#elevenNextYes, #elevenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#eleven").fadeOut(function() {
    $("#twelve").fadeIn(1500);
});
});

// When the twelve yes button is clicked, start this function //
$(document).on("click", "#twelveNextYes", function(e){
    // Fade out the first div and fade in the second //
    $("#twelve").fadeOut(function() {
    $("#thirteen").fadeIn(1500);
});
});

// When the twelveo no button is clicked, start this function //
$(document).on("click", "#twelveNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#twelve").fadeOut(function() {
    $("#finish").fadeIn(1500);
    $("#thirteen").hide();
});
});

// When the thirteen yes button is clicked, start this function //
$(document).on("click", "#thirteenNextYes", function(e){
    // Fade out the first div and fade in the second //
    $("#thirteen").fadeOut(function() {
    $("#fourteen").fadeIn(1500);
});
});

// When the thirteen no button is clicked, start this function //
$(document).on("click", "#thirteenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#thirteen").fadeOut(function() {
    $("#finish").fadeIn(1500);
    $("#fourteen").hide();
});
});

// When the fourteen yes button is clicked, start this function //
$(document).on("click", "#fourteenNextYes", function(e){
    // Fade out the first div and fade in the second //
    $("#fourteen").fadeOut(function() {
    $("#fifteen").fadeIn(1500);
});
});

// When the fourteen no button is clicked, start this function //
$(document).on("click", "#fourteenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#fourteen").fadeOut(function() {
    $("#finish").fadeIn(1500);
    $("#fifteen").hide();
});
});


});
