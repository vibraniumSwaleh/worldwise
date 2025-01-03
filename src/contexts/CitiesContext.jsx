import { createContext, useContext, useEffect, useState } from 'react';

const URL = 'http://localhost:9000/';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}cities`);
        const data = await res.json();

        setCities(data);
        console.log(data);
      } catch (error) {
        alert('There was an error loading data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert('There was an error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('CitiesContext must be used within a CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
