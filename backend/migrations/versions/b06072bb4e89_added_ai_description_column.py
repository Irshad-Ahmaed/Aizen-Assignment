"""added ai_description column

Revision ID: b06072bb4e89
Revises: 949a1a1cf910
Create Date: 2025-03-14 03:13:32.538210

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b06072bb4e89'
down_revision = '949a1a1cf910'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('image', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ai_description', sa.String(length=500), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('image', schema=None) as batch_op:
        batch_op.drop_column('ai_description')

    # ### end Alembic commands ###
