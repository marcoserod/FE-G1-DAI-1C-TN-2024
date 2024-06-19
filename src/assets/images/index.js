import Google from './icons/google.svg';

import AppLogo from './logo/moviePlay.svg';
import success from './icons/succes_icon.svg';
import error from './icons/error_icon.svg';
import info from './icons/info_icon.svg';
import trailer from './icons/trailer_icon.svg';
import rate from './icons/rate_icon.svg';

const IMAGES = {
  SVG: {
    GOOGLE: Google,
    APP_LOGO: AppLogo,
    SUCCESS: success,
    ERROR: error,
    INFO: info,
    TRAILER: trailer,
    RATE: rate,
  },
  OTHERS: {
    LOGIN_BG: require('./backgrounds/loginBackground.jpg'),
    LOGO_NAME: require('./logo/moviePlayLogoName.png'),
    LOGO: require('./logo/moviePlayLogo.png'),
    SEARCH_BG: require('./backgrounds/search.png'),
    NO_CONNECTION_BG: require('./backgrounds/noConnection.png'),
    NO_RESULTS: require('./backgrounds/noResults.png'),
  },
};

export default IMAGES;
