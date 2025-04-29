// components/CardapioForm.js

import React, { useState, useEffect } from 'react';

const CardapioForm = ({ item, onSave }) => {
const [nome, setNome] = useState('');
const [descricao, setDescricao] = useState('');
const [preco, setPreco] = useState('');
const [categoria, setCategoria] = useState('');

useEffect(() => {
    if (item) {
        setNome(item.nome);
        setDescricao(item.descricao);
        setPreco(item.preco);
        setCategoria(item.categoria);
    }
}, [item]);

const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: item ? item.id : Date.now().toString(), nome, descricao, preco, categoria };
    onSave(newItem);
    setNome('');
    setDescricao('');
    setPreco('');
    setCategoria('');
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
        <label className="block">Nome</label>
        <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full p-2 border"
        />
    </div>
    <div>
        <label className="block">Descrição</label>
        <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full p-2 border"
        />
    </div>
    <div>
        <label className="block">Preço</label>
        <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="w-full p-2 border"
        />
    </div>
    <div>
        <label className="block">Categoria</label>
        <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full p-2 border"
        />
    </div>
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Salvar</button>
    </form>
);
};

export default CardapioForm;