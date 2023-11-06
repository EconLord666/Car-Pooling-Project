$(document).ready(function () {
    $("#add-comment").on("submit", function (e) {
        e.preventDefault();
        let comment = $("#comment").val();
        let postId = $(this).attr("data-postId");
        let ajaxUrl = $(this).attr("action");
        // console.log("Comment:", comment);
        // console.log("Post ID:", postId);
        // console.log("Ajax URL:", ajaxUrl);
        $.ajax({
            url: ajaxUrl,
            data: {
                comment: comment,
                post_id: postId
            },

            type: "POST",
            dataType: "json",
            headers: {"X-CSRFToken": csrftoken}
        })
            .done(function (json) {

                if (json.success == "success") {
                    let comment_text = json.new_comment;
                    let author = json.author;

                    let date_posted = json.date_posted;
                    let commentCard = `
                    <div class='comment-card'>
                        <img src="{% static "/pics/user.png" %}" class="user-icon" alt="user-icon"/>
                        <p>${comment_text}</p>
                        <p>Commented by ${author} a few seconds ago...</p>
                    </div>
                    `;
                    $(".comments").append(commentCard);
                    $("textarea").val("");
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Failed. There was a problem");
                console.error("AJAX Failed:", textStatus, errorThrown);
            })

    });

});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const csrftoken = getCookie('csrftoken');