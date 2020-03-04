
const options = {
  filterType: 'checkbox',
  downloadOptions: {
    filename: 'modelos.csv',
  },
  selectableRows: 'none',
};

const columns = [
  {
    name: 'clave',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'codigo',
    label: 'Codigo',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'material',
    label: 'Material',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'magnitud',
    label: 'Medida',
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
