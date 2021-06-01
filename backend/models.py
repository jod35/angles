from flask_sqlalchemy import SQLAlchemy

sa=SQLAlchemy()


class Article(sa.Model):
    id=sa.Column(sa.Integer(), primary_key=True)
    username=sa.Column(sa.String(255), nullable=False)
    email=sa.Column(sa.String(255),nullable=False)

    def __str__(self):
        return self.username