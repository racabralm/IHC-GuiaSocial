from fastapi import APIRouter, HTTPException

from backend.schemas.beneficio import BeneficioResponse
from backend.services.beneficio_service import (
    listar_beneficios,
    buscar_beneficio_por_id,
    buscar_beneficios_por_nome
)

router = APIRouter(
    prefix="/beneficios",
    tags=["Benefícios"]
)


@router.get("/", response_model=list[BeneficioResponse])
def obter_beneficios(nome: str | None = None):
    if nome:
        return buscar_beneficios_por_nome(nome)

    return listar_beneficios()


@router.get("/{beneficio_id}", response_model=BeneficioResponse)
def obter_beneficio(beneficio_id: int):
    beneficio = buscar_beneficio_por_id(beneficio_id)

    if beneficio is None:
        raise HTTPException(
            status_code=404,
            detail="Benefício não encontrado"
        )

    return beneficio
