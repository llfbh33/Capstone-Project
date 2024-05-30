from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text


def seed_notebooks():
    one  = Notebook(
        user_id = 1,
        name = 'Short Stories',
        about='This notebook will allow me to explore diverse characters, settings, and plots without the commitment of a full-length novel. It will hone my writing skills, encourages creativity, and provides quick, satisfying storytelling experiences for myself and other readers.'
        )
    two  = Notebook(
        user_id = 1,
        name = 'Journal',
        about="I'm hoping this journal will help me reflect on my thoughts and emotions more, to provid clarity and reducing stress.  I am trying to improve my mental health, I think a good first step is providing a healthy outlet for my emotions."
        )
    three  = Notebook(
        user_id = 1,
        name = "Captain Simian's Odyssey",
        about='''Here I am going to start my book about Captain Simian't travels through the stars on his starship the Galileo.  He navigates uncharted galaxies, encounters alien civilizations, and combats cosmic threats. It will be a sci-fi adventure exploring bravery, teamwork, and the boundless possibilities of space exploration.'''
        )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
