/// <reference types= "cypress"/>

describe('Teste API - Funcionalidade usuário', () => {
    
    let token;
    beforeEach(() => {

        cy.token('fulano@qa.com', 'teste').then(tkn =>{
            token = tkn
        })

    });

    it('GET - Listar usuários com sucesso ', () => {
        cy.request({
            method: "GET",
            url: "usuarios",
            })
            .should((resp =>{
            expect(resp.status).to.eq(200)
        }))
    });

    it('POST - Cadastrar usuários com sucesso', () => {
        
       let nome_rdm = 'Usuário' + Math.floor(Math.random() * 10000)
       let email_rdm = 'Email'+Math.floor(Math.random() * 1000)+'@teste.com' 

        cy.cadastrar_usuario(nome_rdm, email_rdm, 'teste', 'true')
            .then((resp) =>{
            cy.log(resp.body._id)
            expect(resp.status).to.eq(201),
            expect(resp.body.message).to.eq('Cadastro realizado com sucesso')
            })
    });

    it('GET - Buscar usuário com sucesso', () => {
       let nome_rdm = 'Usuário' + Math.floor(Math.random() * 10000)
       let email_rdm = 'Email'+Math.floor(Math.random() * 1000)+'@teste.com' 
        cy.cadastrar_usuario(nome_rdm, email_rdm, 'teste', 'true').then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'GET',
                url: `usuarios/${id}`,
            })
                .then((response) =>{
                    expect(response.status).equal(200),
                    expect(response.body).exist
            })
       })
                
    });

    it('DELETE - Excluir usuário com sucesso', () => {
       let nome_rdm = 'Usuário' + Math.floor(Math.random() * 10000)
       let email_rdm = 'Email'+Math.floor(Math.random() * 1000)+'@teste.com' 

        cy.cadastrar_usuario(nome_rdm, email_rdm, 'teste', 'true').then((response) =>{
            let id = response.body._id;

            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
            }).then((response) =>{
                expect(response.status).equal(200),
                expect(response.body.message).equal('Registro excluído com sucesso')
            })
        })
        
    });

    it.only('PUT - Editar usuário com sucesso', () => {
        let nome_rdm = 'Usuário'+ Math.floor(Math.random() * 1000);
        let email_rdm = 'Email' + Math.floor(Math.random() * 10000)+'@qa.com';

        cy.cadastrar_usuario(nome_rdm, email_rdm, 'teste', 'true').then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                body:
                {
                    "nome": 'Editado'+Math.floor(Math.random()*100),
                    "email": 'Email_editado'+Math.floor(Math.random() * 100)+'@qa.com',
                    "password": 'teste',
                    "administrador": 'false'
                }
            }).then((response) =>{
                expect(response.status).equal(200),
                expect(response.body).exist
            })
        })
    });
});