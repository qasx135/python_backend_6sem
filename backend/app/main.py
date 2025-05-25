from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, crud, database
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # твой React-проект
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
        db: Session = Depends(get_db),
        login: str = None,
        password: str = None):
    if not login or not password:
        raise HTTPException(status_code=401,
                            detail="Login and password required")
    student = db.query(models.Student).filter(
        models.Student.login == login,
        models.Student.password_hash == password
    ).first()
    if not student:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return student


def get_admin_user(login: str, password: str, db: Session):
    student = db.query(models.Student).filter(
        models.Student.login == login,
        models.Student.password == password,
        models.Student.is_admin == True
    ).first()
    if not student:
        raise HTTPException(status_code=403, detail="Admin access required")
    return student


@app.post("/login", response_model=schemas.StudentDataResponse)
def login_student(request: schemas.StudentLoginRequest,
                  db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(
        models.Student.login == request.login,
        models.Student.password == request.password
    ).first()

    if not student:
        raise HTTPException(status_code=401,
                            detail="Invalid login or password")

    data = crud.get_student_data(db, request.login)
    if not data:
        raise HTTPException(status_code=500,
                            detail="Error fetching student data")

    return data


@app.get("/student/me", response_model=schemas.StudentDataResponse)
def get_my_data(login: str, db: Session = Depends(get_db)):
    data = crud.get_student_data(db, login)
    if not data:
        raise HTTPException(status_code=404, detail="Student not found")
    return data


@app.post("/admin/login")
def admin_login(request: schemas.StudentLoginRequest,
                db: Session = Depends(get_db)):
    student = crud.authenticate_admin(db, request.login, request.password)
    if not student:
        raise HTTPException(status_code=403, detail="Access denied")
    return {"login": student.login, "is_admin": True}


@app.get("/admin/students", response_model=list[schemas.StudentDataResponse])
def get_all_students(db: Session = Depends(get_db)):
    return crud.get_all_students_with_grades(db)


@app.post("/admin/add-student")
def add_student(data: schemas.CreateStudentRequest,
                login: str,
                password: str,
                db: Session = Depends(get_db)):
    get_admin_user(login, password, db)
    return crud.create_student(db, data.dict())


@app.post("/admin/add-group")
def add_group(data: schemas.CreateGroupRequest, db: Session = Depends(get_db)):
    return crud.create_group(db, data.name)


@app.post("/admin/add-subject")
def add_subject(data: schemas.CreateSubjectRequest,
                db: Session = Depends(get_db)):
    return crud.create_subject(db, data.name)


@app.post("/admin/add-semester")
def add_semester(data: schemas.CreateSemesterRequest,
                 db: Session = Depends(get_db)):
    return crud.create_semester(db, data.name)


@app.post("/admin/add-subject-to-group")
def add_subject_to_group(data: schemas.CreateSubjectRequestWithGroupSemester,
                         db: Session = Depends(get_db)):
    res = crud.create_group_subject(db, data.group_name,
                                    data.subject_name,
                                    data.semester_name)
    if not res:
        raise HTTPException(status_code=404,
                            detail="Group, subject or semester not found")
    return {"status": "success"}


@app.post("/admin/add-grade")
def add_grade(data: schemas.CreateGradeRequest, db: Session = Depends(get_db)):
    res = crud.create_grade(db, data.student_login, data.subject_name,
                            data.semester_name, data.grade)
    if not res:
        raise HTTPException(status_code=404,
                            detail="Student, subject or semester not found")
    return {"status": "success"}


@app.put("/admin/update-student/{student_id}")
def update_student_api(student_id: int,
                       data: schemas.CreateStudentRequest,
                       login: str,
                       password: str,
                       db: Session = Depends(get_db)):
    get_admin_user(login, password, db)
    updated = crud.update_student(db, student_id, data.dict())
    if not updated:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"status": "success", "data": updated}


@app.put("/admin/update-grade")
def update_grade_api(student_login: str,
                     subject_name: str,
                     semester_name: str,
                     new_grade: float,
                     login: str,
                     password: str,
                     db: Session = Depends(get_db)):
    get_admin_user(login, password, db)
    student = db.query(models.Student).filter(
        models.Student.login == student_login).first()
    subject = db.query(models.Subject).filter(
        models.Subject.name == subject_name).first()
    semester = db.query(models.Semester).filter(
        models.Semester.name == semester_name).first()
    if not all([student, subject, semester]):
        raise HTTPException(status_code=404, detail="Not found")

    updated = crud.update_grade(db, 
                                student.id,
                                subject.id,
                                semester.id,
                                new_grade)
    if not updated:
        raise HTTPException(status_code=404, detail="Grade not found")
    return {"status": "success", "data": updated}


@app.delete("/admin/delete-student/{student_id}")
def delete_student_api(student_id: int,
                       login: str,
                       password: str,
                       db: Session = Depends(get_db)):
    get_admin_user(login, password, db)
    if not crud.delete_student(db, student_id):
        raise HTTPException(status_code=404, detail="Student not found")
    return {"status": "deleted"}