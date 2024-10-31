import * as style from './Interests.module.css';

export default function Interests({ interests }) {
  return (
    <section className="section">
      <h2 className="section-title">Interests</h2>

      <div className={style.interests__container}>
        {
          interests.map((interest, index) => (
            <div key={index} className={style.interests__content}>
              <i className={`${style.interests__icon} ${interest.boxicon}`}></i>
              <span className={style.interests__name}>{interest.name}</span>
            </div>
          ))
        }
      </div>
    </section>
  );
}
