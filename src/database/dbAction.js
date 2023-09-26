import { openDB } from "idb";

class IndexedDBManager {
  constructor() {
    this.db = null;
  }

  async openDatabase() {
    this.db = await openDB("harptec", 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains("user")) {
          database.createObjectStore("user", { keyPath: "id" });
        }
      },
    });
  }

  async insertData(data) {
    if (!this.db) {
      await this.openDatabase();
    }
    try {
      await this.db.add("user", data);
      return true;
    } catch (error) {
      console.error("Error inserting data:", error);
      return false;
    }
  }

  async retrieveAllData() {
    if (!this.db) {
      await this.openDatabase();
    }
    const tx = this.db.transaction("user", "readonly");
    const store = tx.objectStore("user");
    return store.getAll();
  }
}

export default IndexedDBManager;
