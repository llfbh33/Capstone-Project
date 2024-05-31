from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    one = Post(
        entry_id=1,
        message='Just messing around a little with a new writing style'
    )
    two = Post(
        entry_id=3,
        message="I'm not really sure where to go with this story.  I want to expand on it but I'm having a bit of writers block"
    )
    three = Post(
        entry_id=5,
        message="I'm thinking this piece might be better as a poem.  It feels very poetic but just a bit to short for a good short story"
    )
    four = Post(
        entry_id=7,
        message='Open to any optinions!  First draft of the first chapter of my book!'
    )
    five = Post(
        entry_id=8,
        message='Making sure that this post shows up when looking for all posts but not when looking up by the current user'
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
