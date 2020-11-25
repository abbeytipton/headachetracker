// Click functions for the next buttons that make the logging form visible item by item to the user //

// The start button //
$(document).on("click", "#StartNext", function(e) {
  $("#Start").fadeOut(function() {
    $("#One").fadeIn(1500);
  });
});

// Next one (special b/c of datetime field) //
$(document).on("click", "#OneNext", function(e) {
  // Checking for null values //
  if ($(".OneField").val() != "") {
    $("#One").fadeOut(function() {
      $("#Two").fadeIn(1500);
    });
  }
});

// Next two (special b/c of datetime field) //
$(document).on("click", "#TwoNext", function(e) {
  // Checking for null values //
  if ($(".TwoField").val() != "") {
    // Get the next div - might not be three because user might not have three enabled //
    var currentDiv = $(this).parent().parent().attr('id');
    var nextDiv = $("#" + currentDiv).next().attr('id');
    $("#Two").fadeOut(function() {
      $("#" + nextDiv).fadeIn(1500);
    });
  }
});

// All checkbox divs next functions //
$(document).on("click", ".NextYes, .NextNo", function(e) {
  // Get next div //
  var currentDiv = $(this).parent().parent().parent().parent().attr('id');
  var nextDiv = $("#" + currentDiv).next().attr('id');
  $("#" + currentDiv).fadeOut(function() {
    $("#" + nextDiv).fadeIn(1500);
  });
});

// Medicine yes button - we have to show the "what medicine" text field after //
$(document).on("click", ".MedYes", function(e) {
  $("#Fourteen").fadeOut(function() {
    $("#FourteenTwo").fadeIn(1500);
  });
});

// Medicine no button - skip the "what medicine" text field //
$(document).on("click", ".MedNo", function(e) {
  $("#Fourteen").fadeOut(function() {
    $("#Fifteen").fadeIn(1500);
  });
});
