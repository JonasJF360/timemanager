import { calc } from "./calculos.js"

const data = {

    startDataBase() {
        if (localStorage.getItem('dataBaseTimeManager') === null) {
            this.createDataBaseJson()
        }
    },

    createDataBaseJson() {
        const BaseDados = {}

        // Teste: Apagar depois
        const lista = [["nota 01", true], ["nota 02", false], ["nota 03", false], ["nota 04", true], ["nota 05", false], ["nota 06", false], ["nota 07", true], ["nota 08", true]]
        // Fim do teste

        for (let i = 1; i <= 7; i++) {
            BaseDados[i] = {
                1: { 'nota': '', 'lista': [...lista], 'hora': ['08:30', '10:15'] },
                2: { 'nota': '', 'lista': [...lista], 'hora': ['12:30', '13:40'] },
                3: { 'nota': '', 'lista': [],         'hora': ['19:00', '22:27'] }
            }
        }

        const jsonData = JSON.stringify(BaseDados)
        localStorage.setItem('dataBaseTimeManager', jsonData)
    },

    getDataBaseJson() {
        return JSON.parse(localStorage.getItem('dataBaseTimeManager'))
    },

    getNote(day, period) {
        const dataBase = this.getDataBaseJson()
        return dataBase[day][period].nota
    },

    getList(day, period) {
        const dataBase = this.getDataBaseJson()
        return dataBase[day][period].lista
    },

    getInitialTime(day, period) {
        const dataBase = this.getDataBaseJson()
        return dataBase[day][period].hora[0]
    },

    getFinalTime(day, period) {
        const dataBase = this.getDataBaseJson()
        return dataBase[day][period].hora[1]
    },

    getTotalHoursPeriod(day, period) {
        return calc.timeBetweenStartAndEnd(this.getInitialTime(day, period), this.getFinalTime(day, period))
    },

    setNote(day, period, note) {
        const dataBase = this.getDataBaseJson()
        dataBase[day][period].nota = note
        localStorage.clear('dataBaseTimeManager')
        localStorage.setItem('dataBaseTimeManager', JSON.stringify(dataBase))   
    },

    setList(day, period, newToDo) {
        const dataBase = this.getDataBaseJson()
        if (dataBase[day][period].lista.length >= 50) {
            return            
        }
        dataBase[day][period].lista.push([newToDo, false])
        localStorage.clear('dataBaseTimeManager')
        localStorage.setItem('dataBaseTimeManager', JSON.stringify(dataBase))   
    }

}

export { data }