import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario'; 
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img `
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1 `
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 45px;
  margin-bottom: 50px;

  &&::after {
    content:'';
    width: 130px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App() {

  //State para moneda y criptomoneda

  const [moneda, setMoneda] = useState('');

  const [criptomoneda, setCriptomoneda] = useState('');

  const [resultado, setResultado] = useState({});

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    
    const consultarCriptomoneda = async () => {
      //evitamos la primera ejecución del useEffect con éste condicional
      if(moneda === '')return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      setCargando(true);//Se activa el spinner

      setTimeout(() => {

        //Apagar el Spinner cambiando el estado
        setCargando(false);
        
        //Guardando la Cotización
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);

    }
    
    //se llama la función que consula la API
    consultarCriptomoneda();
     

  }, [moneda, criptomoneda]);

  //Mostrar spinner o Resultado

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        /> 

        {componente}
        
      </div>
    </Contenedor>
  );
}

export default App;
