import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";

// components
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";

export default function Productos() {
  const [stateProd, setProdState] = useState([]);

  const getProd = () => {
    axios
      .get("https://movvel-olveraconsultores.herokuapp.com/api/producto")
      .then(data => {
        setProdState(data.data);
      })
      .catch(err => alert(err));
  };

  useEffect(() => {
    getProd();
  }, []);

  return (
    <>
      <PageTitle title="Productos" button="Añadir Producto" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Productos"
            columns={[
              "Codigo",
              "Descripcion",
              "Familia",
              "Linea",
              "Modelo",
              "Mat. Consumo",
              "Opciones",
            ]}
            data={stateProd.map(d => [
              d.codigo,
              d.descripcion,
              d.familia.descripcion,
              d.linea.descripcion,
              d.modelo.descripcion,
              <Button>Ver Materiales</Button>,
              [
                <IconButton>
                  <CreateIcon />
                </IconButton>,
                <IconButton>
                  <DeleteIcon />
                </IconButton>,
              ],
            ])}
          />
        </Grid>
      </Grid>
    </>
  );
}
