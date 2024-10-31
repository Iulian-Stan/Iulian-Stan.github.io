import * as style from './Skills.module.css';

export default function Skills({ skills }) {
  return (
    <section className='section' id='skills'>
      <h2 className='section-title'>Skills</h2>

      <div className={style.skills__content}>
        <ul className={style.skills__data}>
          {
            skills.map((skill, index) => (
              <li key={index} className={style.skills__name}>
                <span className={style.skills__circle}></span> {skill}
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}
