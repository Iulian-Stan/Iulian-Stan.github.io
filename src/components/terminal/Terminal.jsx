import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { useEventContext } from '../../libs/eventContext';
import darkMode from '../../libs/actions/darkMode';
import * as style from './Terminal.module.css';

const test = ` ______     __    __     ______   ______     ______     __    __     __     __   __     ______     __
\/\\  ___\\   \/\\ \\  \/ \/    \/\\__  _\\ \/\\  ___\\   \/\\  == \\   \/\\ '-.\/  \\   \/\\ \\   \/\\ '-.\\ \\   \/\\  __ \\   \/\\ \\
\\ \\ \\____  \\ \\ \\' \/     \\\/_\/\\ \\\/ \\ \\  __\\   \\ \\  __<   \\ \\ \\-.\/\\ \\  \\ \\ \\  \\ \\ \\-.  \\  \\ \\  __ \\  \\ \\ \\____
 \\ \\_____\\  \\ \\__\/         \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\ \\ \\_\\  \\ \\_\\  \\ \\_\\\\'\\_\\  \\ \\_\\ \\_\\  \\ \\_____\\
  \\\/_____\/   \\\/_\/           \\\/_\/   \\\/_____\/   \\\/_\/\\\/_\/   \\\/_\/  \\\/_\/   \\\/_\/   \\\/_\/ \\\/_\/   \\\/_\/\\\/_\/   \\\/_____\/`;

export default function Terminal({ commands, actionCommands, windowID }) {

  const terminalCliRef = useRef();
  const eventEmitter = useEventContext();

  eventEmitter.on('mousedown', id => {
    if (id === windowID) {
      terminalCliRef.current.lastChild.previousSibling.firstChild.focus();
    }
  });

  useEffect(() => {
    if (!Array.isArray(commands))
      commands = [];
    if (!Array.isArray(actionCommands))
      actionCommands = [];

    // add action commands
    commands.push(...actionCommands.filter(c => c.description));
    commands.push({
      command: 'clear',
      description: 'Clear terminal',
      responseType: 'action',
      execute: () => {
        terminalCliRef.current.replaceChildren();
        addNewLine();
      }
    });
    commands.push({
      command: 'exit',
      description: 'Close terminal',
      responseType: 'action',
      execute: () => {
        eventEmitter.emit('windowclose', windowID);
      }
    });
    commands.push({
      command: 'rm -rf /',
      responseType: 'action',
      execute: () => {
        darkMode(true);
        eventEmitter.emit('closeall');
      }
    });
    commands.push({
      command: 'help',
      responseType: 'list',
      value: commands.map(c => `<code>${c.command}</code> : ${c.description}`)
        .concat([
          '<em>You can use the TAB key to complete a command</em>',
          '<em>You can find old commands with the up and down arrows.</em>'
        ])
    });

    // Table containing the orders (useful for the completion of the orders)
    let commandsList = [];
    commands.forEach((c) => {
      commandsList.push(c.command);
    });

    // add hidden action commands
    commands.push(...actionCommands.filter(c => !c.description));

    // Order history table
    const commandsHistory = [];
    let historyMode = false;
    let historyIndex = -1;

    // Suggestions
    let commandSuggestions = [];
    let suggestionIndex = 0;

    /**
     * Returns the HTML of the response for a given command
     * @param {string} command
     */
    function getDomForCommand(command) {
      const commandObj = commands.find((el) => el.command === command);
      let purifiedCommand = DOMPurify.sanitize(command);
      purifiedCommand = purifiedCommand.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      let html = '';
      if (commandObj === undefined) {
        html = `'${purifiedCommand.split(' ')[0]}' is not recognized as an internal command or external command, operable program or batch file.  Type the <code>help</code> command to display a list of available commands.`;
      } else {
        if (commandObj.responseType === 'list' && Array.isArray(commandObj.value)) {
          html = '<ul>';
          html += commandObj.value.map((s) => `<li>${s}</li>`).join('');
          html += '</ul>';
        } else if (commandObj.responseType === 'text') {
          html = commandObj.value;
        } else if (commandObj.responseType === 'table') {
          const headers = commandObj.headers;
          const rows = commandObj.rows;
          const thsHtml = headers.map((h) => `<th>${h}</th>`).join('');
          const tdsHtml = rows
            .map((r) => `<tr>${r.map((rtd) => `<td>${rtd}</td>`).join('')}</tr>`)
            .join('');
          html = `<table><thead><tr>${thsHtml}</tr></thead><tbody>${tdsHtml}</tbody></table>`;
        } else if (commandObj.responseType === 'code') {
          html = `<pre>${commandObj.value.join('\n')}</pre>`;
        } else if (commandObj.responseType === 'action')
          html = commandObj.execute();
      }

      return html;
    }

    /**
     * Adds a new command input line and disables the previous one.
     * @param {HTMLElement} previousInputEl previous input element
     */
    function addNewLine(previousInputEl) {
      // terminal__line
      const terminalLineEl = document.createElement('div');
      terminalLineEl.classList.add(style.terminal__line);

      // terminal__response
      const terminalResponseEl = document.createElement('div');
      terminalResponseEl.classList.add(style.terminal__response);

      // input text
      const inputEl = document.createElement('input');
      inputEl.type = 'text';
      inputEl.autocapitalize = 'off';
      inputEl.dataset.active = '1'; // Needed for focus
      inputEl.addEventListener('keydown', onCommandInput);

      terminalLineEl.appendChild(inputEl);
      if (previousInputEl) {
        previousInputEl.setAttribute('disabled', 'true');
        previousInputEl.removeEventListener('keydown', onCommandInput);
        delete previousInputEl.dataset.active;
      }
      terminalCliRef.current.appendChild(terminalLineEl);
      terminalCliRef.current.appendChild(terminalResponseEl);

      inputEl.focus(); // Adds the focus as soon as the field is created
    }

    /**
     * Manages the keydown on the command input.
     * @param e
     */
    function onCommandInput(e) {
      const commandValue = e.target.value.trim().toLowerCase();
      if (e.keyCode != 9) {
        commandSuggestions = [];
      }
      switch (e.keyCode) {
        case 9: // TAB
          e.preventDefault();
          if (commandValue === '') {
            this.value = 'help';
          } else {
            if (commandSuggestions.length === 0) {
              commandSuggestions = commandsList.filter((c) =>
                c.startsWith(commandValue)
              );
              suggestionIndex = 0;
            }
            if (commandSuggestions.length > 0) {
              this.value = commandSuggestions[suggestionIndex];
              suggestionIndex = (suggestionIndex + 1) % commandSuggestions.length;
            }
          }
          historyMode = false;
          break;
        case 13: // ENTER
          if (commandValue !== '') {
            historyMode = false;
            let html = getDomForCommand(commandValue);
            const responseEl = e.target.parentNode.nextSibling;
            if (responseEl) {
              responseEl.innerHTML = html;
              commandsHistory.push(commandValue);
              addNewLine(e.target);
            }
          }
          break;
        case 38: // UP
        case 40: // DOWN
          // History management
          e.preventDefault();
          if (commandsHistory.length > 0) {
            if (historyMode === false) {
              historyIndex = commandsHistory.length - 1;
            } else {
              if (e.keyCode === 38 && historyIndex !== 0) {
                // UP
                historyIndex--;
              } else if (e.keyCode === 40 && historyIndex !== commandsHistory.length - 1) {
                // DOWN
                historyIndex++;
              }
            }
            this.value = commandsHistory[historyIndex];
          }
          historyMode = true;
          break;
      }
    }

    // Adding the default line
    addNewLine();
  }, []);

  return (
    <div className={style.terminal__body}>
      <div className={style.terminal__banner}><pre>{test}</pre>
        <div className={style.terminal__author}>Iulian STAN</div>
        <p>Welcome to my CV! To view the available commands type <code>help</code>. To validate each command press <em>Enter</em>, you can use the <em>Tab</em> key to help you complete a command.</p>
      </div>
      <div ref={terminalCliRef}></div>
    </div>
  );
}
