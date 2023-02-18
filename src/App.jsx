import { useEffect, useState } from 'react'
import styled  from '@emotion/styled'
import imagen from '../src/assets/cryptomonedas.png'
import Form from './componets/Form';
import axios, * as others from 'axios';
import Cotizacion from './componets/Cotizacion';
import Sppiner from './componets/Sppiner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
 

  @media screen and (max-width:992px)  {
    display: grid;
    column-gap: 2rem;
  }
  
`;

const Imagen = styled.img`
  max-width: 100%  ;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block  ;
  }
`;
function App() {

const [moneda, guardarMoneda] = useState('');
const [criptomoneda, guardarCriptomoneda] = useState('');

const [resultado, guardarResultado] = useState({})

const [cargando, guardarCargando] = useState(false)

useEffect(()=>{
   
    
    

    const cotizarCripto = async () =>{
      
      //evitar que se ejecute la primera vez 
      if(moneda === '') return

      //consultando la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);
      guardarCargando(true)

      setTimeout(()=>{
        guardarCargando(false)

        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000)
  
    }
    cotizarCripto()
},[moneda,criptomoneda])

const componente = (cargando) ? <Sppiner/> :<Cotizacion resultado={resultado}/>
  return (
      <Contenedor>
        <div className="row">
        <div className='col-sm-12 col-md-6'>
            <Imagen
              src={imagen}
              alt='imagen crypto'
            />
        </div>
        <div className='col-sm-12 col-md-6'>
            <Heading>
              Cotiza criptomonedas al instante
            </Heading>
            <Form 
              guardarMoneda={guardarMoneda}
              guardarCriptomoneda={guardarCriptomoneda}

            /> 
            {componente}
        </div>
        </div>
        
      </Contenedor>
  )
}

export default App
