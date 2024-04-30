function userAuth (req,res,net){
    const isLogged=true;
    if(!isLogged){
        return res.status(401).send("non sei autenticato")
    }
}
function userPerms (req,res,net){
    const isAmministrator=true;
    if(!isAmministrator){
        return res.status(403).send("non sei autorizzato")
    }
}
module.exports={
    userAuth,
    userPerms
};