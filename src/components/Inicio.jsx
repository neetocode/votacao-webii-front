import React from 'react'
import { Link } from 'react-router-dom'

class Inicio extends React.Component{
    
    render(){
        return(
            <div>
                <h1>Início</h1>

                <Link to='/nova'>Nova votação</Link>
                <br/>
                <Link to='/acessar'>Acessar votação</Link>
            </div>
        )
    }


}


export default Inicio;