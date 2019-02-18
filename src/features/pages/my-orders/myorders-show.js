import React, { Component } from 'react';
import { getPagseguroTransaction } from '../../../common/get-pagseguro-transaction.js';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { Link } from 'react-router-dom';
import { getOrderInfo } from '../../../common/get-orders.js';

export default class Show extends Component {
    constructor (props) {
        super(props);
        this.state = {
            transaction:{},
            order_info:[],
        };
    }

    componentDidMount (match) {
        this.getTransaction();
        this.getOrder();
        this.props.setCheckoutOrderId(this.props.match.params.orderId);
    }

    handleBack = (e) => {
        e.preventDefault();
        console.log("Back");
        console.log(this.props);
        console.log(this.props.history);
        this.props.history.push('/pedidos');
    } 
    
    getOrder = () => {
        getOrderInfo(this.props.match.params.orderId)
        .then(res => {
            console.log("Order Resposne");
            console.log(res);
            this.setState({order_info: res});
        });
    }

    getTransaction = () => {
        getPagseguroTransaction(this.props.match.params.orderId)
        .then(res => {
            this.setState({transaction: res});
        }).catch(err=>{
            console.log("Error: " + err);
        });
    }

    handlePayment = (id) => {
        this.props.setCheckoutOrderId(id);
        this.props.location.pathname('/pagamento');
    }

    renderProducts = () => {
        const order = this.state.order_info
        console.log(order);
        const list = [];
        const products = [];
        const kits = [];
        if(order !== null) {
            for(let product in order.orders_products) {
                if(order.orders_products[product].quantity > 0) {
                    products.push(
                        <tr>
                            <td key={"key" + product.id} className="align-middle">
                                {order.orders_products[product].name}
                            </td>
                            <td>
                                {order.orders_products[product].price}
                            </td>
                            <td>     
                                {order.orders_products[product].quantity}
                            </td>
                            <td>

                            </td>
                        </tr>
                    )
                }
            }
            for(let kit in order.orders_kits) {
                kits.push(
                    <tr>
                        <th scope="row">Kits</th>
                        <td key={"key" + kit.id} className="align-middle">
                            {order.orders_kits[kit].name}
                        </td>
                        <td>
                            {order.orders_kits[kit].price}
                        </td>
                        <td>     
                            {order.orders_kits[kit].quantity}
                        </td>
                        <td>
                        </td>
                    </tr>
                )
            }
        }
        list.push(products);
        list.push(kits);
        return list;
    }

    render() {
        return(
            <React.Fragment>
               <div onClick={e => this.handleBack(e)} className="nav-link nav-item">
                    <Icon icon={arrowLeft2}
                    id={this.props.id}
                    className="btn btn-success btn-small arrowLeft2" />
                </div>

                <table className="table">
                    <tbody>
                        <tr>
                        <td className="align-middle text-right">Status</td>
                        <td>Aguardando Pagamento</td>
                        </tr>
                        <tr>
                            <td className="align-middle text-right">Pagamento</td>
                            <td className="align-middle"><strong>Pendente</strong></td>
                        </tr>
                        <tr>
                            <td className="align-middle text-center" colspan="3"><Link onClick={e => this.handlePayment(this.props.match.params.orderId)} to="/pagamento" replace><button className="btn btn-info">Pagar Agora</button></Link></td>
                        </tr>
                        <tr>
                            <td className="align-middle text-right">Valor total</td>
                            <td className="align-middle"><strong>{this.state.order_info.order_price}</strong></td>
                        </tr>
                        <tr>
                            <td  className="align-middle text-right">Previsão de Entrega</td>
                            <td  className="align-middle">Quinta-feira (12/12/2019)</td>
                        </tr>
                    </tbody>
                </table>
                
                <h4 className="text-center pt-5">Endereço de Enrega</h4>
                <table className="table align-middle my-auto">
                    <tbody>
                        <tr>
                            <td>Rua Yollanda Ferreira Penzo, 60</td>
                            <td>BNH II Plano</td>
                            <td>79826-175</td>
                            <td>Águas Claras-DF</td>
                        </tr>
                    </tbody>
                </table>

                <h4 className="text-center pt-5">Produtos</h4>
                <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade</th>
                    </tr>
                </thead>
                    <tbody>
                        {this.renderProducts()}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}