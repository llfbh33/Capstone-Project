"""add cascade deletes

Revision ID: d1056550ed9c
Revises: ed51221efa9a
Create Date: 2026-05-24 18:54:36.717099

"""
from alembic import op
import sqlalchemy as sa

revision = 'd1056550ed9c'
down_revision = 'ed51221efa9a'
branch_labels = None
depends_on = None

naming_convention = {
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
}


def upgrade():
    with op.batch_alter_table('activities', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_activities_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_activities_user_id_users',
            'users',
            ['user_id'],
            ['id'],
            ondelete='CASCADE'
        )

    with op.batch_alter_table('comments', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_comments_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_comments_user_id_users',
            'users',
            ['user_id'],
            ['id'],
            ondelete='CASCADE'
        )

    with op.batch_alter_table('entries', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_entries_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_entries_notebook_id_notebooks', type_='foreignkey')

        batch_op.create_foreign_key(
            'fk_entries_user_id_users',
            'users',
            ['user_id'],
            ['id'],
            ondelete='CASCADE'
        )

        batch_op.create_foreign_key(
            'fk_entries_notebook_id_notebooks',
            'notebooks',
            ['notebook_id'],
            ['id'],
            ondelete='CASCADE'
        )

    with op.batch_alter_table('notebooks', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_notebooks_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_notebooks_user_id_users',
            'users',
            ['user_id'],
            ['id'],
            ondelete='CASCADE'
        )

    with op.batch_alter_table('posts', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_posts_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_posts_user_id_users',
            'users',
            ['user_id'],
            ['id'],
            ondelete='CASCADE'
        )


def downgrade():
    with op.batch_alter_table('posts', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_posts_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_posts_user_id_users',
            'users',
            ['user_id'],
            ['id']
        )

    with op.batch_alter_table('notebooks', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_notebooks_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_notebooks_user_id_users',
            'users',
            ['user_id'],
            ['id']
        )

    with op.batch_alter_table('entries', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_entries_notebook_id_notebooks', type_='foreignkey')
        batch_op.drop_constraint('fk_entries_user_id_users', type_='foreignkey')

        batch_op.create_foreign_key(
            'fk_entries_notebook_id_notebooks',
            'notebooks',
            ['notebook_id'],
            ['id']
        )

        batch_op.create_foreign_key(
            'fk_entries_user_id_users',
            'users',
            ['user_id'],
            ['id']
        )

    with op.batch_alter_table('comments', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_comments_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_comments_user_id_users',
            'users',
            ['user_id'],
            ['id']
        )

    with op.batch_alter_table('activities', schema=None, naming_convention=naming_convention) as batch_op:
        batch_op.drop_constraint('fk_activities_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(
            'fk_activities_user_id_users',
            'users',
            ['user_id'],
            ['id']
        )

    # ### end Alembic commands ###
