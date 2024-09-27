// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/orders/user/" + userId);
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    console.log("userId: " + userId);
    const responce = await fetch("/users/" + userId);
    console.log("//users/" + userId);
    const data = await responce.json();
    console.log("data: " + data.email);
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}
