import React, { Component } from 'react';

class MessageScreen extends Component {
    constructor(props) {
        super(props);
    }

    render_success = () => {
        return(
            <div className="message-screen text-center">
                <div className="card m-0 p-2">
                <div className="card-body screen-message">
                    <h5 className="text-success pb-3">{this.props.successMessage}</h5>
                    <p>Obrigado pela preferência.
                    Você pode acompanhar o seu
                    neste link.</p>
                </div>
            </div>
        </div>
        );
    }

    render_error = () => {
        return(
            <div className="message-screen text-center">
                <div className="card m-0 p-2">
                    <div className="card-body screen-message">
                        <h5 className="text-success pb-3">{this.props.errorMessage}</h5>
                        <p>Um problema impediu a conclusão do pagamento.
                            Você pode tentar de novo, ou escolhar uma nova forma de pagamento.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    current_tab = () => {
        if(this.props.currentTab === "success") {
            return this.render_success();
        } else {
            return this.render_error();
        }
    }

    render() {
        return(
            <React.Fragment>
               {this.current_tab()}
            </React.Fragment>
        )        
    }
}

export default MessageScreen;