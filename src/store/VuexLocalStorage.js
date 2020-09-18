// https://medium.com/@djave_co_23356/a-super-simple-vuex-localstorage-plugin-de7820828b10
// Test si le localStorage existe.
let localStorageAvailable = () => {
  let test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

let setupLocalStorage = (store) => {
  let previous = localStorage.getItem('fepApp');

  if (previous) {
    if (localStorage.getItem("role") === "formateur") {
      store.replaceState(JSON.parse(previous));
    }
  }
}

const VuexLocalStorage = (store) => {

  if (!localStorageAvailable()) {
    return false;
  }

  setupLocalStorage(store);

  if (!localStorage.getItem("fepApp")) {
    console.log("Il n'y a rien dans localStorage;");
  }

  store.subscribe((mutation, state) => {
    localStorage.setItem('fepApp', JSON.stringify(state));
  });
};

export default VuexLocalStorage;