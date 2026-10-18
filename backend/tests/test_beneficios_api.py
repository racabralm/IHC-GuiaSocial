from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_api_funcionando():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["mensagem"] == "API Guia Social funcionando"


def test_listar_todos_beneficios():
    response = client.get("/beneficios/")

    assert response.status_code == 200
    assert len(response.json()) == 14


def test_primeiro_beneficio():
    response = client.get("/beneficios/1")

    assert response.status_code == 200

    beneficio = response.json()

    assert beneficio["id"] == 1
    assert beneficio["nome"] == "Bolsa Família"
    assert beneficio["categoria"] == "Transferência de Renda"
    assert beneficio["cadastro"] == "Cadastro Único (CadÚnico)"


def test_buscar_bpc_por_id():
    response = client.get("/beneficios/2")

    assert response.status_code == 200

    beneficio = response.json()

    assert beneficio["nome"] == "BPC / LOAS"
    assert beneficio["categoria"] == "Assistência Social"
    assert beneficio["canalAdicional"] is not None
    assert beneficio["nomeCanalAdicional"] == "BPC para pessoas com deficiência"


def test_beneficio_inexistente():
    response = client.get("/beneficios/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Benefício não encontrado"


def test_busca_por_nome():
    response = client.get("/beneficios/?nome=bolsa")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["nome"] == "Bolsa Família"


def test_busca_por_nome_sem_acento():
    response = client.get("/beneficios/?nome=inclusao")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["nome"] == "Auxílio-Inclusão"


def test_busca_por_nome_maiusculo():
    response = client.get("/beneficios/?nome=INCLUSAO")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["nome"] == "Auxílio-Inclusão"


def test_busca_parcial():
    response = client.get("/beneficios/?nome=farmacia")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["nome"] == "Farmácia Popular"


def test_busca_com_varios_resultados():
    response = client.get("/beneficios/?nome=programa")

    assert response.status_code == 200
    assert len(response.json()) >= 2

    nomes = [beneficio["nome"] for beneficio in response.json()]

    assert "Programa Cisternas" in nomes
    assert "Programa de Aquisição de Alimentos (PAA)" in nomes


def test_busca_sem_resultado():
    response = client.get("/beneficios/?nome=xyz")

    assert response.status_code == 200
    assert response.json() == []


def test_campos_obrigatorios_dos_beneficios():
    response = client.get("/beneficios/")

    assert response.status_code == 200

    campos_obrigatorios = {
        "id",
        "nome",
        "categoria",
        "descricao",
        "publico",
        "cadastro",
        "requisitos",
        "documentos",
        "comoSolicitar",
        "canal"
    }

    for beneficio in response.json():
        assert campos_obrigatorios.issubset(beneficio.keys())


def test_ultimo_beneficio():
    response = client.get("/beneficios/14")

    assert response.status_code == 200
    assert response.json()["nome"] == "Programa de Aquisição de Alimentos (PAA)"
    assert response.json()["categoria"] == "Água e Alimentação"
