import React, { Component } from 'react';

export default class Warning extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-warning">
        <div className="modal fade" id="warningDialog" tabIndex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="wanrningLabel">Aviso</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                { this.props.warningMessage }
              </div>
              <div className="modal-footer">
                
                <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
