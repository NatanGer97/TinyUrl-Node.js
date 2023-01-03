class UserOut {
    id;
    name;
    email;
      constructor(user)
    {
      this.email = user.email;
      this.id = user._id;
      this.name = user.name;
      
    }
  }
  
  module.exports = {UserOut}
  