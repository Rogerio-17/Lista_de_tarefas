import { useState, useEffect } from "react";
import "./admin.css";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [userd, setUserD] = useState({});

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@user");
      setUserD(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "Tarefas");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );

        const usnub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });
          setTarefas(lista);
        });
      }
    }

    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    if (tarefaInput === "") {
      alert("Digite uma tarefa");
      return;
    }

    await addDoc(collection(db, "Tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: userd?.uid,
    })
      .then(() => {
        alert("Tarefa registrada com sucesso");
        setTarefaInput("");
      })

      .catch((erro) => {
        alert(
          "Não conseguimos registrar as informações no banco. ERRO " + erro
        );
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function deletaTarefa(id) {
    const docRef = doc(db, "Tarefas", id);
    deleteDoc(docRef);
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

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>

          <div>
            <button className="btn-edita">Editar</button>
            <button
              onClick={() => deletaTarefa(item.id)}
              className="btn-delete"
            >
              Concluir
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Admin;
