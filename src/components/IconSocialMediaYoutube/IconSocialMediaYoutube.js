import React, { useState } from 'react';

import css from './IconSocialMediaYoutube.css';

const IconSocialMediaYoutube = _ => {
  const [color, setColor] = useState('#000000');

  const onMouseEnter = _ => {
    setColor('#ed0a73');
  };

  const onMouseLeave = _ => {
    setColor('#000000');
  };
  return (
    <div className={css.container}>
      <i
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ transform: 'translateX(-20px)', color: color }}
        className="fa fa-youtube-play"
      ></i>
    </div>
  );
};

export default IconSocialMediaYoutube;
