import React from 'react'

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado)

  return (
    <>
    
        <div className="card  padd mb-3">
            <div className="card-header">
                <h4>
                
                <span>{resultado.FROMSYMBOL}</span>

                </h4>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                     el precio es: <span>{resultado.PRICE}</span>
                </li>
                <li className="list-group-item">
                    el precio mas alto del dia: <span>{resultado.HIGHDAY}</span>
                </li>
                <li className="list-group-item">
                    el precio mas bajo del dia: <span>{resultado.LOWDAY}</span>
                </li>
                <li className="list-group-item">
                    Ultima actualizacion  <span>{resultado.LASTUPDATE}</span>
                </li>
            </ul>
        </div>
        </>
  )
}

export default Cotizacion
