import React, {Component} from 'react';
import { setField } from '../../../common/set-field.js';
import { NavLink } from 'react-router-dom';
import { DynamicDataStructure } from './dynamic-data-structure.js';
import Loading from '../../common/loading.js';

export class Field extends Component {
    constructor (props) {
        super(props);
        const placeholder = this.props.placeholder;
        this.state = {
            placeholder: placeholder || '',
            table:  '',
            field:  '',
            value: '',
            backup_value: '',
            edit: false,
            isLoading: false,
            noEditClass:' dynamic-mouse',
        }
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUpdate (prevProps) {
      if(this.props !== prevProps) {
        console.log("==Field Redux Test==");
        console.log(this.props);
        console.log("field_name: " + this.props.field_name);
        console.log("field_value: " + this.props.field_value);
        this.setState({value: this.props.field_value});
        this.setState({backup_value: this.props.field_value});
        if(this.props.noedit) {
            this.setState({noEditClass: ''});
        }
      }
    }


    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
          return;
        }
        if(this.state.edit) {
            this.setState({edit:false});
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.submitField(e);
        }
    }

    editField = (e) => {
        e.preventDefault();
        if(!this.props.noedit) {
            this.setState({edit: true});
            document.addEventListener('click', this.handleOutsideClick, false);
        }
    }

    submitField = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        this.setState({edit: false});

        let table = this.props.table_name;
        let field_name = this.props.field_name;
        let value = this.state.value;
        this.setState({value: value});

        setField(table, field_name, value).then(res => {
            this.setState({isLoading: false});
            const column = 'client_data'[field_name]; 
            this.setState({value: value});
        }).catch(error => {
            this.setState({value: this.state.backup_value});
            this.setState({isLoading: false});
            console.log(error);
        });
    }

    handleChange = (e) => {
        this.setState({value: e.currentTarget.value});
    }

    render() {
        const table = this.props.table_name;
    return(
        <React.Fragment>
            <form onSubmit={(e) => this.submitField(e)}>
                {this.props.field_name && (
                    <div class="d-flex bd-highlight">
                        <div className="p-2 d-none d-lg-block d-lg-none">
                            <strong>{this.props.fields_br[this.props.field_name]}</strong>:
                        </div>
                        <div ref={node => { this.node = node; }} onClick={e => this.editField(e)} className={"p-2 flex-grow-1 bd-highlight" + this.state.noEditClass}>
                            {!this.state.edit && this.state.value && (this.state.value)}
                            {this.state.edit  && (
                                <div className="dynamic-input">
                                    <input type="text" 
                                    id="lastname" 
                                    name="dynamicInput"
                                    className=""
                                    placeholder={this.state.placeholder}
                                    autoFocus
                                    defaultValue={this.state.value}
                                    value={this.state.value}
                                    onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                )}
                        </div>
                        <div class="p-2 bd-highlight">
                            <div className="container_row float-right">
                                <div className="layer1">
                                    {!this.state.edit &&  !this.state.isLoading && !this.props.noedit && (
                                    <NavLink to="/" onClick={e => this.editField(e)}>Editar</NavLink> )}
                                
                                <div className="layer2 mx-auto my-auto">
                                        {this.state.isLoading &&  (
                                            <div></div>
                                        )}
                                        {this.state.edit && !this.state.isLoading &&  ( 
                                        <div></div>
                                        )}
                                    </div>
                                </div>
                            </div> 
                        </div>   
                    </div>
                )}
            
           </form>
        </React.Fragment>
        );
    }
}

export class TitleData extends Component {
    render () {
        return(
            <h4 className="mb-1 text-info mr-2 mb-3">{this.props.title}</h4>
        );
    }
}



export class PersonalDataList extends Component {

    constructor (props) {
        super(props);
        const struct = new DynamicDataStructure
        const fields_br = struct[this.props.table_name]().fields_br;
        const placeholder = struct[this.props.table_name]().placeholder;
        this.state = {
            struct,
            fields_br,
            placeholder,
            field_value: '',
        }
    }

    componentDidMount (){
        console.log("COMPONENT DID MOUNT");
        console.log(this.state.fields_br);
        console.log(this.state.placeholder);
    }

    componentWillUpdate (prevProps) {
        if(prevProps !== this.props) {
            if(typeof this.props.home !== 'undefined') {
                
                let exp_data = this.props.home[this.props.table_name];
                console.log("check");
                if(this.state.field_value === '') {
                    this.setState({field_value: exp_data});
                    console.log("check");
                    console.log(exp_data);
                }
            }
        }
    }

    renderList = () => {
        let table = [];
        let data = this.props.home.client_data[this.props.table_name];
        let noedit = false;
        
        console.log("check data");
        console.log(data);

        for(let field in data) {
            const field_value = data[field];
            if( !this.state.struct[this.props.table_name]().except.includes(field)) {
                /* Block Editing Option from Field */
                if(this.state.struct[this.props.table_name]().noedit.includes(field)) {
                    noedit = true;
                }
                table.push(
                    <React.Fragment>
                        <Field 
                        noedit={noedit}
                        table_name={this.props.table_name} 
                        fields_br={this.state.fields_br} 
                        field_name={field} 
                        field_value={field_value} 
                        placeholder={this.state.placeholder[field]} />
                    </React.Fragment>
                )
            }

            console.log(field);
        }

        return table;
    }

    render() {
        return(
            <React.Fragment>
                { this.renderList() }
            </React.Fragment> 
        );
    }
}


export class PersonalDataClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table_name: "client",
            title: "Dados Pessoais",
            noborder: this.props.noborder || " field-block"
        }
    }
    componentDidMount () {
        this.props.actions.getClientData();
    }

    render() {
        return(
            <div className={"mb-2" + this.state.noborder}>
                <div className="mb-3 pb-2">
                    <div class="d-inline-block">
                        <TitleData title={this.state.title} />
                    </div>
                    { this.props.home.client_data && (
                        <PersonalDataList {...this.state} {...this.props} /> 
                    )}
                </div>
            </div> 
        );
    }
}

export class PersonalAddressDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table_name: "address_delivery",
            title: "Endereço de Entrega",
            noborder: this.props.noborder || " field-block"
        }
    }
    componentDidMount () {
        this.props.actions.getClientData();
    }

    render() {
        return(
            <div className={"mb-2" + this.state.noborder}>
                <div className="mb-3 pb-2">
                    <div class="d-inline-block">
                        <TitleData title={this.state.title} />
                    </div>
                    { this.props.home.client_data && (
                        <PersonalDataList {...this.state} {...this.props} /> 
                    )}
                </div>
            </div> 
        );
    }
}

export class PersonalAddressBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table_name: "address_billing",
            title: "Endereço de Cobrança",
            noborder: this.props.noborder || " field-block"
        }
    }
    componentDidMount () {
        this.props.actions.getClientData();
    }

    render() {
        return(
            <div className={"mb-2" + this.state.noborder}>
                <div className="mb-3 pb-2">
                    <div class="d-inline-block">
                        <TitleData title={this.state.title} />
                    </div>
                    { this.props.home.client_data && (
                        <PersonalDataList {...this.state} {...this.props} /> 
                    )}
                </div>
            </div> 
        );
    }
}

