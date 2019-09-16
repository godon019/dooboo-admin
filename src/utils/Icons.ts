const isRetina = (first: any, second?: any, third?: any) => {
  console.log('pixelRatio', window.devicePixelRatio);
  if (window.devicePixelRatio >= 2 && third) {
    return third;
  }
  if (window.devicePixelRatio >= 1.5 && second) {
    return second;
  }
  return first;
};

export const IC_FACEBOOK_W = isRetina(
  require('../../assets/icons/ic-facebook-white.png'),
  require('../../assets/icons/ic-facebook-white@2x.png'),
  require('../../assets/icons/ic-facebook-white@3x.png'),
);

export const IC_GOOGLE_W = isRetina(
  require('../../assets/icons/ic-google-white.png'),
  require('../../assets/icons/ic-google-white@2x.png'),
  require('../../assets/icons/ic-google-white@3x.png'),
);

export const IC_CLEAR = require('../../assets/icons/outline-clear-24px.svg');
export const IC_ARROW_DROP_DOWN = require('../../assets/icons/arrow_drop_down-24px.svg');
export const IC_ARROW_DROP_UP = require('../../assets/icons/arrow_drop_up-24px.svg');

export const IC_PREVIEW = require('../../assets/icons/ic-icon-preview.svg');
export const IC_GEAR = require('../../assets/icons/ic-gear.svg');
export const IC_TRASH = require('../../assets/icons/ic-trash.svg');
