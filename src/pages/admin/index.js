import { useState } from "react";
import "./admin.css";

import { auth } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    alert("Clicou");
  }

  async function handleLogout() {
    await signOut(auth);
  }
  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa"
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        <button className="btn-register" type="submit">
          Registrar tarefa
        </button>
      </form>

      <article className="list">
        <p>Estudar reactjs e javascript</p>

        <div>
          <button className="btn-edita">Editar</button>
          <button className="btn-delete">Concluir</button>
        </div>
      </article>

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Admin;
