from django.shortcuts import render, redirect
from django.contrib import messages
from .models import regular_user, admin_user, CarpoolPost, CarpoolComment
from django.http import JsonResponse
from datetime import datetime


# Create your views here.
def home(request):
    return render(request, "components/home.html")


def create_account(request):
    return render(request, "components/create_account.html")


def user_home(request):
    if request.session.get("username"):
        return render(request, "components/user_home.html")
    else:
        return redirect("carpool:home")


def posts(request):
    if request.session.get("username"):
        return render(request, "components/posts.html")
    else:
        return render(request, "components/posts.html")


def post_detail(request, post_id):
    if request.session.get("username"):
        post = CarpoolPost.objects.get(id=post_id)
        comments = CarpoolComment.objects.filter(post=post)
        return render(request, "components/post_detail.html", {"post": post, "comments": comments})
    else:
        return redirect("carpool:home")


def submit_comment(request):
    is_ajax = request.headers.get("x-requested-with") == "XMLHttpRequest"
    if is_ajax and request.method == "POST":
        comment_text = request.POST.get("comment")
        post_id = request.POST.get("post_id")
        try:
            post = CarpoolPost.objects.get(id=post_id)
            post.comments += 1
            comment = CarpoolComment(
                post=post,
                text=comment_text,
                author=request.session.get("username"),
                date_posted=datetime.now()
            )
            comment.save()
            post.save()
            return JsonResponse({"success": "success", "new_comment": comment.text, "author": comment.author,
                                 "date_posted": comment.date_posted}, status=200)
        except CarpoolPost.DoesNotExist:
            return JsonResponse({"error": "No post found with that Id."}, status=200)


    else:
        return JsonResponse({"error": "Invalid Ajax request."}, statu=400)


def about(request):
    return render(request, "components/about.html")


def carpool_post_list(request):
    if request.session.get("username"):
        posts_list = CarpoolPost.objects.all()
        return render(request,
                      "components/posts.html",
                      {"posts": posts_list}
                      )
    else:
        return redirect("carpool:home")


def login(request):
    return render(request, "components/login.html")


def login_account(request):
    username = request.POST.get("email")
    password = request.POST.get("password")
    if (username == regular_user["username"]) and (password == regular_user["password"]):
        request.session["username"] = username
        request.session["role"] = "regular"
        return redirect("carpool:user_home")
    elif (username == admin_user["username"]) and (password == admin_user["password"]):
        request.session["username"] = username
        request.session["role"] = "admin"
        return redirect("carpool:user_home")
    else:
        return redirect("carpool:home")


def logout(request):
    del request.session["username"]
    del request.session["role"]
    return redirect("carpool:home")


def create_post(request):
    if request.session.get("username"):
        if request.method == "POST":
            # process the form
            title = request.POST.get("title")
            description = request.POST.get("content")
            author = request.session.get("username")
            post = CarpoolPost(
                title=title,
                description=description,
                author=author
            )
            post.save()
            messages.add_message(request, messages.SUCCESS,
                                 "***You have successfully submitted a new post: %s***" % post.title)
            return render(request, "components/post_detail.html", {"post": post})
        return render(request, "components/create_post.html")
    else:
        return redirect("carpool:home")


def edit_post(request, post_id):
    if request.session.get("username"):
        if request.method == "GET":
            post = CarpoolPost.objects.get(id=post_id)
            return render(request, "components/edit_post.html", {"post": post})
        elif request.method == "POST":
            selected_post = CarpoolPost.objects.get(id=post_id)
            # process the form
            selected_post.title = request.POST.get("title")
            selected_post.description = request.POST.get("content")
            selected_post.author = request.session.get("username")
            selected_post.save()
            messages.add_message(request, messages.INFO,
                                 "***You have successfully edited the post: %s***" % selected_post.title)
            return render(request, "components/post_detail.html", {"post": selected_post})
    else:
        return redirect("carpool:home")


def delete_post(request, post_id):
    post = CarpoolPost.objects.get(id=post_id)
    post.delete()
    messages.add_message(request, messages.WARNING, "***You have deleted the post: %s***" % post.title)
    return redirect("carpool:carpool_post_list")


def cancel_form(request):
    if request.session.get("username"):
        return redirect("carpool:carpool_post_list")
    else:
        return redirect("carpool:home")
