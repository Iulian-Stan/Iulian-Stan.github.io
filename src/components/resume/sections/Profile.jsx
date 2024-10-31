import * as style from './Profile.module.css';

export default function Profile() {
  return (
    <section className='section' id='profile'>
      <h2 className='section-title'>Profile</h2>

      <p className={style.profile__description}>Hi, my name is Iulian and I am a senior software engineer. I am forever learner when it comes to latest advances in software and hardware technologies. I am keen on trying them in my own DIY projects.</p>
    </section>
  );
}
