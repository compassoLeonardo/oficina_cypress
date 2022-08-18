//import { faker } from '@faker-js/faker';

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