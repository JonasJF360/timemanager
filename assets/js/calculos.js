// ## Funções para cálculos para períodos de tempo. ##
const calc = {
    somarPeriodosDeTempo(tempo01, tempo02) {
        let intervalo = [
            tempo01.split(':').map(num => parseInt(num)),
            tempo02.split(':').map(num => parseInt(num))]
    
        let horas = intervalo[0][0] + intervalo[1][0]
        let minutos = intervalo[0][1] + intervalo[1][1]
    
        while (minutos > 59) {
            horas++
            minutos -= 60
        }
    
        return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0')
    },
    
    tempoEntreInicioEFim(horaInicio, horaFim) {
        let inicio = horaInicio.split(':').map(num => parseInt(num))
        let fim = horaFim.split(':').map(num => parseInt(num))
    
        while (inicio[0] > fim[0]) {
            inicio[0] > 0 ? inicio[0]-- : inicio[0] = 23
            fim[0] > 0 ? fim[0]-- : fim[0] = 23
        }
    
        let horas = fim[0] - inicio[0]
        let minutos = fim[1] - inicio[1]
    
        if (minutos < 0) {
            horas--
            minutos += 60
        }
        return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0')
    }
}

export { calc }