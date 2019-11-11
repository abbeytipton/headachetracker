


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

// When the twelve next button is clicked, start this function //
$(document).on("click", "#twelveNextYes, #twelveNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#twelve").fadeOut(function() {
    $("#thirteen").fadeIn(1500);
});
});

// When the thirteen next button is clicked, start this function //
$(document).on("click", "#thirteenNextYes, #thirteenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#thirteen").fadeOut(function() {
    $("#fourteen").fadeIn(1500);
});
});

// This function checks for a change in the medicine text box - it shows the div holding the yes check mark which is otherwise hidden. This is because the user shouldn't be able to click the yes button unless they've entered information. They can't click it without entering information (see next function), but I wanted to hide it because it will turn green if they do click it, regardless of the text box. So this hides it until text is entered, then shows it, so it should only get clicked if info has been entered //
$(function(ready){
    $('#fourteenField').change(function() {
        if ($(this).val() != '') {
            $('.toHide').show();
        }
    });
});

// When the fourteen next button is clicked, start this function //
$(document).on("click", "#fourteenNextYes", function(e){
    // Fade out the first div and fade in the second //
    // Checking for null values //
    if ($("#fourteenField").val() != "") {
      $("#fourteen").fadeOut(function() {
      $("#fifteen").fadeIn(1500);
    })
    }
});

// When the fourteen next button is clicked, start this function //
$(document).on("click", "#fourteenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#fourteen").fadeOut(function() {
    $("#fifteen").fadeIn(1500);
});
});

// When the fifteen next button is clicked, start this function //
$(document).on("click", "#fifteenNextYes, #fifteenNextNo", function(e){
    // Fade out the first div and fade in the second //
    $("#fifteen").fadeOut(function() {
    $("#sixteen").fadeIn(1500);
});
});
