


// Click functions for the next buttons that make the logging form visible item by item to the user //

// When the one next button is clicked, start this function //
$(document).on("click", "#startNext", function(e){
    // Fade out the first div and fade in the second //
    $("#start").fadeOut(function() {
    $("#one").fadeIn(1500);
});
});

// When the one next button is clicked, start this function //
$(document).on("click", "#oneNext", function(e){
  // Checking for null values //
  if ($(".oneField").val() != "") {
    // Fade out the first div and fade in the second //
    $("#one").fadeOut(function() {
    $("#two").fadeIn(1500);
});
  }
});

// When the two next button is clicked, start this function //
$(document).on("click", "#twoNext", function(e){
  // Checking for null values //
  if ($(".twoField").val() != "") {
    // Fade out the first div and fade in the second //
    $("#two").fadeOut(function() {
    $("#three").fadeIn(1500);
});
  }
});

$(document).on("click", ".nextYes, .nextNo", function(e){
  alert('clicked');
  var currentDiv = $(this).parent().parent().parent().parent().parent().attr('id');
  alert(currentDiv);
  var nextDiv = $(currentDiv).next();
  alert(nextDiv);
    $(currentDiv).fadeOut(function() {
    $(nextDiv).fadeIn(1500);
  });
});
