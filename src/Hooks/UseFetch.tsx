import { useState, useEffect } from 'react';

// Custom hook to handle fetching and storing data in local storage
export const useFetchAndStore = (url, key, initialValue) => {
  const [data, setData] = useState(() => {
    // Get initial value from local storage if available, otherwise use initialValue
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    // Fetch data from the given URL
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        window.localStorage.setItem(key, JSON.stringify(result));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url, key]);

  // Function to update data in local storage
  const setStoredData = (value) => {
    try {
      setData(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [data, setStoredData];
};
