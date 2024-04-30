function checkCredentials(username, password) {
    // Esegui il controllo delle credenziali come desiderato
    return username === 'admin' && password === 'password';
}

function userAuth(req, res, next) {
    const { username, password } = req.body;
    if (!checkCredentials(username, password)) {
        return res.status(401).send("Credenziali non valide");
    }
    next(); // Procedi alla prossima funzione nella catena di middleware
}

module.exports = {
    userAuth
};
