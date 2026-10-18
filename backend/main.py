from fastapi import FastAPI

from backend.routes.beneficios import router as beneficios_router


app = FastAPI(
    title="Guia Social API",
    description="API para consulta de programas e benefícios sociais",
    version="1.0.0"
)

app.include_router(beneficios_router)


@app.get("/")
def inicio():
    return {
        "mensagem": "Teste API Guia Social: funcionando"
    }