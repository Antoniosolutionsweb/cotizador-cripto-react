import React, { useEffect, useState } from 'react'
import styled  from '@emotion/styled'
import  useMoneda  from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios, * as others from 'axios';
import Error from './Error';


const Boton = styled.input`
    width: 100%;
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border-radius:1opx;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color:#326AC0;
        cursor: pointer;
    }

`;

const Form = ({guardarMoneda,guardarCriptomoneda}) => {
  //state del listado de criptomonedas
  const [listadocripto, guardarCritomonedas] = useState([])

  // state de errores

  const [error, guardarError] = useState(false)

    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar de estados unidos'},
        {codigo: 'EUR', nombre:'Euro'},
        {codigo: 'GBP', nombre:'Libra Esterlina'},
        {codigo: 'COP', nombre:'Peso Colombiano'},
    ]
    // utilizando el state de  moneda
    const [moneda,SelectMoneda]= useMoneda('Elige tu moneda', '',MONEDAS);

    // utilizando el state de criptomonda

    const [criptomoneda,SelectCrypto]= useCriptomoneda('Elige tu Criptomoneda', '',listadocripto);

    // ejecutar llamado a la api

    useEffect(()=>{
        const consultarApi = async () => {
          const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
          const resultado = await axios.get(url)

          guardarCritomonedas(resultado.data.Data);
        }
        consultarApi()
    },[]);

    // cuando el usuario hace submit

    const cotizarMoneda = e => {
        e.preventDefault();

        // validamos que los campos esten llenos 
        if(moneda === '' || criptomoneda === ''){
          guardarError(true)
          return
        }
        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }
      // pasamos los datos al componente principal

    


  return (
    <>
      <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje='Los  campos son obligatorios'/>: null}
        <SelectMoneda/>
        <SelectCrypto/>
        <Boton
            type='submit'
            value='Calcular cripto'
        />
      </form>
    </>
  )
}

export default Form
