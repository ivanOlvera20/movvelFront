import React, { useState, useEffect } from 'react';
import {
  Grid, Input, Collapse, Paper, TextField, Button,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import useStyles from './styles/styles';

// components
import PageTitle from '../../components/PageTitle/PageTitle';
import { columns, options } from './utils/tableConfig';
import useGet from '../../API/hooks/useGet';
import ButtonSet from './components/ButtonSet';
import usePost from '../../API/hooks/usePost';
import EditSet from './components/EditSet';
import usePut from '../../API/hooks/usePut';
import useDelete from '../../API/hooks/useDelete';

const editInitialState = {
  status: false,
  row: null,
};

const mapObject = (element) => ({
  // eslint-disable-next-line no-underscore-dangle
  id: element._id,
  clave: element.clave,
  nombre: element.nombre,
  comision: element.comision,
});

export default function Vendedores() {
  const classes = useStyles();
  const [newVendor, setVendorFields] = useState({
    nombre: '',
    comision: '',
  });
  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [fetch, refetch] = useGet('/vendedor');
  const [put] = usePut('/vendedor');
  const [del] = useDelete('/vendedor');
  const [post] = usePost('/vendedor');

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map((element) => mapObject(element)));
    }
  }, [fetch]);
  return (
    <>
      <PageTitle title="Vendedores" button="Añadir vendedor" onClick={() => setCollapse((prev) => !prev)} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={4}>
                <Grid item>
                  <TextField
                    name="nombre"
                    label="Nuevo Vendedor"
                    variant="outlined"
                    value={newVendor.nombre}
                    onChange={(e) => setVendorFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="comision"
                    label="Comision"
                    variant="outlined"
                    value={newVendor.comision}
                    onChange={(e) => setVendorFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  />
                </Grid>
                <Grid item xs={6} container>
                  <Button
                    style={{ height: '100%' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => post(newVendor)
                      .then(() => {
                        refetch();
                      })
                      .then(() => {
                        setVendorFields({
                          nombre: '',
                          comision: '',
                        });
                        setCollapse(false);
                      })}
                  >
                    Añadir
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            data={data}
            columns={
              columns.map((column) => {
                const { options: columnOpts } = column;
                columnOpts.customBodyRender = (value, tableMeta) => {
                  if (columnOpts.empty) {
                    return editMode.status && (editMode.row === tableMeta.rowIndex)
                      ? (
                        <EditSet
                          save={() => {
                            put(data.find((element) => element.clave === state.clave).id, {
                              ...state,
                            })
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
                      )
                      : (
                        <ButtonSet
                          delete={() => {
                            del(data.find((element) => element.clave === tableMeta.rowData[0]).id)
                              .then(() => {
                                refetch();
                              });
                          }}
                          edit={() => {
                            setState({
                              clave: tableMeta.rowData[0],
                              nombre: tableMeta.rowData[1],
                              comision: tableMeta.rowData[2],
                            });
                            setEdit({
                              status: true,
                              row: tableMeta.rowIndex,
                            });
                          }}
                        />
                      );
                  } if (tableMeta.columnData.name !== 'clave' && editMode.status && tableMeta.rowIndex === editMode.row) {
                    return (
                      <Input
                        name={tableMeta.columnData.name}
                        value={state[tableMeta.columnData.name]}
                        onChange={(e) => {
                          setState((prevState) => ({
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
              })
            }
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
