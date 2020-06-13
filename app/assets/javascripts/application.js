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
//= require jquery3
//= require jquery_ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {

  // Get each trigger //
  var total = $('#total').text();
  var chocolate = Math.floor($('#chocolate').text() / total * 100);
  var dehydrated = Math.floor($('#dehydrated').text() / total * 100);
  var alcohol = Math.floor($('#alcohol').text() / total * 100);
  var stressed = Math.floor($('#stressed').text() / total * 100);
  var sleep = Math.floor($('#sleep').text() / total * 100);
  var lights = Math.floor($('#lights').text() / total * 100);
  var eye_strain = Math.floor($('#eye_strain').text() / total * 100);
  var exercise = Math.floor($('#exercise').text() / total * 100);
  var period = Math.floor($('#period').text() / total * 100);
  var overeating = Math.floor($('#overeating').text() / total * 100);
  var medicine = $('#medicine').text();
  var medicine_helped = Math.floor($('#medicine_helped').text() / total * 100);
  // Get the custom trigger amounts and names //
  var custom1 = Math.floor($('#custom1').text() / total * 100);
  var custom2 = Math.floor($('#custom2').text() / total * 100);
  var custom3 = Math.floor($('#custom3').text() / total * 100);
  var custom4 = Math.floor($('#custom4').text() / total * 100);
  var custom5 = Math.floor($('#custom5').text() / total * 100);
  var trigger1Name = $('#trigger1Name').text();
  var trigger2Name = $('#trigger2Name').text();
  var trigger3Name = $('#trigger3Name').text();
  var trigger4Name = $('#trigger4Name').text();
  var trigger5Name = $('#trigger5Name').text();
  // Get the "no" triggers - subtract the trigger amount from 100 to get the percent the trigger didn't happen //
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
  var no_custom1 = 100 - custom1;
  var no_custom2 = 100 - custom2;
  var no_custom3 = 100 - custom3;
  var no_custom4 = 100 - custom4;
  var no_custom5 = 100 - custom5;

  // Set up the main graph for all triggers //
  var xAllSymptoms = ['Chocolate', 'Alcohol', 'Stress', 'Bright Lights', 'Eye Strain', 'Over Exercising', 'During Period', 'Overeating', 'Dehydration', 'Lack of Sleep', 'Medicine Helped', trigger1Name, trigger2Name, trigger3Name, trigger4Name, trigger5Name];
  var yAllSymptoms = [chocolate, alcohol, stressed, lights, eye_strain, exercise, period, overeating, dehydrated, sleep, medicine_helped, custom1, custom2, custom3, custom4, custom5 ];
  if (document.getElementById('allSymptoms') != null) {
    var AllSymptoms = document.getElementById('allSymptoms'),
    dataAllSymptoms = [{ x: xAllSymptoms, y: yAllSymptoms, type: 'bar',
                        transforms: [{ type: 'filter', target: 'y', operation: '>', value: 1}],
                        marker:{ color: ['red', 'green', 'blue', 'orange', 'white', 'pink', 'purple', 'brown', 'grey', 'teal', 'black', 'coral', 'darkorchid', 'gold', 'moccasin', 'tomato']},
                        hovertemplate: "You experienced %{x} before or during a headache %{y}% of the time.<extra></extra>" }],
      layoutAllSymptoms = { plot_bgcolor: "transparent", paper_bgcolor: "transparent", autosize: false,
                            width: 600, height: 500, font: {family: 'Poppins'}, title: "All Triggers",
                            hovermode: "closest", hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
                            yaxis: { fixedrange: true, range: [0, 100], showTickLabels: false, tickmode: "linear", showgrid: false,
                            tick0: 0, dtick: 10, automargin: true,
                            title: "Percentage of the Time This Trigger<br> Was Present Before or During a Headache<br>"  },
                            xaxis: { tickangle: 80, automargin: true },},
      optionsAllSymptoms = { scrollZoom: false, showLink: false,displaylogo: false, modeBarButtonsToRemove: [ 'sendDataToCloud', 'zoom2d', 'pan', 'pan2d','autoScale2d', 'lasso2d', 'autoScale2d','resetScale2d', 'toggleSpikelines','dragmode', 'select2d', 'hoverClosestCartesian','hoverCompareCartesian', 'displaylogo'] };
      Plotly.newPlot('allSymptoms', dataAllSymptoms, layoutAllSymptoms, optionsAllSymptoms);

      // Click function on the bars - get the bar clicked on and pass it to BarClick //
      AllSymptoms.on('plotly_click', function(data){
          var passedData = data.points[0].x;
          BarClick(passedData);
      });

      // Show the pointer mouse on hover of the bars //
      dragLayer = document.getElementsByClassName('nsewdrag')[0]
      AllSymptoms.on('plotly_hover', function(data){
          dragLayer.style.cursor = 'pointer'
      });
      AllSymptoms.on('plotly_unhover', function(data){
          dragLayer.style.cursor = ''
      });

      // Click function for the bars - change the graph (pass in the clicked on bar), fade out everything, fade in the main graph and clicked graph //
      function BarClick(graphToShow) {
        $('.children').fadeOut().promise().done(function () {
            changeGraph(graphToShow);
            $("#clickedDiv").fadeIn(1000);
            $("#triggerHolder").fadeIn(1000);
        });
      };

      // Set up the clicked on graph - set up title, labels, and values with switch case based on what's been clicked on //
      function changeGraph(graphToShow) {
        var traces = [];
        var title;
        var labels;
        var values;
        var clickedDiv = document.getElementById("clickedGraph");
        switch (graphToShow) {
          case "Chocolate":
            title = "Chocolate";
            labels = ['You had chocolate before the headache', 'You didn\'t have chocolate before the headache'];
            values = [chocolate, no_chocolate];
            break;
          case "Alcohol":
            title = "Alcohol";
            labels = ['You had alcohol before the headache', 'You didn\'t have alcohol before the headache'];
            values = [alcohol, no_alcohol];
            break;
          case "Stress":
            title = "Stress";
            labels = ['You experienced stress before the headache', 'You didnt\'t experience stress before the headache'];
            values = [stressed, no_stress];
            break;
          case "Bright Lights":
            title = "Bright Lights";
            labels = ['You experienced bright lights before the headache', 'You didnt\'t experience bright lights before the headache'];
            values = [lights, no_lights];
            break;
          case "Eye Strain":
            title = "Eye Strain";
            labels = ['You experienced eyestrain before the headache', 'You didnt\'t experience eyestrain before the headache'];
            values = [eye_strain, no_eyestrain];
            break;
          case "Over Exercising":
            title = "Over Exercising";
            labels = ['You were over exercising before the headache', 'You weren\'t over exercising before the headache'];
            values = [exercising, no_exercise];
            break;
          case "During Period":
            title = "During Period";
            labels = ['You were on your period before the headache', 'You weren\'t on your period before the headache'];
            values = [period, no_period];
            break;
          case "Overeating":
            title = "Overeating";
            labels = ['You were overeating before the headache', 'You weren\'t overeating before the headache'];
            values = [overeating, no_overeating];
            break;
          case "Dehydration":
            title = "Dehydration";
            labels = ['You were dehydrated before the headache', 'You weren\'t dehydrated before the headache'];
            values = [dehydrated, no_dehydrated];
            break;
          case "Medicine Helped":
            title = "Medicine Helped";
            labels = ['Medicine helped your headache', 'Medicine didn\'t help your headache'];
            values = [medicine_helped, medicine_didnt_help];
            break;
          case "Lack of Sleep":
            title = "Lack of Sleep";
            labels = ['You experienced lack of sleep before the headache', 'You didnt\'t experience lack of sleep before the headache'];
            values = [sleep, no_sleep];
            break;
          case trigger1Name:
            title = trigger1Name;
            labels = ['You experienced ' + trigger1Name + ' before the headache', 'You didnt\'t experience ' + trigger1Name + ' before the headache'];
            values = [custom1, no_custom1];
            break;
          case trigger2Name:
            title = trigger2Name;
            labels = ['You experienced ' + trigger2Name + ' before the headache', 'You didnt\'t experience ' + trigger2Name + ' before the headache'];
            values = [custom2, no_custom2];
            break;
          case trigger3Name:
            title = trigger3Name;
            labels = ['You experienced ' + trigger3Name + ' before the headache', 'You didnt\'t experience ' + trigger3Name + ' before the headache'];
            values = [custom3, no_custom3];
            break;
          case trigger4Name:
            title = trigger4Name;
            labels = ['You experienced ' + trigger4Name + ' before the headache', 'You didnt\'t experience ' + trigger4Name + ' before the headache'];
            values = [custom4, no_custom4];
            break;
          case trigger5Name:
            title = trigger5Name;
            labels = ['You experienced ' + trigger5Name + ' before the headache', 'You didnt\'t experience ' + trigger5Name + ' before the headache'];
            values = [custom5, no_custom5];
            break;
          default:
            title = "problem";
        }
        traces.push({ values: values, labels: labels, type: 'pie', textinfo: 'none', hovertemplate: "%{label} %{value}% of the time <extra></extra>",
                      marker: { colors: ['purple', 'teal']} });
        var layout = { height: 500, width: 600, hovermode: "closest", xaxis: { domain: 550 },
                      hoverlabel: {	width: 75, height: 150, bgcolor: "#e3e0cc", bordercolor: "#e3e0cc", font: {color: 'black', family: 'Poppins'}},
                      plot_bgcolor: "transparent", paper_bgcolor: "transparent", autosize: false, showlegend: true,
                      legend: {"orientation": "h"}, font: {family: 'Poppins'}, title: title };
        var options = { displaylogo: false, };
        Plotly.newPlot(clickedDiv, traces, layout, options);
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
    // Click functions for the next buttons that make the logging form visible item by item to the user //
    var counter = 0;

    // When the one next button is clicked, start this function //
    $(document).on("click", "#startBtn", function(e){
      // Fade out the first div and fade in the second //
      $("#startDiv").fadeOut(function() {
        $("#questions").fadeIn(1500);
        counter++;
      });
    });

    var questions = ["placeholder", "Do you want to include overeating as a trigger?", "Do you want to include stress as a trigger?", "Do you want to include lack of sleep as a trigger?", "Do you want to include bright lights as a trigger?", "Do you want to include eyestrain as a trigger?",
    "Do you want to include over exercising as a trigger?", "Do you want to include being on your period as a trigger?", "Do you want to include eating chocolate as a trigger?", "Do you want to include being dehydrated as a trigger?",
    "Do you want to log whether you have taken medicine/whether it helped?", "Would you like to add custom triggers? You can add up to five.", "Name your first custom trigger:", "Name your second custom trigger:", "Name your third custom trigger:", "Name your fourth custom trigger:", "Name your fifth custom trigger:"];

    var erbCheckboxes = ["placeholder", "#hiddenERB2", "#hiddenERB3", "#hiddenERB4", "#hiddenERB5", "#hiddenERB6", "#hiddenERB7", "#hiddenERB8", "#hiddenERB9", "#hiddenERB10", "#hiddenERB11", "#hiddenERB12", "#hiddenERB13", "#hiddenERB14", "#hiddenERB15", "#hiddenERB16"];

    var textboxes = ["placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "#trigger1NameText", "#trigger2NameText", "#trigger3NameText", "#trigger4NameText", "#trigger5NameText"];

    // Remove Turboklinks from the page so the jQuery will function correctly //
    $(document).off("click", "#nextYes, #nextNo");
    // Yes and no button click functions for non custom questions //
    $(document).on('click', "#nextYes, #nextNo", function(event){
      console.log(counter);
      // Empty out the question //
      $("#question").empty();
      // Hide the previous text yes checkbox //
      var checkboxToHide = erbCheckboxes[counter - 1];
      $('#checkboxDiv').hide();
      $(checkboxToHide).hide();
      $('#checkboxNoOriginal, #checkboxNoReplacementCustom').hide();
      // If it's more than 11 then we're on custom triggers //
      if (counter >= 12) {
        var previous = counter - 1;
        $(textboxes[previous]).hide();
        // If they click the no button, then go to the finish //
        if (event.target.id == "nextNo")
        {
          $("#triggerTextBoxP").hide();
          $("#waitIcon").fadeIn(500);
          $("#waitIcon").fadeOut(500);

          setTimeout(function () {
            $("#questions").hide();
            $("#finish").show();
          }, 1100);
        }
        // If they click the add another button, then hide that trigger textbox and show the next one //
        else {

          ShowNextQuestion();
        }
      }
      // If it's less than 11, then we're on the regular questions, so show the next one //
      else {
        ShowNextQuestion();
      }
    });

    function ShowNextQuestion() {
      // Get the next checkbox to shoow //
      var checkboxToShow = erbCheckboxes[counter];
      var textboxToShow = textboxes[counter];
      // Fade in and then out the wait icon //
      $("#waitIcon").fadeIn(500);
      $("#waitIcon").fadeOut(500);
      // This timeout function happens after 1100, so after the wait icon fades out //
      setTimeout(function () {
        // Show the new checkboxes and question //
        if (counter != 17) {
          // If we're at 10 or less then we need to show the og checkbox //
          if (counter <= 10)
          {
            $('#checkboxNoOriginal').show();
            // Otherwise we need the custom trigger checkbox because it has a different picture //
          } else {
            $('#checkboxNoReplacementCustom').show();
          }
        }
        // If the counter is 20 then it's the very last question so we don't need the add button //
        if (counter == 17) {
          $("#question").append(questions[counter]);
          $('#checkboxDiv').hide();
          $(textboxToShow).show();
          // Otherwise, we're on the trigger questions so we need to fill in the textbox if the user didn't and get the next textbox //
        } else {
          $(checkboxToShow).show();
          $("#question").append(questions[counter]);
          if (counter >= 12) {
            $(textboxToShow).show();
          }
        }
        // Increase the counter for the next click //
        counter++;
      }, 1100);
    }


  });
