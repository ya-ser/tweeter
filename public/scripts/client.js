$(document).ready(() => {
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

  // Prevents XSS by re-encoding text characters into a safe encoded representation
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // fetches tweets from /tweets/ page
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/tweets/",
      complete: function(data) {
        renderTweets(data.responseJSON);
      }
    });
  };
  
  loadTweets();

  // takes in tweets and applies html structure
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
          </section>`;
    return $tweet;
  };
  
  // event listener that checks for submit event
  $("#tweetCompose").submit(function(event) {
    // prevents default behaviour of the submit event
    event.preventDefault();
    const charCount = $("#tweet-text").val();
    $(".error").slideUp("fast");
    if (charCount.length > 140) {
      $('.error').text("You're rambling! (Character limit reached)").slideDown("fast");
    } else if (charCount === "") {
      $('.error').text("Fill this out").slideDown("fast");
    } else {
      const data = $(this).serialize();
      // ajax post request sends the form data to the server
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data,
        // on successful post
        success: function() {
          // clear text area
          $('textarea').val('');
          // short ajax get request to get all the tweets from url
          $.get('/tweets/', function(response) {
            // take the most recent tweet from array
            const lastTweet = response.slice(-1);
            // renders the last tweet from array
            renderTweets(lastTweet);
          });
        }
      });
    }
    // resets counter after post
    $(".counter").val(140);
  });
});