import Experience from './sections/Experience';
// import Certificates from './sections/Certificates';
import Skills from './sections/Skills';
import Languages from './sections/Languages';
import Interests from './sections/Interests';
import * as style from './ResumeRight.module.css';

export default function ResumeRight({ experience, skills, languages, interests }) {
  return (
    <div className={style.resume__right}>
      <Experience experience={experience} />
      {/* <Certificates /> */}
      <Skills skills={skills} />
      <Languages languages={languages} />
      <Interests interests={interests} />
    </div>
  );
}
