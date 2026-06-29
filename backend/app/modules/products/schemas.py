from pydantic import BaseModel


class ProductCreateRequest(BaseModel):
    name: str
    unit: str
    rate: float


class ProductPriceUpdateRequest(BaseModel):
    name: str
    rate: float


class ProductResponse(BaseModel):
    id: int
    name: str
    unit: str
    rate: float

    class Config:
        from_attributes = True