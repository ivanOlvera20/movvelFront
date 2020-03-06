import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  newRow: {
    padding: theme.spacing(2),
    width: "100%",
  },
  newRow1: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "#f2688b",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
