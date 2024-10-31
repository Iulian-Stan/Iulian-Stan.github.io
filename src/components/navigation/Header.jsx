import Navigation from './Navigation';
import * as style from './Header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <Navigation />
    </header>
  );
}
