import * as style from './Experience.module.css';

export default function Experience({ experience }) {
  return (
    <section className="section" id="experience">
      <h2 className="section-title">Experience</h2>
      {
        experience.map((item, index) => (
          <div key={index} className={style.experience__content}>
            <div className={style.experience__time}>
              <span className={style.experience__rounder}></span>
              <span className={style.experience__line}></span>
            </div>

            <div className={style.experience__data}>
              <h3 className={style.experience__title}>{item.roles.join(' / ')}</h3>
              <span className={style.experience__company}>{item.years.from}-{item.years.to} | <a href={item.company.link} target='blank'>{item.company.name}</a></span>
              <ul className={style.experience__description}>
                {item.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
              </ul>
            </div>
          </div>
        ))
      }
    </section>
  );
}
