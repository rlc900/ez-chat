// This manages everything that has to do with users.

const users = [];

const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  // if user is trying sign up again using the same information
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return {error: 'Username is taken'}
  }

  const user = {id, name, room}
  users.push(user)

  return {user}
};

const removeUser = () => {

};

const getUser = () => {

};

const getUsersInRoom = () => {

};
