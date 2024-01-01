import { showResume } from './resume.js';
import { showDataDay } from './dataDay.js';

(function App() {
    // Adiciona ano atual no copyright
    document.getElementById('copy-year').innerHTML = new Date().getFullYear();

    startApp();

})();
function startApp() {
    showResume();
    
    const dayClicked = document.querySelectorAll('[id^="day-"]').forEach(day => {
        day.addEventListener('click', () => {
            limparTela();
            showDataDay(day.id)
        })
    })
}

function limparTela() {
    // Essa função limpa a tela ao ser chamada
    document.getElementById('time-manager').innerHTML = '';
}
