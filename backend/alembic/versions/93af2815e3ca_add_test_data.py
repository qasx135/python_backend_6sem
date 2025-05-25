"""Add test data

Revision ID: 93af2815e3ca
Revises: 137176e04e63
Create Date: 2025-05-22 13:48:12.806747

"""
from typing import Sequence, Union

from alembic import op
from app.models import Group, Student, Semester, Subject, GroupSubject, Grade


# revision identifiers, used by Alembic.
revision: str = '93af2815e3ca'
down_revision: Union[str, None] = '137176e04e63'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.bulk_insert(
        Group.__table__,
        [
            {"name": "ПИ-101"},
            {"name": "ИС-202"},
            {"name": "ТИ-301"},
        ]
    )

# Добавляем семестры
    op.bulk_insert(
        Semester.__table__,
        [
            {"name": "1 семестр"},
            {"name": "2 семестр"},
            {"name": "3 семестр"},
            {"name": "4 семестр"},
        ]
    )

    # Добавляем предметы
    op.bulk_insert(
        Subject.__table__,
        [
            {"name": "Математика"},
            {"name": "Программирование"},
            {"name": "Физика"},
            {"name": "Базы данных"},
            {"name": "Английский язык"},
            {"name": "История"},
            {"name": "Операционные системы"},
            {"name": "Компьютерные сети"},
        ]
    )

    # Добавляем студентов
    op.bulk_insert(
        Student.__table__,
        [
            {
                "first_name": "Иван",
                "last_name": "Иванов",
                "middle_name": "Иванович",
                "group_id": 1,
                "login": "ivanov",
                "password": "ivanov123",  # хранится в открытом виде
                "is_admin": False,
            },
            {
                "first_name": "Петр",
                "last_name": "Петров",
                "middle_name": "Петрович",
                "group_id": 1,
                "login": "petrov",
                "password": "petrov123",
                "is_admin": False,
            },
            {
                "first_name": "Сидор",
                "last_name": "Сидоров",
                "middle_name": "Сидорович",
                "group_id": 2,
                "login": "sidorov",
                "password": "sidorov123",
                "is_admin": False,
            },
            {
                "first_name": "Админ",
                "last_name": "Админов",
                "middle_name": "Админович",
                "group_id": 3,
                "login": "admin",
                "password": "admin123",
                "is_admin": True,
            },
            {
                "first_name": "Алексей",
                "last_name": "Алексеев",
                "middle_name": "Алексеевич",
                "group_id": 2,
                "login": "alekseev",
                "password": "alekseev123",
                "is_admin": False,
            },
        ]
    )

    # Назначаем предметы на группы и семестры
    op.bulk_insert(
        GroupSubject.__table__,
        [
            {"group_id": 1, "subject_id": 1, "semester_id": 1},
            {"group_id": 1, "subject_id": 2, "semester_id": 1},
            {"group_id": 1, "subject_id": 3, "semester_id": 2},
            {"group_id": 1, "subject_id": 4, "semester_id": 2},

            {"group_id": 2, "subject_id": 5, "semester_id": 1},
            {"group_id": 2, "subject_id": 6, "semester_id": 1},
            {"group_id": 2, "subject_id": 7, "semester_id": 2},
            {"group_id": 2, "subject_id": 8, "semester_id": 2},

            {"group_id": 3, "subject_id": 1, "semester_id": 1},
            {"group_id": 3, "subject_id": 2, "semester_id": 1},
            {"group_id": 3, "subject_id": 3, "semester_id": 2},
            {"group_id": 3, "subject_id": 4, "semester_id": 2},
        ]
    )

    # Добавляем оценки
    op.bulk_insert(
        Grade.__table__,
        [
            {"student_id": 1, "subject_id": 1, "semester_id": 1, "grade": 5.0},
            {"student_id": 1, "subject_id": 2, "semester_id": 1, "grade": 4.5},
            {"student_id": 1, "subject_id": 3, "semester_id": 2, "grade": 4.0},

            {"student_id": 2, "subject_id": 1, "semester_id": 1, "grade": 3.5},
            {"student_id": 2, "subject_id": 2, "semester_id": 1, "grade": 4.0},

            {"student_id": 4, "subject_id": 5, "semester_id": 1, "grade": 5.0},
            {"student_id": 4, "subject_id": 6, "semester_id": 1, "grade": 4.0},
        ]
    )
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
