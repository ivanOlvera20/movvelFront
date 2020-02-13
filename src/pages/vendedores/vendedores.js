import React from "react";
import { Grid } from "@material-ui/core";

import ModalVend from "./modal.vend";
import TableVend from "./tableVend";

// components
import PageTitle from "../../components/PageTitle";

export default function Vendedores() {
  return (
    <>
      <PageTitle title="Vendedores" button={<ModalVend />} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TableVend />
        </Grid>
      </Grid>
    </>
  );
}
