from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, declarative_base

engine = create_engine('sqlite:///app.sqlite')
db_session = scoped_session(sessionmaker(
    autoflush=False,
    bind=engine
))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import app.models
    Base.metadata.create_all(bind=engine)