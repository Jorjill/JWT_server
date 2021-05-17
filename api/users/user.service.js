const pool = require("../../config/database");

// exporting functions for other files use
module.exports = {
    // create a new user (insert into db) and insert results into a callback function
    // get data and callBack function as a parameter
    create:(data, callBack) => {
        pool.query(
            `INSERT INTO REGISTRATION(firstName, lastName, gender, email, password, number, role)
            values(?,?,?,?,?,?,?)`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.role
        ],
        (error, results, fields)=>{
            if (error){
                return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id,firstName,lastName,gender,email,number,role from registration`,
            [],
            (error, results, fields) => {
                if (error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUsersByUserId: (id, callBack) => {
        pool.query(
          `select id,firstName,lastName,gender,email,number,role from registration where id=?`,
          [id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },
    updateUser:(data, callBack) => {
        pool.query(
            `INSERT INTO REGISTRATION(firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?)`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id,
            data.role
        ],
        (error, results, fields)=>{
            if (error){
                return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    deleteUser:(data, callBack) => {
        pool.query(
            `delete from registration where id=?`,
        [data.id],
        (error, results, fields)=>{
            if (error){
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email=?`,
            [email],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }
};