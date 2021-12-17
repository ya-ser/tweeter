$(document).ready(() => {

  $('#tweet-text').keyup('input', function() {
    // minuses total text limit (140) by each character passed in the tweet-text field 
    const maxChar = 140;
    const currentChars = $(this).val().length;
    const charRemaining = maxChar - currentChars;
    $(".counter").text(charRemaining);
    // if word count is less then 0, change the color to red
    if (charRemaining < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  })
});