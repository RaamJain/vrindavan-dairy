"""Application directory and storage path configuration."""

import os
import sys
from pathlib import Path


def get_app_data_dir() -> Path:
    """Return the directory used to store application data."""

    if getattr(sys, "frozen", False):
        if sys.platform == "darwin":
            return (
                Path.home()
                / "Library"
                / "Application Support"
                / "Vrindavan Dairy"
            )

        if sys.platform == "win32":
            return (
                Path(
                    os.environ["APPDATA"],
                )
                / "Vrindavan Dairy"
            )

    return Path(__file__).resolve().parents[2]


PROJECT_ROOT = get_app_data_dir()

BACKUPS_DIR = PROJECT_ROOT / "backups"

STORAGE_DIR = PROJECT_ROOT / "storage"

DATABASE_PATH = STORAGE_DIR / "database.db"

MILK_RECORDS_DIR = STORAGE_DIR / "milk_records"

ACCOUNTS_DIR = STORAGE_DIR / "accounts"

for directory in (
    STORAGE_DIR,
    MILK_RECORDS_DIR,
    ACCOUNTS_DIR,
    BACKUPS_DIR,
):
    directory.mkdir(
        parents=True,
        exist_ok=True,
    )
