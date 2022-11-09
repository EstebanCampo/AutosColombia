const mongoose = require('mongoose');

const getConnection = async()  =>{
    try {
    const url ='mongodb://eac:Est3b4n4167@cluster0-shard-00-00.8nybq.mongodb.net:27017,cluster0-shard-00-01.8nybq.mongodb.net:27017,cluster0-shard-00-02.8nybq.mongodb.net:27017/AutosColombia?ssl=true&replicaSet=atlas-nk97pl-shard-0&authSource=admin&retryWrites=true&w=majority';
    await mongoose.connect(url);

    console.log('Conexión exitosa')
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports={
    getConnection,
}