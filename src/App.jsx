import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";
import CardapioItem from "./components/CardapioItem.jsx";
import CardapioForm from "./components/CardapioForm.jsx";
import { useEffect, useState } from "react";
import "./services/localStorageService.js";
import { v4 as uuidv4 } from "uuid";
import "./App.css";


function App() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ id: "", nome: "", descricao: "", preco: "", categoria: "" });
  const [editando, setEditando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("cardapio");
    if (dadosSalvos) {
      setMenu(JSON.parse(dadosSalvos));
    }
  }, []);

  // Atualiza o localStorage sempre que o menu mudar
  useEffect(() => {
    localStorage.setItem("cardapio", JSON.stringify(menu));
  }, [menu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.preco) return alert("Nome e preço são obrigatórios!");

    if (editando) {
      setMenu(menu.map(item => item.id === form.id ? form : item));
      setEditando(false);
    } else {
      setMenu([...menu, { ...form, id: uuidv4() }]);
    }

    setForm({ id: "", nome: "", descricao: "", preco: "", categoria: "" });
  };

  const handleEditar = (item) => {
    setForm(item);
    setEditando(true);
  };

  const handleExcluir = (item) => {
    setItemSelecionado(item);
    setModalAberto(true);
  };

  const confirmarExclusao = () => {
    setMenu(menu.filter(item => item.id !== itemSelecionado.id));
    setModalAberto(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍽️ Cardápio do Restaurante</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md max-w-xl mx-auto mb-6 space-y-4">
        <input
          name="nome"
          type="text"
          placeholder="Nome do prato"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="preco"
          type="number"
          step="0.01"
          placeholder="Preço (R$)"
          value={form.preco}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="categoria"
          type="text"
          placeholder="Categoria (ex: entrada, prato principal...)"
          value={form.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">
          {editando ? "Atualizar Prato" : "Adicionar Prato"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Preço</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.nome}</td>
                <td className="p-3">{item.descricao}</td>
                <td className="p-3">R$ {parseFloat(item.preco).toFixed(2)}</td>
                <td className="p-3">{item.categoria}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEditar(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(item)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {menu.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">Nenhum prato cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={confirmarExclusao}
        itemName={itemSelecionado?.nome}
      />
    </div>
  );
}

export default App;
