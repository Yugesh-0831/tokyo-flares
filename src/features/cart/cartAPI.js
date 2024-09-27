// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart?user=" + userId);
    const data = await responce.json();
    resolve({ data });
  });
}

export function updateItem(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await responce.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
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
