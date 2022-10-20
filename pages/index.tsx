import { faTwitter, faYCombinator } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Image from 'next/image';

import Experience from '../components/resume/Experience';
import NewsRow from '../components/resume/NewsRow';
import PrintBtn from '../components/resume/PrintBtn';
import Skills from '../components/resume/Skills';
import Technologies from '../components/resume/Technologies';
import EXPERIENCE from '../constants/EXPERIENCE';
import fetchTweetsAsNews from '../helpers/fetchTweetsAsNews';
import fetchYcomBestStoriesAsNews from '../helpers/fetchYcomBestStoriesAsNews';
import meJpg from '../public/me.jpg';
import wrapper from '../store';
import { setNews } from '../store/slices/news';
import styles from './index.module.scss';

const Index: NextPage = () => (
  <>
    <PrintBtn />
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <NewsRow id="tweets" label="Recent tweets about web development"
                 preSubtitle={<FontAwesomeIcon icon={faTwitter} color="#00acee" />} />
        <div className={styles.profile}>
          <div className={styles.profilePhoto}>
            <Image src={meJpg} alt="Selfie" />
          </div>
          <div className={styles.profileContent}>
            <h2>German Meza</h2>
            <div>@México, 12/04/1995</div>
            <div>I love to code, develop complex algorithms, travel and take amateur photos <a
              href="https://www.instagram.com/germanamz/">(feel free to look my Instagram page :D)</a></div>
            <p>- Time makes things exponential -</p>
            <div>Email: <a href="mailto:iam@germanamz.com" className="link" target="_blank"
                           rel="noreferrer">iam@germanamz.com</a></div>
            <div>Phone: <a href="tel:+523338084446" className="link" target="_blank" rel="noreferrer">+52 33 3808
              4446</a></div>
            <div>Website: <a href="https://germanamz.com" className="link" target="_blank"
                             rel="noreferrer">germanamz.com</a></div>
            <div>In: <a href="https://www.linkedin.com/in/germanamz/" className="link text-[0.65rem]" target="_blank"
                        rel="noreferrer">https://www.linkedin.com/in/germanamz/</a></div>
            <div>Twitter: <a href="https://twitter.com/GermanAMz" className="link" target="_blank"
                             rel="noreferrer">@germanamz</a></div>
            <div>Github: <a href="https://github.com/germanamz" className="link" target="_blank"
                            rel="noreferrer">@germanamz</a></div>
            <div>Skype: live:iam_1135</div>
            <div>Instragram: <a href="https://www.instagram.com/germanamz/" className="link" target="_blank"
                                rel="noreferrer">@germanamz</a></div>
            <div className="w-full my-2 border-b border-solid" />
            <div className="flex flex-row gap-2">
              <div>
                <FontAwesomeIcon icon={faGraduationCap} size="1x" />
              </div>
              <div>
                <div className="font-bold">Education</div>
                <div>Computer Information Technologist</div>
                <div className="font-thin">2012-2016 | Centro de Enseñanza Tecnica Industrial (CETI)</div>
              </div>
            </div>
          </div>
          <Skills />
        </div>
        <Technologies />
        <Experience items={EXPERIENCE} />
        <NewsRow id="ycomBestNews" label="Recent Ycombinator hacker news"
                 preSubtitle={<FontAwesomeIcon icon={faYCombinator} color="#f26625" />} />
      </div>
    </div>
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  const news = await Promise.all([fetchTweetsAsNews('(javascript OR web OR development OR react) lang:en'), fetchYcomBestStoriesAsNews(20)]);

  store.dispatch(setNews('tweets', news[0]));
  store.dispatch(setNews('ycomBestNews', news[1]));

  return { props: {} };
});

export default Index;

