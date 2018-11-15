import React, { Component } from 'react';
import { Link, Route, HashRouter } from 'react-router-dom';

export default class SideBar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="navbar-side-bar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/kits">Kits</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/personalizado">Personalizado</Link>
          </li>
       
        </ul>  
      </div>
    );
  }
}
