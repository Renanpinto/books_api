
class Database {
  async transaction() {
    return { error: [], result: [] };
  }

  async getRepository(target) {
    return target;
  }
}

export default Database;
