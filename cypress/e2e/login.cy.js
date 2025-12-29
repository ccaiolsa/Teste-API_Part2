/// <reference types= "cypress"/>

describe('Testes de API - Cenário positivo', () => {
  it('Realizar login com sucesso', () => {
    cy.request({
      method: "POST",
      url: "login",
      body: 
      {
        "email": "fulano@qa.com",
        "password": "teste"
      }

    }).should((response =>{
      expect(response.status).to.eq(200),
      expect(response.body.message).to.eq('Login realizado com sucesso')
    }))
  });

  it('Listar usuários Cadastrados com sucesso', () => {
    cy.request({
      method: "GET",
      url: "usuarios",
    }).should((resp =>{
      expect(resp.status).to.eq(200)
    }))
  });

  it('Cadastrar usuário com sucesso', () => {
    var variavel = body.usuarios.length()+1
    cy.request({
      method: "POST",
      url: "usuarios",
      body: 
      {
        "nome": "Caio Lucas v2",
        "email": `caio_teste${variavel}@qa.com.br`,
        "password": "teste",
        "administrador": "true"
      }
    }).should((resp) =>{
      expect(resp.status).to.eq(201),
      expect(resp.body.message).to.eq('Cadastro realizado com sucesso')
    })
  });
})