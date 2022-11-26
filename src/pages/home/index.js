import { useState } from "react";
import "./home.css";

import { Link } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

// --- para fazer navegação indireta
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && senha !== "") {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          alert("erro ao fazer login");
        });
    } else {
      alert("Preencha todos os campos");
    }
  }

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil e rápida</span>

      <div className="login">
        <h2>Login</h2>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="*********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <Link className="button-link" to="/register">
          Não possui uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export default Home;
