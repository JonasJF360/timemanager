import { utils } from "./utils.js";
import { addEvent } from "./eventButton.js";
import { data } from "./data.js";
export function editList(day, period) {
    utils.limparTela();
    addEvent.toDay(day, period);

    buildEditList(day, period)

    document.querySelector('#button-add').addEventListener('click', (e) => {
        e.preventDefault()
        salvarTarefa(day, period)
    })
    document.querySelector('#list-add > textarea').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            salvarTarefa(day, period);
        }
    });
}

function salvarTarefa(day, period) {
    const tarefa = document.querySelector('#list-add > textarea').value.trim()
    if (tarefa) {
        data.setList(day, period, tarefa)
        editList(day, period)
    }
}

function buildEditList(day, period) {
    const periodAndDay = [
        ['Manhã', 'Tarde', 'Noite'],
        ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    ]

    const divPrincipal = document.createElement('div')
    divPrincipal.id = 'edit-list'

    const h2 = document.createElement('h2')
    h2.innerText = periodAndDay[1][day - 1] + ' - ' + periodAndDay[0][period - 1]

    divPrincipal.appendChild(h2)

    const divList = document.createElement('div')
    divList.id = 'edit-list-content'

    const h3 = document.createElement('h3')
    h3.innerText = 'Lista de Tarefas'
    divList.appendChild(h3)

    const divAdd = document.createElement('div')
    divAdd.id = 'list-add'
    const textarea = document.createElement('textarea')
    textarea.cols = '55'
    textarea.rows = '1'
    textarea.minLength = '0'
    textarea.maxLength = '45'
    textarea.placeholder = 'Adicionar tarefa...'
    divAdd.appendChild(textarea)

    const button = document.createElement('button')
    button.id = 'button-add'
    button.innerText = '+'
    divAdd.appendChild(button)

    divList.appendChild(divAdd)


    let dados = data.getList(day, period)

    const ul = document.createElement('ul')

    if (dados) {
        ul.innerHTML = `
            ${dados.map((item, index) => `<li id='list-item-${index}'>
                    <input type="checkbox" ${item[1] ? 'checked' : ''}>
                    <label class='label-${item[1] ? 'completed' : 'incomplete'}' >${item[0]}</label>
                    <button class='delete' id='delete-${index}' title='Excluir'>-</button>
            </li>`).join('')}
            `
    }

    divList.appendChild(ul)
    divPrincipal.appendChild(divList)
    document.querySelector('#time-manager').appendChild(divPrincipal)

    textarea.focus()
}