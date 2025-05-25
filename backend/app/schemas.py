from pydantic import BaseModel
from typing import List, Optional


class StudentLoginRequest(BaseModel):
    login: str
    password: str


class StudentInfoResponse(BaseModel):
    first_name: str
    last_name: str
    middle_name: Optional[str]
    group: str


class GradeResponse(BaseModel):
    subject: str
    semester: str
    grade: Optional[float]


class StudentDataResponse(StudentInfoResponse):
    first_name: str
    last_name: str
    middle_name: Optional[str]
    group: str
    grades: List[GradeResponse]
    average_grade: Optional[float]


class CreateStudentRequest(BaseModel):
    first_name: str
    last_name: str
    middle_name: Optional[str]
    group_id: int
    login: str
    password: str


class CreateGroupRequest(BaseModel):
    name: str


class CreateSubjectRequest(BaseModel):
    name: str


class CreateSemesterRequest(BaseModel):
    name: str


class CreateSubjectRequestWithGroupSemester(BaseModel):
    group_name: str
    subject_name: str
    semester_name: str


class CreateGradeRequest(BaseModel):  # Наследуемся от CreateSemesterRequest, чтобы получить поле `name` как семестр
    student_login: str
    subject_name: str
    semester_name: str
    grade: float
