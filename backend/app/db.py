import sqlite3
from datetime import datetime

import click
from flask import current_app, g

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, declarative_base

engine = create_engine('sqlite:///app.sqlite')
db_session = scoped_session(sessionmaker(
    autoflush=False,
    bind=engine
))

Base = declarative_base()
Base.query = db_session.query_property()

# def get_db():
#     if 'db' not in g:
#         g.db = sqlite3.connect(
#             current_app.config['DATABASE'],
#             detect_types=sqlite3.PARSE_DECLTYPES
#         )
#         g.db.row_factory = sqlite3.Row

#     return g.db


# def close_db(e=None):
#     db = g.pop('db', None)

#     if db is not None:
#         db.close()

def init_db():
    import app.models
    Base.metadata.create_all(bind=engine)
    # db = get_db()

    # with current_app.open_resource('schema.sql') as f:
    #     db.executescript(f.read().decode('utf8'))


# @click.command('init-db')
# def init_db_command():
#     """Clear the existing data and create new tables."""
#     init_db()
#     click.echo('Initialized the database.')


# sqlite3.register_converter(
#     "timestamp", lambda v: datetime.fromisoformat(v.decode())
# )

# def init_app(app):
#     app.teardown_appcontext(close_db)
#     app.cli.add_command(init_db_command)