import React, {Component} from 'react';

export default class Success extends Component {

    constructor (props) {
        super(props);
        const title = this.props.title;
        const message = this.props.message;
        const body = this.props.body;
        let status = this.props.status || 0;
        if(status === "info" || status === 0) {
            status = 0; 
        } else if (status === "success" || status === 1) {
            status = 1; 
        } else if (status === "warning" || status === 3) {
            status = 2; 
        } else if (status === "danger" || status === 4) {
            status = 3; 
        } else {
            status = 4; 
        }

        this.state = {
            kind: ['-info', '-success', '-warning','-danger', '-none'],
            mainTitle: ['','Viva!','Aviso','Ops!'], 
            current: status || 0,
            title: title || '',
            message: message || '',
            body: body || '',
        }
    }

    componentDidMount(){
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }

    render(){
        const kind = this.state.kind;
        const current = this.state.current;
        return(
            <div className="mb-4 pb-3">
                { !this.props.notitle && (
                    <h2 className={"text-center title text" + kind[current]}>{this.state.mainTitle[current]}</h2>
                )}
                <div className={"notice notice" + kind[current]}>
                    <strong>{this.state.title}</strong> {this.state.message}
                    <p>{this.state.body}</p>
                </div>
            </div>
        );
    }
}