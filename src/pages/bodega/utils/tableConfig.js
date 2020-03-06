const options = {
  filterType: 'dropdown',
  downloadOptions: {
    filename: 'cliente.csv',
  },
  selectableRows: 'none',
};

const columns = [
  {
    name: 'clave',
    label: 'Clave',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'producto',
    label: 'Producto',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'costo',
    label: 'Costo',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'opciones',
    label: 'Opciones',
    options: {
      empty: true,
      filter: false,
    },
  },
];

export { options, columns };
