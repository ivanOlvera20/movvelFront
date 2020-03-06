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
    name: 'nombre',
    label: 'Nombre',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'celular',
    label: 'Celular',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'correo',
    label: 'Correo',
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
