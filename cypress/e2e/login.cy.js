/// <reference types= "cypress"/>

describe('Testes de API - Cenário positivo', () => {
  it('Realizar login com sucesso', () => {
    cy.request({
      method: "POST",
      url: "login",
      body: 
      {
        "email": 'fulano@qa.com',
        "password": 'teste'
      }
    })
    .should((response =>{
      expect(response.status).to.eq(200),
      expect(response.body.message).to.eq('Login realizado com sucesso')
    }))
  })
})