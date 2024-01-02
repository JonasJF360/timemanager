import { utils } from './utils.js';

export function showDataDay(dayId) {
    const [_, day, period] = dayId.split('-');
    utils.cameBack();
    
    const tempo01 = utils.tempoEntreInicioEFim('08:00', '12:00');
    const tempo02 = utils.tempoEntreInicioEFim('13:00', '18:00');
    
    const tempo = utils.somarPeriodosDeTempo(tempo01, tempo02);
    
    console.log(tempo01, tempo02, tempo);
}