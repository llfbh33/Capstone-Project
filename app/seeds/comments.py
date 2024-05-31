from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    one = Comment(
        user_id=2,
        entry_id=1,
        comment='Interesting story.  A little short for my tastes.  Could use a little beefing up'
    )
    two = Comment(
        user_id=3,
        entry_id=1,
        comment="This is a good base.  Maybe add more information about Lisa's personality.  Is she a scardy cat?  Is she a normally brave person? "
    )
    three = Comment(
        user_id=4,
        entry_id=4,
        comment='I like this one.  It reminds me of the movie Castaway with Tim Allen'
    )
    four = Comment(
        user_id=1,
        entry_id=8,
        comment='I am not sure what you are trying for here.  Is this supposed to be creative writing?  Can you please elaborate on your thought process?'
    )
    five = Comment(
        user_id=5,
        entry_id=7,
        comment="Oh wow!  I love it!  I can't wait to read chapter 2!  Will the captain make a lot of friends in the stars?  On the edge of my seat!"
    )
    six = Comment(
        user_id=2,
        entry_id=7,
        comment="Huh, I'm a fan of sci-fi, but really?  A mokey space captain?  It's a bit of a stretch even for this type of theme."
    )
    seven = Comment(
        user_id=3,
        entry_id=5,
        comment='I think your right.  Turning this into a poem would really give it the right feeling.'
    )


    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
