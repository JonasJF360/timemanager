// ## Funções para cálculos para períodos de tempo. ##
const calc = {
    SumTimePeriods(time01, time02) {
        const interval = [
            time01.split(':').map(num => parseInt(num)),
            time02.split(':').map(num => parseInt(num))]
    
        let hours = interval[0][0] + interval[1][0]
        let minutes = interval[0][1] + interval[1][1]
    
        while (minutes > 59) {
            hours++
            minutes -= 60
        }
    
        return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
    },
    
    timeBetweenStartAndEnd(time01, time02) {
        const startTime = time01.split(':').map(num => parseInt(num))
        const endTime = time02.split(':').map(num => parseInt(num))
    
        while (startTime[0] > endTime[0]) {
            startTime[0] > 0 ? startTime[0]-- : startTime[0] = 23
            endTime[0] > 0 ? endTime[0]-- : endTime[0] = 23
        }
    
        let hours = endTime[0] - startTime[0]
        let minutes = endTime[1] - startTime[1]
    
        if (minutes < 0) {
            hours--
            minutes += 60
        }
        return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
    }
}

export { calc }