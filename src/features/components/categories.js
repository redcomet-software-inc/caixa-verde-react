import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../features/pages/redux/actions.js';
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
        current_category: '',
        products_by_category:[],
        localLoading:false,
      }
    }

    componentDidMount () {
      this.getCategories();
      console.log("Check PROPs");
      console.log(this.props);
    }

    componentDidUpdate (prevProps) {
      if(this.props !== prevProps) {
        const current_category = this.props.pages.products_category_filter;
        this.setState({current_category});
      }
    }

    getCategories = () => {
      request({
        method: 'get',
        url: 'api/v1/categories.json'
      }).then((res) => {
        this.setState({categories: res})
      })
    }

    filterProducts = (e) => {
      this.setState({localLoading: true});
      if(e !== undefined) {
        e.preventDefault();
        e.persist();
        let id = e.target.id;
        let name = e.target.name;
        this.props.refFilter(name);
        this.props.actions.productsCategoriesFilter(name);
        this.setState({ current_category: name});
        this.setState({ localLoading: false});
      }
    
     
  }

  renderLoading = () => {
    if(this.state.localLoading) {
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
                    <a key={"category" + category.id} id={ category.id } className="dropdown-item" name={category.name} onClick={(e) => this.filterProducts(e)} >{ category.name }</a>
                  )) } 
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" name="Tudo" id="all" onClick={(e) => this.filterProducts(e)}>Tudo</a>
                </div>
              </div>
          <div className="p-adjust">
            <div className="p-2 bd-highlight my-auto loading-categories load-custom">{ this.renderLoading() }</div>
          </div>
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
