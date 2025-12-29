/// <reference types= "cypress"/>

import contrato from '../contratos/produtos.contrato'
let token;
describe('Teste de API - Funcionalidade produtos', () => {
    beforeEach(() => {

        cy.token('fulano@qa.com', 'teste').then((response) =>{
            token = response
        })
    });

    it('Validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then((response) =>{
            return contrato.validateAsync(response.body)
        })
        
    });

    it('GET - Listar produtos com sucesso', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) =>{
            expect(response.status).equal(200),
            expect(response.body).exist
        })
        
    });

    it('POST - Cadastrar produto com sucesso', () => {
        let nome_rdm = 'Produto'+ Math.floor(Math.random() *100000);
        let desc_rdm = 'Descrição ' + Math.floor(Math.random() *10000);

        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body:
            {
                "nome": nome_rdm,
                "preco": 100,
                "descricao": desc_rdm,
                "quantidade": 100
            }
        }).then((response) =>{
            expect(response.status).eq(201),
            expect(response.body.message).eq("Cadastro realizado com sucesso")
        })
    });

    it('GET - Buscar produto com sucesso', () => {
        let nome_rdm = 'Produto' + Math.floor(Math.random() * 1000);
        let descr_rdm = 'Descrição ' + Math.floor(Math.random() *1000);

        cy.cadastrar_produto(token, nome_rdm, 100, descr_rdm, 100).then((response) =>{
            let id = response;

            cy.request({
                method: 'GET',
                url: `produtos/${id}`,
            }).then((response) =>{
                expect(response.status).eq(200),
                expect(response.body).exist
            })
        })
        
    });

    it('PUT - Editar produto com sucesso', () => {
        let nome_rdm = 'Produto' + Math.floor(Math.random() * 100);
        let descr_rdm = 'Descrição ' +Math.floor(Math.random() *100);

        cy.cadastrar_produto(token, nome_rdm, 100, descr_rdm, 100).then((response) =>{
            let id = response

            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {authorization: token},
                body:
                {
                    "nome": 'Editado' + Math.floor(Math.random()* 100),
                    "preco": 200,
                    "descricao": 'Editado' + Math.floor(Math.random()* 100),
                    "quantidade": 200
                }
            }).then((response) =>{
                expect(response.status).eq(200),
                expect(response.body.message).eq("Registro alterado com sucesso")
            })
        })   
    });

    it('DELETE - Excluir produto com sucesso', () => {
        let nome_rdm = 'Produto' + Math.floor(Math.random() * 100);
        let descr_rdm = 'Descrição ' +Math.floor(Math.random() *100);

        cy.cadastrar_produto(token, nome_rdm, 100, descr_rdm, 100).then((response) =>{
            let id = response

            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: {authorization: token}
            })
        }).then((response) =>{
            expect(response.status).to.eq(200),
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    });
})
