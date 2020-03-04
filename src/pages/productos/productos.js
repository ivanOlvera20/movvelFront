import React, { useState, useEffect } from "react";
import {
  Grid,
  Input,
  Collapse,
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
  DialogTitle,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { CloseOutlined } from "@material-ui/icons";
import PanoramaIcon from "@material-ui/icons/Panorama";
import useStyles from "./styles/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { columns, options } from "./utils/tableConfig";
import useGet from "../../API/hooks/useGet";
import ButtonSet from "./components/ButtonSet";
import usePost from "../../API/hooks/usePost";
import EditSet from "./components/EditSet";
import usePut from "../../API/hooks/usePut";
import useDelete from "../../API/hooks/useDelete";
import ButtonPl from "./components/ButtonPl";

const editInitialState = {
  status: false,
  row: null,
};

const mapObject = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  clave: element.clave,
  descripcion: element.descripcion,
  familia: element.familia.descripcion,
  linea: element.linea.descripcion,
  modelo: element.modelo.descripcion,
  imgUrl: element.imgUrl,
  plz1: element.plz1,
  plz2: element.plz2,
  plz3: element.plz3,
});

const mapFam = element => ({
  id: element._id,
  descripcion: element.descripcion,
});
const mapLine = element => ({
  id: element._id,
  descripcion: element.descripcion,
});
const mapMod = element => ({
  id: element._id,
  descripcion: element.descripcion,
});

export default function Productos() {
  const classes = useStyles();
  const [newPro, setProFields] = useState({
    descripcion: "",
    familia: "",
    linea: "",
    modelo: "",
    plz1: "",
    plz2: "",
    plz3: "",
    image: "",
    consumo: [],
  });

  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [dataFam, setDataFam] = useState([]);
  const [dataLine, setDataLine] = useState([]);
  const [dataMod, setDataMod] = useState([]);
  const [fetch, refetch] = useGet("/producto");
  const [fetchFam] = useGet("/familia");
  const [fetchLine] = useGet("/linea");
  const [fetchMod] = useGet("/modelo");
  const [put] = usePut("/producto");
  const [del] = useDelete("/producto");
  const [post] = usePost("/producto");
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [mat, setMat] = useState([]);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const addMat = () => {
    setMat(prevMats => [...prevMats, { material: "", magnitud: "" }]);
  };

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map(element => mapObject(element)));
    }
    if (fetchFam !== undefined) {
      setDataFam(fetchFam.data.map(element => mapFam(element)));
    }
    if (fetchLine !== undefined) {
      setDataLine(fetchLine.data.map(element => mapLine(element)));
    }
    if (fetchMod !== undefined) {
      setDataMod(fetchMod.data.map(element => mapMod(element)));
    }
  }, [fetch, fetchFam, fetchLine, fetchMod]);

  return (
    <>
      <PageTitle
        title="Productos"
        button="Añadir Producto"
        onClick={() => setCollapse(prev => !prev)}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={4}>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Caracteristicas</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="descripcion"
                    fullWidth
                    label="Descripcion del producto"
                    variant="outlined"
                    value={newPro.descripcion}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="familia"
                    fullWidth
                    label="Familia correspondiente"
                    value={newPro.familia}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    helperText="En caso de no contener Familia, Por favor seleccione 'Sin familia'"
                    variant="outlined"
                  >
                    {dataFam.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="linea"
                    fullWidth
                    label="Linea correspondiente"
                    value={newPro.linea}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    helperText="En caso de no contener Linea, Por favor seleccione 'Sin linea'"
                    variant="outlined"
                  >
                    {dataLine.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    name="modelo"
                    fullWidth
                    label="Modelo correspondiente"
                    value={newPro.modelo}
                    onChange={e =>
                      setProFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    helperText="En caso de no contener Modelo, Por favor seleccione 'Sin modelo'"
                    variant="outlined"
                  >
                    {dataMod.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} container spacing={4}>
                  <Grid item xs={4}>
                    <TextField
                      name="plz1"
                      fullWidth
                      label="Precio de Lista Z1"
                      variant="outlined"
                      value={newPro.plz1}
                      onChange={e =>
                        setProFields(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="plz2"
                      fullWidth
                      label="Precio de Lista Z2"
                      variant="outlined"
                      value={newPro.plz2}
                      onChange={e =>
                        setProFields(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="plz3"
                      fullWidth
                      label="Precio de Lista Z3"
                      variant="outlined"
                      value={newPro.plz3}
                      onChange={e =>
                        setProFields(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Paper className={classes.newRow1}>
                    <Grid item xs={12}>
                      <Typography variant="h4">Fotografia</Typography>
                    </Grid>
                  </Paper>
                  <Grid item xs={6} spacing={4}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="outlined-button-file"
                      name="image"
                      multiple
                      type="file"
                      onChange={e =>
                        setProFields(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label htmlFor="outlined-button-file">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<PanoramaIcon />}
                      >
                        Upload
                      </Button>
                    </label>
                  </Grid>
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item sx={12}>
                    <Typography variant="h4">Materiales de Consumo</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={12}>
                  <Button variant="outlined" onClick={addMat}>
                    + material
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {mat.map(index => (
                    <Grid item xs={12}>
                      <TextField
                        name="material"
                        onChange={e =>
                          setProFields(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        variant="outlined"
                        data-id={index}
                        label="Material"
                        type="text"
                        value={newPro.consumo}
                      />
                      <TextField
                        name="magnitud"
                        onChange={e =>
                          setProFields(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        label="Magnitud"
                        data-id={index}
                        variant="outlined"
                        type="text"
                        value={newPro.consumo}
                      />
                      <IconButton
                        onClick={() => mat.splice(mat.indexOf(index), 1)}
                      >
                        <CloseOutlined focusable="large" />
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={4}>
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
                          setProFields({
                            descripcion: "",
                            familia: "",
                            linea: "",
                            modelo: "",
                            imgUrl: "",
                            plz1: "",
                            plz2: "",
                            plz3: "",
                          });
                          setCollapse(false);
                          setMat([]);
                        })
                    }
                  >
                    Añadir Producto
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={() => {
                      setProFields({
                        descripcion: "",
                        familia: "",
                        linea: "",
                        modelo: "",
                        imgUrl: "",
                        plz1: "",
                        plz2: "",
                        plz3: "",
                      });
                      setMat([]);
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
                      setProFields({
                        descripcion: "",
                        familia: "",
                        linea: "",
                        modelo: "",
                        imgUrl: "",
                        plz1: "",
                        plz2: "",
                        plz3: "",
                      });
                      setCollapse(false);
                      setMat([]);
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
                if (columnOpts.tag) {
                  return (
                    <>
                      <ButtonPl
                        show1={() => {
                          setState({
                            plz1: tableMeta.rowData[6],
                          });
                          setOpen1(true);
                        }}
                        show2={() => {
                          setState({
                            plz2: tableMeta.rowData[7],
                          });
                          setOpen2(true);
                        }}
                        show3={() => {
                          setState({
                            plz3: tableMeta.rowData[8],
                          });
                          setOpen3(true);
                        }}
                      />
                      <Dialog
                        onClose={handleClose1}
                        aria-labelledby="customized-dialog-title"
                        open={open1}
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose1}
                        >
                          Precio de lista Zona 1
                        </DialogTitle>
                        <DialogContent>{`$${{ ...state }.plz1}`}</DialogContent>
                      </Dialog>
                      <Dialog
                        onClose={handleClose2}
                        aria-labelledby="customized-dialog-title"
                        open={open2}
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose2}
                        >
                          Precio de lista Zona 2
                        </DialogTitle>
                        <DialogContent>{`$${{ ...state }.plz2}`}</DialogContent>
                      </Dialog>
                      <Dialog
                        onClose={handleClose3}
                        aria-labelledby="customized-dialog-title"
                        open={open3}
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose3}
                        >
                          Precio de lista Zona 3
                        </DialogTitle>
                        <DialogContent>{`$${{ ...state }.plz3}`}</DialogContent>
                      </Dialog>
                    </>
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
