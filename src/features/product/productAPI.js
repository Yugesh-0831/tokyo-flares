// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, order) {
  // filter = {"category": []}
  let queryString = "";
  for (let key in filter) {
    if (order === "desc") queryString += `${key}=-${filter[key]}&`;
    else queryString += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    console.log("http://localhost:8080/products?" + queryString);
    const data = await responce.json();
    console.log(data);
    resolve({ data });
  });
}
