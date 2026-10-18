from pydantic import BaseModel


class BeneficioResponse(BaseModel):
    id: int
    nome: str
    categoria: str
    descricao: str
    publico: str
    cadastro: str
    requisitos: str
    documentos: str
    comoSolicitar: str
    canal: str

    canalAdicional: str | None = None
    nomeCanalAdicional: str | None = None
