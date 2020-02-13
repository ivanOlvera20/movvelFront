import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InputAdornment } from "@material-ui/core";
import {
  PermIdentityOutlined,
  MonetizationOnOutlined,
} from "@material-ui/icons";
import Axios from "axios";

export default function ModalVend() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const url = "https://movvel-olveraconsultores.herokuapp.com/api/vendedor";

  const [data, setData] = useState({
    clave: "",
    nombre: "",
    comision: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, data).then(res => {
      console.log(res.data);
    });
  }

  function handleChange(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleClickOpen}
      >
        Añadir Vendedor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <form onSubmit={e => submit(e)}>
            <TextField
              name="clave"
              id="clave"
              label="Clave"
              style={{ margin: 8 }}
              placeholder="VD..."
              defaultValue="VD-"
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
              onChange={e => handleChange(e)}
            />
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
              onChange={e => handleChange(e)}
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
              onChange={e => handleChange(e)}
              value={data.comision}
            />
            <Button type="submit" color="primary" onClick={handleClose}>
              Guardar
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
