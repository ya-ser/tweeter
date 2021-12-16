/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      let $eachTweet = createTweetElement(tweet);
      $("#tweets-container").append($eachTweet);
    }
  };
  
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
  
  renderTweets(data);
});
