from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from app.db import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(120), unique=True)
    password = Column(String(80), nullable=False)

    created_tasks: Mapped[List['Task']] = relationship(
        back_populates='creator', cascade='all, delete-orphan'
    )

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return f'<User {self.email}>'
    
class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    description = Column(String(255))
    status = Column(String(50), nullable=False, default='pending')

    creator_id = Column(ForeignKey('users.id'))

    creator: Mapped['User'] = relationship(back_populates='created_tasks')

    def __init__(self, title=None, description=None):
        self.title = title
        self.description = description

    def __repr__(self):
        return f'<Task {self.title}>'
    
    def to_json(self):
        return {
            'id': self.id,
            "title": self.title,
            "description": self.description,
            'status': self.status,
            'creator_id': self.creator_id
        }