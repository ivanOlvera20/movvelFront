
const options = {
  filterType: 'checkbox',
  downloadOptions: {
    filename: 'vendedores.csv',
  },
  selectableRows: 'none',
};

const columns = [
  {
    name: 'clave',
    label: 'Clave',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'nombre',
    label: 'Nombre',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'comision',
    label: 'Comision',
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
