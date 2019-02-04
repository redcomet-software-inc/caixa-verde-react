import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../features/home/redux/actions.js';
import request from '../../common/config-api.js';
import Loading from '../common/loading.js';

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
      this.props.resetImgCount();
      let id = '';
      if(e === undefined) {
        id = 'all';
      }
      if(e !== undefined) {
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
          this.props.refProducts(res);
          this.props.turnOffLocalLoading();
          this.props.actions.turnOffLoading();
      }).catch(error =>{
          this.props.actions.turnOffLoading();
          this.props.turnOffLocalLoading();
      });
  }

  renderLoading = () => {
    if(this.props.localLoading===true) {
      return <Loading />
    }
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
                    <button key={"category" + category.id} id={ category.id } className="dropdown-item" name={category.name} onClick={(e) => this.getProducts(e)} >{ category.name }</button>
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
