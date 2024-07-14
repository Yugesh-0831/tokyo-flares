// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      header: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/orders?" + queryString);
    console.log("http://localhost:8080/orders?" + queryString);
    const result = await responce.json();
    console.log("result: " + result);
    const data = result.data;
    const totalOrders = await responce.headers.get("X-Total-Count");
    if (data) resolve({ data: { orders: data, totalOrders: totalOrders } });
    else resolve({ data: { orders: result, totalOrders: totalOrders } });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      header: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}
