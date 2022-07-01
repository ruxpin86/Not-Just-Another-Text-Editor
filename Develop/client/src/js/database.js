import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const todosDb = await openDB("jate", 1);
  const txt = todosDb.transaction("jate", "readwrite");
  const store = txt.objectStore("jate");
  const request = store.put({ content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
