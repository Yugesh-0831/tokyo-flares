// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/orders?user.id=" + userId
    );
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    console.log("userId: " + userId);
    const responce = await fetch("http://localhost:8080/users?id=" + userId);
    const data = await responce.json();
    console.log({ data });
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      header: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}