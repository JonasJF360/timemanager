import { showResume } from './resume.js';
import { showDataDay } from './dataDay.js';
import { data } from './data.js';

const utils = {
    limparTela() {
        document.getElementById('time-manager').innerHTML = '';
    },

    changeImage(img, title) {
        const imagem = document.querySelector('#menu-acoes')
        imagem.innerHTML = '';

        const imgElement = document.createElement('img')
        imgElement.src = `./assets/img/${img}.svg`;
        imgElement.alt = title;
        imgElement.title = title;

        imagem.appendChild(imgElement)
    },

    breakBigWords(texto) {
        let palavras = texto.split(' ');

        function reduzir(palavra, tamanho) {
            const partes = [];
            for (let i = 0; i < palavra.length; i += tamanho) {
                partes.push(palavra.substr(i, tamanho));
            }
            return partes.join('<wbr>');
        }

        palavras = palavras.map((palavra) => {
            if (palavra.length >= 20) {
                palavra = reduzir(palavra, 7);
            } else if (palavra.length >= 15) {
                palavra = reduzir(palavra, 6);
            } else if (palavra.length >= 10) {
                palavra = reduzir(palavra, 5);
            }
            return palavra;
        });

        return palavras.join(' ');
    },

    calculateHours() {
        data.startDataBase()
        showResume()

        document.querySelectorAll('[id^="day-"]').forEach(day => {
            day.addEventListener('click', (e) => {
                e.preventDefault();
                showDataDay(day.id)
            })
        })

    }
}

export { utils }