import * as style from './Education.module.css';

export default function Education({ education }) {
  return (
    <section className="section" id="education">
      <h2 className="section-title">Education</h2>

      <div className={style.education__container}>
        {
          education.map((item, index) => (
            <div key={index} className={style.education__content}>
              <div className={style.education__time}>
                <span className={style.education__rounder}></span>
                <span className={style.education__line}></span>
              </div>

              <div className={style.education__data}>
                <h3 className={style.education__title}>{item.degree} ({item.area})</h3>
                <span className={style.education__year}>{item.years.from}-{item.years.to} | <a href={item.university.link} target='blank'>{item.university.name}</a></span>
                <ul className={style.education__studies}>
                  {item.topics.map((topic, index) => <li key={index}>{topic}</li>)}
                </ul>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}
