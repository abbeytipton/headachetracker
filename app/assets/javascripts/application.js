//= require jquery3
//= require jquery_ujs
//= require activestorage
//= require turbolinks
//= require_self
//= require logs.js

// On page load //
$(document).on('turbolinks:load', function() {

  // Set up graphs - we need each trigger and percentage (it's printed in hidden fields on the view page) //

  // Get total headache count //
  var Total = $('#Total').text();

  // Get percentage of each trigger as the amount / the total * 100 //
  var Chocolate = Math.floor($('#Chocolate').text() / Total * 100);
  var Dehydrated = Math.floor($('#Dehydrated').text() / Total * 100);
  var Alcohol = Math.floor($('#Alcohol').text() / Total * 100);
  var Stressed = Math.floor($('#Stressed').text() / Total * 100);
  var Sleep = Math.floor($('#Sleep').text() / Total * 100);
  var Lights = Math.floor($('#Lights').text() / Total * 100);
  var EyeStrain = Math.floor($('#EyeStrain').text() / Total * 100);
  var Exercise = Math.floor($('#Exercise').text() / Total * 100);
  var Period = Math.floor($('#Period').text() / Total * 100);
  var Overeating = Math.floor($('#Overeating').text() / Total * 100);
  var Medicine = $('#Medicine').text();
  var MedicineHelped = Math.floor($('#MedicineHelped').text() / Total * 100);

  // Get the custom trigger amounts and names //
  var CustomTriggerOne = Math.floor($('#CustomTriggerOne').text() / Total * 100);
  var CustomTriggerTwo = Math.floor($('#CustomTriggerTwo').text() / Total * 100);
  var CustomTriggerThree = Math.floor($('#CustomTriggerThree').text() / Total * 100);
  var CustomTriggerFour = Math.floor($('#CustomTriggerFour').text() / Total * 100);
  var CustomTriggerFive = Math.floor($('#CustomTriggerFive').text() / Total * 100);
  var TriggerOneName = $('#TriggerOneName').text();
  var TriggerTwoName = $('#TriggerTwoName').text();
  var TriggerThreeName = $('#TriggerThreeName').text();
  var TriggerFourName = $('#TriggerFourName').text();
  var TriggerFiveName = $('#TriggerFiveName').text();

  // Get the "no" triggers - subtract the trigger amount from 100 to get the percent the trigger didn't happen //
  var MedicineDidntHelp = 100 - MedicineHelped;
  var NoAlcohol = 100 - Alcohol;
  var NoChocolate = 100 - Chocolate;
  var NoDehydrated = 100 - Dehydrated;
  var NoOvereating = 100 - Overeating;
  var NoPeriod = 100 - Period;
  var NoExercise = 100 - Exercise;
  var NoEyestrain = 100 - EyeStrain;
  var NoLights = 100 - Lights;
  var NoSleep = 100 - Sleep;
  var NoStress = 100 - Stressed;
  var NoCustomTriggerOne = 100 - CustomTriggerOne;
  var NoCustomTriggerTwo = 100 - CustomTriggerTwo;
  var NoCustomTriggerThree = 100 - CustomTriggerThree;
  var NoCustomTriggerFour = 100 - CustomTriggerFour;
  var NoCustomTriggerFive = 100 - CustomTriggerFive;

  // Set up the main graph for all triggers //

  // Get the list of possible triggers and their values //
  var XAllTriggers = ['Chocolate', 'Alcohol', 'Stress', 'Bright Lights', 'Eye Strain', 'Over Exercising', 'During Period', 'Overeating', 'Dehydration', 'Lack of Sleep', 'Medicine Helped', TriggerOneName, TriggerTwoName, TriggerThreeName, TriggerFourName, TriggerFiveName];
  var YAllTriggers = [Chocolate, Alcohol, Stressed, Lights, EyeStrain, Exercise, Period, Overeating, Dehydrated, Sleep, MedicineHelped, CustomTriggerOne, CustomTriggerTwo, CustomTriggerThree, CustomTriggerFour, CustomTriggerFive];

  // If the field exists (we're on the graphs page), so fill it with the graph //
  if (document.getElementById('AllTriggers') != null) {
    var AllTriggers = document.getElementById('AllTriggers'),

      // Set up the data //
      DataAllTriggers = [{
        x: XAllTriggers,
        y: YAllTriggers,
        type: 'bar',
        transforms: [{
          type: 'filter',
          target: 'y',
          operation: '>',
          value: 1
        }],
        marker: {
          color: ['red', 'green', 'blue', 'orange', 'limegreen', 'pink', 'purple', 'brown', 'grey', 'teal', 'black', 'coral', 'darkorchid', 'gold', 'moccasin', 'tomato']
        },
        hovertemplate: "You experienced %{x} before or during a headache %{y}% of the time.<extra></extra>"
      }],
      // Set up the layout //
      LayoutAllTriggers = {
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        autosize: false,
        width: 600,
        height: 500,
        font: {
          family: 'Helvetica Neue'
        },
        title: "All Triggers",
        hovermode: "closest",
        hoverlabel: {
          width: 75,
          height: 150,
          bgcolor: "#e3e0cc",
          bordercolor: "#e3e0cc",
          font: {
            color: 'black',
            family: 'Helvetica Neue'
          }
        },
        yaxis: {
          fixedrange: true,
          range: [0, 100],
          showTickLabels: false,
          tickmode: "linear",
          showgrid: false,
          tick0: 0,
          dtick: 10,
          automargin: true,
          title: "Percentage of the Time This Trigger<br> Was Present Before or During a Headache<br>"
        },
        xaxis: {
          tickangle: 80,
          automargin: true
        },
      },
      // Other options for the graph //
      OptionsAllTriggers = {
        scrollZoom: false,
        showLink: false,
        displaylogo: false,
        modeBarButtonsToRemove: ['sendDataToCloud', 'zoom2d', 'pan', 'pan2d', 'autoScale2d', 'lasso2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines', 'dragmode', 'select2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'displaylogo']
      };
    // Draw graph in the div with the above options //
    Plotly.newPlot('AllTriggers', DataAllTriggers, LayoutAllTriggers, OptionsAllTriggers);

    // Click function on the bars - get the bar clicked on and pass it to BarClick //
    AllTriggers.on('plotly_click', function(data) {
      var passedData = data.points[0].x;
      BarClick(passedData);
    });

    // Show the pointer mouse on hover of the bars //
    DragLayer = document.getElementsByClassName('nsewdrag')[0]
    AllTriggers.on('plotly_hover', function(data) {
      DragLayer.style.cursor = 'pointer'
    });
    AllTriggers.on('plotly_unhover', function(data) {
      DragLayer.style.cursor = ''
    });

    // Click function for the bars - change the graph (pass in the clicked on bar), fade out everything, fade in the main graph and clicked graph //
    function BarClick(graphToShow) {
      $('.Children').fadeOut().promise().done(function() {
        ChangeGraph(graphToShow);
        $("#ClickedDiv").fadeIn(1000);
        $("#TriggerHolder").fadeIn(1000);
      });
    };

    // Set up the clicked on graph - set up title, labels, and values with switch case based on what's been clicked on //
    function ChangeGraph(graphToShow) {
      // Set up all the needed variables for the graph //
      var traces = [];
      var title;
      var labels;
      var values;
      var clickedDiv = document.getElementById("ClickedGraph");

      // Switch between the graphs and fill the variables with the appropriate info for the graph clicked //
      switch (graphToShow) {
        case "Chocolate":
          title = "Chocolate";
          labels = ['You had Chocolate before the headache', 'You didn\'t have Chocolate before the headache'];
          values = [Chocolate, NoChocolate];
          break;
        case "Alcohol":
          title = "Alcohol";
          labels = ['You had Alcohol before the headache', 'You didn\'t have Alcohol before the headache'];
          values = [Alcohol, NoAlcohol];
          break;
        case "Stress":
          title = "Stress";
          labels = ['You experienced stress before the headache', 'You didnt\'t experience stress before the headache'];
          values = [Stressed, NoStress];
          break;
        case "Bright Lights":
          title = "Bright Lights";
          labels = ['You experienced bright Lights before the headache', 'You didnt\'t experience bright Lights before the headache'];
          values = [Lights, NoLights];
          break;
        case "Eye Strain":
          title = "Eye Strain";
          labels = ['You experienced eyestrain before the headache', 'You didnt\'t experience eyestrain before the headache'];
          values = [EyeStrain, NoEyestrain];
          break;
        case "Over Exercising":
          title = "Over Exercising";
          labels = ['You were over exercising before the headache', 'You weren\'t over exercising before the headache'];
          values = [Exercise, NoExercise];
          break;
        case "During Period":
          title = "During Period";
          labels = ['You were on your Period before the headache', 'You weren\'t on your Period before the headache'];
          values = [Period, NoPeriod];
          break;
        case "Overeating":
          title = "Overeating";
          labels = ['You were Overeating before the headache', 'You weren\'t Overeating before the headache'];
          values = [Overeating, NoOvereating];
          break;
        case "Dehydration":
          title = "Dehydration";
          labels = ['You were Dehydrated before the headache', 'You weren\'t Dehydrated before the headache'];
          values = [Dehydrated, NoDehydrated];
          break;
        case "Medicine Helped":
          title = "Medicine Helped";
          labels = ['Medicine helped your headache', 'Medicine didn\'t help your headache'];
          values = [MedicineHelped, MedicineDidntHelp];
          break;
        case "Lack of Sleep":
          title = "Lack of Sleep";
          labels = ['You experienced lack of Sleep before the headache', 'You didnt\'t experience lack of Sleep before the headache'];
          values = [Sleep, NoSleep];
          break;
        case TriggerOneName:
          title = TriggerOneName;
          labels = ['You experienced ' + TriggerOneName + ' before the headache', 'You didnt\'t experience ' + TriggerOneName + ' before the headache'];
          values = [CustomTriggerOne, NoCustomTriggerOne];
          break;
        case TriggerTwoName:
          title = TriggerTwoName;
          labels = ['You experienced ' + TriggerTwoName + ' before the headache', 'You didnt\'t experience ' + TriggerTwoName + ' before the headache'];
          values = [CustomTriggerTwo, NoCustomTriggerTwo];
          break;
        case TriggerThreeName:
          title = TriggerThreeName;
          labels = ['You experienced ' + TriggerThreeName + ' before the headache', 'You didnt\'t experience ' + TriggerThreeName + ' before the headache'];
          values = [CustomTriggerThree, NoCustomTriggerThree];
          break;
        case TriggerFourName:
          title = TriggerFourName;
          labels = ['You experienced ' + TriggerFourName + ' before the headache', 'You didnt\'t experience ' + TriggerFourName + ' before the headache'];
          values = [CustomTriggerFour, NoCustomTriggerFour];
          break;
        case TriggerFiveName:
          title = TriggerFiveName;
          labels = ['You experienced ' + TriggerFiveName + ' before the headache', 'You didnt\'t experience ' + TriggerFiveName + ' before the headache'];
          values = [CustomTriggerFive, NoCustomTriggerFive];
          break;
        default:
          title = "problem";
      }
      // Push the values to the arrays needed to draw the graph //
      traces.push({
        values: values,
        labels: labels,
        type: 'pie',
        textinfo: 'none',
        hovertemplate: "%{label} %{value}% of the time <extra></extra>",
        marker: {
          colors: ['purple', 'teal']
        }
      });
      // Set up layout and options //
      var layout = {
        height: 500,
        width: 600,
        hovermode: "closest",
        xaxis: {
          domain: 550
        },
        hoverlabel: {
          width: 75,
          height: 150,
          bgcolor: "#e3e0cc",
          bordercolor: "#e3e0cc",
          font: {
            color: 'black',
            family: 'Helvetica Neue'
          }
        },
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        autosize: false,
        showlegend: true,
        legend: {
          "orientation": "h"
        },
        font: {
          family: 'Helvetica Neue'
        },
        title: title
      };
      var options = {
        displaylogo: false,
      };
      // Draw the graph with the above options //
      Plotly.newPlot(clickedDiv, traces, layout, options);
    };

    // Toggle the dropdown menu button to show/hide the menu when the button is clicked //
    $(document).on("click", "#MoreClick", function(e) {
      $("#DropdownMenu").toggle();
    });
  }

  // Log customization page starts here //

  // Click functions for the next buttons that make the logging form visible item by item to the user //
  var Counter = 0;

  // When the one next button is clicked, start this function //
  $(document).on("click", "#StartBtn", function(e) {
    // Fade out the first div and fade in the second //
    $("#StartDiv").fadeOut(function() {
      $("#Questions").fadeIn(1500);
      Counter++;
    });
  });

  // Set up the questions in the correct order //
  var questions = ["Placeholder", "Do you want to include Overeating as a trigger?", "Do you want to include stress as a trigger?", "Do you want to include lack of Sleep as a trigger?", "Do you want to include bright Lights as a trigger?", "Do you want to include eyestrain as a trigger?",
    "Do you want to include over exercising as a trigger?", "Do you want to include being on your Period as a trigger?", "Do you want to include eating Chocolate as a trigger?", "Do you want to include being Dehydrated as a trigger?",
    "Do you want to log whether you have taken Medicine/whether it helped?", "Would you like to add custom triggers? You can add up to five.", "Name your first custom trigger:", "Name your second custom trigger:", "Name your third custom trigger:", "Name your fourth custom trigger:", "Name your fifth custom trigger:"
  ];

  // Set up the erb checkboxes - these are hidden in the front end and shown only when called by ID //
  var erbCheckboxes = ["Placeholder", "#HiddenERB2", "#HiddenERB3", "#HiddenERB4", "#HiddenERB5", "#HiddenERB6", "#HiddenERB7", "#HiddenERB8", "#HiddenERB9", "#HiddenERB10", "#HiddenERB11", "#HiddenERB12", "#HiddenERB13", "#HiddenERB14", "#HiddenERB15", "#HiddenERB16"];

  // Get the textboxes (needed for custom trigger names) //
  var textboxes = ["Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "Placeholder", "#Trigger1NameText", "#Trigger2NameText", "#Trigger3NameText", "#Trigger4NameText", "#Trigger5NameText"];

  // Remove Turboklinks from the page so the jQuery will function correctly //
  $(document).off("click", "#NextYes, #NextNo");

  // Yes and no button click functions for non custom questions //
  $(document).on('click', "#NextYes, #NextNo", function(event) {
    console.log(Counter);
    // Empty out the question //
    $("#Question").empty();
    // Hide the previous text yes checkbox //
    var checkboxToHide = erbCheckboxes[Counter - 1];
    $('#CheckboxDiv').hide();
    $(checkboxToHide).hide();
    $('#CheckboxNoOriginal, #CheckboxNoReplacementCustom').hide();

    // If it's more than 11 then we're on custom triggers //
    if (Counter >= 12) {
      var previous = Counter - 1;
      $(textboxes[previous]).hide();
      // If they click the no button, then go to the finish //
      if (event.target.id == "NextNo") {
        $("#TriggerTextBoxP").hide();
        $("#WaitIcon").fadeIn(500);
        $("#WaitIcon").fadeOut(500);

        setTimeout(function() {
          $("#Questions").hide();
          $("#Finish").show();
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
    var checkboxToShow = erbCheckboxes[Counter];
    var textboxToShow = textboxes[Counter];
    // Fade in and then out the wait icon //
    $("#WaitIcon").fadeIn(500);
    $("#WaitIcon").fadeOut(500);
    // This timeout function happens after 1100, so after the wait icon fades out //
    setTimeout(function() {
      // Show the new checkboxes and question //
      if (Counter != 17) {
        // If we're at 10 or less then we need to show the og checkbox //
        if (Counter <= 10) {
          $('#CheckboxNoOriginal').show();
          // Otherwise we need the custom trigger checkbox because it has a different picture //
        } else {
          $('#CheckboxNoReplacementCustom').show();
        }
      }
      // If the Counter is 20 then it's the very last question so we don't need the add button //
      if (Counter == 17) {
        $("#Question").append(questions[Counter]);
        $('#CheckboxDiv').hide();
        $(textboxToShow).show();
        // Otherwise, we're on the trigger questions so we need to fill in the textbox if the user didn't and get the next textbox //
      } else {
        $(checkboxToShow).show();
        $("#Question").append(questions[Counter]);
        if (Counter >= 12) {
          $(textboxToShow).show();
        }
      }
      // Increase the Counter for the next click //
      Counter++;
    }, 1100);
  }
});
