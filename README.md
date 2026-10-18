# Guia Social

Aplicação web para centralizar informações sobre programas e benefícios sociais, facilitando a consulta de critérios,
documentos necessários, formas de solicitação e canais oficiais para pessoas em situação de vulnerabilidade social.

Este projeto foi desenvolvido para a disciplina Laboratório de Engenharia de Software (2026.2), da Universidade
Presbiteriana Mackenzie, sob orientação do Prof. Luiz Carlos Machi Lozano.

## Informações do Grupo

| Integrante                   | RA       |
|:-----------------------------|:---------|
| Bruna Amorim Maia            | 10431883 |
| Bruna Soncini                | 10428267 |
| Fabyani Tiva Yan             | 10431835 |
| Rafael Araujo Cabral Moreira | 10441919 |
| Rute Willemann               | 10436781 |

**Turma:** `06N`

---

## Problema e Justificativa

- **Problema/oportunidade percebida:** Informações sobre benefícios e programas sociais estão distribuídas em diferentes
  páginas oficiais, muitas vezes com linguagem extensa ou burocrática.
- **Razão/justificativa da demanda:** A dificuldade de localizar e compreender essas informações pode impedir que
  pessoas em situação de vulnerabilidade conheçam serviços que podem ser relevantes para elas.
- **Descrição sucinta do produto:** O Guia Social será uma aplicação web responsiva para consultar, pesquisar e comparar
  programas sociais, apresentando informações como público-alvo, critérios de elegibilidade, documentos necessários,
  forma de solicitação e link oficial.
- **Clientes, usuários e envolvidos:** Adultos e idosos de baixa renda, familiares, responsáveis, profissionais de apoio
  social e a equipe de desenvolvimento.
- **Critérios de qualidade principais:** Usabilidade, acessibilidade, confiabilidade das informações, desempenho,
  manutenibilidade e compatibilidade com dispositivos móveis.

---

## Estrutura do Repositório

```text
guia-social/
│
├── backend/
│   ├── __init__.py
│   ├── main.py
│   │
│   ├── data/
│   │   ├── __init__.py
│   │   └── beneficios.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   └── programa_social.py
│   │
│   ├── routes/
│   │   ├── __init__.py
│   │   └── beneficios.py
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── beneficio.py
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   └── beneficio_service.py
│   │
│   └── tests/
│       ├── __init__.py
│       ├── test_programa_social.py
│       └── test_beneficios_api.py
│
├── docs/                        → Documentação do projeto
│
├── .github/
│   └── workflows/               → Pipeline de CI/CD com GitHub Actions
│
├── Dockerfile
├── requirements.txt
├── .gitignore
└── README.md
```

- **`backend/main.py`**: ponto de entrada da aplicação FastAPI.
- **`backend/data/`**: contém os dados utilizados atualmente pela API.
- **`backend/models/`**: contém as classes de domínio da aplicação.
- **`backend/routes/`**: contém as rotas e endpoints da API.
- **`backend/schemas/`**: contém os modelos de resposta utilizados pelo FastAPI e Pydantic.
- **`backend/services/`**: contém as regras de consulta e lógica da aplicação.
- **`backend/tests/`**: contém os testes automatizados da aplicação.
- **`docs/`**: contém a documentação, requisitos, wireframes, diagramas e demais artefatos.
- **`.github/workflows/`**: contém os arquivos da esteira de integração contínua, responsável por executar os testes
  automaticamente.

---

## Tecnologias e Requisitos Técnicos

| Item               | Escolha                                   |
|:-------------------|:------------------------------------------|
| Linguagem          | Python                                    |
| Frontend           | React, HTML, CSS e JavaScript             |
| Backend            | FastAPI                                   |
| Banco de dados     | PostgreSQL                                |
| API                | API REST própria desenvolvida com FastAPI |
| Cloud              | AWS (EC2 e RDS)                           |
| Containerização    | Docker                                    |
| CI/CD              | GitHub Actions                            |
| Controle de versão | Git e GitHub                              |
| Testes             | Pytest                                    |

---

## API Backend

O backend da aplicação está sendo desenvolvido com FastAPI.

Atualmente, a API permite:

- listar benefícios sociais;
- consultar um benefício específico pelo ID;
- pesquisar benefícios pelo nome;
- realizar buscas ignorando diferenças entre letras maiúsculas, minúsculas e acentos;
- retornar erro `404` quando um benefício não é encontrado;
- acessar a documentação automática da API pelo Swagger.

### Executando o projeto

Na raiz do projeto, instale as dependências:

```bash
pip install -r requirements.txt
```

Depois, execute a aplicação:

```bash
uvicorn backend.main:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

### Documentação da API

O FastAPI disponibiliza uma documentação interativa utilizando Swagger.

Acesse:

```text
http://127.0.0.1:8000/docs
```

### Rotas disponíveis

#### Listar todos os benefícios

```http
GET /beneficios/
```

Retorna todos os benefícios cadastrados atualmente na aplicação.

#### Buscar benefícios por nome

```http
GET /beneficios/?nome=bolsa
```

A busca ignora diferenças entre letras maiúsculas, minúsculas e acentos.

Exemplos:

```text
/beneficios/?nome=auxilio
/beneficios/?nome=AUXILIO
/beneficios/?nome=auxílio
```

#### Consultar benefício por ID

```http
GET /beneficios/{id}
```

Exemplo:

```http
GET /beneficios/1
```

Caso o benefício informado não exista, a API retorna o status HTTP `404`.

---

## Testes Automatizados

Os testes automatizados utilizam Pytest.

Para executar todos os testes:

```bash
pytest
```

Para visualizar mais detalhes durante a execução:

```bash
pytest -v
```

Atualmente, os testes verificam:

- criação e comportamento da classe `ProgramaSocial`;
- funcionamento da API;
- listagem dos benefícios;
- consulta de benefício por ID;
- retorno de erro para benefício inexistente;
- pesquisa por nome;
- pesquisa sem acentos;
- pesquisa utilizando letras maiúsculas;
- pesquisa sem resultados.

---

## Funcionalidades

- [x] Visualizar o catálogo de programas e benefícios sociais.
- [x] Pesquisar programas por nome.
- [ ] Filtrar programas por categoria.
- [x] Consultar informações de um programa social.
- [x] Acessar o canal oficial de cada programa.
- [ ] Comparar programas sociais.
- [ ] Salvar programas favoritos.
- [ ] Integrar os dados com PostgreSQL.
- [ ] Desenvolver a interface web em React.

---

## Roadmap de Entregas

- [x] **TG1** — Definição do produto, requisitos, modelagem e arquitetura.
- [x] **TG2** — Pipeline de Integração Contínua e Entrega Contínua (CI/CD).
- [ ] **TG3** — Implementação da aplicação.
- [ ] **TG4** — Testes e documentação final.

---

## Documentação

A documentação do projeto apresenta a definição da demanda, os requisitos, wireframes, modelagem de domínio, arquitetura
e tecnologias utilizadas.
