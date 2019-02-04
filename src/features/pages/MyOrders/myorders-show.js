import React, { Component } from 'react';
import { getPagseguroTransaction } from '../../../common/get-pagseguro-transaction.js';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2'
import { Link } from 'react-router-dom';


export default class Show extends Component {
    constructor (props) {
        super(props);
        this.state = {
            transaction:{},
        };
    }

    componentDidMount (match) {
        this.getTransaction();
    }

    handleBack = (e) => {
        e.preventDefault();
        console.log("Back");
        console.log(this.props);
        console.log(this.props.history);
        this.props.history.push('/pedidos');
    } 
    

    getTransaction = () => {
        getPagseguroTransaction(this.props.match.params.orderId)
        .then(res => {
            this.setState({transaction: res});
        }).catch(err=>{
            console.log("Error: " + err);
        });
    }
    
    render() {
        return(
            <React.Fragment>
               <div onClick={e => this.handleBack(e)} className="nav-link nav-item">
 
                    <Icon icon={arrowLeft2}
                    id={this.props.id}
                    className="btn btn-primary arrowLeft2" />

                </div>
                <table className="table">
                    <caption></caption>
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>
            </React.Fragment>
        );
    }

}