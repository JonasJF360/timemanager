import { utils } from "./utils.js";
import { addEvent } from "./eventButton.js";
import { data } from "./data.js";
export function editNote(day, period) {
    utils.limparTela();
    addEvent.toDay(day, period);

    buildEditNote(day, period)

    document.querySelector('#aplicar').addEventListener('click', (e) => {
        e.preventDefault()
        aplicarAlteracoes(day, period)
        addEvent.toDayAfterSave(day, period)
    })
}

function buildEditNote(day, period) {
    const periodAndDay = [
        ['Manhã', 'Tarde', 'Noite'],
        ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    ]

    const divPrincipal = document.createElement('div')
    divPrincipal.id = 'edit-note'

    const h2 = document.createElement('h2')
    h2.innerText = periodAndDay[1][day - 1] + ' - ' + periodAndDay[0][period - 1]

    divPrincipal.appendChild(h2)

    const divNote = document.createElement('div')
    divNote.id = 'edit-note-text'

    const h3 = document.createElement('h3')
    h3.innerText = 'Anotação'

    divNote.appendChild(h3)

    let dados = data.getNote(day, period)
    if (!dados) {
        console.log(dados)
        dados = ''
    }

    const textarea = document.createElement('textarea')
    textarea.id = 'conteudo'
    textarea.cols = '55'
    textarea.rows = '12'
    textarea.minLength = '0'
    textarea.maxLength = '1000'
    textarea.placeholder = 'Escreva sua anotação aqui...'
    textarea.value = dados
        .replaceAll('<br>', '\n')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&amp;', '&')

    divNote.appendChild(textarea)

    const button = document.createElement('button')
    button.id = 'aplicar'
    button.innerText = 'Aplicar'

    divNote.appendChild(button)

    divPrincipal.appendChild(divNote)

    document.querySelector('#time-manager').appendChild(divPrincipal)
}

function aplicarAlteracoes(day, period) {
    let conteudoEditor = document.querySelector('#conteudo').value
        .replace(/[<>&]/g, function (match) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;'
            }[match];
        }).replaceAll('\n', '<br>').trim()

    // if (!conteudoEditor.trim()) {
    //     conteudoEditor = ''
    // }

    data.setNote(day, period, conteudoEditor)
}