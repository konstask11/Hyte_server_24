const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];

//TODO: implement route handlers below for users

const getUsers = (req, res) => {
    res.json(users);
  };

const getUserById = (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
      res.json(user);
  } else {
      res.status(404).json({ error: 'User not found' });
  }
    };

    const postUser = (req, res) => {
      const newUser = req.body;
      if (!newUser.username || !newUser.password || !newUser.email) {
          return res.status(400).json({ error: 'Invalid user data' });
      }
      // Check if username taken
      if (users.some(user => user.username === newUser.username)) {
          return res.status(409).json({ error: 'Username already taken' });
      }
      // new id for the user
      const newUserId = users.length + 1;
      const user = { id: newUserId, ...newUser };
      users.push(user);
      res.status(201).json(user);
  };

const putUser = (req, res) => {
  const userId = Number(req.params.id);
  const updatedUser = req.body;
  const existingUser = users.find(user => user.id === userId);
  if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
  }

  // Update user properties
  existingUser.username = updatedUser.username || existingUser.username;
  existingUser.password = updatedUser.password || existingUser.password;
  existingUser.email = updatedUser.email || existingUser.email;
  res.json(existingUser);
};

const postLogin = (req, res) => {
    // implement
    const userCreds = req.body;
    if (userCreds.username || !userCreds.password){
        return res.sendStatus(400);
    };
    const userFound = users.find(user => user.username == userCreds.username);
    //user not found
    if (!userFound) {
        return res.status(403).json({error: 'username or password not correct'});
    };
    //check if posted password matches to found user password
    if (userFound.password === userCreds.password) {
        res.json({message: 'logged in succesfully', user: userFound});
    } else {
        return res.status(403).json({error: 'username or password not correct'});
    }
    res.send('not working');
};

export {getUserById, getUsers, postUser, putUser, postLogin};
