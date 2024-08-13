const testUserController = (req,res) => { 
    try{
        console.log(req.body);
        res.status(200).send({
            success:true,
            message:"test User Data API",
        })
    }
    catch(error){
        console.log('error In Test API',error);
    }
}

module.exports = { testUserController };