"""empty message

Revision ID: 31d505e46568
Revises: 
Create Date: 2024-05-29 21:46:19.276335

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31d505e46568'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=60), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('profile_image', sa.String(length=255), nullable=True),
    sa.Column('theme', sa.String(length=50), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('notebooks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('about', sa.String(length=400), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('notebook_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['notebook_id'], ['notebooks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('entry_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=600), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['entry_id'], ['entries.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('entry_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=250), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['entry_id'], ['entries.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('posts')
    op.drop_table('comments')
    op.drop_table('entries')
    op.drop_table('notebooks')
    op.drop_table('users')
    # ### end Alembic commands ###