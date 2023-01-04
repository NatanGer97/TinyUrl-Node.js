class UserOut {
    id;
    firsName;
    lastName;
    email;
      constructor(user)
    {
      this.email = user.email;
      this.id = user._id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      
    }
  }
  
  module.exports = {UserOut}
  