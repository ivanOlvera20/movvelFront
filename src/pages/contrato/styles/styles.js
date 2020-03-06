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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
