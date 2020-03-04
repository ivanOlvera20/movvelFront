import React, { useState, useEffect } from 'react';
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
  codigo: element.codigo,
  material: element.material.descripcion,
  unidad_medida: element.unidad_medida.descripcion,
  costo: element.costo,
  magnitud: element.magnitud,
});

const mapIde = (element) => ({
  id: element._id,
  descripcion: element.descripcion,
});

const mapMat = (element) => ({
  id: element._id,
  descripcion: element.descripcion,
});

const values = [
  {
    value: 'Directa',
    label: 'DIRECTA',
  },
  {
    value: 'Indirecta',
    label: 'INDIRECTA',
  },
];


export default function MatPrima() {
  const classes = useStyles();
  const [newMat, setMatFields] = useState({
    clave: '',
    codigo: '',
    material: '',
    unidad_medida: '',
    magnitud: '',
    costo: '',
    directa: '',
  });
  const [collapsible, setCollapse] = useState(false);
  const [state, setState] = useState();
  const [editMode, setEdit] = useState(editInitialState);
  const [data, setData] = useState([]);
  const [dataIde, setDataIde] = useState([]);
  const [dataMat, setDataMat] = useState([]);
  const [fetch, refetch] = useGet('/mat_prima');
  const [fetchIde] = useGet('/iden');
  const [fetchMat] = useGet('/mat_consumo');
  const [put] = usePut('/mat_prima');
  const [del] = useDelete('/mat_prima');
  const [post] = usePost('/mat_prima');

  useEffect(() => {
    if (fetch !== undefined) {
      setData(fetch.data.map((element) => mapObject(element)));
    }
    if (fetchMat !== undefined) {
      setDataMat(fetchMat.data.map((element) => mapMat(element)));
    }
    if (fetchIde !== undefined) {
      setDataIde(fetchIde.data.map((element) => mapIde(element)));
    }
  }, [fetch, fetchMat, fetchIde]);
  return (
    <>
      <PageTitle
        title="Materia Prima"
        button="Añadir materia prima"
        onClick={() => setCollapse((prev) => !prev)}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Collapse in={collapsible}>
            <Paper className={classes.newRow}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    name="codigo"
                    fullWidth
                    label="Codigo"
                    variant="outlined"
                    value={newMat.codigo}
                    onChange={(e) => setMatFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    name="material"
                    fullWidth
                    select
                    label="Material"
                    variant="outlined"
                    value={newMat.material}
                    onChange={(e) => setMatFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  >
                    {dataMat.map((option) => (
                      <MenuItem value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="unidad_medida"
                    fullWidth
                    select
                    label="Unidad de Medida"
                    variant="outlined"
                    value={newMat.unidad_medida}
                    onChange={(e) => setMatFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  >
                    {dataIde.map((option) => (
                      <MenuItem value={option.id}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    name="magnitud"
                    label="Medida"
                    variant="outlined"
                    value={newMat.magnitud}
                    onChange={(e) => setMatFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="directa"
                    fullWidth
                    select
                    label="Tipo de Materia"
                    variant="outlined"
                    value={newMat.directa}
                    onChange={(e) => setMatFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))}
                  >
                    {values.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="costo"
                    label="Costo $"
                    fullWidth
                    variant="outlined"
                    value={newMat.costo}
                    onChange={(e) => setMatFields((prev) => ({
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
                    onClick={() => post(newMat)
                      .then(() => {
                        refetch();
                      })
                      .then(() => {
                        setMatFields({
                          descripcion: '',
                          especificacion: '',
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
                  return editMode.status
                    && editMode.row === tableMeta.rowIndex ? (
                      <EditSet
                        save={() => {
                          put(
                            data.find((element) => element.clave === state.clave)
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
                              (element) => element.clave === tableMeta.rowData[0],
                            ).id,
                          ).then(() => {
                            refetch();
                          });
                        }}
                        edit={() => {
                          setState({
                            clave: tableMeta.rowData[0],
                            descripcion: tableMeta.rowData[1],
                            especificacion: tableMeta.rowData[2],
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
                  tableMeta.columnData.name !== 'clave'
                  && editMode.status
                  && tableMeta.rowIndex === editMode.row
                ) {
                  return (
                    <>
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
                    </>
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
