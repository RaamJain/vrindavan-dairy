# """Application entry point for the Vrindavan Dairy backend."""
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from app.core.database import Base, engine

# from app.modules.customers.routes import router as customer_router
# from app.modules.products.routes import router as product_router
# from app.modules.daily_entry.routes import router as daily_entry_router
# from app.modules.reports.routes import router as reports_routes
# from app.modules.billing.routes import router as billing_router
# from app.modules.payments.routes import router as payment_router

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Base.metadata.create_all(bind=engine)

# app.include_router(customer_router)
# app.include_router(product_router)
# app.include_router(daily_entry_router)
# app.include_router(reports_routes)
# app.include_router(billing_router)
# app.include_router(payment_router)


# @app.get("/")
# def home():
#     """Return a simple health check response."""
#     return {"message": "Vrindavan Dairy API running"}


"""Application entry point for the Vrindavan Dairy backend."""

from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.core.backup import create_backup
from app.modules.customers.routes import router as customer_router
from app.modules.products.routes import router as product_router
from app.modules.daily_entry.routes import router as daily_entry_router
from app.modules.reports.routes import router as reports_routes
from app.modules.billing.routes import router as billing_router
from app.modules.payments.routes import router as payment_router

from app.core.excel import (
    create_accounts_workbook_if_not_exists,
    create_month_workbook_if_not_exists,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    """Initialize the application on startup."""

    Base.metadata.create_all(bind=engine)
    create_backup()
    now = datetime.now()

    create_accounts_workbook_if_not_exists()

    create_month_workbook_if_not_exists(
        year=now.year,
        month=now.month,
    )


app.include_router(customer_router)
app.include_router(product_router)
app.include_router(daily_entry_router)
app.include_router(reports_routes)
app.include_router(billing_router)
app.include_router(payment_router)


@app.get("/")
def home():
    """Return a simple health check response."""

    return {
        "message": "Vrindavan Dairy API running",
    }