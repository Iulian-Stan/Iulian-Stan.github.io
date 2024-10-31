import ResumeLeft from './ResumeLeft';
import ResumeRight from './ResumeRight';
import * as style from './Resume.module.css';

export default function Resume({ data }) {
  return (
    <main className={style.resume}>
      <ResumeLeft bio={data.bio} links={data.links} profile={''} education={data.education} />
      <ResumeRight experience={data.experience} skills={data.skills} languages={data.languages} interests={data.interests} />
    </main>
  );
}
