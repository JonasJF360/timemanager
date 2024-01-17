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