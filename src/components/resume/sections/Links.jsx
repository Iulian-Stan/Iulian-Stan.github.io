import * as style from './Links.module.css';

export default function Links({ links }) {
  return (
    <section className='section'>
      <h2 className='section-title'>Links</h2>

      <div className={style.link__container}>
        <a href={links.linkedin} target='_blank' className={style.link__link}>
          <i className={`${style.link__icon} bx bxl-linkedin-square`}></i> Network
        </a>
        <a href={links.github} target='_blank' className={style.link__link}>
          <i className={`${style.link__icon} bx bxl-github`}></i> Repositories
        </a>
        <a href={links.gmail} target='_blank' className={style.link__link}>
          <i className={`${style.link__icon} bx bxl-gmail`}></i> Email
        </a>
      </div>
    </section>
  );
}
