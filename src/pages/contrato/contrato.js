import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import {
  Grid,
  Input,
  Collapse,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles/styles";
import Modal from "@material-ui/core/Modal";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { columns, options } from "./utils/tableConfig";
import useGet from "../../API/hooks/useGet";
import ButtonSet from "./components/ButtonSet";
import usePost from "../../API/hooks/usePost";
import EditSet from "./components/EditSet";
import usePut from "../../API/hooks/usePut";
import useDelete from "../../API/hooks/useDelete";

const editInitialState = {
  status: false,
  row: null,
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const mapObject = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  remision: element.remision.numeroRemision,
  fechaPedido: element.fechaPedido,
  codigo: element.codigo,
  producto: element.producto.descripcion,
  entrego: element.entrego.nombre,
});

const mapCli = element => ({
  id: element._id,
  nombre: element.nombre,
});
const mapEmp = element => ({
  id: element._id,
  nombre: element.nombre,
});
const mapPro = element => ({
  id: element._id,
  descripcion: element.descripcion,
});
const mapRem = element => ({
  id: element._id,
  numeroRemision: element.numeroRemision,
});

export default function Contrato() {
  const classes = useStyles();
  const [newPro, setProFields] = useState({
    nombreCliente: "",
    remision:'',
    tipoServicio: "",
    fechaInicial: "",
    diasRenta: "",
    fechaFinal: "",
    atendio: "",
    entrego: "",
    fechaPedido: "",
    cantidad: "",
    unidad: "",
    referencia:'',
    codigo: "",
    producto: "",
    precioRenta: "",
    total: "",
    modalidad: '',
    tipoPedido:'',
  });

  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [dataCli, setDataCli] = useState([]);
  const [dataEmp, setDataEmp] = useState([]);
  const [dataPro, setDataPro] = useState([]);
  const [dataRem, setDataRem] = useState([]);
  const [fetch, refetch] = useGet("/contrato");
  const [fetchCli] = useGet("/clientes");
  const [fetchEmp] = useGet("/empleados");
  const [fetchPro] = useGet("/productos");
  const [fetchRem] = useGet("/remision");
  const [put] = usePut("/contrato");
  const [del] = useDelete("/contrato");
  const [post] = usePost("/contrato");
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map(element => mapObject(element)));
    }
    if (fetchCli !== undefined) {
      setDataCli(fetchCli.data.map(element => mapCli(element)));
    }
    if (fetchEmp !== undefined) {
      setDataEmp(fetchEmp.data.map(element => mapEmp(element)));
    }
    if (fetchPro !== undefined) {
      setDataPro(fetchPro.data.map(element => mapPro(element)));
    }
    if (fetchRem !== undefined) {
      setDataRem(fetchRem.data.map(element => mapRem(element)));
    }
  }, [fetch, fetchCli, fetchEmp, fetchPro, fetchRem]);

  const limpiar = () => {
    setProFields({
      nombreCliente: "",
      tipoServicio: "",
      fechaInicial: "",
      diasRenta: "",
      fechaFinal: "",
      atendio: "",
      entrego: "",
      tipoPago: "",
      fechaPedido: "",
      estadoRemision: "",
      cantidad: "",
      unidad: "",
      codigo: "",
      producto: "",
      precioRenta: "",
      total: "",
    });
  };

  const jsPdfGenerador = () => {
    // Use of Date.now() function
    var d = Date(Date.now());

    // Converting the number of millisecond in date string
    const a = d.toString();

    const doc = new jsPDF("p", "pt");

    doc.setFontSize(50);
    doc.setFontStyle("Roboto");
    doc.setTextColor("Red");
    doc.text(50, 75, "Medi Renta");

    doc.setTextColor("Black");
    doc.setFontSize(10);

    doc.text(50, 100, "ALQUILER Y VENTA DE EQUIPOS DE REHABILITACION");
    doc.text(
      50,
      110,
      "Av. Lopez Mateos Norte No.59-7A Col. Vallarta Norte C.P. 44690, GDL, Jalisco",
    );
    doc.text(50, 120, "Tel. 01 (33) 3188-0052  -   Web: www.medirenta.com.mx");
    doc.setFontStyle("Italic");

    doc.setFontSize(25);
    doc.text(50, 150, "Contrato de Servicio");

    doc.setFontSize(10);
    doc.text(300, 150, `${a}`);

    doc.text(50, 200, "Nombre del Cliente : ");
    doc.text(200, 200, `${newPro.nombreCliente}`);

    doc.text(250, 200, "Numero de Remision : ");
    doc.text(400, 200, `${newPro.remision}`);

    doc.text(50, 220, "Tipo de Servicio : ");
    doc.text(200, 220, `${newPro.tipoServicio}`);

    doc.text(50, 240, "Producto : ");
    doc.text(200, 240, `${newPro.producto}`);

    doc.text(50, 260, "Fecha de Pedido : ");
    doc.text(200, 260, `${newPro.fechaPedido}`);

    doc.text(50, 280, "Fecha Inicial : ");
    doc.text(200, 280, `${newPro.fechaInicial}`);

    doc.text(50, 300, "Fecha Final : ");
    doc.text(200, 300, `${newPro.fechaFinal}`);

    doc.text(50, 320, "Atendio : ");
    doc.text(200, 320, `${newPro.atendio}`);

    doc.text(50, 340, "Entrego : ");
    doc.text(200, 340, `${newPro.entrego}`);

    doc.text(50, 360, "Unidad : ");
    doc.text(200, 360, `${newPro.unidad}`);

    doc.text(50, 380, "Cantidad : ");
    doc.text(200, 380, `${newPro.cantidad}`);

    doc.text(50, 400, "Precio Unitario : ");
    doc.text(200, 400, `${newPro.precioUnitario}`);

    doc.setFontSize(28);
    doc.text(50, 450, "Total : ");
    doc.text(200, 450, `${newPro.cantidad * newPro.precioUnitario}`);

    doc.setFontSize(25);
    doc.text(50, 550, "Notas Importantes");
    doc.setFontSize(10);
    doc.text(50, 600, "1-. Si requiere recoleccion del equipo antes del vencimiento, favor de solicitarlo por telefono para programar su servicio");
    doc.text(50, 615, "2-. Los pagos de la renta mensual de realizaran por adelantado");
    doc.text(50, 630, "3-. Dejando un pagaré por el equipo en renta(El pagaré sera devuelto vontra entrega del equipo en buen estado)");


    doc.text(50, 680, "Fecha y hora de llegada: ______________________________________________________________");
    doc.text(50, 750, "Nombre y firma de quien recibe: ______________________________________________________________");



    doc.save("contrato.pdf");
  };

  return (
    <>
      <PageTitle
        title="Contrato"
        button="Nueva Contrato"
        onClick={() => setCollapse(prev => !prev)}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={4}>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Nombre del Cliente</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="nombreCliente"
                    fullWidth
                    label="Nombre del Cliente"
                    value={newPro.nombreCliente}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    {dataCli.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="remision"
                    fullWidth
                    label="Numero de Remision"
                    value={newPro.remision}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    {dataRem.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.numeroRemision}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item sx={12}>
                    <Typography variant="h4">Empleado</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="atendio"
                    fullWidth
                    label="Quien Atiende"
                    helperText="seleccione el nombre del cliente que ya esta en su base de datos"
                    value={newPro.atendio}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    {dataEmp.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="entrego"
                    fullWidth
                    label="Quien Entrega"
                    helperText="seleccione el nombre del cliente que ya esta en su base de datos"
                    value={newPro.entrego}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    {dataEmp.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item sx={12}>
                    <Typography variant="h4">Detalles</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    select
                    name="producto"
                    fullWidth
                    label="Producto"
                    value={newPro.producto}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    {dataPro.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="tipoServicio"
                    fullWidth
                    label="Tipo de Servicio"
                    value={newPro.tipoServicio}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="fechaPedido"
                    fullWidth
                    id="date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha Pedido"
                    value={newPro.fechaPedido}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="fechaInicial"
                    fullWidth
                    id="date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha Inicial"
                    value={newPro.fechaInicial}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="fechaFinal"
                    fullWidth
                    id="date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha Final"
                    value={newPro.fechaFinal}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="diasRenta"
                    fullWidth
                    label="Dias de Renta"
                    value={newPro.diasRenta}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="cantidad"
                    fullWidth
                    label="Cantidad"
                    value={newPro.cantidad}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="precioRenta"
                    fullWidth
                    label="Precio de Renta"
                    value={newPro.precioRenta}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="tipoPedido"
                    fullWidth
                    label="Tipo de Pedido"
                    value={newPro.tipoPedido}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="modalidad"
                    fullWidth
                    label="Modalidad de Renta"
                    value={newPro.modalidad}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="referencia"
                    fullWidth
                    label="Referencia Bancaria"
                    value={newPro.referencia}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="total"
                    fullWidth
                    disabled
                    label="Total"
                    value={newPro.cantidad * newPro.precioRenta}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={handleOpen}
                  >
                    Agregar Contrato
                  </Button>
                </Grid>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={open}
                  onClose={handleClose}
                >
                  <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Generar Contrato</h2>
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      onClick={() => {
                        limpiar();
                        setCollapse(false);
                        handleClose();
                        jsPdfGenerador();
                      }}
                    >
                      Generar Contrato
                    </Button>
                    <br></br>
                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      onClick={() =>
                        post(newPro)
                          .then(() => {
                            refetch();
                          })
                          .then(() => {
                            limpiar();
                            setCollapse(false);
                            jsPdfGenerador();
                          })
                      }
                    >
                      Generar Contrato y Guardar en base de datos
                    </Button>
                  </div>
                </Modal>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={() => {
                      limpiar();
                    }}
                  >
                    Limpiar
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    onClick={() => {
                      limpiar();
                      setCollapse(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            data={data}
            columns={columns.map(column => {
              const { options: columnOpts } = column;
              columnOpts.customBodyRender = (value, tableMeta) => {
                if (columnOpts.empty) {
                  return editMode.status &&
                    editMode.row === tableMeta.rowIndex ? (
                    <EditSet
                      save={() => {
                        put(
                          data.find(element => element.clave === state.clave)
                            .id,
                          {
                            ...state,
                          },
                        )
                          .then(() => {
                            refetch();
                          })
                          .finally(() => {
                            setEdit(editInitialState);
                          });
                      }}
                      cancel={() => {
                        setEdit(editInitialState);
                      }}
                    />
                  ) : (
                    <ButtonSet
                      delete={() => {
                        del(
                          data.find(
                            element =>
                              element.numeroRemision === tableMeta.rowData[0],
                          ).id,
                        ).then(() => {
                          refetch();
                        });
                      }}
                      edit={() => {
                        setState({
                          clave: tableMeta.rowData[0],
                          descripcion: tableMeta.rowData[1],
                          familia: tableMeta.rowData[2],
                          linea: tableMeta.rowData[3],
                          modelo: tableMeta.rowData[4],
                          imgUrl: tableMeta.rowData[5],
                        });
                        setEdit({
                          status: true,
                          row: tableMeta.rowIndex,
                        });
                      }}
                    />
                  );
                }
                if (
                  tableMeta.columnData.name !== "clave" &&
                  editMode.status &&
                  tableMeta.rowIndex === editMode.row
                ) {
                  return (
                    <Input
                      name={tableMeta.columnData.name}
                      value={state[tableMeta.columnData.name]}
                      onChange={e => {
                        setState(prevState => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      type="text"
                    />
                  );
                }
                return value;
              };
              return column;
            })}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
