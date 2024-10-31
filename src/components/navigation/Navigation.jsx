import * as style from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={style.nav}>
      <a href="#" className={style.nav__logo}>Iulian</a>

      <div className={style.nav__menu} id="nav-menu">
        <ul className={style.nav__list}>
          <li className={style.nav__item}>
            <a href="#home" className="nav__link active-link">
              <i className={`${style.nav__icon} bx bx-home`}></i>Home
            </a>
          </li>

          <li className={style.nav__item}>
            <a href="#profile" className={style.nav__link}>
              <i className={`${style.nav__icon} bx bx-user`}></i>Profile
            </a>
          </li>

          <li className={style.nav__item}>
            <a href="#education" className={style.nav__link}>
              <i className={`${style.nav__icon} bx bx-book`}></i>Education
            </a>
          </li>

          <li className={style.nav__item}>
            <a href="#skills" className={style.nav__link}>
              <i className={`${style.nav__icon} bx bx-receipt`}></i>Skills
            </a>
          </li>

          <li className={style.nav__item}>
            <a href="#experience" className={style.nav__link}>
              <i className={`${style.nav__icon} bx bx-briefcase-alt`}></i>Experience
            </a>
          </li>

          <li className={style.nav__item}>
            <a href="#certificates" className={style.nav__link}>
              <i className={`${style.nav__icon} bx bx-award`}></i>Certificates
            </a>
          </li>

          <li className={style.nav__item}>
            <a href="#references" className={style.nav__link}>
              <i className={`${style.nav__icon} bx bx-link-external`}></i>References
            </a>
          </li>
        </ul>
      </div>

      <div className={style.nav__toggle} id="nav-toggle">
        <i className={`${style.nav__icon} bx bx-grid-alt`}></i>
      </div>
    </nav>
  );
}
