import { values } from "lodash";

const getStorage = key => {
  const storageValue = localStorage.getItem(key);

  if (storageValue) {
    return storageValue;
  } else {
    return null;
  }
};

const setStorage = (key, value) => {
  // if (!value) {
  //   return false;
  // }
  console.log("value" + value);
  if(value == null) {
    return false;
  }
  localStorage.setItem(key, value);
};

const clearStorage = key => {
  localStorage.removeItem(key);
};

export { getStorage, setStorage, clearStorage };
