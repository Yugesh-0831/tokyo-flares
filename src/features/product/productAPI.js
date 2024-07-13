// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  console.log("idhr aaya");
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
    console.log("http://localhost:8080/products?" + queryString);
    const result = await responce.json();
    console.log("result: " + result);
    const data = result.data;
    const totalItems = await responce.headers.get("X-Total-Count");
    if (data) resolve({ data: { products: data, totalItems: totalItems } });
    else resolve({ data: { products: result, totalItems: totalItems } });
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

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products/?id=" + id);
    console.log("http://localhost:8080/products/?id=" + id);
    const data = await responce.json();
    resolve({ data });
  });
}
