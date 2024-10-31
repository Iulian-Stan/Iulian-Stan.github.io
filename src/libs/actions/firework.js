import Fireworks from 'fireworks-js';
import darkMode from './darkMode';

/**
 * Fires fireworks
 */
export default function firework() {
  if (!document.body.classList.contains('firework')) {
    document.body.classList.add('firework');
    darkMode(true);
    const fireworks = new Fireworks(document.body, {
      mouse: { click: true, move: false, max: 7 },
    });
    fireworks.start();
  }
}