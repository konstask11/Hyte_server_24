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
    // todo: implement
    };

const postUser = (req, res) => {
    // todo: implement
    };

const putUser = (req, res) => {
    // todo: implement
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
