import React, { useState, useEffect } from "react";
import {
  Grid,
  Collapse,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Divider,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import useStyles from "./styles/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { columns, options } from "./utils/tableConfig";
import { precios, tipo, estados, formaPago, metodoPago } from "./utils/selects";
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
  descripcion: element.descripcion,
  vendedor: element.vendedor.nombre,
  nombre_comercial: element.datos_cliente.nombre_comercial,
  correo: element.datos_cliente.correo,
  celular: element.datos_cliente.celular,
});
const mapVend = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  nombre: element.nombre,
});
const mapCfdi = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  descripcion: element.descripcion,
});
const mapBan = element => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  descripcion: element.descripcion,
});

export default function Clientes() {
  const classes = useStyles();
  const [newCli, setCliFields] = useState({
    clave: "",
    descripcion: "",
    vendedor: "",
    datos_cliente: {
      nombre_comercial: "",
      contacto: "",
      celular: "",
      telefono: "",
      correo: "",
      dom_entrega: {
        calle: "",
        colonia: "",
        num_ext: "",
        num_int: "",
        estado: "",
        municipio: "",
      },
    },
    ubi_cliente: {
      calle: "",
      colonia: "",
      num_ext: "",
      num_int: "",
      estado: "",
      municipio: "",
    },
    datos_fiscales: {
      rfc: "",
      calle: "",
      colonia: "",
      codigo_postal: "",
      num_ext: "",
      num_int: "",
      estado: "",
      municipio: "",
    },
    datos_credito: {
      cfdi: "",
      banco: "",
      ref_bancaria: "",
      forma_pago: "",
      metodo_pago: "",
      plazo_credito: "",
      limite_credito: "",
    },
    tipo_cliente: "",
    precio: "",
  });

  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [dataVend, setDataVend] = useState([]);
  const [dataBan, setDataBan] = useState([]);
  const [dataCfdi, setDataCfdi] = useState([]);
  const [fetch, refetch] = useGet("/cliente");
  const [fetchVend] = useGet("/vendedor");
  const [fetchBan] = useGet("/banco");
  const [fetchCfdi] = useGet("/cfdi");
  const [put] = usePut("/cliente");
  const [del] = useDelete("/cliente");
  const [post] = usePost("/cliente");
  const [dom, setDom] = useState([]);

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map(element => mapObject(element)));
    }
    if (fetchVend !== undefined) {
      setDataVend(fetchVend.data.map(element => mapVend(element)));
    }
    if (fetchBan !== undefined) {
      setDataBan(fetchBan.data.map(element => mapBan(element)));
    }
    if (fetchCfdi !== undefined) {
      setDataCfdi(fetchCfdi.data.map(element => mapCfdi(element)));
    }
  }, [fetch, fetchVend, fetchBan, fetchCfdi]);

  const addDom = () => {
    setDom(prevDoms => [...prevDoms, { domicilio: "" }]);
  };

  const closeCollapse = () => {
    setCliFields({
      clave: "",
      descripcion: "",
      vendedor: "",
      datos_cliente: {
        nombre_comercial: "",
        contacto: "",
        celular: "",
        telefono: "",
        correo: "",
        dom_entrega: {
          calle: "",
          colonia: "",
          num_ext: "",
          num_int: "",
          estado: "",
          municipio: "",
        },
      },
      ubi_cliente: {
        calle: "",
        colonia: "",
        num_ext: "",
        num_int: "",
        estado: "",
        municipio: "",
      },
      datos_fiscales: {
        rfc: "",
        calle: "",
        colonia: "",
        codigo_postal: "",
        num_ext: "",
        num_int: "",
        estado: "",
        municipio: "",
      },
      datos_credito: {
        cfdi: "",
        banco: "",
        ref_bancaria: "",
        forma_pago: "",
        metodo_pago: "",
        plazo_credito: "",
        limite_credito: "",
      },
      tipo_cliente: "",
      precio: "",
    });
  }

  return (
    <>
      <PageTitle
        title="Clientes"
        button="Añadir Cliente"
        onClick={() => setCollapse(prev => !prev)}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={3}>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Descripcion</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="clave"
                    fullWidth
                    label="Clave"
                    variant="outlined"
                    value={newCli.clave}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="descripcion"
                    fullWidth
                    label="Descripcion"
                    variant="outlined"
                    value={newCli.descripcion}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="precio"
                    fullWidth
                    select
                    label="Precio"
                    variant="outlined"
                    value={newCli.precio}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                    {precios.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="tipo_cliente"
                    fullWidth
                    select
                    label="Tipo de Cliente"
                    variant="outlined"
                    value={newCli.tipo_cliente}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                    {tipo.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Vendedor</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={12}>
                  <TextField
                    required
                    select
                    name="vendedor"
                    fullWidth
                    label="Vendedor correspondiente"
                    value={newCli.vendedor}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    variant="outlined"
                  >
                    {dataVend.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Datos del Cliente</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    name="nombre_comercial"
                    fullWidth
                    label="Nombre Comercial"
                    variant="outlined"
                    value={newCli.datos_cliente.nombre_comercial}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_cliente: {
                          ...prev.datos_cliente,
                          nombre_comercial: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="contacto"
                    fullWidth
                    label="Contacto"
                    variant="outlined"
                    value={newCli.datos_cliente.contacto}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_cliente: {
                          ...prev.datos_cliente,
                          contacto: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="celular"
                    fullWidth
                    label="Celular"
                    variant="outlined"
                    value={newCli.datos_cliente.celular}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_cliente: {
                          ...prev.datos_cliente,
                          celular: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="telefono"
                    fullWidth
                    label="Telefono"
                    variant="outlined"
                    value={newCli.datos_cliente.telefono}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_cliente: {
                          ...prev.datos_cliente,
                          telefono: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="correo"
                    fullWidth
                    label="Correo"
                    variant="outlined"
                    value={newCli.datos_cliente.correo}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_cliente: {
                          ...prev.datos_cliente,
                          correo: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" onClick={addDom}>
                    + Domicilio de entrega
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {dom.map(index => (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <TextField
                            name="calle"
                            fullWidth
                            variant="outlined"
                            data-id={index}
                            label="Calle"
                            type="text"
                            value={newCli.datos_cliente.dom_entrega.calle}
                            onChange={e =>
                              setCliFields(prev => ({
                                ...prev,
                                datos_cliente: {
                                  ...prev.datos_cliente,
                                  dom_entrega: {
                                    ...prev.datos_cliente.dom_entrega,
                                    calle: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            name="colonia"
                            fullWidth
                            variant="outlined"
                            data-id={index}
                            label="Colonia"
                            type="text"
                            value={newCli.datos_cliente.dom_entrega.colonia}
                            onChange={e =>
                              setCliFields(prev => ({
                                ...prev,
                                datos_cliente: {
                                  ...prev.datos_cliente,
                                  dom_entrega: {
                                    ...prev.datos_cliente.dom_entrega,
                                    colonia: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            name="num_ext"
                            fullWidth
                            variant="outlined"
                            data-id={index}
                            label="N. Ext"
                            type="text"
                            value={newCli.datos_cliente.dom_entrega.num_ext}
                            onChange={e =>
                              setCliFields(prev => ({
                                ...prev,
                                datos_cliente: {
                                  ...prev.datos_cliente,
                                  dom_entrega: {
                                    ...prev.datos_cliente.dom_entrega,
                                    num_ext: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            name="num_int"
                            fullWidth
                            variant="outlined"
                            data-id={index}
                            label="N. Int"
                            type="text"
                            value={newCli.datos_cliente.dom_entrega.num_int}
                            onChange={e =>
                              setCliFields(prev => ({
                                ...prev,
                                datos_cliente: {
                                  ...prev.datos_cliente,
                                  dom_entrega: {
                                    ...prev.datos_cliente.dom_entrega,
                                    num_int: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            name="estado"
                            fullWidth
                            select
                            variant="outlined"
                            data-id={index}
                            label="Estado"
                            type="text"
                            value={newCli.datos_cliente.dom_entrega.estado}
                            onChange={e =>
                              setCliFields(prev => ({
                                ...prev,
                                datos_cliente: {
                                  ...prev.datos_cliente,
                                  dom_entrega: {
                                    ...prev.datos_cliente.dom_entrega,
                                    estado: e.target.value,
                                  },
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
                        <Grid item xs={6}>
                          <TextField
                            name="municipio"
                            fullWidth
                            variant="outlined"
                            data-id={index}
                            label="Municipio"
                            type="text"
                            value={newCli.datos_cliente.dom_entrega.municipio}
                            onChange={e =>
                              setCliFields(prev => ({
                                ...prev,
                                datos_cliente: {
                                  ...prev.datos_cliente,
                                  dom_entrega: {
                                    ...prev.datos_cliente.dom_entrega,
                                    municipio: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            onClick={() => dom.splice(dom.indexOf(index), 1)}
                          >
                            <CloseOutlined focusable="large" />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider className={classes.divider} />
                        </Grid>
                      </Grid>
                    </>
                  ))}
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Ubicacion del Cliente</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={4}>
                  <TextField
                    name="calle"
                    fullWidth
                    variant="outlined"
                    label="Calle"
                    type="text"
                    value={newCli.ubi_cliente.calle}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        ubi_cliente: {
                          ...prev.ubi_cliente,
                          calle: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="colonia"
                    fullWidth
                    variant="outlined"
                    label="Colonia"
                    type="text"
                    value={newCli.ubi_cliente.colonia}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        ubi_cliente: {
                          ...prev.ubi_cliente,
                          colonia: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="num_ext"
                    fullWidth
                    variant="outlined"
                    label="N. Ext"
                    type="text"
                    value={newCli.ubi_cliente.num_ext}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        ubi_cliente: {
                          ...prev.ubi_cliente,
                          num_ext: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="num_int"
                    fullWidth
                    variant="outlined"
                    label="N. Int"
                    type="text"
                    value={newCli.ubi_cliente.num_int}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        ubi_cliente: {
                          ...prev.ubi_cliente,
                          num_int: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="estado"
                    fullWidth
                    select
                    variant="outlined"
                    label="Estado"
                    type="text"
                    value={newCli.ubi_cliente.estado}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        ubi_cliente: {
                          ...prev.ubi_cliente,
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
                <Grid item xs={6}>
                  <TextField
                    name="municipio"
                    fullWidth
                    variant="outlined"
                    label="Municipio"
                    type="text"
                    value={newCli.ubi_cliente.municipio}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        ubi_cliente: {
                          ...prev.ubi_cliente,
                          municipio: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Datos Fiscales</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={4}>
                  <TextField
                    name="calle"
                    fullWidth
                    variant="outlined"
                    label="Calle Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.calle}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          calle: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="colonia"
                    fullWidth
                    variant="outlined"
                    label="Colonia Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.colonia}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          colonia: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="num_ext"
                    fullWidth
                    variant="outlined"
                    label="N. Ext. Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.num_ext}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          num_ext: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="num_int"
                    fullWidth
                    variant="outlined"
                    label="N. Int. Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.num_int}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          num_int: e.target.value,
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
                    variant="outlined"
                    label="Estado Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.estado}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
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
                    variant="outlined"
                    label="Municipio Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.municipio}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          municipio: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="datos_fiscales"
                    fullWidth
                    variant="outlined"
                    label="Codigo Postal Fiscal"
                    type="text"
                    value={newCli.datos_fiscales.codigo_postal}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          codigo_postal: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="rfc"
                    fullWidth
                    variant="outlined"
                    label="RFC"
                    type="text"
                    value={newCli.datos_fiscales.rfc}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_fiscales: {
                          ...prev.datos_fiscales,
                          rfc: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Paper className={classes.newRow1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Datos de Credito</Typography>
                  </Grid>
                </Paper>
                <Grid item xs={6}>
                  <TextField
                    name="cfdi"
                    fullWidth
                    select
                    variant="outlined"
                    label="Uso CFDI"
                    type="text"
                    value={newCli.datos_credito.cfdi}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          cfdi: e.target.value,
                        },
                      }))
                    }
                  >
                    {dataCfdi.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="banco"
                    select
                    fullWidth
                    variant="outlined"
                    label="Banco"
                    type="text"
                    value={newCli.datos_credito.banco}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          banco: e.target.value,
                        },
                      }))
                    }
                  >
                    {dataBan.map(option => (
                      <MenuItem key={option.id} value={option.descripcion}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="ref_bancaria"
                    fullWidth
                    variant="outlined"
                    label="Referencia Bancaria"
                    type="text"
                    value={newCli.datos_credito.ref_bancaria}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          ref_bancaria: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="forma_pago"
                    fullWidth
                    select
                    variant="outlined"
                    label="Forma de Pago"
                    type="text"
                    value={newCli.datos_credito.forma_pago}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          forma_pago: e.target.value,
                        },
                      }))
                    }
                  >
                    {formaPago.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="metodo_pago"
                    fullWidth
                    select
                    variant="outlined"
                    label="Metodo de Pago"
                    type="text"
                    value={newCli.datos_credito.metodo_pago}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          metodo_pago: e.target.value,
                        },
                      }))
                    }
                  >
                    {metodoPago.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="plazo_credito"
                    fullWidth
                    variant="outlined"
                    label="Plazo de Credito"
                    type="text"
                    value={newCli.datos_credito.plazo_credito}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          plazo_credito: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="datos_credito"
                    fullWidth
                    variant="outlined"
                    label="Limite de Credito"
                    type="text"
                    value={newCli.datos_credito.limite_credito}
                    onChange={e =>
                      setCliFields(prev => ({
                        ...prev,
                        datos_credito: {
                          ...prev.datos_credito,
                          limite_credito: e.target.value,
                        },
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
                          closeCollapse()
                          setCollapse(false);
                          setDom([]);
                        })
                    }
                  >
                    
                  </ButtonAdd>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={() => {
                      closeCollapse()
                      setDom([]);
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
                      closeCollapse()
                      setCollapse(false);
                      setDom([]);
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
                        setCollapse(prev => !prev);
                      }}
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
