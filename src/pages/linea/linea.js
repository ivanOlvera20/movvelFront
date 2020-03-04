import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid, Input, Collapse, Paper, TextField, Button, MenuItem,
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
  descripcion: element.descripcion,
  familia: element.familia.descripcion,
});

export default function Linea() {
  const classes = useStyles();
  const [newLine, setLineFields] = useState({
    descripcion: '',
    familia: '',
  });
  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [dataFam, setDataFam] = useState([]);
  const [fetch, refetch] = useGet('/linea');
  const [put] = usePut('/linea');
  const [del] = useDelete('/linea');
  const [post] = usePost('/linea');


  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map((element) => mapObject(element)));
    }
  }, [fetch]);


  const url = 'https://movvel-olveraconsultores.herokuapp.com/api/familia';

  const getFam = () => {
    axios
      .get(url)
      .then((res) => {
        setDataFam(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getFam();
  }, []);


  return (
    <>
      <PageTitle title="Linea" button="Añadir linea" onClick={() => setCollapse((prev) => !prev)} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <TextField
                    name="descripcion"
                    fullWidth
                    label="Descripcion de la linea"
                    variant="outlined"
                    value={newLine.descripcion}
                    onChange={(e) => setLineFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    select
                    name="familia"
                    fullWidth
                    label="Familia correspondiente"
                    value={newLine.familia._id}
                    onChange={(e) => setLineFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                    helperText="Porfavor, selecciona una familia"
                    variant="outlined"
                  >
                    {dataFam.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} container>
                  <Button
                    style={{ height: '100%' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => post(newLine)
                      .then(() => {
                        refetch();
                      })
                      .then(() => {
                        setLineFields({
                          descripcion: '',
                          familia: '',
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
            columns={columns.map((column) => {
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
                            descripcion: tableMeta.rowData[1],
                            familia: tableMeta.rowData[2],
                          });
                          setEdit({
                            status: true,
                            row: tableMeta.rowIndex,
                          });
                        }}
                      />
                    );
                } if (tableMeta.columnData.name !== 'clave' && editMode.status && tableMeta.rowIndex === editMode.row) {
                  return (tableMeta.columnData.name === 'descripcion') ? (

                    <Input
                      name="descripcion"
                      value={state.descripcion}
                      onChange={(e) => {
                        setState((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      type="text"
                    />

                  )
                    : (
                      <TextField
                        name="familia"
                        select
                        value={state[tableMeta.columnData.name]}
                        onChange={(e) => {
                          setState((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                          }));
                        }}
                      >
                        {dataFam.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.descripcion}
                          </MenuItem>
                        ))}
                      </TextField>
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
