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
      console.log("NULL");
      id = 'all';
    } 
    console.log("E");
    console.log(e);
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
        console.log(this.state.products_by_category)
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
    console.log("TURN OFF LOADING");
    this.props.turnOffLoading();
  }

  render() {
    return (
      <div className="components-categories">
        <p>Procurar por:{'  '}
        <div class="d-flex flex-row bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { this.state.current_category }
            </button>
                <div class="dropdown-menu" >
                  { this.state.categories.map((category) => (
                    <a class="dropdown-item" id={ category.id } name={category.name} onClick={(e) => this.getProducts(e)} href="#">{ category.name }</a>
                  )) } 
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" name="Tudo" id="all" onClick={(e) => this.getProducts(e)}>Tudo</a>
                </div>
              </div>
          <div class="p-2 bd-highlight my-auto">{ this.renderLoading() }</div>
        </div>
  


          



        </p>
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
