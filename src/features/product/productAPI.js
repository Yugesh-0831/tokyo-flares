// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const result = await responce.json();
    const data = result.data;
    const totalItems = await responce.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/categories");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/brands");
    const data = await responce.json();
    resolve({ data });
  });
}
