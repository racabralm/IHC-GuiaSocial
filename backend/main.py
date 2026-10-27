import sys
from pathlib import Path

# Permite executar a API a partir da raiz ou de dentro da pasta backend/
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.routes.beneficios import router as beneficios_router

app = FastAPI(
    title="Guia Social API",
    description="API para consulta de programas e benefícios sociais",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$|^https://.*\.app\.github\.dev$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(beneficios_router)

FRONTEND_DIST = ROOT_DIR / "frontend" / "dist"

if (FRONTEND_DIST / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")


@app.get("/")
def inicio(request: Request):
    accept = request.headers.get("accept", "")
    if FRONTEND_DIST.exists() and "text/html" in accept and "application/json" not in accept:
        return FileResponse(FRONTEND_DIST / "index.html")

    return {
        "mensagem": "API Guia Social funcionando"
    }


@app.get("/{full_path:path}")
def servir_frontend(full_path: str, request: Request):
    arquivo = FRONTEND_DIST / full_path
    if FRONTEND_DIST.exists() and full_path and arquivo.is_file():
        return FileResponse(arquivo)

    if FRONTEND_DIST.exists() and "text/html" in request.headers.get("accept", ""):
        return FileResponse(FRONTEND_DIST / "index.html")

    raise HTTPException(status_code=404, detail="Não encontrado")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
