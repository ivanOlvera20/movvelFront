import React, { useState, useEffect } from "react";
import {
  Grid,
  Collapse,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Input

} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { columns, options } from "./utils/tableConfig";
import ButtonAdd from './components/ButtonAdd'
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

const mapObject = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  clave: element.clave,
  producto: element.producto.descripcion,
  cantidad: element.cantidad,
  costo: element.costo,
  observacion: element.observacion
});

const mapPro = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  descripcion: element.descripcion
});

export default function Bodega() {
  const classes = useStyles();
  const [newCli, setCliFields] = useState({
    clave: "",
    producto: '',
    cantidad: '',
    costo: '',
    observacion: '',
  });

  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [dataPro, setDataPro] = useState([]);
  const [fetch, refetch] = useGet("/bodega");
  const [fetchPro] = useGet("/productos");
  const [put] = usePut("/bodega");
  const [del] = useDelete("/bodega");
  const [post] = usePost("/bodega");

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map(element => mapObject(element)));
    }
    if (fetchPro !== undefined) {
      setDataPro(fetchPro.data.map(element => mapPro(element)));
    }
  }, [fetch, fetchPro]);

  const limpiar = () => {
    setCliFields({
      clave: "",
      producto: "",
      cantidad: "",
      costo: "",
      observacion: "",
    });
  };

  return (
    <>
      <PageTitle
        title="Bodega"
        button="Añadir Producto a Bodega"
        onClick={() => setCollapse(prev => !prev)}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={3}>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Detalles</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={12}>
                  <TextField
                    required
                    select
                    name="producto"
                    fullWidth
                    label="Producto"
                    variant="outlined"
                    value={newCli.producto}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
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
                    name="cantidad"
                    fullWidth
                    label="Cantidad"
                    variant="outlined"
                    value={newCli.cantidad}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="costo"
                    fullWidth
                    label="Costo"
                    variant="outlined"
                    value={newCli.costo}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="observacion"
                    fullWidth
                    label="Observación"
                    variant="outlined"
                    value={newCli.observacion}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <ButtonAdd
                    onClick={() =>
                      post(newCli)
                        .then(() => {
                          refetch();
                        })
                        .then(() => {
                          limpiar();
                          setCollapse(false);
                        })
                    }
                  ></ButtonAdd>
                </Grid>
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
                            element => element.clave === tableMeta.rowData[0],
                          ).id,
                        ).then(() => {
                          refetch();
                        });
                      }}
                      edit={() => {
                        setState({
                          clave: tableMeta.rowData[0],
                          producto: tableMeta.rowData[1],
                          celular: tableMeta.rowData[2],
                          correo: tableMeta.rowData[3],
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