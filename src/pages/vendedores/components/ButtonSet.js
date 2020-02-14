import React from 'react';
import { Delete, Edit } from '@material-ui/icons';
import {
  Grid, Button, IconButton, Tooltip,
} from '@material-ui/core';

const ButtonSet = ({ delete: delCb, edit }) => (
  <>
    <Tooltip title="Editar">
      <IconButton onClick={edit}>
        <Edit />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton onClick={delCb}>
        <Delete />
      </IconButton>
    </Tooltip>
  </>
);

export default ButtonSet;
