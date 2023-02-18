import React, { useState,Fragment } from "react";
import styled from "@emotion/styled";




const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select= styled.select`
width: 100%;
display: block;
padding: 1rem;
-webkit-appearance:none;
border-radius: 10px;
border: none;
font-size: 1.1rem;
`;

 const useCriptomoneda = (label,initialState,opciones) =>{
    
    // state del custom hook
    const [state, actualizarState] = useState(initialState)

    const SelectCrypto = () => ( 
            <Fragment>
                <Label>{label}</Label>
                <Select 
                    onChange={e=>actualizarState(e.target.value)}
                    value={state}
                >
                    <option value=''>--Seleccione una Criptomoneda--</option>
                    {opciones.map(opciones =>(
                            <option key={opciones.CoinInfo.Id} value={opciones.CoinInfo.Name}>{opciones.CoinInfo.FullName}</option>
                    ))}
                    
                </Select>
            </Fragment>
    )

    // retornar state , interfaz y funcion que modifica el state

    return [state,SelectCrypto,actualizarState]
}

export default useCriptomoneda;