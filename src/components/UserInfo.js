class UserInfo {
   constructor(data) {
     this._profileName = document.querySelector(data.name);
     this._profileSubname = document.querySelector(data.subname);
   };

  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      profileSubname: this._profileSubname.textContent
    }
    return userInfo
  }

  setUserInfo(name, subname) {
    this._profileName.textContent = name;
    this._profileSubname.textContent = subname;
  }

}

export { UserInfo }