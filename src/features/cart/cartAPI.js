// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
      const responce =  await fetch("http://localhost:8800");
      const data = await responce.json();
      resolve({data});
    }
  );
}
