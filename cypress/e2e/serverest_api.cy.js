import { faker } from '@faker-js/faker';

//let usuarioFake = () => {
//     return {
//         "nome": faker.name.fullName(),
//         "email": faker.internet.email(),
//         "password": faker.internet.password(),
//         "administrador": "true"
//     }
// }

it('Deve cadastrar um usuário inválido através da API', () => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        failOnStatusCode: false,
        body: {
            "nome": "Error Oficina",
            "email": "err_compass",
            "password": "teste_falha",
            "administrador": "true"
        },
    }).then( res => {
        expect(res.body).to.have.property('email')
        cy.log(res.body)
    })
})

it('Deve tentar logar com usuário inválido', () => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        failOnStatusCode: false,
        body: {
            "email": "err_compass@qa.com",
            "password": "teste_falha"
        }
    }).then( res => {
        expect(res.body).to.have.property('message')
        cy.log(res.body.message)
    })
})

it('Deve logar com um usuário administrador com sucesso', () => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        failOnStatusCode: true,
        body: {
            "email": "fulano@qa.com",
            "password": "teste"
        }
    }).then( res => {
        expect(res.body).to.have.property('authorization')
        let bearer = res.body.authorization
        Cypress.env('bearer', bearer)
    })
})

it('Deve realizar cadastro de produto com sucesso', () => {
    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        failOnStatusCode: true,
        headers: { 
            "Authorization": Cypress.env('bearer')
        },
        body: {
            "nome": faker.commerce.product(),
            "preco": 100,
            "descricao": faker.commerce.productDescription(),
            "quantidade": 69
          }
    }).then( res => {
        cy.log(res.body)
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('_id')
        expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
        Cypress.env('idUltimoProdutoCadastrado', res.body._id)
    })
})

it('Deve excluir o último produto cadastrado', () => {
    cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${Cypress.env('idUltimoProdutoCadastrado')}`,
        failOnStatusCode: true,
        headers: { 
            "Authorization": Cypress.env('bearer')
        },
    }).then( res => {
        cy.log(res.body)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.equal('Registro excluído com sucesso')
    })
})