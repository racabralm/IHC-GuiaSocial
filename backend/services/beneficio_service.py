import unicodedata

from backend.data.beneficios import beneficios


def listar_beneficios():
    return beneficios


def buscar_beneficio_por_id(beneficio_id: int):
    for beneficio in beneficios:
        if beneficio["id"] == beneficio_id:
            return beneficio

    return None


def normalizar_texto(texto: str):
    texto = texto.lower()
    texto = unicodedata.normalize("NFD", texto)

    texto = "".join(
        caractere
        for caractere in texto
        if unicodedata.category(caractere) != "Mn"
    )

    return texto


def buscar_beneficios_por_nome(nome: str):
    resultados = []

    nome_normalizado = normalizar_texto(nome)

    for beneficio in beneficios:
        beneficio_normalizado = normalizar_texto(beneficio["nome"])

        if nome_normalizado in beneficio_normalizado:
            resultados.append(beneficio)

    return resultados
