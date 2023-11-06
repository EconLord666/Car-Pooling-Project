// This is the JS file that handles functions in the posts.html
$(document).ready(function () {
    initialLoad();
    $(`main .left-section .sorting-btns button.newest`).click(function () {
        sortByTime();
    });
    $(`main .left-section .sorting-btns button.archive`).click(function () {
        showArchive();
    });
    $(`main .left-section .sorting-btns button.popular`).click(function () {
        sortByComments();
    });
    // event handler for deleting posts
    $(`main .left-section .post-list a.delete-btn`).click(function () {
        DeletePost(this);
    });

    checkQueryString();
});

function DeletePost(deleteButton) {
    let url = $(deleteButton).attr(`data-delete-url`);
    if (confirm("Are you sure you want to delete the post?")) {
        window.location.href = url;
    } else {
        window.alert("Delete canceled.");
    }
}

// this function is called when posts are loaded from the database
// the posts are loaded according to its id in descending order
// This usually means that the newest posts will be displayed first
function initialLoad() {
    let postList = $(`.post-list`);
    // Get all post cards and convert them to an array
    var postCards = postList.find('.post-card').toArray();
    // Sort the post cards by date_posted in descending order (from large id to small id)
    postCards.sort(function (a, b) {
        let idA = parseInt(a.getAttribute("data-post-id"));
        let idB = parseInt(b.getAttribute("data-post-id"));

        return idB - idA;
    });

    // Clear the existing post list
    postList.empty();

    // Append the sorted post cards back to the post list
    postCards.forEach(post => postList.append(post));
}

function sortById() {
    let postList = $(`.post-list`);
    // Get all post cards and convert them to an array
    var postCards = postList.find('.post-card').toArray();
    // Sort the post cards by date_posted in descending order (from large id to small id)
    postCards.sort(function (a, b) {
        let idA = parseInt(a.getAttribute("data-post-id"));
        let idB = parseInt(b.getAttribute("data-post-id"));

        return idB - idA;
    });

    // Clear the existing post list
    postList.empty();

    // Append the sorted post cards back to the post list
    postCards.forEach(post => postList.append(post));
}

function sortByComments() {
    let postList = $(`.post-list`);

    // Get all post cards and convert them to an array
    var postCards = postList.find('.post-card').toArray();
    // Sort the post cards by date_posted in descending order (newest first)
    postCards.sort(function (a, b) {
        let idA = parseInt(a.getAttribute("data-post-comments"));
        let idB = parseInt(b.getAttribute("data-post-comments"));

        return idB - idA;
    });

    // Clear the existing post list
    postList.empty();

    // Append the sorted post cards back to the post list
    postCards.forEach(post => postList.append(post));
}

function sortByTime() {
    let postList = $(`.post-list`);
    let postCards = postList.find('.post-card').toArray();
    // Sort the post cards by date_posted in descending order (newest first)
    postCards.sort(function (a, b) {
        let a_time = parseInt(a.getAttribute("data-post-time"));
        let b_time = parseInt(b.getAttribute("data-post-time"));

        return b_time - a_time;
    });
    // Clear the existing post list
    postList.empty();
    postCards.forEach(post => postList.append(post));
}

function showArchive() {
    let postList = $(`.post-list`);
    let currTime = new Date();
    currTime.setMonth(currTime.getMonth() - 1);
    let postCards = postList.find('.post-card').toArray();
    // Sort the post cards by date_posted in descending order (newest first)
    postCards.sort(function (a, b) {
        let idA = parseInt(a.getAttribute("data-post-id"));
        let idB = parseInt(b.getAttribute("data-post-id"));

        return idA - idB;
    });
    // Clear the existing post list
    postList.empty();

    // Append the sorted post cards back to the post list
    postCards.forEach(post => {
        let post_time = new Date(post.getAttribute("data-post-time"));
        if (currTime > post_time) postList.append(post);
        else {
            return sortById();
        }
    });

}


function checkQueryString() {
    let queryString = window.location.search;
    // console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    let keyword = urlParams.get("search");
    // console.log(keyword);
}


