import React, { Component } from 'react';

export default class Warning extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-warning">
        <div class="modal fade" id="warningDialog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="wanrningLabel">Aviso</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                A sua caixa está vazia.
              </div>
              <div class="modal-footer">
                
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
