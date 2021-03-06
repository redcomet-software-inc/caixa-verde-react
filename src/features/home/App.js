import React, { Component } from 'react';
import MainPage from '../home/mainpage.js';
import logo from '../../images/logo-caixaverde-cube-video.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      style: 'none',/* Loads the page while not visible */
      timer:2,      /* Wait at least 2 seconds before it opens */
      timerName:0, /* Clear SetInterval */
      timerName2:0,/* Clear SetInterval */
    }
  }

  /* This functions is called by the MainPage after API request */
  turnOffMainLoading = () => {
        this.setState({ isLoading: false});
        this.setState({ style: ''});
  }

  /* The first thing to appear is the logo, and it will desappear after page has been loaded*/
  renderLoading = () => {
    if(this.state.isLoading) {
      return( 
        <div className="w-100 h-100 position-absolute">
            <img alt={"Logo da Caixa Verde"} className="mx-auto d-block logo-intro img-fluid animate-flicker" width={200} src={ logo } />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="home-app">
        {this.renderLoading()}
         <div style={{display: this.state.style}}>
          <MainPage turnOffMainLoading={this.turnOffMainLoading} />
         </div>
      </div>
    );
  }
}
