export const getFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };
  
  export const setToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  