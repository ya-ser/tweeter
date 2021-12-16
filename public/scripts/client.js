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
      $("#tweets-container").prepend($eachTweet);
    }
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
                <p class="user">${tweet.user.name}</p>
                <p class="userTag">${tweet.user.handle}</p>
              </div>
              <p class="comment"><b>${tweet.content.text}</b></p>
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
  
  $("#tweetCompose").submit(function (event) {
    event.preventDefault();
    const textPost = $("#tweet-text").val();
    if (textPost.length > 140) {
      alert("Character limit reached.");
      return;
    } else if (textPost === "") {
      alert("fill this out");
      return;
    } else if (textPost === null) {
      alert("HOW???");
      return;
    }
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data,
      success: loadTweets
    });
  });
});
