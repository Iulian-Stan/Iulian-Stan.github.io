import * as style from './References.module.css';

export default function References() {
  return (
    <section className='section' id='references'>
      <h2 className='section-title'>References</h2>

      <div className={style.references__container}>
        <div className={style.references__content}>
          <span className={style.references__subtitle}>Sr. DIrector</span>
          <h3 className={style.references__title}>Mr. Clay Doe</h3>
          <ul className={style.references__contact}>
            <li>Phone: 999-777-666</li>
            <li>Email: user@mail.com</li>
          </ul>
        </div>

        <div className={style.references__container}>
          <div className={style.references__content}>
            <span className={style.references__subtitle}>Sr. DIrector</span>
            <h3 className={style.references__title}>Mr. Clay Doe</h3>
            <ul className={style.references__contact}>
              <li>Phone: 999-777-666</li>
              <li>Email: user@mail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
