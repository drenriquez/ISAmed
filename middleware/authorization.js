function checkAuthorization (req,res,net){
    const isAmministrator=true;
    if(!isAmministrator){
        return res.status(403).send("non sei autorizzato")
    }
}

module.exports=checkAuthorization
