import React, { Component } from 'react';
import { getPagseguroTransaction } from '../../../common/get-pagseguro-transaction.js';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { NavLink } from 'react-router-dom';
import { getOrderInfo, getPayment } from '../../../common/get-orders.js';


export default class Show extends Component {
    constructor (props) {
        super(props);

        this.state = {
            transaction:{},
            order_info:'',
            order_status:'',
            payment_info:[],
            payment_status: <span className="text-info">Carregando...</span>,
            payment_kind:<span className="text-info">Carregando...</span>,
        };
    }
    componentDidMount (match) {
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
        this.getTransaction();
        this.getOrder();
        this.getPayment();
        this.props.setCheckoutOrderId(this.props.match.params.orderId);
    }
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push('/pedidos');
    } 
    
    getOrder = () => {
        getOrderInfo(this.props.match.params.orderId)
        .then(res => {
            console.log("order");
            console.log(res);
            this.props.actions.turnOffLoading();
            this.setState({order_info: res});
        }).catch( error => {
            console.log(error);
            this.props.actions.turnOffLoading();
        });
    }

    getPayment = () => {
        console.log("where is the params");
        console.log(this.props);
        getPayment(this.props.match.params.orderId)
        .then(res => {
            this.setState({payment_info: res});
            if(res.payment.kind === "credit-card") {
                this.setState({payment_kind: <span className="text-info">Cartão de crédito</span>});
                this.setState({payment_status: this.paymentStatus(res.transaction.status)});
            }
            if(res.payment.kind === "debit") {
                this.setState({payment_kind: "Débito"})
            }
            if(res.payment.kind === "money") {
                this.setState({payment_kind: "Dinheiro"})
            }
            if(res.payment.kind === "ticket") {
                this.setState({payment_kind: "Boleto"})
            }
            if(res.payment.kind === null) {
                this.setState({payment_kind: null});
                this.setState({payment_status: <span className="text-danger">Pendente</span>});
                this.setState({order_status: <span className="text-danger">Aguardando pagamento</span>})
            }
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

    paymentStatus = (status) => {
        status = parseInt(status);
        if(status === 1) {
            return <span className="text-warning">Aguardando pagamento</span>;
        }
        if (status === 2) {
            return <span className="text-warning">Em análise</span>;
        }
        if (status === 3) {
            return <span className="text-success">Completo</span>;
        }
        if (status === 4){
            return <span className="text-warning">Disponível</span>;
        } else 
        if(status === 5) {
            return <span className="text-info">Em Disputa</span>;
        } 
        if(status === 6) {
            return <span className="text-info">Devolvido</span>;
        }
        if(status === 7) {
            return <span className="text-info">Cancelado</span>;
        }
        if(status === 8) {
            return <span className="text-warning">Em devolução</span>;
        } 
        if(status === 9) {
            return <span className="text-warning">Em Contestação</span>;
        }
    }

    handlePayment = (e) => {
        e.preventDefault();
        console.log("pagar agora");
        localStorage.setItem("checkout_order_id", this.props.match.params.orderId);
        this.props.actions.redirect('/pagamento');
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
                        <tr key={"key_product" + order.orders_products[product].id}>
                            <td className="align-middle">
                                {order.orders_products[product].name}
                            </td>
                            <td>
                                {this.props.setMoneyFormat(order.orders_products[product].price)}
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
                    <tr key={"key_kit" + order.orders_kits[kit].id}>
                        <th scope="row">Kits</th>
                        <td className="align-middle">
                            {order.orders_kits[kit].name}
                        </td>
                        <td>
                            {this.props.setMoneyFormat(order.orders_kits[kit].price)}
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
                        <td>{ this.state.order_status }</td>
                        </tr>
                        { this.state.payment_kind && (
                            <tr>
                                <td className="align-middle text-right">Forma de Pagamento</td>
                                <td className="align-middle"><strong>{ this.state.payment_kind }</strong></td>
                            </tr>
                        )}
                        <tr>
                            <td className="align-middle text-right">Pagamento</td>
                            <td className="align-middle"><strong>{ this.state.payment_status }</strong></td>
                        </tr>
                        <tr>
                            { this.state.payment_kind === null && (  
                                <td className="align-middle text-center" colspan="3">
                                    <button onClick={e => this.handlePayment(e)} className="btn btn-info">Pagar Agora</button>
                                </td>
                            ) }
                        </tr>
                        <tr>
                            <td className="align-middle text-right">Valor total</td>
                            <td className="align-middle">
                            <strong className="info">
                                {this.state.order_info && this.state.order_info.order_price && (
                                    <React.Fragment>
                                        {this.props.setMoneyFormat(this.state.order_info.order_price)}
                                    </React.Fragment>
                                )}
                                {!this.state.order_info && (
                                    <React.Fragment>
                                        Carregando...
                                    </React.Fragment>
                                )}
                                
                            </strong>
                            </td>
                        </tr>
                        <tr>
                            <td  className="align-middle text-right">Previsão de Entrega</td>
                            <td  className="align-middle">Quinta-feira (12/12/2019)</td>
                        </tr>
                    </tbody>
                </table>
                
                { this.state.order_info.order_address && this.state.order_info.order_address && ( 
                    <div>
                        <h4 className="text-center pt-5">Endereço de Enrega</h4>
                        <table className="table align-middle my-auto">
                            <tbody>
                                <tr>
                                    <td>{ this.state.order_info.order_address.street }</td>
                                    <td>{ this.state.order_info.order_address.neighbourhood }</td>
                                    <td>{ this.state.order_info.order_address.zipcode }</td>
                                    <td>{ this.state.order_info.order_address.adm_region }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) }
                    

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