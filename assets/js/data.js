import { calc } from "./calculos.js"

const data = {

    startDataBase() {
        if (localStorage.getItem('dataBaseTimeManager') === null) {
            this.createDataBaseJson()
        }
    },

    createDataBaseJson() {
        const BaseDados = {}

        for (let i = 1; i <= 7; i++) {
            BaseDados[i] = {
                1: { 'lembrete': '', 'lista': [], 'hora': ['08:30', '10:15'] },
                2: { 'lembrete': '', 'lista': [], 'hora': ['12:30', '13:40'] },
                3: { 'lembrete': '', 'lista': [], 'hora': ['19:00', '22:27'] }
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
        return dataBase[day][period].lembrete
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
        return calc.tempoEntreInicioEFim(dataBase[day][period].hora[0], dataBase[day][period].hora[1])
    }

}

export { data }