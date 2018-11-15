import React, { Component } from 'react';

export default class Registration extends Component {
  static propTypes = {

  };

  render(props) {
    return (



      <div className="pages-registration">
        <h2 className="text-center title">Cadastro</h2>
        <form onSubmit={this.props.requestAPI}>
          <div className="form-row">
              <div className="col-md-6 mb-3">
                <label for="validationDefault01">Nome</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="" />
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationDefault02">Sobrenome</label>
                <input type="text" className="form-control" id="lastname" name="lastname" placeholder="" />
              </div>
            </div>
           
            <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label for="validationDefault03">E-mail</label>
                  <input type="text" className="form-control" id="email" name="email" placeholder="meuemail@email.com" />
                </div>
                <div className="col-md-6 mb-3">
                  <label for="validationDefault03">Senha</label>
                  <input type="password" name="password" className="form-control" id="validationDefault03" />
                </div>
            </div>
          <div className="p-4">
            <hr/>
          </div>

          <div className="form-row">
      
            <div className="col-md-9 mb-9">
              <label for="validationDefault04">Região Administrativa</label>
              <select class="form-control" name="state" id="state"><option value="">Selecione uma das regiões</option>
              <option value="AC">Águas Claras</option>
              <option value="AN">Asa Norte</option>
              <option value="AS">Asa Sul</option>
              <option value="LS">Lago Sul</option>
              </select>
            </div>


            <div className="col-md-3 mb-3">
              <label for="validationDefault05">CEP</label>
              <input type="text" className="form-control" id="zipcode" name="zipcode" placeholder="9999-999" />
            </div>
          </div>

          <div class="form-row">
            <div className="col-md-9 mb-3">
              <label for="validationDefault03">Endereço</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Rua, Avenida, Alameda" />
            </div>
            <div className="col-md-3 mb-3">
              <label for="validationDefault03">Número</label>
              <input type="text" className="form-control" id="number" name="number" placeholder="00" />
            </div>
          </div>

          <div class="form-row">
            <div className="col-md-7 mb-3">
              <label for="validationDefault03">Bairro</label>
              <input type="text" className="form-control" id="neighbourhood" name="neighbourhood" placeholder="" />
            </div>
            <div className="col-md-5 mb-3">
              <label for="validationDefault03">Complemento</label>
              <input type="text" className="form-control" id="complement" name="complement" placeholder="" />
            </div>
          </div>

          <div class="form-row">
            <div className="col-md-6 mb-3">
              <label for="validationDefault03">Celular 1</label>
              <input type="text" className="form-control" id="phone1" name="phone1" placeholder="9999-9999" />
            </div>
            <div className="col-md-6 mb-3">
              <label for="validationDefault03">Celular 2</label>
              <input type="text" className="form-control" id="phone2" name="phone2" placeholder="9999-9999" />
            </div>
          </div>



          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" />
              <label className="form-check-label" for="invalidCheck2">
                Ao me cadastrar, concordo com os termos de serviço e políticas de privacidade desta página.
              </label>
            </div>
          </div>
          <p className="text-center">
            <button className="btn btn-primary" type="submit">Cadastrar</button>
          </p>
        </form>
      </div>
    );
  }
}

/*
    t.string "name"
    t.string "phone_1"
    t.string "phone_2"
    t.string "cellphone"
    t.string "cpf"
    t.string "rg"
    t.string "cnpj"
    t.string "ie"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["email"], name: "index_clients_on_email", unique: true
    t.index ["reset_password_token"], name: "index_clients_on_reset_password_token", unique: true
*/