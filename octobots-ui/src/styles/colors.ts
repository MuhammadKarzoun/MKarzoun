import { rgba } from './ecolor';

// // Get theme from localStorage
// const getThemeConfig = () => {
//   const config = localStorage.getItem('organizationInfo');
//   return config ? JSON.parse(config) : null;
// };

// // Core colors
// const theme = getThemeConfig();


// const colorPrimary = theme?.buttonBackgroundColor || '#1F97FF';
// const colorPrimaryDark = theme?.backgroundColorMain || '#5629B6';
// const colorSecondary = theme?.backgroundColor || '#f1b500';
// const colorCoreRed = theme?.buttonTextColor || '#EA475D';
// const colorCoreTeal = theme?.linkColor || '#63D2D6';
// const colorCoreYellow = '#f1b500';

// const colorCoreOrange = '#FF6600';
// const colorCoreGreen = '#3CCC38';
// const colorCoreBlue = '#3B85F4';
// const colorCoreDarkBlue = '#0a1e41';
// const colorCoreBlack = theme?.textColor || '#333333';
// const colorCoreGray = '#888';
// const colorCoreLightGray = '#AAAEB3';
// const colorCoreSunYellow = '#FDA50F';

const colorPrimary = '#1F97FF';
const colorPrimaryDark = '#5629B6';
const colorSecondary = '#f1b500';
const colorCoreRed = '#EA475D';
const colorCoreTeal = '#63D2D6';
const colorCoreYellow = '#f1b500';

const colorCoreOrange = '#FF6600';
const colorCoreGreen = '#3CCC38';
const colorCoreBlue = '#3B85F4';
const colorCoreDarkBlue = '#0a1e41';
const colorCoreBlack = '#333333';
const colorCoreGray = '#888';
const colorCoreLightGray = '#AAAEB3';
const colorCoreSunYellow = '#FDA50F';

const colorLightGray = '#AAA';
const colorLightBlue = '#F8FBFF';
const colorCoreDarkGray = '#373737';
const colorShadowGray = '#DDD';

const colorBlack = '#000';
const colorWhite = '#FFF';

// backgrounds
const bgMain = '#EDF1F5';
const bgDark = rgba(colorBlack, 0.95);
const bgLight = '#FAFAFA';
const bgActive = '#F0F0F0';
const bgGray = '#e6e6e6';
const bgLightPurple = '#F7F8FC';
const bgUnread = '#ededfb';
const bgInternal = '#FFFCCC';

// Link colors
// const linkPrimary = theme?.linkColor || '#2196f3';
const linkPrimary = '#2196f3';
const linkPrimaryHover = rgba(linkPrimary, 0.7);

// Border colors
const borderPrimary = '#EEE';
const borderDarker = '#DEE4E7';

// Text colors
// const textPrimary = theme?.textColor || '#333333';
const textPrimary = '#333333';
const textSecondary = rgba(textPrimary, 0.8);

// Shadow colors
const shadowPrimary = rgba(colorBlack, 0.08);
const darkShadow = rgba(colorBlack, 0.2);


// Social colors
const socialFacebook = '#3A5999';
const socialFacebookMessenger = '#1472FB';
const socialTwitter = '#1DA1F2';
const socialGmail = '#D44638';
const socialGoogleMeet = '#038476';
const socialWhatsApp = '#25D366';
const socialTiktok = '#0088cc';
const socialTelegram = '#0088cc';
const socialViber = '#8f5db7';
const socialLine = '#00c300';
const socialTwilio = '#cf272d';
const socialInstagramMessenger = '#C13584';
const socialGrandStream = '#1793c7';

const newPrimaryColor = '#1F97FF';
const yellowishCore = '#f1b500';
const updatedBgColor = '#F5F5F5';
const borderLighter = '#DEDEDE';

const toggleBgColor = '#cbd5e1';

export default {
  borderLighter,
  colorPrimary,
  colorPrimaryDark,
  colorSecondary,
  colorCoreRed,
  colorCoreTeal,
  colorCoreYellow,
  colorCoreOrange,
  colorCoreGreen,
  colorCoreBlue,
  colorCoreDarkBlue,
  colorCoreBlack,
  colorCoreGray,
  colorCoreLightGray,
  colorCoreSunYellow,
  colorLightGray,
  colorLightBlue,
  colorCoreDarkGray,
  colorShadowGray,
  colorBlack,
  colorWhite,
  yellowishCore,

  bgMain,
  bgDark,
  bgLight,
  bgActive,
  bgGray,
  bgLightPurple,
  bgUnread,
  bgInternal,

  linkPrimary,
  linkPrimaryHover,

  borderPrimary,
  borderDarker,

  textPrimary,
  textSecondary,

  shadowPrimary,
  darkShadow,

  socialFacebook,
  socialFacebookMessenger,
  socialTwitter,
  socialGmail,
  socialGoogleMeet,
  socialTelegram,
  socialViber,
  socialLine,
  socialTwilio,
  socialWhatsApp,
  socialTiktok,
  socialInstagramMessenger,
  socialGrandStream,

  newPrimaryColor,
  updatedBgColor,

  toggleBgColor,
};
