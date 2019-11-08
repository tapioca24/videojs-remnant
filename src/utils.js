/**
 * Detect OS name.
 *
 * @param {string} ua User agent (lower case)
 * @return {string} OS name
 */
const detectOS = ua => {
  if (ua.includes('mac')) {
    return 'mac';
  }
  if (ua.includes('windows')) {
    return 'windows';
  }
  return 'unknown';
};

/**
 * Detect browser name.
 *
 * @param {string} ua User agent (lower case)
 * @return {string} Browser name
 */
const detectBrowser = ua => {
  if (ua.includes('msie') || ua.includes('trident/7')) {
    return 'ie';
  }
  if (ua.includes('edge')) {
    return 'edge';
  }
  if (ua.includes('edg')) {
    return 'edge-chromium';
  }
  if (ua.includes('chrome')) {
    return 'chrome';
  }
  if (ua.includes('safari')) {
    return 'safari';
  }
  if (ua.includes('opera')) {
    return 'opera';
  }
  if (ua.includes('firefox')) {
    return 'firefox';
  }
  return 'unknown';
};

/**
 * Detect OS and browser name.
 *
 * @return {Object} OS and Browser information
 */
const detectEnv = () => {
  const ua = window.navigator.userAgent.toLowerCase(); // eslint-disable-line no-undef

  return {
    os: detectOS(ua),
    browser: detectBrowser(ua)
  };
};

export default {
  detectEnv
};
