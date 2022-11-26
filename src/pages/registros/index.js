import { useState } from "react";

import { Link } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== "" && senha !== "") {
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          alert("Usuario cadastrado com sucesso");
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          alert("Erro ao cadastrar usuario");
        });
    } else {
      alert("Preencha todos os campos");
    }
  }

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Vamos criar sua conta!</span>

      <div className="login">
        <h2>Cadastre-se</h2>
        <form className="form" onSubmit={handleRegister}>
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

          <button type="submit">Cadastrar</button>
        </form>

        <Link className="button-link" to="/">
          Já possui uma conta? Faça login!
        </Link>
      </div>
    </div>
  );
}

export default Register;
