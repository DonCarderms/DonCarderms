function calculadora(termo) {
    let visor = document.getElementById('visor')

    if (parseInt(termo) || termo == "0" && parseFloat(visor.value) != 0) {
        visor.value += termo
    } else if (termo == "ponto" && visor.value.split(' ').slice(-1)[0].indexOf(".") == -1) {
        if (visor.value == "")
            visor.value += "0."
        else
            visor.value += "."
    } else if (termo == "limpar") {
        visor.value = ""
        document.getElementById('calculo').value = ""
    } else if (termo == "resultado") {
        visor.value = calcular(visor.value)
    } else if (termo == "menos") {
        if (visor.value == "" || visor.value.slice(-1) == " ")
            visor.value += "-"
        else if (parseInt(visor.value.slice(-1)))
            visor.value += " - "
    } else if (termo == "mais") {
        if (visor.value == "" || visor.value.slice(-1) == " ")
            visor.value += "+"
        else if (parseInt(visor.value.slice(-1)))
            visor.value += " + "
    } else if (termo == "multiplicar" && parseInt(visor.value.slice(-1))) {
        visor.value += " x "
    } else if (termo == "dividir" && parseInt(visor.value.slice(-1))) {
        visor.value += " / "
    }
}

function calcular(expressao) {
    document.getElementById("calculo").value = expressao;
    //ao adicionar operadores, adicionamos espaço. Portanto, se o ultimo caractere da
    //expressao for espaço, quer dizer que há operador na última parte da expressao e, portanto,
    //não pode ser calculado
    if (expressao.slice(-1) == " " || expressao.length == 1)
        return expressao
    expressao = expressao.split(' ')

    SEMOP = 999999 //Número grande para representar que não há determinada operação na conta. Não pode ser
    //pequeno pois a ordem de cálculo se dará pelo índice da operação que aparece primeiro

    while ((expressao.indexOf("x") != -1 || expressao.indexOf("/") != -1)) {
        let indiceOpDiv = expressao.indexOf("/") == -1 ? SEMOP : expressao.indexOf("/")
        let indiceOpMul = expressao.indexOf("x") == -1 ? SEMOP : expressao.indexOf("x")
        let indiceOp = -1

        if (indiceOpDiv < indiceOpMul && indiceOpDiv != SEMOP) {
            indiceOp = indiceOpDiv
            expressao[indiceOp - 1] = parseFloat(expressao[indiceOp - 1]) / parseFloat(expressao[indiceOp + 1])
        } else if (indiceOpMul != SEMOP) {
            indiceOp = indiceOpMul
            expressao[indiceOp - 1] = parseFloat(expressao[indiceOp - 1]) * parseFloat(expressao[indiceOp + 1])
        }

        expressao.splice(indiceOp, 2)
    }

    while ((expressao.indexOf("+") != -1 || expressao.indexOf("-") != -1)) {
        let indiceOpAd = expressao.indexOf("+") == -1 ? SEMOP : expressao.indexOf("+")
        let indiceOpSub = expressao.indexOf("-") == -1 ? SEMOP : expressao.indexOf("-")
        let indiceOp = -1
        if (indiceOpAd == 0 || indiceOpSub == 0) {
            expressao.unshift(0)
            indiceOp++
        }
        if (indiceOpAd < indiceOpSub && indiceOpAd != SEMOP) {
            indiceOp = indiceOpAd
            expressao[indiceOp - 1] = parseFloat(expressao[indiceOp - 1]) + parseFloat(expressao[indiceOp + 1])
        } else if (indiceOpSub != SEMOP) {
            indiceOp = indiceOpSub
            expressao[indiceOp - 1] = parseFloat(expressao[indiceOp - 1]) - parseFloat(expressao[indiceOp + 1])
        }
        expressao.splice(indiceOp, 2)
    }

    return expressao[0]

}