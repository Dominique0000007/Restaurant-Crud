import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
        <p className="mb-6">
            Tem certeza que deseja excluir <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-center gap-4">
            <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
            Sim, excluir
            </button>
            <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
            Cancelar
            </button>
        </div>
        </div>
    </div>
    );
};

export default ConfirmDeleteModal;

