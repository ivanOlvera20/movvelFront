const options = {
  filterType: 'dropdown',
  downloadOptions: {
    filename: 'producto.csv',
  },
  selectableRows: 'none',
};

const columns = [
  {
    name: "remision",
    label: "Numero de Remision",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "fechaPedido",
    label: "Fecha de Pedido",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "producto",
    label: "Producto",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "entrego",
    label: "Quien Entrega",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "opciones",
    label: "Opciones",
    options: {
      empty: true,
      filter: false,
    },
  },
];

export { options, columns };
