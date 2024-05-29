from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        name='Demo', username='demo', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-1.png', password='password')
    marnie = User(
        name='Marie', username='marnie', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-3.png', password='password')
    bobbie = User(
        name='Bobbie', username='bobbie', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-4.png', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
