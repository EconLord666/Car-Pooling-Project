$(document).ready(function () {
    displaySearchString();
});

function displaySearchString() {
    let queryString = window.location.search;
    // console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    let keyword = urlParams.get("search");
    $(".search-message").text("We are sorry. There was no result for " + keyword);
}
