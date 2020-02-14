// importar dependencias
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';

// importar componentes de Material-ui
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  FormControlLabel,
} from '@material-ui/core';

import {
  PermIdentityOutlined,
  MonetizationOnOutlined,
  AddRounded,
  DeleteRounded,
} from '@material-ui/icons';

// instalar components locales
import PageTitle from '../../components/PageTitle';

// inicio de la Functional Component
export default function Vendedores() {
  // definicion funciones de useState
  const [stateVend, setVendState] = useState([]);

  const [openAdd, setOpenAdd] = React.useState(false);

  const [data, setData] = useState({
    _id: '',
    nombre: '',
    comision: '',
  });

  // funciones para abrir o cerrar modal de Añadir
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  // funciones para abrir o cerrar modal de Editar


  const url = 'https://movvel-olveraconsultores.herokuapp.com/api/vendedor';

  const getVend = () => {
    axios
      .get(url)
      .then((vendedores) => {
        setVendState(vendedores.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getVend();
  }, []);

  // funcion que se llama cuando se da click a Guardar en el modal Añadir
  async function submit(e) {
    e.preventDefault();
    await axios.post(url, data).then((res) => {
      console.log(res.data);
      setData({ comision: '', nombre: '' });
      getVend();
    });
  }

  function handleChange(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }


  // Comienzan constantes y funciones para dar estructura a la Tabla de Datos
  const columns = [
    {
      name: '_id',
      label: '_id',
      options: {
        filter: false,
        sort: true,
        display: false,
        download: false,
      },
    },
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
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            id="nombre"
            value={data.nombre}
            control={<TextField value={value} />}
            onChange={(e) => updateValue(e.target.value)}
          />
        ),
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
        download: false,
        customBodyRender: () => (
          <>
            <IconButton aria-label="delete" color="secondary">
              <DeleteRounded />
            </IconButton>
          </>
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
  };

  const dataRows = stateVend.map((d) => [
    d._id,
    `VD-${d.clave}`,
    d.nombre,
    `${d.comision}%`,
  ]);


  return (
    <>
      <PageTitle title="Vendedores" />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddRounded />}
        onClick={handleClickOpenAdd}
      >
        Añadir Vendedor
      </Button>

      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="form-dialog-title">
          Añade un nuevo vendedor
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => submit(e)}>
            <TextField
              name="nombre"
              id="nombre"
              label="Nombre"
              style={{ margin: 8 }}
              placeholder="Inserta el nombre..."
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <PermIdentityOutlined />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleChange(e)}
              value={data.nombre}
            />
            <TextField
              name="comision"
              id="comision"
              label="Comision"
              style={{ margin: 8 }}
              placeholder="%"
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <MonetizationOnOutlined />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleChange(e)}
              value={data.comision}
            />
            <Button type="submit" color="primary" onClick={handleCloseAdd}>
              Guardar
            </Button>
            <Button onClick={handleCloseAdd} color="primary">
              Cancelar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable columns={columns} data={dataRows} options={options} />
        </Grid>
      </Grid>
    </>
  );
}
