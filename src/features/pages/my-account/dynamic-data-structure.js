import React, { Component } from 'react';


export class DynamicDataStructure extends Component {
    
    constructor(props) {
        super(props);
    }

    /* Always add noedit and except in the object */
    /* Even if you want the array to be empty, Thank you! */
    address_delivery = () => {
        let structure = [];
        structure = {
                noedit:["city", "state"],
                except:["id", "created_at", "updated_at", "kind", "client_id", "order_id", "adm_region_id"],
                table_name: "address_delivery",
                fields_br: {
                    number: "Número",
                    street: "Endereço",
                    complement: "Complemento",
                    zipcode: "CEP",
                    neighbourhood: "Bairro",
                    city: "Cidade",
                    state: "Estado",
                },
                placeholder: {
                    number: "999",
                    street: "Rua, Avenida, Alameda ....",
                    complement: "Complemento",
                    zipcode: "99999-999",
                    neighbourhood: "Bairro",
                    city: "Cidade",
                    state: "Estado",
                }
            }
        return structure;
    }

    address_billing = () => {
        let structure = [];
        structure = {
                noedit:["city", "state"],
                except:["id", "created_at", "updated_at", "kind", "client_id", "order_id", "adm_region_id"],
                table_name: "address_delivery",
                fields_br: {
                    number: "Número",
                    street: "Endereço",
                    complement: "Complemento",
                    zipcode: "CEP",
                    neighbourhood: "Bairro",
                    city: "Cidade",
                    state: "Estado",
                },
                placeholder: {
                    number: "999",
                    street: "Rua, Avenida, Alameda ....",
                    complement: "Complemento",
                    zipcode: "99999-999",
                    neighbourhood: "Bairro",
                    city: "Cidade",
                    state: "Estado",
                }
            }
        return structure;
    }

    client = () => {
        let structure = [];
        structure = {
                noedit:["email"],
                except:["id"],
                table_name: "client",
                fields_br: {
                    name: "Nome",
                    lastname: "Sobrenome",
                    cellphone: "Celular",
                    cpf: "CPF",
                    email: "E-mail",
                },
                placeholder: {
                    name: "Nome",
                    lastname: "Sobrenome",
                    cellphone: "ex: 99869-8660",
                    cpf: "999999999",
                    email: "meuemail@email.com", 
                }
            }
        return structure;
     }
}