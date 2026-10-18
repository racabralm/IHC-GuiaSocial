from backend.data.beneficios import beneficios


def listar_beneficios():
    return beneficios


def buscar_beneficio_por_id(beneficio_id: int):
    for beneficio in beneficios:
        if beneficio["id"] == beneficio_id:
            return beneficio

    return None
