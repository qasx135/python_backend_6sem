from sqlalchemy.orm import Session
from app import models


def get_student_by_login(db: Session, login: str):
    return db.query(models.Student).filter(
        models.Student.login == login).first()


def authenticate_admin(db: Session, login: str, password: str):
    student = get_student_by_login(db, login)
    if not student or not student.is_admin or student.password != password:
        return None
    return student


def get_all_students_with_grades(db: Session):
    students = db.query(models.Student).all()
    result = []

    for student in students:
        # Получаем группу студента
        group = student.group

        # Получаем все предметы и семестры для этой группы
        group_subjects = (
            db.query(
                models.GroupSubject,
                models.Subject.name,
                models.Semester.name)
            .join(models.Subject)
            .join(models.Semester)
            .filter(models.GroupSubject.group_id == group.id)
            .all()
        )

        # Получаем оценки студента
        grades = (
            db.query(models.Grade, models.Subject.name, models.Semester.name)
            .join(models.Subject)
            .join(models.Semester)
            .filter(models.Grade.student_id == student.id)
            .all()
        )

        # Создаём словарь оценок по ключу (subject_id, semester_id)
        grade_dict = {(g.subject.name, g.semester.name):
                      g.grade for g, _, _ in grades}

        # Формируем финальный список оценок с учётом всех предметов группы
        grades_list = [
            {
                "subject": subject_name,
                "semester": semester_name,
                "grade": grade_dict.get((subject_name, semester_name))
            }
            for gs, subject_name, semester_name in group_subjects
        ]

        # Считаем средний балл, игнорируя None
        valid_grades = [g["grade"] for g in grades_list if
                        g["grade"] is not None]
        avg_grade = round(sum(valid_grades) /
                          len(valid_grades), 2) if valid_grades else None

        result.append(
            {
                "id": student.id,
                "first_name": student.first_name,
                "last_name": student.last_name,
                "middle_name": student.middle_name,
                "group": group.name,
                "login": student.login,
                "grades": grades_list,
                "average_grade": avg_grade,
            }
        )

    return result


def get_student_data(db: Session, login: str):
    student = db.query(models.Student).filter(
        models.Student.login == login).first()
    if not student:
        return None

    # Получаем все предметы группы студента
    group_subjects = (
        db.query(models.GroupSubject)
        .filter(models.GroupSubject.group_id == student.group_id)
        .all()
    )

    # Формируем словарь:
    # {subject_id: {"subject": name, "semester": semester_name}}
    subject_info = {}
    for gs in group_subjects:
        subject = db.query(models.Subject).get(gs.subject_id)
        semester = db.query(models.Semester).get(gs.semester_id)
        subject_info[gs.subject_id] = {
            "subject": subject.name if subject else "Unknown",
            "semester": semester.name if semester else "Unknown",
        }

    # Получаем оценки студента
    grades_db = (
        db.query(models.Grade)
        .filter(models.Grade.student_id == student.id)
        .all()
    )

    # Формируем словарь: {subject_id: grade}
    grades_dict = {g.subject_id: g.grade for g in grades_db}

    # Объединяем всё: для каждого предмета группы — добавляем оценку, если есть
    grades_list = []
    for subject_id, info in subject_info.items():
        grade = grades_dict.get(subject_id)
        grades_list.append({
            "subject": info["subject"],
            "semester": info["semester"],
            "grade": grade  # Может быть None, если оценки нет
        })

    # Считаем средний балл, игнорируя None
    valid_grades = [g["grade"] for g in grades_list if g["grade"] is not None]
    avg_grade = round(
        sum(valid_grades) / len(valid_grades), 2) if valid_grades else None

    return {
        "first_name": student.first_name,
        "last_name": student.last_name,
        "middle_name": student.middle_name,
        "group": student.group.name,
        "grades": grades_list,
        "average_grade": avg_grade
    }


def create_student(db: Session, data: dict):
    db_student = models.Student(**data)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def create_group(db: Session, name: str):
    db_group = models.Group(name=name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group


def create_subject(db: Session, name: str):
    db_subject = models.Subject(name=name)
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject


def create_semester(db: Session, name: str):
    db_semester = models.Semester(name=name)
    db.add(db_semester)
    db.commit()
    db.refresh(db_semester)
    return db_semester


def create_group_subject(
    db: Session, group_name: str, subject_name: str, semester_name: str
):
    group = db.query(models.Group).filter(
        models.Group.name == group_name).first()
    subject = (
        db.query(models.Subject).filter(
            models.Subject.name == subject_name).first()
    )
    semester = (
        db.query(models.Semester).filter(
            models.Semester.name == semester_name).first()
    )

    if not all([group, subject, semester]):
        return None

    db_gs = models.GroupSubject(
        group_id=group.id,
        subject_id=subject.id,
        semester_id=semester.id
    )
    db.add(db_gs)
    db.commit()
    db.refresh(db_gs)
    return db_gs


def create_grade(
    db: Session, student_login: str,
    subject_name: str,
    semester_name: str,
    grade: float
):
    student = (
        db.query(models.Student).filter(
            models.Student.login == student_login).first()
    )
    subject = (
        db.query(models.Subject).filter(
            models.Subject.name == subject_name).first()
    )
    semester = (
        db.query(models.Semester).filter(
            models.Semester.name == semester_name).first()
    )

    if not all([student, subject, semester]):
        return None

    db_grade = models.Grade(
        student_id=student.id,
        subject_id=subject.id,
        semester_id=semester.id,
        grade=grade,
    )

    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade


def update_student(db: Session, student_id: int, data: dict):
    db_student = db.query(models.Student).get(student_id)
    if not db_student:
        return None
    for key, value in data.items():
        setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_grade(db: Session, student_id: int,
                 subject_id: int, semester_id: int, new_grade: float):
    db_grade = db.query(models.Grade).get((student_id,
                                           subject_id, semester_id))
    if not db_grade:
        return None
    db_grade.grade = new_grade
    db.commit()
    db.refresh(db_grade)
    return db_grade


def delete_student(db: Session, student_id: int):
    db_student = db.query(models.Student).get(student_id)
    if not db_student:
        return False
    db.delete(db_student)
    db.commit()
    return True


def delete_grade(db: Session, student_id: int,
                 subject_id: int, semester_id: int):
    db_grade = db.query(models.Grade).get((student_id,
                                           subject_id, semester_id))
    if not db_grade:
        return False
    db.delete(db_grade)
    db.commit()
    return True