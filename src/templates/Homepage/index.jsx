import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles.css";
import Posts from "../../components/Posts";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import FooterLinks from "../../components/FooterLinks";

export default function Homepage() {
  const [turnState, setTurnState] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("validacao");

  useEffect(() => {
    const cookie = localStorage.getItem("CookieId");
    if (!cookie) {
      document.location.href = "/login";
    } else {
      document.title = "Melhor Cidade - Página Inicial";
    }
  }, []);

  // Atualiza as postagens ao alterar o filtro
  useEffect(() => {
    setTurnState(0); // Reseta o estado da página para carregar do início
    setHasMore(true); // Reseta o estado de mais postagens
  }, [filter]);

  const handleLoadMoreBtn = () => {
    if (hasMore) {
      setTurnState((prevState) => prevState + 1);
    }
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Header />
      <main id="users_posts">
        <h2>Todas as Postagens</h2>

        <div id="search_complaints_container">
          <Input
            type="search"
            idName="search_complaints"
            placeholder="Pesquise a denúncia"
          />
          <button>Pesquisar</button>
        </div>

        <div id="classify">
          <p>Classificar por: </p>
          <select
            id="choose_classify"
            onChange={handleChangeFilter}
            value={filter}
          >
            <option value="validacao">Relevantes</option>
            <option value="tempo">Mais antigas</option>
            <option value="resolvido">Resolvidos</option>
          </select>
        </div>

        <Posts turn={turnState} setHasMore={setHasMore} filterPosts={filter} />
        <button
          id="load-more"
          onClick={handleLoadMoreBtn}
          className={"button-is-" + !hasMore}
        >
          {hasMore ? "Carregar mais" : "Fim das denúncias"}
        </button>
      </main>

      <div id="homepage_footer">
        <FooterLinks />
      </div>

      <Footer target={0} />
    </>
  );
}
