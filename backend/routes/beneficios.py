from fastapi import APIRouter, HTTPException

from backend.services.beneficio_service import (
    listar_beneficios,
    buscar_beneficio_por_id
)


router = APIRouter(
    prefix="/beneficios",
    tags=["Benefícios"]
)


@router.get("/")
def obter_beneficios():
    return listar_beneficios()


@router.get("/{beneficio_id}")
def obter_beneficio(beneficio_id: int):
    beneficio = buscar_beneficio_por_id(beneficio_id)

    if beneficio is None:
        raise HTTPException(
            status_code=404,
            detail="Benefício não encontrado"
        )

    return beneficio