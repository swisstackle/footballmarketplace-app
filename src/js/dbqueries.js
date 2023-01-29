const {Client} = require("pg");
require('dotenv').config();
    var client;

     async function connect(){
        const {Client} = require('pg');
         console.log("Database connection started with:");
         console.log("Host: "+process.env.HOST);
         console.log("User: "+process.env.USER);
         console.log("Port: "+process.env.PORT);
         console.log("Password: "+process.env.PASSWORD);
         console.log("Database: "+process.env.MYDATABASE);
        client = new Client({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.MYDATABASE,
            ssl: { rejectUnauthorized: false } // for heroku, deactivating certificate check. Suffice for prototype deploying.
        });

        await client.connect();

     }
     async function test(){
         const res = await client.query('SELECT NOW();');
         return res;
     }
     const newPlayer =  (name, address)=>{
         name = encodeURIComponent(name);
         //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
        if(name.length > 0){
            client.query('INSERT INTO users(name, address) VALUES($1,$2)',[name, address],(error) =>{
                if(error){
                    throw error;
                }
            })
        }
     }

     const buyService = (_servicename, _address)=>{
         _servicename = encodeURIComponent(_servicename);
         //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
         if(_servicename.length>0){
             client.query('INSERT INTO bought_services(servicename, address) VALUES($1,$2)',[_servicename, _address],(error) =>{
                 if(error){
                     throw error;
                 }
             })
         }

     }
     const serviceDone= (_servicename, _address)=>{
         _servicename = encodeURIComponent(_servicename);
         //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
         if(_servicename.length > 0){
             client.query('DELETE FROM bought_services WHERE servicename=$1 AND address=$2',[_servicename, _address],(error) =>{
                 if(error){
                     throw error;
                 }
             })
         }
     }

     const deletePlayer = (address)=>{
         //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
         client.query('DELETE FROM users WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
         client.query('DELETE FROM coaches WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
         client.query('DELETE FROM service_requests WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
         client.query('DELETE FROM services WHERE address=$1',[address],(error) =>{
             if(error){
                 throw error;
             }
         })
         console.log("User "+address+" got deleted\n");
     }

     const dbRequestRegisterService = (address, name, description, price)=>{
         //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
         name = encodeURIComponent(name);
         description = encodeURIComponent(description);
         if(parseInt(price) > 0 && name.length > 0 && description.length){
             client.query('INSERT INTO service_requests(address, service_name, service_description, price) VALUES($1, $2, $3, $4)',[address, name, description, price],(error) =>{
                 if(error){
                     throw error;
                 }
             });
         }
     }

    const submitService = (address, name, description, price)=>{
         name = encodeURIComponent(name);
         description = encodeURIComponent(description);
         if(parseInt(price) > 0 && name.length > 0 && description.length > 0){
             client.query('INSERT INTO services(address, service_name, service_description, price) VALUES($1, $2, $3, $4)',[address, name, description, price],(error) =>{
                 if(error){
                     throw error;
                 }
             });
         }

     }

const getServices = async ()=>{
    const results = await client.query('SELECT * FROM service_requests');
    return results.rows;
}

const getAdmittedServices = async (address)=>{
    //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
    const results = await client.query('SELECT * FROM services WHERE address=$1',[address]);
    return results.rows;
}

const getAllServices = async ()=>{
    const results = await client.query('SELECT * FROM services');

    return results.rows;
}

const getUsername = async (address)=>{
    //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34

    let results = await client.query('SELECT name FROM users WHERE address=$1',[address]);
    if(results.rows.length == 0){
        results = await client.query('SELECT name FROM coaches WHERE address=$1',[address]);
    }
    if(results.rows.length == 0){
        return "Failed";
    }

    return results.rows;

}

        const registerCoach = (address, name)=>{
         name = encodeURIComponent(name);
            //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
            if(name.length > 0){
                client.query('INSERT INTO coaches(address, name) VALUES($1, $2)',[address, name],(error) =>{
                    if(error){
                        throw error;
                    }
                })
            }

     }

const deleteServiceRequest = (address,service_name)=>{
    //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
    service_name = encodeURIComponent(service_name);
    if(service_name.length > 0){
        client.query('DELETE FROM service_requests WHERE address=$1 AND service_name=$2',[address,service_name],(error) =>{
            if(error){
                throw error;
            }
        })
    }

}
const deleteService = (address, name)=>{
    //TODO: Check if address does not contain malicious code https://github.com/swisstackle/football_marketplace/issues/34
    name = encodeURIComponent(name);
    if(name.length>0){
        client.query('DELETE FROM services WHERE service_name=$1 AND address=$2',[name, address],(error) =>{
            if(error){
                throw error;
            }
        })
    }

}


const connectV = async () =>{
    return await connect();
}
const testV = async () =>{
    return await test();
}

module.exports = {
    connectV,
    newPlayer,
    deletePlayer,
    dbRequestRegisterService,
    submitService,
    registerCoach,
    getServices,
    deleteServiceRequest,
    deleteService,
    getUsername,
    getAdmittedServices,
    buyService,
    serviceDone,
    getAllServices
}




