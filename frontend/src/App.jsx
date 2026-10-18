
import { useState } from 'react'
import './App.css'

const beneficios = [
  {
    id: 1,
    nome: 'Bolsa Família',
    categoria: 'Transferência de Renda',
    descricao: 'Programa federal de transferência de renda destinado a famílias em situação de pobreza.',
    publico: 'Famílias de baixa renda que atendam aos critérios do programa.',
    cadastro: 'Cadastro Único (CadÚnico)',
    requisitos: 'Atender aos critérios de renda e às demais regras vigentes. Estar no CadÚnico não garante a concessão automática.',
    documentos: 'CPF e documentos dos integrantes da família, conforme orientação do atendimento municipal.',
    comoSolicitar: 'Realizar ou atualizar o Cadastro Único no município e aguardar o processo de seleção.',
    canal: 'https://www.gov.br/mds/pt-br/acoes-e-programas/bolsa-familia/bolsa-familia'
  },
  {
    id: 2,
    nome: 'BPC / LOAS',
    categoria: 'Assistência Social',
    descricao: 'Benefício assistencial de um salário mínimo mensal para pessoas idosas ou com deficiência que atendam aos requisitos legais.',
    publico: 'Pessoas idosas a partir de 65 anos ou pessoas com deficiência em situação de baixa renda.',
    cadastro: 'CadÚnico e Meu INSS',
    requisitos: 'Atender aos critérios de renda e às condições específicas para idosos ou pessoas com deficiência.',
    documentos: 'CPF, documentos pessoais e outros comprovantes eventualmente solicitados pelo INSS.',
    comoSolicitar: 'Solicitar pelo Meu INSS ou pela central 135, mantendo o CadÚnico atualizado.',
    canal: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/beneficios-assistenciais/beneficio-assistencial-a-pessoa-idosa-bpc-loas',
    canalAdicional: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/beneficios-assistenciais/beneficio-assistencial-a-pessoa-com-deficiencia-bpc-loas',
    nomeCanalAdicional: 'BPC para pessoas com deficiência'
  },
  {
    id: 3,
    nome: 'Auxílio-Inclusão',
    categoria: 'Assistência Social',
    descricao: 'Benefício financeiro que incentiva a entrada e permanência de pessoas com deficiência no mercado de trabalho.',
    publico: 'Pessoas com deficiência que recebem ou receberam BPC e cumprem os requisitos.',
    cadastro: 'CadÚnico e Meu INSS',
    requisitos: 'Cumprir as condições legais referentes ao BPC, à renda do trabalho e à situação cadastral.',
    documentos: 'CPF, documentos pessoais e informações solicitadas pelo INSS.',
    comoSolicitar: 'Solicitar pelo Meu INSS ou pela central 135.',
    canal: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/beneficios-assistenciais/auxilio-inclusao-a-pessoa-com-deficiencia'
  },
  {
    id: 4,
    nome: 'Gás do Povo',
    categoria: 'Energia e Serviços',
    descricao: 'Programa federal destinado a ampliar o acesso ao gás de cozinha para famílias de baixa renda.',
    publico: 'Famílias de baixa renda selecionadas conforme os critérios federais.',
    cadastro: 'Cadastro Único (CadÚnico)',
    requisitos: 'Atender aos critérios de renda, composição familiar, cadastro e seleção previstos no programa.',
    documentos: 'CPF e documentos de identificação necessários para utilização do benefício.',
    comoSolicitar: 'Manter o CadÚnico atualizado e acompanhar as orientações oficiais sobre seleção e acesso.',
    canal: 'https://www.gov.br/mds/pt-br/acoes-e-programas/gas-do-povo'
  },
  {
    id: 5,
    nome: 'Tarifa Social de Energia Elétrica',
    categoria: 'Energia e Serviços',
    descricao: 'Benefício que reduz o custo da energia elétrica para consumidores enquadrados nas condições legais.',
    publico: 'Famílias de baixa renda e pessoas beneficiárias do BPC que atendam aos critérios.',
    cadastro: 'CadÚnico ou registro do BPC',
    requisitos: 'Atender às regras de elegibilidade e manter os dados cadastrais corretos.',
    documentos: 'CPF e informações da unidade consumidora; outros documentos podem ser exigidos.',
    comoSolicitar: 'O enquadramento pode ocorrer automaticamente. Caso não seja aplicado, consultar a distribuidora de energia.',
    canal: 'https://www.gov.br/aneel/pt-br/assuntos/tarifas/tarifa-social'
  },
  {
    id: 6,
    nome: 'Minha Casa, Minha Vida',
    categoria: 'Habitação',
    descricao: 'Programa habitacional federal com modalidades de acesso à moradia subsidiada e financiada.',
    publico: 'Famílias que atendam às faixas de renda e aos critérios da modalidade escolhida.',
    cadastro: 'Cadastro habitacional local ou instituição financeira',
    requisitos: 'Atender às condições de renda, modalidade, disponibilidade e demais regras do programa.',
    documentos: 'Documentos pessoais, comprovantes de renda e outros documentos exigidos.',
    comoSolicitar: 'Consultar a prefeitura, entidade organizadora ou instituição financeira responsável pela modalidade.',
    canal: 'https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/habitacao/programa-minha-casa-minha-vida/sobre-o-minha-casa-minha-vida-1'
  },
  {
    id: 7,
    nome: 'Pé-de-Meia',
    categoria: 'Educação',
    descricao: 'Programa de incentivo financeiro que apoia a permanência e a conclusão do ensino médio público.',
    publico: 'Estudantes que atendam às condições escolares e sociais previstas no programa.',
    cadastro: 'Matrícula escolar e bases oficiais do MEC',
    requisitos: 'Cumprir os critérios de matrícula, frequência e elegibilidade estabelecidos.',
    documentos: 'CPF e dados escolares e cadastrais atualizados.',
    comoSolicitar: 'A inclusão ocorre por cruzamento de dados oficiais. Consultar a situação nos canais do MEC.',
    canal: 'https://www.gov.br/mec/pt-br/pe-de-meia'
  },
  {
    id: 8,
    nome: 'Prouni',
    categoria: 'Educação',
    descricao: 'Programa federal que oferece bolsas de estudo integrais e parciais em instituições privadas de ensino superior.',
    publico: 'Estudantes que atendam aos requisitos do processo seletivo.',
    cadastro: 'Inscrição no Prouni',
    requisitos: 'Atender às condições de renda, escolaridade e classificação definidas no edital.',
    documentos: 'Documentos pessoais e comprovantes das informações apresentadas na inscrição.',
    comoSolicitar: 'Participar do processo seletivo no período de inscrições divulgado pelo MEC.',
    canal: 'https://acessounico.mec.gov.br/prouni'
  },
  {
    id: 9,
    nome: 'Farmácia Popular',
    categoria: 'Saúde',
    descricao: 'Programa federal que facilita o acesso a medicamentos e insumos contemplados por meio de farmácias credenciadas.',
    publico: 'Pessoas que necessitam dos medicamentos ou insumos disponibilizados pelo programa.',
    cadastro: 'Farmácia credenciada',
    requisitos: 'Apresentar a documentação e as receitas exigidas para cada item.',
    documentos: 'Documento com CPF e receita médica válida quando aplicável.',
    comoSolicitar: 'Procurar uma farmácia participante e apresentar os documentos necessários.',
    canal: 'https://www.gov.br/saude/pt-br/composicao/sectics/farmacia-popular'
  },
  {
    id: 10,
    nome: 'Dignidade Menstrual',
    categoria: 'Saúde',
    descricao: 'Programa federal que disponibiliza absorventes gratuitos para pessoas que menstruam e se encontram em situação de vulnerabilidade.',
    publico: 'Pessoas que menstruam e atendam aos critérios de idade e situação socioeconômica.',
    cadastro: 'Meu SUS Digital e Farmácia Popular',
    requisitos: 'Atender aos critérios vigentes e possuir autorização quando necessária.',
    documentos: 'Documento com foto, CPF e autorização de retirada quando aplicável.',
    comoSolicitar: 'Consultar as orientações do programa, obter autorização quando necessária e procurar uma farmácia credenciada.',
    canal: 'https://www.gov.br/saude/pt-br/composicao/seidigi/meususdigital/perguntas-e-respostas/cidadao/13-o-que-e-o'
  },
  {
    id: 11,
    nome: 'Programa Cisternas',
    categoria: 'Água e Alimentação',
    descricao: 'Programa que promove o acesso à água por meio de tecnologias sociais de captação e armazenamento.',
    publico: 'Famílias rurais e comunidades elegíveis que enfrentam dificuldades de acesso à água.',
    cadastro: 'CadÚnico e programas executados na região',
    requisitos: 'Atender aos critérios sociais e territoriais da modalidade disponível.',
    documentos: 'Documentos de identificação e informações cadastrais da família.',
    comoSolicitar: 'Consultar os órgãos locais e organizações executoras responsáveis pelo atendimento.',
    canal: 'https://www.gov.br/mds/pt-br/acoes-e-programas/acesso-a-alimentos-e-a-agua/programa-cisternas'
  },
  {
    id: 12,
    nome: 'Fomento Rural',
    categoria: 'Apoio Rural',
    descricao: 'Programa que oferece acompanhamento técnico e recursos para projetos produtivos de famílias rurais em situação de pobreza.',
    publico: 'Famílias rurais que atendam aos critérios sociais do programa.',
    cadastro: 'Cadastro Único (CadÚnico)',
    requisitos: 'Atender às condições de renda e participação nas ações produtivas.',
    documentos: 'Documentos pessoais e informações solicitadas pela equipe executora.',
    comoSolicitar: 'Consultar as instituições responsáveis pela execução do programa na região.',
    canal: 'https://www.gov.br/mds/pt-br/acoes-e-programas/acesso-a-alimentos-e-a-agua/programa-fomento-rural'
  },
  {
    id: 13,
    nome: 'Cozinha Solidária',
    categoria: 'Água e Alimentação',
    descricao: 'Programa de apoio a cozinhas que distribuem refeições gratuitas a pessoas em situação de vulnerabilidade social.',
    publico: 'Pessoas em situação de insegurança alimentar ou vulnerabilidade social.',
    cadastro: 'Conforme a unidade participante',
    requisitos: 'O atendimento depende da disponibilidade e dos critérios locais.',
    documentos: 'Consultar diretamente a unidade de atendimento.',
    comoSolicitar: 'Procurar cozinhas solidárias participantes e serviços locais de assistência social.',
    canal: 'https://www.gov.br/mds/pt-br/acoes-e-programas/acesso-a-alimentos-e-a-agua/programa-cozinha-solidaria/programa-cozinha-solidaria'
  },
  {
    id: 14,
    nome: 'Programa de Aquisição de Alimentos (PAA)',
    categoria: 'Água e Alimentação',
    descricao: 'Programa que adquire alimentos da agricultura familiar e os destina a ações de segurança alimentar.',
    publico: 'Agricultores familiares e pessoas atendidas pelas instituições participantes.',
    cadastro: 'Conforme a modalidade e as chamadas públicas',
    requisitos: 'Atender às regras aplicáveis aos produtores e às organizações executoras.',
    documentos: 'Documentação relativa à agricultura familiar ou à instituição participante.',
    comoSolicitar: 'Consultar chamadas públicas, órgãos executores e instituições participantes.',
    canal: 'https://www.gov.br/mds/pt-br/acoes-e-programas/acesso-a-alimentos-e-a-agua/programa-de-aquisicao-de-alimentos'
  }
]

const categorias = [
  'Todas',
  ...new Set(beneficios.map(item => item.categoria))
]

function App() {
  const [pesquisa, setPesquisa] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [favoritos, setFavoritos] = useState([])
  const [comparador, setComparador] = useState([])
  const [pagina, setPagina] = useState('catalogo')
  const [detalhes, setDetalhes] = useState(null)

  const alternarFavorito = id => {
    setFavoritos(atual =>
      atual.includes(id)
        ? atual.filter(item => item !== id)
        : [...atual, id]
    )
  }

  const alternarComparador = id => {
    setComparador(atual =>
      atual.includes(id)
        ? atual.filter(item => item !== id)
        : atual.length < 3
          ? [...atual, id]
          : atual
    )
  }

  const filtrados = beneficios.filter(item => {
    const termo = pesquisa.toLocaleLowerCase('pt-BR').trim()

    const texto = [
      item.nome,
      item.descricao,
      item.categoria,
      item.publico
    ].join(' ').toLocaleLowerCase('pt-BR')

    const correspondePesquisa = texto.includes(termo)
    const correspondeCategoria =
      categoria === 'Todas' || item.categoria === categoria

    return correspondePesquisa && correspondeCategoria
  })

  const lista = pagina === 'favoritos'
    ? filtrados.filter(item => favoritos.includes(item.id))
    : filtrados

  const selecionados = beneficios.filter(item =>
    comparador.includes(item.id)
  )

  return (
    <div className="app">
      <header className="topo">
        <div className="topo-conteudo">
          <button
            className="marca"
            onClick={() => setPagina('catalogo')}
          >
            <span className="marca-icone">GS</span>
            <span>Guia Social</span>
          </button>

          <nav className="navegacao" aria-label="Menu principal">
            <button
              className={pagina === 'catalogo' ? 'ativo' : ''}
              onClick={() => setPagina('catalogo')}
            >
              Catálogo
            </button>

            <button
              className={pagina === 'favoritos' ? 'ativo' : ''}
              onClick={() => setPagina('favoritos')}
            >
              Favoritos ({favoritos.length})
            </button>

            <button
              className={pagina === 'comparador' ? 'ativo' : ''}
              onClick={() => setPagina('comparador')}
            >
              Comparador ({comparador.length})
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <span className="etiqueta">
            Catálogo de benefícios federais
          </span>

          <h1>Consulte Programas e Benefícios Sociais</h1>

          <p>
            Conheça os programas disponíveis, quem pode participar,
            como solicitar e onde encontrar informações oficiais.
          </p>

          <div className="busca">
            <input
              type="search"
              placeholder="Pesquisar benefício, categoria ou público..."
              aria-label="Pesquisar benefícios"
              value={pesquisa}
              onChange={e => setPesquisa(e.target.value)}
            />

            <button
              onClick={() => {
                setPagina('catalogo')
                document.getElementById('resultados')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              Buscar
            </button>
          </div>
        </section>

        {pagina !== 'comparador' ? (
          <>
            <section className="filtros" aria-label="Categorias">
              <h2>Filtrar por categoria</h2>

              <div className="categorias">
                {categorias.map(item => (
                  <button
                    key={item}
                    className={categoria === item ? 'selecionado' : ''}
                    onClick={() => setCategoria(item)}
                  >
                    {item === 'Todas'
                      ? `Todas (${beneficios.length})`
                      : item}
                  </button>
                ))}
              </div>
            </section>

            <section id="resultados">
              <div className="secao-titulo">
                <h2>
                  {pagina === 'favoritos'
                    ? 'Meus favoritos'
                    : 'Benefícios disponíveis'}
                </h2>

                <span>{lista.length} resultado(s)</span>
              </div>

              <div className="grade">
                {lista.map(item => (
                  <article className="cartao" key={item.id}>
                    <div className="cartao-topo">
                      <span className="categoria">
                        {item.categoria}
                      </span>

                      <button
                        className="botao-salvar"
                        onClick={() => alternarFavorito(item.id)}
                        aria-pressed={favoritos.includes(item.id)}
                      >
                        {favoritos.includes(item.id)
                          ? '♥ Salvo'
                          : '♡ Salvar'}
                      </button>
                    </div>

                    <h3>{item.nome}</h3>
                    <p>{item.descricao}</p>

                    <div className="informacoes">
                      <p>
                        <strong>Cadastro:</strong> {item.cadastro}
                      </p>

                      <p>
                        <strong>Público:</strong> {item.publico}
                      </p>
                    </div>

                    <div className="acoes">
                      <button
                        className="primario"
                        onClick={() => setDetalhes(item)}
                      >
                        Ver detalhes
                      </button>

                      <button
                        className="secundario"
                        onClick={() => alternarComparador(item.id)}
                      >
                        {comparador.includes(item.id)
                          ? 'Remover'
                          : '+ Comparar'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {lista.length === 0 && (
                <div className="vazio">
                  Nenhum benefício encontrado nesta seleção.
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="comparacao">
            <h2>Comparador de benefícios</h2>
            <p>Compare até três programas sociais selecionados.</p>

            {selecionados.length === 0 ? (
              <div className="vazio">
                Nenhum benefício adicionado.
              </div>
            ) : (
              <div className="tabela-rolagem">
                <table>
                  <thead>
                    <tr>
                      <th>Informação</th>

                      {selecionados.map(item => (
                        <th key={item.id}>{item.nome}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      ['Categoria', 'categoria'],
                      ['Descrição', 'descricao'],
                      ['Público-alvo', 'publico'],
                      ['Cadastro', 'cadastro'],
                      ['Requisitos', 'requisitos'],
                      ['Como solicitar', 'comoSolicitar']
                    ].map(([titulo, campo]) => (
                      <tr key={campo}>
                        <th>{titulo}</th>

                        {selecionados.map(item => (
                          <td key={item.id}>{item[campo]}</td>
                        ))}
                      </tr>
                    ))}

                    <tr>
                      <th>Informações oficiais</th>

                      {selecionados.map(item => (
                        <td key={item.id}>
                          <a
                            href={item.canal}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultar programa ↗
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="rodape">
        <span>
          Guia Social — Laboratório de Engenharia de Software
        </span>

        <span>
          Projeto acadêmico • Confirme regras nos canais oficiais
        </span>
      </footer>

      {detalhes && (
        <div
          className="modal-fundo"
          onClick={() => setDetalhes(null)}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-detalhes"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-cabecalho">
              <h2 id="titulo-detalhes">
                {detalhes.nome}
              </h2>

              <button
                onClick={() => setDetalhes(null)}
                aria-label="Fechar detalhes"
              >
                ✕
              </button>
            </div>

            <p>{detalhes.descricao}</p>

            <p>
              <strong>Categoria:</strong> {detalhes.categoria}
            </p>

            <p>
              <strong>Público-alvo:</strong> {detalhes.publico}
            </p>

            <p>
              <strong>Cadastro:</strong> {detalhes.cadastro}
            </p>

            <p>
              <strong>Requisitos:</strong> {detalhes.requisitos}
            </p>

            <p>
              <strong>Documentos:</strong> {detalhes.documentos}
            </p>

            <p>
              <strong>Como acessar:</strong> {detalhes.comoSolicitar}
            </p>

            <a
              className="link-oficial"
              href={detalhes.canal}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar página oficial do benefício ↗
            </a>

            {detalhes.canalAdicional && (
              <p>
                <a
                  href={detalhes.canalAdicional}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {detalhes.nomeCanalAdicional} ↗
                </a>
              </p>
            )}

            <p>
              <small>
                As regras dos programas podem mudar.
                Confirme os requisitos no site oficial.
              </small>
            </p>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
