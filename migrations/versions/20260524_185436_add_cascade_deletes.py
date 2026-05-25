"""add cascade deletes

Revision ID: d1056550ed9c
Revises: ed51221efa9a
Create Date: 2026-05-24 18:54:36.717099

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1056550ed9c'
down_revision = 'ed51221efa9a'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('activities', schema=None) as batch_op:
        batch_op.drop_constraint('activities_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key('fk_activities_user_id_users', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint('comments_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key('fk_comments_user_id_users', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('entries', schema=None) as batch_op:
        batch_op.drop_constraint('entries_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('entries_notebook_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key('fk_entries_user_id_users', 'users', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('fk_entries_notebook_id_notebooks', 'notebooks', ['notebook_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('notebooks', schema=None) as batch_op:
        batch_op.drop_constraint('notebooks_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key('fk_notebooks_user_id_users', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint('fk_posts_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key('fk_posts_user_id_users', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint('fk_posts_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key('fk_posts_user_id_users', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('notebooks', schema=None) as batch_op:
        batch_op.drop_constraint('fk_notebooks_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key('notebooks_user_id_fkey', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('entries', schema=None) as batch_op:
        batch_op.drop_constraint('fk_entries_notebook_id_notebooks', type_='foreignkey')
        batch_op.drop_constraint('fk_entries_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key('entries_notebook_id_fkey', 'notebooks', ['notebook_id'], ['id'])
        batch_op.create_foreign_key('entries_user_id_fkey', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint('fk_comments_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key('comments_user_id_fkey', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('activities', schema=None) as batch_op:
        batch_op.drop_constraint('fk_activities_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key('activities_user_id_fkey', 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###
