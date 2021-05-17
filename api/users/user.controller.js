const { create, getUsers,getUsersByUserId,deleteUser,updateUser, getUserByUserEmail } = require("./user.service"); // get create function from /user.service file

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// exporting functions for router use
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        // always encrypt password before saving
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results)=>{
            // if error return error json
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            // if success return success json
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsersByUserId: (req,res)=>{
        const id = req.params.id;
        getUsersByUserId(id,(err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    getUsers: (req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    updateUser: (req,res) => { 
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results)=> {
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "update successful"
            });
        });
    },
    deleteUser: (req,res)=>{
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    },
    login: (req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password); // get object if passwords match
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results},"qwe1234", { // if passwords match, generate token
                    expiresIn: "1h"
                });
                return res.json({   // send json response with jwt
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 1,
                    data: "Invalid email or password"
                });
            }
        });
    }
};