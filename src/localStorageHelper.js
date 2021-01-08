/**
 * Made a class to handle Local Storage functions/queries.
 */

class LocalStorageHelper {
  static add = (v) => {
    let a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem("nominatedMovies")) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(v);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem("nominatedMovies", JSON.stringify(a));
  };

  static get = (k) => {
    const selected = JSON.parse(localStorage.getItem(k)) || [];
    return selected;
  };

  static removeItem = (k, id) => {
    let nominated = Object.values(this.get(k));
    nominated = JSON.stringify(
      nominated.filter((movie) => movie.imdbID !== id)
    );
    localStorage.setItem(k, nominated);
  };
}

export default LocalStorageHelper;
