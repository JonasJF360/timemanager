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
                1: { 'nota': '', 'lista': [], 'hora': ['00:00', '00:00'] },
                2: { 'nota': '', 'lista': [], 'hora': ['00:00', '00:00'] },
                3: { 'nota': '', 'lista': [], 'hora': ['00:00', '00:00'] }
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

    setInitialTime(day, period, time) {
        const dataBase = this.getDataBaseJson()
        dataBase[day][period].hora[0] = time
        save(dataBase)
    },

    setFinalTime(day, period, time) {
        const dataBase = this.getDataBaseJson()
        dataBase[day][period].hora[1] = time
        save(dataBase)
    },

    setNote(day, period, note) {
        const dataBase = this.getDataBaseJson()
        dataBase[day][period].nota = note
        save(dataBase)
    },

    setList(day, period, newToDo) {
        const dataBase = this.getDataBaseJson()
        if (dataBase[day][period].lista.length >= 50) {
            alert('Limite de tarefas atingido!')
            return
        }
        dataBase[day][period].lista.push([newToDo, false])
        dataBase[day][period].lista = dataBase[day][period].lista.sort(compararSublistas)
        save(dataBase)
    },

    updateStatusList(day, period, index) {
        const dataBase = this.getDataBaseJson()
        dataBase[day][period].lista[index][1] = !dataBase[day][period].lista[index][1]
        dataBase[day][period].lista = dataBase[day][period].lista.sort(compararSublistas)
        save(dataBase)
    },

    deleteItemList(day, period, index) {
        const dataBase = this.getDataBaseJson()
        dataBase[day][period].lista.splice(index, 1)
        save(dataBase)
    }

}

function save(data) {
    localStorage.clear('dataBaseTimeManager')
    localStorage.setItem('dataBaseTimeManager', JSON.stringify(data))
}

function compararSublistas(sublistaA, sublistaB) {
    // Coloca as sub-listas com 'false' antes das sub-listas com 'true'
    return sublistaA[1] - sublistaB[1];
}

export { data }