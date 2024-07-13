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
