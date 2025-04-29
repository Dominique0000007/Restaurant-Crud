const LOCAL_STORAGE_KEY = 'cardapio_restaurante';

export const getCardapio = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveCardapio = (cardapio) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cardapio));
};

export const addItem = (item) => {
    const cardapio = getCardapio();
    cardapio.push(item);
    saveCardapio(cardapio);
};

export const updateItem = (updatedItem) => {
    const cardapio = getCardapio();
    const index = cardapio.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
    cardapio[index] = updatedItem;
    saveCardapio(cardapio);
    }
};

export const deleteItem = (id) => {
    let cardapio = getCardapio();
    cardapio = cardapio.filter(item => item.id !== id);
    saveCardapio(cardapio);
};
