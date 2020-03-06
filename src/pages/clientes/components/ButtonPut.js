import React from 'react';
import { Button } from "@material-ui/core";

const ButtonPut = ({ onClick }) => (
    <>
        <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={onClick}>
            Actualizar Cliente
    </Button>
    </>
);

export default ButtonPut;
