import React from 'react';
import { Delete, Edit } from '@material-ui/icons';
import {
  IconButton, Tooltip,
} from '@material-ui/core';

const ButtonSet = ({ delete: delCb, edit }) => (
  <>
    <Tooltip title="Editar">
      <IconButton onClick={edit}>
        <Edit color="primary" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton onClick={delCb} color="secondary">
        <Delete />
      </IconButton>
    </Tooltip>
  </>
);

export default ButtonSet;
