/**
 * Enable or disable dark theme
 * @param {boolean} enable
 */
export default function darkMode(enable) {
  if (enable) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
