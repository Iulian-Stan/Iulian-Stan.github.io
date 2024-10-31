import downloadCV from './actions/downloadCV';
import darkMode from './actions/darkMode';
import pif from './actions/confetti';
import firework from './actions/firework';
import halloweenMode from './actions/halloweenMode';
import christmasMode from './actions/christmasMode';

export const actionCommands = [
  {
    command: 'dark',
    description: 'Set dark theme',
    responseType: 'action',
    execute: () => {
      return darkMode(true) ? '🌒' : '🌑';
    }
  },
  {
    command: 'light',
    description: 'Set light theme',
    responseType: 'action',
    execute: () => {
      return darkMode(false) ? '🌖' : '🌕';
    }
  },
  {
    command: 'get cv',
    // TODO: uncomment when download logic is functional
    // description: 'Download CV',
    responseType: 'action',
    execute: () => {
      downloadCV();
      return '📄';
    }
  },
  {
    command: 'pif',
    responseType: 'action',
    execute: () => {
      pif();
      return '🎉';
    }
  },
  {
    command: 'hny',
    responseType: 'action',
    execute: () => {
      firework();
      return '🎆';
    }
  },
  {
    command: 'hohoho',
    responseType: 'action',
    execute: () => {
      christmasMode(true);
      return '🎅🎁';
    }
  },
  {
    command: 'boo',
    responseType: 'action',
    execute: () => {
      halloweenMode(true);
      return '🎃';
    }
  }
];
