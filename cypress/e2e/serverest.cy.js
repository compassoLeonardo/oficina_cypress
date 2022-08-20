beforeEach('Deve logar antes de cada caso de teste', () => {
    //Acesso a página do front-end da serverest
    cy.visit('http://front.serverest.dev/login')

    //Insiro as informações de login
    cy.get("[data-testid='email']").type('fulano@qa.com')
    cy.get("[data-testid='senha']").type('teste')

    //Clico no botão de entrar
    cy.get("[data-testid='entrar']").click()

})

it('Deve acessar a lista de usuários, validar a URL e o usuário userRegistered', () => {

    var userRegistered = "Fulano da Silva"

    //Valido se o botão de listar usuários é visível e clico nele.
    cy.get("[data-testid='listar-usuarios']").should('be.visible').click()

    //Valido a nova URL
    cy.url().should('contains', '/listarusuarios')

    //Valido se a primeira posição da lista de usuários é visível e se contém a propriedade 'text'
    cy.get('.table').should('be.visible').and('have.a.property', 'text')

    //Valido se o usuário cadastrado está presente nos textos da tabela de usuários
    cy.get('.table').should('be.visible').and('contain.text', userRegistered)
})

it.only('Deve cadastrar um novo produto através do front.serverest', () => {
    cy.get('[data-testid="cadastrar-produtos"]').click()
    cy.get('[data-testid="nome"]').type("Violão Stringberg")
    cy.get('[data-testid="preco"]').type("990.00")
    cy.get('[data-testid="descricao"]').type("Violão estilo Folk Stringberg - Cordas de aço 0.11 - Elétrico/Acústico com afinador digital")
    cy.get('[data-testid="quantity"]').type(2)
    cy.get('[data-testid="cadastarProdutos"]').click()
})