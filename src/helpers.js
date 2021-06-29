/**
 * Helper for making Elements with attributes
 *
 * @param  {string} tagName New Element tag name
 * @param  {Array|string} classNames List or name of CSS class
 * @param  {object} attributes Any attributes
 * @returns {Element}
 */
export const make = (tagName, classNames = null, attributes = {}) => {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  Object.keys(attributes).forEach((attrName) => {
    el[attrName] = attributes[attrName];
  });

  return el;
};

/**
 * Validates Url
 *
 * @param {string} url Url to validate
 * @returns {boolean} Valid Url
 */
export const isUrl = (url) => {
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  return regex.test(url);
};

/**
 * Creates an element with the Unsplash image title information
 *
 * @param {{title: string}}
 *  appName - Application name registered on Unsplash
 *  title - Image title name
 *  titleProfileLink - Unsplash title profile link object
 *
 * @returns {HTMLDivElement}
 */
export const createImageCredits = ({ title }) => {
  const wrapper = make('div', 'inline-image__image-credits');
  // const by = make('div', null, {
  //   innerHTML: 'by ',
  //   style: 'display: inline;',
  // });
  const titleProfileLink = make('span', '', {
    innerHTML: title,
  });
  // const unsplashLink = make('a', '', {
  //   href: `https://unsplash.com/?utm_source=${appName}&utm_medium=referral`,
  //   innerHTML: 'Unsplash',
  //   target: '_blank',
  // });

  // wrapper.appendChild(by);
  wrapper.appendChild(titleProfileLink);
  // wrapper.appendChild(on);
  // wrapper.appendChild(unsplashLink);
  return wrapper;
};
