// components/CardapioItem.js

import React from 'react';

const CardapioItem = ({ item, onEdit, onDelete }) => {
    return (
    <tr>
        <td>{item.nome}</td>
        <td>{item.descricao}</td>
        <td>{item.preco}</td>
        <td>{item.categoria}</td>
        <td>
        <button onClick={() => onEdit(item)} className="bg-yellow-500 p-2 rounded">Editar</button>
        <button onClick={() => onDelete(item.id)} className="bg-red-500 p-2 rounded">Excluir</button>
        </td>
    </tr>
        );
};

export default CardapioItem;