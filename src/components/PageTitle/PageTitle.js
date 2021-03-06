import React from 'react';
import { Button } from "@material-ui/core";

// styles
import useStyles from './styles';

// components
import { Typography } from '../Wrappers';

export default function PageTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && (
        <Button onClick={props.onClick} color="Primary">
          {props.button}
        </Button>
      )}
    </div>
  );
}
