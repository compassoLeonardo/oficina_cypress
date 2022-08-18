let parOuImpar = (valor) => {
    if(valor % 2 === 0){
        return "Par"
    } else {
        return "Impar"
    }
}

it("Deve validar a função parOuImpar para ambos os valores", () => {
    expect(parOuImpar(2)).to.be.equal("Par")
    expect(parOuImpar(3)).to.be.equal("Impar")
    expect(parOuImpar(-2)).to.be.equal("Par")
    expect(parOuImpar(-3)).to.be.equal("Impar")
})


