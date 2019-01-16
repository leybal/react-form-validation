export const userService = {
  addUser,
  removeUser
};


function addUser(database, userData) {
  database.push().set(userData);
}

function removeUser(database, id) {
  database.child(id).remove();
}
