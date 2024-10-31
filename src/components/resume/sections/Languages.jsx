import * as style from './Languages.module.css';

export default function Languages({ languages }) {
  return (
    <section className='section'>
      <h2 className='section-title'>Languages</h2>

      <div className={style.languages__container}>
        <ul className={style.languages__content}>
          {
            languages.map((language, index) => (
              <li key={index} className={style.languages__name}>
                <span className={style.languages__circle}></span> {language}
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}
