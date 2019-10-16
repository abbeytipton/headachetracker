


$(document).on("click", "#oneNext", function(e){
  if ($(".oneField").val() != "") {
  $("#one").slideUp(1000);
  $("#two").slideDown(1000);
}
});
