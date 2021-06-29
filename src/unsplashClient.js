import axios from 'axios';

/**
 * Client for Unsplash API
 */
export default class UnsplashClient {
  constructor(config) {
    this.apiUrl = config && config.apiUrl ? config.apiUrl : 'http://api.chartsup.com/api/book';
    this.clientId = config && config.clientId ? config.clientId : '';
    this.perPage = config && config.maxResults ? config.maxResults : 30;
  }

  /**
   * Search images
   *
   * @param {string} query Image search query term
   * @param {Function} callback Function for redering image gallery
   * @returns {void}
   */
  searchImages(query, callback) {
    axios.get(`${this.apiUrl}/suggestion`, {
      params: {
        query,
      },
    })
      .then((response) => {
        const results = response.data;
        return callback(results.map((image) => this.buildImageObject(image)));
      })
      .catch(() => callback([]));
  }


  /**
   * Builds an image object
   *
   * @param {object} image Unsplash image object
   * @returns {object} Image object
   */
  buildImageObject(image) {
    return {
      url: image.coverImgURL,
      thumb: image.thumbImgURL,
      downloadLocation: image.coverImgURL,
      title: image.galleryTitle,
      fullTitle: image.bookTitle,
    };
  }

  /**
  * Download image from Unsplash
  * Required by Unsplash API Guideline for tracking purposes
  * https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
  *
  * @param {string} downloadLocation Image download endpoint
  * @returns {void}
  */
  downloadImage(downloadLocation) {
    axios.get(downloadLocation, {
      params: {
        client_id: this.clientId,
      },
    }).catch((error) => console.log(error));
  }
}
