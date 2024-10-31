import { useCallback, useEffect, useMemo, useState } from 'react';
import { actionCommands } from '../libs/actionCommands';
import { staticCommands } from '../libs/staticCommands';
import { useEventContext } from '../libs/eventContext';
import Window from './Window';
import Resume from './resume/Resume';
import Terminal from './terminal/Terminal';

const WindowContent = {
  resume: 'resume',
  terminal: 'terminal'
}

export default function WindowManager({ data }) {

  const commands = useMemo(() => staticCommands(data), [data]);
  const eventEmitter = useEventContext();

  const createWindow = useCallback(content => {
    let key = Date.now().toString();
    eventEmitter.emit('windowactivate', key);
    switch (content) {
      case WindowContent.resume:
        return <Window key={key} id={key}><Resume data={data}/></Window>;
      case WindowContent.terminal:
        return <Window key={key} id={key}><Terminal commands={commands} actionCommands={customCommands} windowID={key}/></Window>;
    }
  }, []);

  const removeWindow = useCallback(key => {
    setWindows(prevState => prevState.filter(window => window.key !== key));
  }, []);

  const removeAll = useCallback(() => {
    setWindows([]);
  }, []);

  const customCommands = useMemo(() => [...actionCommands,
    {
      command: 'show cv',
      description: 'Shows the readable version of the CV',
      responseType: 'action',
      execute: () => {
        setWindows(prevState => [...prevState, createWindow(WindowContent.resume)]);
        return '';
      }
    }, {
      command: 'new terminal',
      description: 'Open a new terminal',
      responseType: 'action',
      execute: () => {
        setWindows(prevState => [...prevState, createWindow(WindowContent.terminal)]);
        return '';
      }
    }
  ], []);

  const [windows, setWindows] = useState([createWindow(WindowContent.terminal)]);

  const handleMouseDown = useCallback(id => {
    eventEmitter.emit('windowactivate', id);
  }, []);

  useEffect(() => {
    eventEmitter.on('mousedown', handleMouseDown);
    eventEmitter.on('windowclose', removeWindow);
    eventEmitter.on('closeall', removeAll);
    return () => {
      eventEmitter.off('closeall', removeAll);
      eventEmitter.off('windowclose', removeWindow);
      eventEmitter.off('mousedown', handleMouseDown);
    }
  }, []);

  return windows;
}
