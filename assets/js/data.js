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
        const nota = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis dolorum perspiciatis amet aspernatur, veniam libero, eos labore tempora, nesciunt mollitia quam possimus? Porro dolores eius adipisci vitae! Voluptatum, beatae ratione. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis dolorum perspiciatis amet aspernatur, veniam libero, eos labore tempora, nesciunt mollitia quam possimus? Porro dolores eius adipisci vitae! Voluptatum, beatae ratione. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis dolorum perspiciatis amet aspernatur, veniam libero, eos labore tempora, nesciunt mollitia quam possimus? Porro dolores eius adipisci vitae! Voluptatum, beatae ratione.'
        const lista = [["nota 01", true], ["nota 02", false], ["nota 03", false], ["nota 04", true], ["nota 05", false], ["nota 06", false], ["nota 07", true], ["nota 08", true]]
        // Fim do teste

        for (let i = 1; i <= 7; i++) {
            BaseDados[i] = {
                1: { 'nota': nota,                'lista': [...lista], 'hora': ['08:30', '10:15'] },
                2: { 'nota': '',                  'lista': [...lista], 'hora': ['12:30', '13:40'] },
                3: { 'nota': (i < 2 ? '' : nota), 'lista': [],         'hora': ['19:00', '22:27'] }
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
        const dataBase = this.getDataBaseJson()
        return calc.timeBetweenStartAndEnd(this.getInitialTime(day, period), this.getFinalTime(day, period))
    }

}

export { data }