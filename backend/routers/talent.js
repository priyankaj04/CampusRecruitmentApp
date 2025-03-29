const express = require('express');
const app = express.Router();
const pool = require('../database');
const { v4: uuidv4, validate: isValidUUID } = require('uuid');
const { Hashpassword, Comparepassword, generateRandomNumber } = require('../src/functions');
const nodemailer = require('nodemailer');
const moment = require('moment');

//"POST" method for student registration
app.route('/registration').post(async (req, res) => {
    try {
        const { firstname, lastname, register_no, email, password } = req.body;
        let stud_id = uuidv4();
        const checkUser = await pool.query("SELECT * FROM talent WHERE register_no = $1", [register_no]);
        if (checkUser.rows.length > 0) {
            res.json({ status: 0, message: "REGISTER NUMBER ALREADY EXISTS" });
        } else {
            const encrypt = await Hashpassword(password);
            const checkStudent = await pool.query("SELECT * FROM student WHERE email = $1 and register_no = $2", [email, register_no]);
            if (checkStudent.rows.length > 0) {
                const newRegistration = await pool.query("INSERT INTO talent (talent_id, firstname, lastname, register_no, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [stud_id, firstname, lastname, register_no, email, encrypt]);
                const datetime = moment();
                const newLogger = await pool.query("INSERT INTO logger (member, type, datetime ) VALUES ($1, $2, $3) RETURNING *", [register_no, 'talent', datetime]);
                console.log("user is created");
                res.json({ status: 1, data: newRegistration.rows });
            } else {
                res.json({ status: 0, message:"STUDENT IS NOT VERIFIED" });
            }
        }
    } catch (err) {
        console.log(err.message);
    }
})

const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
        user: 'priyankaj_r20@bmscw.edu.in',
        pass: 'hdzcnjiifflcruhe',
    },
});
//bedpfjiwqrefmles
//"POST" method to verify email by sending otp
app.route('/verify/:id').post(async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    let response = {};
    try {
        const otp = generateRandomNumber().toString();
        const encrypt = await Hashpassword(otp);
        const query = await pool.query("UPDATE talent SET otp = $1 WHERE talent_id = $2", [encrypt, id])
        //const value = await sendOTP(req.body.email, otp);
        console.log(otp);
        const mailOptions = {
            from: 'priyankaj_r20@bmscw.edu.in',
            to: 'priyankaj_r20@bmscw.edu.in',
            subject: 'Your OTP',
            text: `Your One-Time Password (OTP) is: ${otp}. \n\n🎉🎊Welcome to Talent Connect!🎉🎊\n\n\n If you have any queries before using our application or any information to pass on to us, we are here for you. Reply for this same mail, and reach to you in no-time. Thank you for using our app! We are happy to see you here.\n\n\n Once again, Welcome to Talent Connect Community!!!🎉🎊`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                response.status = 0;
                response.message = "OTP failed."
                res.json(response);
            } else {
                console.log('OTP email sent successfully');
                response.status = 1;
                response.message = "OTP sent successfully."
                res.json(response);
                return true;
            }
        });
    } catch (err) {
        res.json({ status: 0, message: err })
        console.log(err.message);
    }
})

//"POST" method to check opt and authorization
app.route('/auth/:id').post(async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    try {
        const query = await pool.query("SELECT otp FROM talent WHERE talent_id= $1", [id])
        const auth = await Comparepassword(req.body.otp, query.rows[0].otp);
        if (auth) {
            const updateQuery = await pool.query("UPDATE talent SET auth = $1, otp = $2 WHERE talent_id = $3", ["1", "0", id]);
            console.log(updateQuery);
            if (updateQuery.rowCount > 0) {
                res.json({ status: 1, message: updateQuery.rows })
            } else {
                res.json({ status: 0, message: 'Updation failed'})
            }
        } else {
            res.json({ status: 0, message: 'Authentication failed.' })
        }
    } catch (err) {
        res.json({ status: 0, message: err })
        console.log(err.message);
    }
})


//"POST" method for student login
app.route('/login').post(async (req, res) => {
    try {
        let response = {};
        const { register_no, password } = req.body;
        const newLogin = await pool.query("SELECT * FROM talent WHERE register_no = $1", [register_no]);
        if (newLogin.rows.length == 0) {
            response.status = 0;
            response.data = { message: "REGISTER NO DOSENT EXISTS" }
        } else {
            const compare = await Comparepassword(password, newLogin.rows[0].password)
            if (compare) {
                const datetime = moment();
                const newLogger = await pool.query("INSERT INTO logger (member, type, datetime ) VALUES ($1, $2, $3) RETURNING *", [register_no, 'talent', datetime]);
                console.log("user is created");
                response.status = 1;
                response.data = { message: "SUCCESSFUL LOGIN", talent_id: newLogin.rows[0].talent_id }
            } else {
                response.status = 0;
                response.data = { message: "PASSWORD DID NOT MATCH" }
            }
        }
        res.json(response);
    } catch (err) {
        console.log(err.message);
    }
})


//----------------------------------------------------------------


// "GET" method for getting talent details by talent id
app.route('/:id').get(async (req, res) => {
    const id = req.params.id;
    try {
        let response = {};
        const getTalentQuery = await pool.query(`SELECT * FROM talent WHERE talent_id = $1`, [id]);
        if (getTalentQuery.rows.length > 0) {
            response.status = 1;
            response.data = getTalentQuery.rows
        } else {
            response.status = 0;
            response.data = { message: "No talent exists with this talent id" }
        }
        res.json(response);
    } catch (err) {
        res.json({ status: 0, data: { message: err.message } })
        console.log(err.message);
    }
})


//----------------------------------------------------------------


//"PUT" method for updating talent details
app.route('/:id').put(async (req, res) => {
    const id = req.params.id;
    try {
        let response = {};
        console.log(req.body)
        const body = req.body;
        const columns = Object.keys(body);
        const values = columns.map(col => body[col]);
        const placeholders = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
        const updateQuery = await pool.query(`UPDATE talent SET ${placeholders} WHERE talent_id = $${columns.length + 1}`, [...values, id]);
        if (updateQuery.rowCount > 0) {
            response.status = 1;
            response.data = { message: "UPDATION IS SUCCESSFUL" };
        } else {
            response.status = 0;
            response.data = { message: "UPDATION FAILED" };
        }
        res.json(response);
    } catch (err) {
        res.json({ status: 0, data: { message: err.message } })
        console.log(err.message);
    }
})

//'PUT' method to change password
app.route('/changepassword/:id').put(async (req, res) => {
    const id = req.params.id;
    try {
        let response = {}
        const { password, newpassword } = req.body;
        const pass = await pool.query(`SELECT password FROM talent WHERE talent_id = $1`, [id]);
        console.log(pass);
        if (pass.rowCount > 0) {
            const comparepass = await Comparepassword(password, pass.rows[0].password);
            if (comparepass) {
                const hashpassword = await Hashpassword(newpassword);
                const updatePassword = await pool.query(`UPDATE talent SET password = $1 WHERE talent_id = $2`, [hashpassword, id]);
                if (updatePassword.rowCount > 0) {
                    response.status = 1;
                    response.data = { message: "UPDATION IS SUCCESSFUL" };
                } else {
                    response.status = 0;
                    response.data = { message: "UPDATION FAILED" };
                }
            } else {
                response.status = 0;
                response.data = { message: "Sorry, the old password you provided is not correct. Please verify and re-enter your previous password." };
            }
            res.json(response);
        }
    } catch (err) {
        res.json({ status: 0, data: { message: err.message } })
        console.log(err.message);
    }
})

//"PUT" method for updating password by email
app.route('/change/password').put(async (req, res) => {
    const { email, password } = req.body;
    try {
        let response = {};
        const updateQuery = await pool.query(`UPDATE talent SET password = $1 WHERE email = $2`, [password, email]);
        if (updateQuery.rowCount > 0) {
            response.status = 1;
            response.data = { message: "UPDATION IS SUCCESSFUL" };
        } else {
            response.status = 0;
            response.data = { message: "UPDATION FAILED" };
        }
        res.json(response);
    } catch (err) {
        res.json({ status: 0, data: { message: err.message } })
        console.log(err.message);
    }
})

//"GET" method to get all job details that has been accepted
app.route('/alljobs/approved').get(async (req, res) => {
    try {
        let response = {};
        console.log("are you here?")
        const getRecruiterQuery = await pool.query(`SELECT * FROM application WHERE status = $1`, ['approved']);
        if (getRecruiterQuery.rows.length > 0) {
            response.status = 1;
            response.data = getRecruiterQuery.rows
        } else {
            response.status = 0;
            response.data = { message: "NO JOBS ARE POSTED YET" }
        }
        res.json(response);
    } catch (err) {
        res.json({ status: 0, data: { message: err.message } })
        console.log(err.message);
    }
})

//'GET' all approved jobs
// app.route('/alljobs').get(async (req, res) => {
//     try {
//         let response = {};
//         const getStudentQuery = await pool.query(`SELECT * FROM application WHERE status = $1`, ['approved']);
//         if (getStudentQuery.rows.length > 0) {
//             response.status = 1;
//             response.data = getStudentQuery.rows
//         } else {
//             response.status = 0;
//             response.data = { message: "No jobs posted yet." }
//         }
//         res.json(response);
//     } catch (err) {
//         res.json({ status: 0, data: { message: err.message } })
//         console.log(err.message);
//     }
// })

module.exports = app;