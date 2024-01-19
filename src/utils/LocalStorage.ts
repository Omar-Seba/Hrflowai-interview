import { useState } from "react";

export enum StoredKeys {
  SortCriteria = "sortCriteria",
  SearchTerm = "searchTerm",
  SelectedCategory = "selectedCategory",
}

// Categories.ts

export enum Categories {
  AIResearchDevelopment = "AI / Research & Development",
  ArtificialIntelligence = "Artificial Intelligence",
  FinancialServices = "Financial Services",
  HumanResources = "Human Resources",
  SoftwareEngineering = "Software Engineering",
}

export enum Criteria {
  default = "",
  Name = "name",
  CreationDate = "creationDate",
  Category = "category",
}

interface myLocalStorageContent {
  selectedCategory: Categories;
  sortCriteria: Criteria;
  searchTerm: string;
}

export const useLocalStorage = (key: StoredKeys, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
