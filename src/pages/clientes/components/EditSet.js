import React from 'react';
import { Save, Block } from '@material-ui/icons';
import { Tooltip, IconButton } from '@material-ui/core';

const EditSet = ({ save, cancel }) => (
  <>
    <Tooltip title="Guardar">
      <IconButton onClick={save} color="primary">
        <Save />
      </IconButton>
    </Tooltip>
    <Tooltip title="Cancelar">
      <IconButton onClick={cancel} color="secondary">
        <Block />
      </IconButton>
    </Tooltip>
  </>
);

export default EditSet;
