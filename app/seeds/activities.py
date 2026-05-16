from app.models import db, Activity, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_activities():
    one = Activity(
        user_id=1, target_id=1, notebook_id=None, target_type="notebook", text="Created a new notebook: 'Short Stories'", created_at=datetime(2026, 5, 8, 9, 12))
    two = Activity(
        user_id=1, target_id=1, notebook_id=1, target_type="entry", text="Added a new entry to: 'Short Stories'", created_at=datetime(2026, 5, 9, 14, 47))
    three = Activity(
        user_id=1, target_id=1, notebook_id=1, target_type="entry", text="Updated 'The Closet' in 'Short Stories'", created_at=datetime(2026, 5, 10, 18, 5))
    four = Activity(
        user_id=1, target_id=1, notebook_id=None, target_type="post", text="Published 'The Closet'", created_at=datetime(2026, 5, 11, 11, 26))
    five = Activity(
        user_id=1, target_id=2, notebook_id=None, target_type="notebook", text="Created a new notebook: 'Journal'", created_at=datetime(2026, 5, 12, 20, 14))
    six = Activity(
        user_id=1, target_id=2, notebook_id=2, target_type="entry", text="Added a new entry to: 'Journal'", created_at=datetime(2026, 5, 14, 8, 53))
    seven = Activity(
        user_id=1, target_id=8, notebook_id=None, target_type="comment", text="Commented on 'May 31, 2024'", created_at=datetime(2026, 5, 15, 16, 31))


    activities = [one, two, three, four, five, six, seven]

    # for activity in activities:
    #     print(activity.to_dict())

    db.session.add_all(activities)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_activities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activities"))

    db.session.commit()
