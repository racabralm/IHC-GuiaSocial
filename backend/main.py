from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.beneficios import router as beneficios_router

app = FastAPI(
    title="Guia Social API",
    description="API para consulta de programas e benefícios sociais",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(beneficios_router)


@app.get("/")
def inicio():
    return {
        "mensagem": "API Guia Social funcionando"
    }
