/**
 * Convert HTML to DOM object
 * @param {string} html
 * @returns {DocumentFragment}
 */
export default function stringToDom(html) {
  return document.createRange().createContextualFragment(html);
}
