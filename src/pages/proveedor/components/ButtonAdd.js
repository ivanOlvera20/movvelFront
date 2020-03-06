import React from 'react';
import { Button } from "@material-ui/core";

const ButtonAdd = ({ onClick }) => (
    <>
    <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={onClick}>
                Agregar 
    </Button>
    </>
);

export default ButtonAdd;
