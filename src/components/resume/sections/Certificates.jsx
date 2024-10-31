import * as style from './Certificates.module.css';

export default function Certificates() {
  return (
    <section className='section' id='certificates'>
      <h2 className='section-title'>Certificates</h2>

      <div className={style.certificate__container}>
        <div className={style.certificate__content}>
          <h3 className={style.certificate__title}>Certificate1 (2020)</h3>
          <p className={style.certificate__description}>Certificate1 description.</p>
        </div>

        <div className={style.certificate__content}>
          <h3 className={style.certificate__title}>Certificate2 (2021)</h3>
          <p className={style.certificate__description}>Certificate2 description.</p>
        </div>

        <div className={style.certificate__content}>
          <h3 className={style.certificate__title}>Certificate3 (2022)</h3>
          <p className={style.certificate__description}>Certificate3 description.</p>
        </div>
      </div>
    </section>
  );
}
