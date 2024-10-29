import "./styles.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import makeLogin from "../../utils/makeLogin";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  useEffect(() => {
    document.title = "Melhor Cidade - Login";
  }, []);
  
  // const getLoginInfo = localStorage.getItem("Login")
  // JSON.parse(getLoginInfo).email
  // JSON.parse(getLoginInfo).password

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const makeLoginInfo = await makeLogin(loginEmail, loginPassword)

    if (makeLoginInfo) {
      document.location.href = "/homepage"  
    }
    
  };

  return (
    <>
      <main id="login_container">
        <div id="login_left">
          <h1>MelhorCidade</h1>
          <h2>Entre na sua conta para prosseguir</h2>

          <form method="post" onSubmit={handleSubmitLogin}>
            <Input
              label="E-mail"
              type="email"
              idName="email"
              placeholder="seuemail@email.com"
              onChangeInput={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              idName="password"
              placeholder="••••••••••"
              onChangeInput={(e) => setLoginPassword(e.target.value)}
            />

            <p>
              Não tem uma conta? <Link to={"/signup"}>Registre-se</Link>
            </p>

            <button type="submit">Fazer Login</button>
          </form>
        </div>
        <div id="login_right"></div>
      </main>
    </>
  );
}
