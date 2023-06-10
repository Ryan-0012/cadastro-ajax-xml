const { USERS } = require("./in-memory-db");

exports.addSubscription = (req, res) => {
    const newUser = req.body;

    const isUserExists = USERS.some((user) => {
        return user.username === newUser.username;
      });

    if (isUserExists) {
        console.log('username já existe na lista de assinaturas:', newUser.username);
        res.status(400).json({ message: 'Token já existe na lista de assinaturas' });
    } else {
        USERS.push(newUser);
        console.log('Usuário inscrito com sucesso:', newUser.username);
        res.status(200).json({ message: 'Usuário inscrito com sucesso!' });
    }
    // USERS.push(req.body);
    // console.log("usuario inscrito com sucesso");
    // res.status(200).json({message: 'Usuario inscrito com sucesso!'});
}
