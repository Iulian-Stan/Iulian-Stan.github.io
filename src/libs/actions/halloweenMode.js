
import darkMode from './darkMode';
import stringToDom from '../stringToDom';
import img from '../../resources/images/halloween-bg.jpg';

const bgImage = stringToDom(`<img src="${img}" class="halloween-bg" alt="Halloween background" />`);

/**
 * Enable or disable Halloween theme
 * @param {boolean} enable
 */
export default function halloweenMode(enable) {
  darkMode(enable);
  if (enable) {
    document.body.classList.add('halloween');
    if (!document.body.contains(bgImage)) {
      document.body.prepend(bgImage);
    }
  } else {
    document.body.classList.remove('halloween');
    if (document.body.contains(bgImage)) {
      document.body.removeChild(document.body.firstChild);
    }
  }
}