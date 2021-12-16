/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      let $eachTweet = createTweetElement(tweet);
      // tweets posted are in decending order
      $("#tweets-container").prepend($eachTweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/tweets/",
      complete: function(data){
        renderTweets(data.responseJSON);
      }
    });
  };
  
  loadTweets();

  const createTweetElement = function(tweet) {
    const date = timeago.format(tweet.created_at);
    const $tweet = `
    <section id="tweets-container">
      <article class="timeline">
              <div class="username">
                <!-- keeps image on the same line as name -->
                <img src=${tweet.user.avatars}>
                <p class="user">${escape(tweet.user.name)}</p>
                <p class="userTag">${escape(tweet.user.handle)}</p>
              </div>
              <p class="comment"><b>${escape(tweet.content.text)}</b></p>
              <hr class="line">
              <div class="dateIcon">
                <p class="datePosted">${date}</p>
              <!-- set icons to display inline-block in css -->
                <div class="postIcons">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </div>
              </div>
            </article>
          </section>`
    return $tweet;
  };
  
  $("#tweetCompose").on("submit", function(event) {
    event.preventDefault();
    const charCount = $("#tweet-text").val();
    $(".error").slideUp();
    if (charCount.length > 140) {
      $('.error').text("You're rambling! (Character limit reached)").slideDown();
    } else if (charCount === "") {
      $('.error').text("Fill this out").slideDown();
    } else {
      const data = $(this).serialize();
      $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data,
      success: loadTweets
    });
    }
    $("#tweet-text").val("");
  });
});