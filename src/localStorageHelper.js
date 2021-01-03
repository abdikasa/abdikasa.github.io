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
    localStorage.getItem(k);
  };

  static removeItem = (k, id) => {
    let nominated = Object.values(JSON.parse(localStorage.getItem(k)));
    nominated = JSON.stringify(
      nominated.filter((movie) => movie.imdbID !== id)
    );
    localStorage.setItem(k, nominated);
    console.log("successfully vaporized off the earth");
  };
}

export default LocalStorageHelper;
