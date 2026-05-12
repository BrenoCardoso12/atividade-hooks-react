import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const TemaContext = createContext();

function Header() {
  const { tema, trocarTema } = useContext(TemaContext);

  return (
    <header className="header">
      <div className="logo-area">
        <div className="logo-bolinha"></div>
        <strong>HooksLab</strong>
      </div>

      <nav>
        <a href="#home">Home</a>
        <a href="#hooks">Hooks</a>
        <a href="#atividade">Atividade</a>
      </nav>

      <button className="btn-outline" onClick={trocarTema}>
        {tema === "escuro" ? "Tema Claro" : "Tema Escuro"}
      </button>
    </header>
  );
}

function CardHook({ nome, descricao }) {
  return (
    <div className="card-hook">
      <h3>{nome}</h3>
      <p>{descricao}</p>
    </div>
  );
}

function PainelHooks({ nome, contador }) {
  const { tema } = useContext(TemaContext);

  return (
    <section id="hooks" className="painel">
      <h2>Hooks implementados</h2>
      <p className="subtitulo">
        Tema atual: <strong>{tema}</strong> | Cliques: <strong>{contador}</strong>
      </p>

      <div className="grid-hooks">
        <CardHook
          nome="useState"
          descricao="Controla o nome digitado, tema e contador."
        />
        <CardHook
          nome="useEffect"
          descricao="Atualiza o título da aba conforme o nome muda."
        />
        <CardHook
          nome="useContext"
          descricao="Compartilha o tema entre os componentes."
        />
        <CardHook
          nome="useRef"
          descricao="Foca automaticamente no campo de nome."
        />
        <CardHook
          nome="useMemo"
          descricao="Novo hook: calcula a mensagem personalizada."
        />
      </div>

      <p className="mensagem">
        {nome
          ? `Olá, ${nome}! Você está visualizando uma atividade React moderna.`
          : "Digite seu nome para personalizar a experiência."}
      </p>
    </section>
  );
}

export default function App() {
  const [nome, setNome] = useState("");
  const [tema, setTema] = useState("escuro");
  const [contador, setContador] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    document.title = nome ? `Bem-vindo, ${nome}` : "Atividade Hooks React";
  }, [nome]);

  const mensagemPrincipal = useMemo(() => {
    if (!nome) {
      return "Aprendendo React Hooks";
    }

    return `Bem vindo(a) ${nome}, ao site HooksLab`;
  }, [nome]);

  function trocarTema() {
    setTema((temaAtual) => (temaAtual === "escuro" ? "claro" : "escuro"));
  }

  function focarInput() {
    inputRef.current.focus();
  }

  return (
    <TemaContext.Provider value={{ tema, trocarTema }}>
      <main className={`app ${tema}`}>
        <div className="background-blur blur-azul"></div>
        <div className="background-blur blur-laranja"></div>

        <section id="home" className="hero-card">
          <Header />

          <div className="hero-content">
            <div className="ribbon ribbon-one"></div>
            <div className="ribbon ribbon-two"></div>

            <div className="hero-text">
              <span className="tag">React + Hooks</span>
              <h1>{mensagemPrincipal}</h1>
              <p>
                Projeto criado para demonstrar os principais hooks do React de
                forma visual, intuitiva e com aparência moderna.
              </p>

              <div id="atividade" className="form-area">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <button onClick={focarInput}>Focar input</button>
                <button onClick={() => setContador(contador + 1)}>
                  Contar clique
                </button>
              </div>
            </div>
          </div>
        </section>

        <PainelHooks nome={nome} contador={contador} />
      </main>
    </TemaContext.Provider>
  );
}
