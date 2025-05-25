from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base


class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)


class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    middle_name = Column(String(50))
    group_id = Column(Integer, ForeignKey('groups.id'), nullable=False)
    login = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    is_admin = Column(Boolean, default=False)

    group = relationship("Group")
    grades = relationship("Grade")


class Semester(Base):
    __tablename__ = 'semesters'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)


class Subject(Base):
    __tablename__ = 'subjects'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)


class GroupSubject(Base):
    __tablename__ = 'group_subjects'
    group_id = Column(Integer, ForeignKey('groups.id'), primary_key=True)
    subject_id = Column(Integer, ForeignKey('subjects.id'), primary_key=True)
    semester_id = Column(Integer, ForeignKey('semesters.id'), primary_key=True)


class Grade(Base):
    __tablename__ = 'grades'
    student_id = Column(Integer, ForeignKey('students.id'), primary_key=True)
    subject_id = Column(Integer, ForeignKey('subjects.id'), primary_key=True)
    semester_id = Column(Integer, ForeignKey('semesters.id'), primary_key=True)
    grade = Column(Float, nullable=False)

    student = relationship("Student")
    subject = relationship("Subject")
    semester = relationship("Semester")