import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import bcrypt from 'bcrypt';
dotenv.config();
//making a server
const app = express()

// middlewares apply
app.use(cors());
app.use(express.json())



//to connect with the databse


const connection = mysql2.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.DBPASSWORD,
        database: process.env.DB
    });

connection.connect((err) => {
    if (err) {
        console.log("unable to connect with databse!");

    } else {
        console.log("db connected successfully!");

    }
})

//to check user is already present or not 

function isAlreadyPresent(email) {

    return new Promise((resolve, reject) => {
        const q = `select * from users where email="${email}";`;

        connection.query(q, (err, result) => {
            if (err) {
                console.log("this is a error", err);

            }
            // console.log("this is a results:", result);

            if (result[0]) {
                resolve(true);

            } else {
                resolve(false);
            }

        })
    })

}

// // insert user information

function insertUserInfo(username, email, password) {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO users(username, email, password) VALUES (?, ?, ?);`;

        connection.query(q, [username, email, password], (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return reject(error);
            }

            if (result.affectedRows === 1) {
                // console.log("Registered successfully");
                resolve(true);
            } else {
                // console.log("User not registered");
                resolve(false);
            }
        });
    });
}

function Encryption(password){

}
function Decryption(encrypted){


}

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const ispresent = await isAlreadyPresent(email);
    // console.log(ispresent);
    if (ispresent) {
        res.status(500).json({ message: "user is already present!" })
    } else {
        const isregister = await insertUserInfo(username, email, password);
        if (isregister) {
            res.status(200).json({ message: "user register succefully" });
        } else {
            console.log("unable to register ");
            res.status(500).json({ message: "unable to register!" })
        }
    }



})

//login 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const ispresent = await isAlreadyPresent(email)
    if (ispresent) {
        res.status(200).json({ message: "login successfully!" })
    } else {
        res.status(500).json({ message: "user does not exists" })
    }

})
const port = process.env.PORT;
app.listen(port, () => console.log(`server is started on http://localhost:${port}`))