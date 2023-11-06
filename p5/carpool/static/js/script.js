$(document).ready(function () {
  // event-handler for adding prompt for the search bar
  // when the mouse enters (DOM traverse)
  $("#search input").on("mouseenter", function () {
    $(this)
      .parent()
      .append(
        '<div class="prompt">Enter a campus that you are interested...</div>'
      );
  });
  // event-handler for removing prompt for the search bar
  // when the mouse leaves (DOM traverse)
  $("#search input").on("mouseleave", function () {
    $(this).siblings(".prompt").remove();
  });

  // event-handler for adding comment to the post
  $("#add-comment button#submit-comment-button").click(function (event) {
    event.preventDefault();

    //get the users input text
    let newComment = $("#comment").val();
    // create the comment-card element
    let commentCard = `
          <div class='comment-card'>
          <svg class='user-icon'></svg>
          <p>${newComment}</p>
          <p>Commented by UserXXX on 10/5/2023</p>
          <button class="delete-comment">Delete</button>
          </div>
      `;
    // append it to the bottom of the Comments area
    $(".comments").append(commentCard);

    // clear the textarea after submit
    $("textarea").val("");
  });

  // event-delegation for deleting the content just added to Comments section
  $(".comments").on("click", "button.delete-comment", function () {
    $(this).closest(".comment-card").remove();
  });

  // event-handler for search
  checkQueryString();
  // we have to make sure every post is showed when the user is in the post page
});

function checkQueryString() {
  let queryString = window.location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(queryString);
  let keyword = urlParams.get("search");
  console.log(keyword);
  $("input").val("");
  if (keyword == "Arlington") {
    displaySuccessMessage();
    showPosts();
  } else {
    displayFailMessage();
    hidePosts();
  }
}

function displaySuccessMessage() {
  let queryString = window.location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(queryString);
  let keyword = urlParams.get("search");
  $(".search-message").text(
    'Here are the search results for "' + keyword + '".'
  );
}

function displayFailMessage() {
  let queryString = window.location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(queryString);
  let keyword = urlParams.get("search");
  $(".search-message").text(
    'We are sorry. There was no result for "' + keyword + '".'
  );
}

function showPosts() {
  $("div .Arlington-posts").css("visibility", "visible");
}

function hidePosts() {
  $("div .Arlington-posts").css("visibility", "hidden");
}
