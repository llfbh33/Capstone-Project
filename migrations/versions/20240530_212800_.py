"""empty message

Revision ID: a8baa5a669bc
Revises: 45d5497fc024
Create Date: 2024-05-30 21:28:00.356854

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a8baa5a669bc'
down_revision = '45d5497fc024'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('entries', schema=None) as batch_op:
        batch_op.alter_column('content',
               existing_type=sa.BLOB(),
               type_=sa.Text(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('entries', schema=None) as batch_op:
        batch_op.alter_column('content',
               existing_type=sa.Text(),
               type_=sa.BLOB(),
               existing_nullable=False)

    # ### end Alembic commands ###
