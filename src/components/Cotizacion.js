import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Resultado = styled.div `
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p `
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

const Precio = styled.p `
    font-size: 30px;

    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {

    return( 

        Object.keys(resultado).length !== 0 && (//Comprueba si el objeto resultado está vacio

            <Resultado>
                <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
                <Info>El precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
                <Info>El precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
                <Info>Variación en las últimas 24hrs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
                <Info>Última Actualización:<span>{resultado.LASTUPDATE}</span></Info>
            </Resultado>
            
        )
    );
}

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Cotizacion;