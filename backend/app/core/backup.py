"""Automatic backup utilities."""

from datetime import datetime
from pathlib import Path
import zipfile

from app.core.paths import STORAGE_DIR
from app.core.paths import BACKUPS_DIR


def create_backup() -> Path:
    """Create a timestamped backup of the storage directory."""

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    backup_file = (
        BACKUPS_DIR
        / f"backup_{timestamp}.zip"
    )

    with zipfile.ZipFile(
        backup_file,
        "w",
        zipfile.ZIP_DEFLATED,
    ) as archive:

        for file in STORAGE_DIR.rglob("*"):

            if file.is_file():

                archive.write(
                    file,
                    file.relative_to(
                        STORAGE_DIR.parent,
                    ),
                )

    cleanup_backups()
    return backup_file


def cleanup_backups(
    keep: int = 30,
) -> None:

    backups = sorted(
        BACKUPS_DIR.glob("backup_*.zip"),
        key=lambda file: file.stat().st_mtime,
        reverse=True,
    )

    for backup in backups[keep:]:

        backup.unlink()
