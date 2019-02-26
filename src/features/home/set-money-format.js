
export const setMoneyFormat = price => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    // => "R$100,000,000.00"
};