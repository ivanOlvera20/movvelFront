
const options = {
  filterType: 'checkbox',
  downloadOptions: {
    filename: 'modelos.csv',
  },
  selectableRows: 'none',
};

const columns = [
  {
    name: 'codigo',
    label: 'Codigo',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
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

export {
  options,
  columns,
};
