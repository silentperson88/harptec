class Session {
  constructor() {
    this.email = "";
  }

  get userEmail() {
    this.email = localStorage.getItem("email") || null;
    return this.email;
  }

  setUserEmail = (email) => {
    this.email = email;
    localStorage.setItem("email", email);
  };

  setClear = () => {
    this.clear = true;
    localStorage.clear();
  };
}

export default new Session();
