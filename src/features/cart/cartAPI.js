// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      header: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await responce.json();
    resolve({ data });
  });
}
// not working in json-server??
export function updateItem(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/cart/id/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      header: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}

// not working in json-server??
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/cart/id/" + itemId, {
      method: "DELETE",
      header: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data: { id: itemId } });
  });
}

export async function resetCart(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetchItemsByUserId(userId);
    const items = responce.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
