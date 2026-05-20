from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, db, Entry, Activity
from app.forms import PostForm, EditPostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)


def generate_activity(action, post):

    if action == "create":
        text = f'Published: "{post.title}"'
    elif action == "update":
        text = f'Edited post: "{post.title}"'
    elif action == "delete":
        text = f'Unpublished: "{post.title}"'
    else:
        text = f'Edited post: "{post.title}"'

    activity = Activity(
        user_id=current_user.id,
        target_id=post.id,
        target_type="post",
        action_type=action,
        text=text,
        route=f'/post/{post.id}'
    )

    db.session.add(activity)
    db.session.commit()



@post_routes.route('')
@login_required
def get_posts():
    """
    Query for all posts within the site
    """
    posts = Post.query.all()

    posts_return = []

    for post in posts:
        post_dict = post.to_dict()

        post_dict["comments"] = [
            comment.to_dict() for comment in post.comments
        ]

        if post.entries:
            post_dict["entry"] = post.entries.to_dict()
        else:
            post_dict["entry"] = None

        posts_return.append(post_dict)

    return posts_return



@post_routes.route('/user')
@login_required
def get_user_posts():
    """
    Query for all posts posted by current user
    """
    posts = Post.query.filter(Post.user_id == current_user.id).all()

    posts_return = []

    for post in posts:
        post_dict = post.to_dict()

        post_dict["comments"] = [
            comment.to_dict() for comment in post.comments
        ]

        if post.entries:
            post_dict["entry"] = post.entries.to_dict()
        else:
            post_dict["entry"] = None

        posts_return.append(post_dict)

    return posts_return




@post_routes.route('/<int:post_id>')
@login_required
def entry(post_id):
    """
    Query for a post by id and returns it in a dictionary
    """

    post = Post.query.get(post_id)

    if not post:
        return {"error": "Post couldn't be found"}, 404

    post_dict = post.to_dict()

    post_dict["comments"] = [
        comment.to_dict() for comment in post.comments
    ]

    if post.entries:
        post_dict["entry"] = post.entries.to_dict()
    else:
        post_dict["entry"] = None

    return post_dict


@post_routes.route('/new', methods=['post'])
@login_required
def create_entry():
    """
    Create a new post for the current entry
    """
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print(f'FORM DATA', form.data)

    if form.validate_on_submit():

        entry = Entry.query.get(form.data['entry_id'])
        setattr(entry, 'is_public', True)

        new_post = Post(
            entry_id=form.data['entry_id'],
            title=form.data['title'],
            message=form.data['message'],
            is_active=True,
            comments_enabled=True,
        )

        db.session.add(new_post)
        db.session.commit()

        generate_activity('create', new_post)

        post_return = new_post.to_dict()

        post_return["comments"] = [
            comment.to_dict() for comment in new_post.comments
        ]

        post_return["entry"] = entry.to_dict()

        return post_return

    else:
        return form.errors, 400


@post_routes.route('/<int:post_id>/edit', methods=['post'])
@login_required
def edit_entry(post_id):
    """
    Edit an existing post for the current user
    """
    form = EditPostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        currPost = Post.query.get(post_id)
        if not currPost:
            return {"error": "Post couldn't be found"}, 404
        setattr(currPost, 'title', form.data['title'])
        setattr(currPost, 'message', form.data['message'])
        setattr(currPost, 'comments_enabled', form.data['comments_enabled'])
        setattr(currPost, 'updated_at', datetime.now())

        db.session.commit()

        generate_activity('update', currPost)

        return currPost.to_dict()
    else:
        return form.errors, 400




# SHOULD NOT BE USED ANY MORE
@post_routes.route("/<int:post_id>/delete")
@login_required
def delete_post(post_id):
    """
    Remove an entry from being public and delete the post
    """
    post_to_delete = Post.query.get(post_id)

    entry = Entry.query.filter(Entry.id == post_to_delete.entry_id).first()
    setattr(entry, 'is_public', False)

    generate_activity('update', post_to_delete)

    db.session.delete(post_to_delete)
    db.session.commit()

    return {"message": "Post has been successfully deleted"}
