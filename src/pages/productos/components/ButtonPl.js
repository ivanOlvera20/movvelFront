import React from 'react';
import { Button, Tooltip, ButtonGroup } from '@material-ui/core';


const ButtonPl = ({ show1, show2, show3 }) => (
  <>
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical contained primary button group"
      variant="text"
    >
      <Tooltip title=" ver precio de lista zona 1">
        <Button onClick={show1}>
          plz1
        </Button>
      </Tooltip>
      <Tooltip title=" ver precio de lista zona 3">
        <Button onClick={show2}>
          plz2
        </Button>
      </Tooltip>
      <Tooltip title=" ver precio de lista zona 3">
        <Button onClick={show3}>
          plz3
        </Button>
      </Tooltip>
    </ButtonGroup>
  </>
);

export default ButtonPl;
