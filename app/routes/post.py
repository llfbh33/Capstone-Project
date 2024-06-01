from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, db, Entry
from app.forms import PostForm, EditPostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)


@post_routes.route('')
@login_required
def get_posts():
    """
    Query for all posts within the site
    """

    entries = Entry.query.filter(Entry.is_public == True).all()
    posts = []

    for entry in entries:
        entry_post = []
        for post in entry.posts:
            entry_post.append(post.to_dict())
        entry_comments = []
        for comment in entry.comments:
            entry_comments.append(comment.to_dict())
        entry_w_post = entry.to_dict()
        entry_w_post['post'] = entry_post
        entry_w_post['comments'] = entry_comments
        posts.append(entry_w_post)

    return posts



@post_routes.route('/user')
@login_required
def get_user_posts():
    """
    Query for all posts posted by current user
    """
    entries = Entry.query.filter(Entry.is_public == True, Entry.user_id == current_user.id).all()
    posts = []

    for entry in entries:
        entry_post = []
        for post in entry.posts:
            entry_post.append(post.to_dict())
        entry_comments = []
        for comment in entry.comments:
            entry_comments.append(comment.to_dict())
        entry_w_post = entry.to_dict()
        entry_w_post['post'] = entry_post
        entry_w_post['comments'] = entry_comments
        posts.append(entry_w_post)

    return posts




@post_routes.route('/<int:post_id>')
@login_required
def entry(post_id):
    """
    Query for a post by id and returns it in a dictionary
    """
    post = Post.query.filter(Post.id == post_id).first()
    entry = Entry.query.filter(Entry.id == post.entry_id).first()

    entry_comments = []
    for comment in entry.comments:
        entry_comments.append(comment.to_dict())

    entry_return = entry.to_dict()
    entry_return['post'] = post.to_dict()
    entry_return['comments'] = entry_comments

    return entry_return


@post_routes.route('/new', methods=['post'])
@login_required
def create_entry():
    """
    Create a new post for the current entry
    """
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        entry = Entry.query.get(form.data['entry_id'])
        setattr(entry, 'is_public', True)

        new_post = Post (
            entry_id = form.data['entry_id'],
            message = form.data['message'],
        )

        db.session.add(new_post)
        db.session.commit()

        post = Post.query.filter(Post.entry_id == form.data['entry_id']).first()
        post_return = entry.to_dict()
        post_return['post'] = post.to_dict()

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
        setattr(currPost, 'message', form.data['message'])
        setattr(currPost, 'updated_at', datetime.now())

        db.session.commit()

        entry = Entry.query.get(form.data['entry_id'])
        post_return = entry.to_dict()
        post_return['post'] = currPost.to_dict()

        return post_return
    else:
        return form.errors, 400


@post_routes.route("/<int:post_id>/delete")
@login_required
def delete_notebook(post_id):
    """
    Remove an entry from being public and delete the post
    """
    print('I have arrived')
    post_to_delete = Post.query.get(post_id)

    entry = Entry.query.filter(Entry.id == post_to_delete.entry_id).first()
    setattr(entry, 'is_public', False)

    db.session.delete(post_to_delete)
    db.session.commit()

    return {"message": "Post has been successfully deleted"}
