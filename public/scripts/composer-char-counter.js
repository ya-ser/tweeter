$(document).ready(function() {

  $('#tweet-text').keyup('input', function() {
    // minuses total text limit (140) by each character passed in the tweet-text field 
    const wordCount = $(".counter").text((140 - $(this).val().length));
    // if word count is less then 0, change the color to red
    if (wordCount.text() < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  })
});