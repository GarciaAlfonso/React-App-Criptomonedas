import React, { useEffect, useState} from 'react';
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';
import PropTypes from 'prop-types';


const Boton = styled.input `
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    outline: none;
    

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({setMoneda, setCriptomoneda}) => {

    //state del formulario de Criptomonedas

    const [listaCripto, setlistaCripto] = useState([]);

    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar USA'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //Utilizar useMoneda

    const [moneda, SelectMoneda] = useMoneda('Elige tu Moneda ', '', MONEDAS);

    //Utilizar Criptomoneda 

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);


    //Ejecutar llamado a la API

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setlistaCripto(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //Cuando el Usuario hace submit

    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si los campos del form están llenos

        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }

        //pasar los valores al componente principal

        //quitar el mensaje de error
        setError(false);

        setMoneda(moneda);

        setCriptomoneda(criptomoneda);
    }

    return(
        <form
            onSubmit={cotizarMoneda}
        >

            {error && <Error mensaje="Error -- Ambos Campos son Obligatorios"/>}

            <SelectMoneda/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Cotizar"
            />
        </form>
    );
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired
}

export default Formulario;