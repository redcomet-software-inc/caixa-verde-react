import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import request from '../../common/configApi.js';
import {
  NavLink
} from "react-router-dom";
import Loading from '../common/Loading.js';


export class Categories extends Component {
  static propTypes = {
    components: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      categories:[],
      current_category:'Variedades',
      products_by_category:[],
    }
  }

  componentDidMount () {
    this.getCategories();
    
  }

  getCategories = () => {
    request({
      method: 'get',
      url: 'api/v1/categories.json'
    }).then((res) => {
      this.setState({categories: res})
      this.getProducts();
    })
  }

  getProducts = (e) => {
    this.props.turnOnLoading();
    this.props.resetImgCount();
    let id = '';
    
    if(e==undefined) {
      id = 'all';
    } 
    if(e!==undefined){
      e.preventDefault();
      e.persist();
      id = e.target.id;
      let name = e.target.name;
      this.setState({ current_category: name});
    }
    
    request({
      method: 'get',
      url: 'api/v1/categories/' + id + '.json',
    }).then((res) => {
      this.setState({products_by_category: res});
        /* Pass products to parent component 'Products' */
        this.props.refProducts(this.state.products_by_category);
    }).catch(error =>{
        this.turnOffLoading();
      });
  }

  renderLoading = () => {
    if(this.props.isLoading===true) {
      return <Loading />
    }
  }

  turnOffLoading = () => {
    this.props.turnOffLoading();
  }

  render() {
    return (
      <div className="components-categories">
        Procurar por:{'  '}
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { this.state.current_category }
            </button>
                <div className="dropdown-menu" >
                  { this.state.categories.map((category) => (
                    <a key={"category" + category.id} id={ category.id } className="dropdown-item" name={category.name} onClick={(e) => this.getProducts(e)} href="#">{ category.name }</a>
                  )) } 
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" name="Tudo" id="all" onClick={(e) => this.getProducts(e)}>Tudo</a>
                </div>
              </div>
          <div className="p-2 bd-highlight my-auto">{ this.renderLoading() }</div>
        </div>
        
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    components: state.components,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);