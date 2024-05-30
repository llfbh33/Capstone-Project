from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        name='Demo User', username='demo-user', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-1.png', password='password')
    marnie = User(
        name='Marie Jones', username='MarineMiner34', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-3.png', password='password1')
    bobbie = User(
        name='Bobbie Tom', username='BobbingTom863', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-4.png', password='password2')
    sandra = User(
        name='Sandra Lennan', username='GiftedGrandure2974', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-5.png', password='password3')
    becka = User(
        name='Rebecka Green', username='TanningTurtle465', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-1.png', password='password4')
    leslie = User(
        name='Leslie Martin', username='MagicMartian', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-3.png', password='password5')
    henrey = User(
        name='Henrey Lenstine', username='TrashedTarzan26', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-4.png', password='password6')
    david = User(
        name='David Klinesfield', username='SweetnSour995', profile_image='https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-5.png', password='password7')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sandra)
    db.session.add(becka)
    db.session.add(leslie)
    db.session.add(henrey)
    db.session.add(david)
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
