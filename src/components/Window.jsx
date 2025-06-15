import { useCallback, useEffect, useRef } from 'react';
import { useEventContext } from '../libs/eventContext';
import { dragElement } from '../libs/draggable';
import * as style from './Window.module.css';

export default function Window({ children, id }) {

  const windowRef = useRef();
  const eventEmitter = useEventContext();
  let lastRect = undefined;
  let maximize = true;

  const activateWindow = useCallback(e => {
    if (!windowRef || !windowRef.current) return;
    if (id === e) {
      windowRef.current.classList.add(style['window--active']);
    } else {
      windowRef.current.classList.remove(style['window--active']);
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    eventEmitter.emit('mousedown', id);
  }, []);

  const handleResize = useCallback(() => {
    windowRef.current.lastChild.classList.remove('mobile', 'tablet');
    let rect = windowRef.current.getBoundingClientRect();
    if (rect.width <= 380) {
      windowRef.current.lastChild.classList.add('mobile');
    } else if (rect.width <= 768) {
      windowRef.current.lastChild.classList.add('tablet');
    }
  }, []);

  const handleClose = useCallback(() => {
    eventEmitter.emit('windowclose', id);
  }, []);

  const handleMaximize = useCallback(() => {
    if (!maximize) return;
    lastRect = windowRef.current.getBoundingClientRect();
    windowRef.current.style.top = 0;
    windowRef.current.style.left = 0;
    windowRef.current.style.height = window.innerHeight + 'px';
    windowRef.current.style.width = window.innerWidth + 'px';
    maximize = !maximize;
  }, []);

  const handleMinimize = useCallback(() => {
    if (maximize) return;
    windowRef.current.style.top = lastRect.top + 'px';
    windowRef.current.style.left = lastRect.left + 'px';
    windowRef.current.style.height = lastRect.height + 'px';
    windowRef.current.style.width = lastRect.width + 'px';
    maximize = !maximize;
  }, []);

  useEffect(() => {
    if (!windowRef) {
      return;
    }

    const dragElementClean = dragElement(windowRef.current);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(windowRef.current);
    eventEmitter.on('windowactivate', activateWindow);

    return () => {
      eventEmitter.off('windowactivate', activateWindow);
      resizeObserver.disconnect();
      dragElementClean();
    };
  }, [windowRef]);

  return (
    <div className={style.window} ref={windowRef} onMouseDown={handleMouseDown}>
      <div className={style.window__header}>
        <div className={`${style['fake-button']} ${style['fake-button--close']}`} onClick={handleClose}></div>
        <div className={`${style['fake-button']} ${style['fake-button--minimize']}`} onClick={handleMinimize}></div>
        <div className={`${style['fake-button']} ${style['fake-button--zoom']}`} onClick={handleMaximize}></div>
      </div>
      <div className={style.window__body}>
        {children}
      </div>
    </div>
  );
}
