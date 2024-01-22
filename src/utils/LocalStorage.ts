import { useState } from "react";

export enum StoredKeys {
  SortCriteria = "sortCriteria",
  SearchTerm = "searchTerm",
  SelectedCategory = "selectedCategory",
}

export enum Categories {
  AIResearchDevelopment = "AI / Research & Development",
  ArtificialIntelligence = "Artificial Intelligence",
  FinancialServices = "Financial Services",
  HumanResources = "Human Resources",
  SoftwareEngineering = "Software Engineering",
}

export enum Criterias {
  Name = "Name",
  CreationDate = "Creation date",
  Category = "Category",
}

interface myLocalStorageContent {
  selectedCategory: Categories;
  sortCriteria: Criterias;
  searchTerm: string;
}

export const useLocalStorage = (key: StoredKeys, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: myLocalStorageContent) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useLocalStorageT = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
