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
import { estados} from "./utils/selects";
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
  nombre: element.nombre,
  celular: element.celular,
  correo: element.correo,
  puesto: element.puesto
});

export default function Empleados() {
  const classes = useStyles();
  const [newCli, setCliFields] = useState({
    clave: "",
    nombre:"",
    domicilio: {
        calle: "",
        colonia: "",
        numInt: "",
        estado: "",
        municipio: "",
        cp:""
    },
    telefono: '',
    celular: '',
    correo: '',
    puesto: ''
  });

  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [fetch, refetch] = useGet("/empleados");
  const [put] = usePut("/empleados");
  const [del] = useDelete("/empleados");
  const [post] = usePost("/empleados");

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map(element => mapObject(element)));
    }
  }, [fetch]);

  const closeCollapse = () => {
    setCliFields({
      clave: "",
      nombre: "",
      domicilio: {
        calle: "",
        colonia: "",
        numInt: "",
        estado: "",
        municipio: "",
        cp: "",
      },
      telefono: "",
      celular: "",
      correo: "",
      puesto:''
    });
  };

  return (
    <>
      <PageTitle
        title="Empleados"
        button="Añadir Empleado"
        onClick={() => setCollapse(prev => !prev)}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={3}>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Datos del Empleado</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="nombre"
                    fullWidth
                    label="Nombre Completo"
                    variant="outlined"
                    value={newCli.nombre}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    name="telefono"
                    fullWidth
                    label="Telefono de casa"
                    variant="outlined"
                    value={newCli.telefono}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    name="celular"
                    fullWidth
                    label="Celular"
                    variant="outlined"
                    value={newCli.celular}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    name="correo"
                    fullWidth
                    label="Correo"
                    variant="outlined"
                    value={newCli.correo}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Domicilio</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    name="calle"
                    fullWidth
                    label="Calle"
                    variant="outlined"
                    value={newCli.domicilio.calle}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        domicilio: {
                          ...prev.domicilio,
                          calle: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="colonia"
                    fullWidth
                    label="Colonia"
                    variant="outlined"
                    value={newCli.domicilio.colonia}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        domicilio: {
                          ...prev.domicilio,
                          colonia: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="numInt"
                    fullWidth
                    label="Numero Interior"
                    variant="outlined"
                    value={newCli.domicilio.numInt}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        domicilio: {
                          ...prev.domicilio,
                          numInt: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="estado"
                    fullWidth
                    select
                    label="Estado"
                    variant="outlined"
                    value={newCli.domicilio.estado}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        domicilio: {
                          ...prev.domicilio,
                          estado: e.target.value,
                        },
                      }))
                    }
                  >
                    {estados.map(option => (
                      <MenuItem key={option.clave} value={option.clave}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="municipio"
                    fullWidth
                    label="Municipio"
                    variant="outlined"
                    value={newCli.domicilio.municipio}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        domicilio: {
                          ...prev.domicilio,
                          municipio: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="cp"
                    fullWidth
                    label="Codigo Postal"
                    variant="outlined"
                    value={newCli.domicilio.cp}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        domicilio: {
                          ...prev.domicilio,
                          cp: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Puesto</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={12}>
                  <TextField
                    name="puesto"
                    fullWidth
                    label="Puesto que desempeña"
                    variant="outlined"
                    value={newCli.puesto}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
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
                          closeCollapse();
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
                      closeCollapse();
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
                      closeCollapse();
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
                          nombre: tableMeta.rowData[1],
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