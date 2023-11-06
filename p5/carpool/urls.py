from django.urls import path
from . import views

app_name = "carpool"
urlpatterns = [
    # components views
    path("", views.home, name="home"),
    path("create_account/", views.create_account, name="create_account"),
    path("login/", views.login, name="login"),
    path("login_account/", views.login_account, name="login_account"),
    path("user_home/", views.user_home, name="user_home"),
    path("posts/", views.carpool_post_list, name="carpool_post_list"),
    path("posts/<int:post_id>", views.post_detail, name="post-detail"),
    path("about/", views.about, name="about"),
    path("logout/", views.logout, name="logout"),
    path("create_post", views.create_post, name="create_post"),
    path("edit_post/<int:post_id>", views.edit_post, name="edit_post"),
    path("delete_post/<int:post_id>", views.delete_post, name="delete_post"),
    path("submit_comment", views.submit_comment, name="submit_comment"),
]
