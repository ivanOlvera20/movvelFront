const options = {
  filterType: 'dropdown',
  downloadOptions: {
    filename: 'producto.csv',
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
    name: 'descripcion',
    label: 'Descripcion',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'familia',
    label: 'Familia',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'linea',
    label: 'Linea',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'modelo',
    label: 'Modelo',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'fotos',
    label: 'Fotos',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'plz1',
    label: 'plz2',
    options: {
      filter: false,
      sort: false,
      display: false,
    },
  },
  {
    name: 'plz2',
    label: 'plz2',
    options: {
      filter: false,
      sort: false,
      display: false,
    },
  },
  {
    name: 'plz3',
    label: 'plz3',
    options: {
      filter: false,
      sort: false,
      display: false,
    },
  },
  {
    name: 'precios',
    label: 'Precios',
    options: {
      filter: false,
      filterType: 'multiselect',
      tag: true,
    },
  },
  {
    name: 'materiales_consumo',
    label: 'Materiales Consumo',
    options: {
      filter: true,
      sort: true,
      mat: true,
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
