import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div>
                <center><h1>404</h1></center>
                <h2><center className="p-2 warning-muted lead">Página <mark>não encontrada</mark></center></h2>
                <center className="p-2 ">O lugar que você procura não existe mais, ou mudou de endereço.</center>
                <center className="p-2"><Link to="/">Ir para a Página Principal</Link></center>
            </div>
        );
    }

}

export default NotFound;