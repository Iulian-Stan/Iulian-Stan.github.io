import * as style from './Home.module.css';
import img from '../../../resources/images/profile.png';

export default function Home({ bio }) {
  return (
    <section className={style.home}>
      <div className={`${style.home__container} section`}>
        <div className={`${style.home__data}`}>
          <img src={img} alt="" className={`${style.home__img}`} />

          <h1 className={`${style.home__title}`}>{bio.firstName} <b>{bio.lastName}</b></h1>
          <h3 className={`${style.home__profession}`}>{bio.occupation}</h3>

          <div>
            {/* TODO: add CV download button on big screen */}
            {/* <!-- Button to download your CV saved in the pdf folder. Available for mobile --> */}
            {/* <a download="" href="assets/pdf/REsumeCv.pdf" className={`${style['home__button-mobile']}`}>Download CV</a> */}

          </div>
        </div>
      </div>

      <div className={`${style.home__address} bd-grid`}>
        <span className={`${style.home__information}`}>
          <i className={`${style.home__icon} bx bx-calendar`}></i> {bio.birth}
        </span>
        <span className={`${style.home__information}`}>
          <i className={`${style.home__icon} bx bx-map`}></i> {bio.location.city}, {bio.location.country}
        </span>
        <span className={`${style.home__information}`}>
          <i className={`${style.home__icon} bx bxs-graduation`}></i> {bio.education}
        </span>
      </div>
      {/* TODO: add Theme change button */}
      {/* <!-- Theme change button --> */}
      {/* <i className={`${style['change-theme']} bx bx-moon`} title="Theme" id="theme-button"></i> */}

      {/* TODO: add CV download button on small screen */}
      {/* <!-- Button to generate and download the pdf. Available for desktop. --> */}
      {/* <i className={`${style['generate-pdf']} bx bx-download`} title="Generate PDF" id="resume-button"></i> */}
    </section>
  );
}
