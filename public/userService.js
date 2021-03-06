angular.module('lados').factory('Authentication', function() {
  this.user = window.user;
  return {
    user: this.user,
    isAuthenticated: function() {
      return user ? true : false;
    },
    isAdmin: function() {
      return user.userrole == 'admin' ? true : false;
    }
  };
});
