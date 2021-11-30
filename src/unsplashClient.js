import axios from 'axios';

/**
 * Client for Unsplash API
 */
export default class UnsplashClient {
  constructor(config) {
    this.apiUrl = config && config.apiUrl ? config.apiUrl : '';
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
        console.log('the book searchImg response=');
        console.log(response);
        let results = response.data;
        if (results.code === 200) {
          results = response.data.data;
        }
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
      bookId: image.bookId,
      url: image.coverImgURL,
      thumb: image.thumbImgURL,
      title: image.galleryTitle,
      fullTitle: image.bookTitle,
      captionInfo: image.captionInfo,
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
