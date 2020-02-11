import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

export default function Productos() {
  return (
    <>
      <PageTitle title="Productos" button="Añadir Producto" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Productos"
            columns={[
              "Id",
              "Codigo",
              "Descripcion",
              "Familia",
              "Linea",
              "Modelo",
              "Presentacion",
              "PLZ1",
              "PLZ2",
              "PLZ3",
            ]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
