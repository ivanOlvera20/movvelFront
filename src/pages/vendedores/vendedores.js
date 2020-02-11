import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";

// components
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";

export default function Vendedores() {
  const [stateVend, setVendState] = useState([]);

  useEffect(() => {
    getVend();
  }, []);

  const getVend = () => {
    axios
      .get("https://movvel-olveraconsultores.herokuapp.com/api/vendedor")
      .then(data => {
        setVendState(data.data);
      })
      .catch(err => alert(err));
  };

  return (
    <>
      <PageTitle title="Vendedores" button="Añadir Vendedor" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Vendedores"
            columns={["Clave", "Nombre", "Comision", "Opciones"]}
            data={stateVend.map(d => [
              d.clave,
              d.nombre,
              d.comision,
              [<Button>Editar</Button>, <Button>Eliminar</Button>],
            ])}
          />
        </Grid>
      </Grid>
    </>
  );
}

/*           <table className="table">
            <thead>
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Nombre</th>
                <th scope="col">Comision</th>
              </tr>
            </thead>
            <tbody>
              {stateVend.map(d => (
                <tr key={d.id}>
                  <td>{d.clave}</td>
                  <td>{d.nombre}</td>
                  <th>{d.comision}</th>
                </tr>
              ))}
            </tbody>
          </table>; */
