import React, { useState } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutWrapperMain,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './AboutPage.css';
import whyImg from './img1.jpg';
import girlsImg from './img2.jpg';

// create replaceable components for video tumbnails
const WhyVideo = _ => {
  const [showVideo, setShowVideo] = useState(false);
  const handleClickVideo = _ => {
    setShowVideo(true);
  };
  return (
    <>
      {showVideo ? (
        <div className={css.videoContainer}>
          <div className={css.thumbnail}>
            <div className={css.video}>
              <iframe
                style={{ width: '100%', height: '100%' }}
                title="video"
                src="https://www.youtube.com/embed/3qjkf4PCkDI"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.videoContainer}>
          <div className={css.thumbnail}>
            <i
              onClick={handleClickVideo}
              style={{ fontSize: '35px', color: 'rgba(0, 0, 0, 0.7)', cursor: 'pointer' }}
              className="fa fa-play"
            ></i>
            <img src={whyImg} className={css.thumbImg} alt="Our Why Thumbnail" />
          </div>
        </div>
      )}
    </>
  );
};

const GirlsVideo = _ => {
  const [showVideo, setShowVideo] = useState(false);
  const handleClickVideo = _ => {
    setShowVideo(true);
  };
  return (
    <>
      {showVideo ? (
        <div className={css.videoContainer}>
          <div className={css.thumbnail}>
            <div className={css.video}>
              <iframe
                style={{ width: '100%', height: '100%' }}
                title="video"
                src="https://www.youtube.com/embed/zCcRSWWob1o"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.videoContainer}>
          <div className={css.thumbnail}>
            <i
              onClick={handleClickVideo}
              style={{ fontSize: '35px', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }}
              className="fa fa-play"
            ></i>
            <img src={girlsImg} className={css.thumbImg} alt="Our Why Thumbnail" />
          </div>
        </div>
      )}
    </>
  );
};

const AboutPage = _ => {
  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Swoptop',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
        <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.section}>
            <div className={css.text}>
              {/* add title / add text */}
              <h1 className={css.title}>Our Why</h1>
              <p>Our founder, Chase Healey, is passionate about helping young women work towards bettering themselves in style with style.</p>
              <p>In this video, she discusses why she started Swoptop. </p>
            </div>
            {/* INSERT costum components here conditionally */}
            <WhyVideo></WhyVideo>
          </div>
          <div className={css.section}>
            <div className={css.text}>
              <h1 className={css.title}>Our Vision</h1>
              </div>
              <div className={css.visionContent}>
                <p>In today’s world, there is a lot of pressure to look good all the time. Whether it’s a new dress for a date party or an appropriate outfit for an internship, girls need inexpensive outfit options in a snap. </p>
                <p>Although cute clothes at your fingertips is enough for some, we created this platform with a larger purpose at heart. We built Swoptop so that more college women are able to have:</p>
                <ol>
                  <li>financial freedom created for themselves by themselves through something they already own & love</li>
                  <li>a way to creatively express themselves while learning business principles</li>
                  <li>an understanding of how a great outfit can be a catalyst in creating a better sense of self</li>
                </ol>
              </div>
          </div>
          <div className={css.lastSection}>
            <div className={css.lastText}>
              <h1 className={css.title}>Our Girls</h1>
              <p>Aly & Louise are two Swoptop users. One thinks of herself as more of an Owner and the other as a Renter, but both girls identify as both. </p>
              <p>Listen as they discuss their pain points when it comes to getting dressed, how they feel about the clothes in their closet that are just hanging there, & more.</p>
            </div>
            <GirlsVideo></GirlsVideo>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
       
    </StaticPage>
  );
};

export default AboutPage;
