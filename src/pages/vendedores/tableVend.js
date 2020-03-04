/* import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MUIDataTable from 'mui-datatables';

const getVend = (setState) => {
  axios
    .get('https://movvel-olveraconsultores.herokuapp.com/api/vendedor')
    .then((data) => {
      setState(data.data);
    })
    .catch((err) => {
      console.warn(err);
    });
};
function TableVend() {
  const [stateVend, setVendState] = useState([]);


  useEffect(() => {
    getVend(setVendState);
  }, []);

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
      name: 'Opciones',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <button
            onClick={() => {
              const { data } = this.state;
              data.shift();
              this.setState({ data });
            }}
          >
            Delete
          </button>
        ),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    downloadOptions: {
      filename: 'vendedores.csv',
    },
    selectableRows: 'none',
    onTableChange: () => {
      getVend();
    },
  };

  const data = stateVend.map((d) => [d.clave, d.nombre, d.comision]);

  return (
    <div>
      <MUIDataTable
        title="Vendedores"
        columns={columns}
        data={data}
        options={options}
      />
    </div>
  );
}
export default TableVend;
 */
