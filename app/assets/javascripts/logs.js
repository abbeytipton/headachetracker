


// Click functions for the next buttons that make the logging form visible item by item to the user //

$(document).on("click", "#startNext", function(e){
  $("#start").fadeOut(function() {
    $("#one").fadeIn(1500);
  });
});

$(document).on("click", "#oneNext", function(e){
  // Checking for null values //
  if ($(".oneField").val() != "") {
    $("#one").fadeOut(function() {
      $("#two").fadeIn(1500);
    });
  }
});

$(document).on("click", "#twoNext", function(e){
  // Checking for null values //
  if ($(".twoField").val() != "") {
    var currentDiv = $(this).parent().parent().attr('id');
    var nextDiv = $("#"+currentDiv).next().attr('id');
    $("#two").fadeOut(function() {
      $("#"+nextDiv).fadeIn(1500);
    });
  }
});

$(document).on("click", ".nextYes, .nextNo", function(e){
  var currentDiv = $(this).parent().parent().parent().parent().attr('id');
  var nextDiv = $("#"+currentDiv).next().attr('id');
  $("#"+currentDiv).fadeOut(function() {
    $("#"+nextDiv).fadeIn(1500);
  });
});
