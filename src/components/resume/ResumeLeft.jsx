import Home from './sections/Home';
import Links from './sections/Links';
import Profile from './sections/Profile';
import Education from './sections/Education';
import * as style from './ResumeLeft.module.css';

export default function ResumeLeft({ bio, links, profile, education, skills }) {
  return (
    <div className={style.resume__left}>
      <Home bio={bio} />
      <Links links={links} />
      <Profile profile={profile} />
      <Education education={education} />
    </div>
  );
}
