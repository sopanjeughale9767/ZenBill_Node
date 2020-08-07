const { companyRegister, getCompany, updateCompany, getCompanyById, getCompanyByMobile } = require("./company.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

    get: (res, req) => {
        getCompany((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return req.json({
                success: 1,
                status: true,
                data: result
            })
        })
    },

    register: (req, res) => {
        const data = req.body;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        companyRegister(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    status: false,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                status: true,
                data: result
            });
        });
    },

    update: (req, res) => {
        const body = req.body;
        updateCompany(body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "update successfully",
                status: true,
                data:result
            });
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        getCompanyById(id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "record not found"
                });
            }
            return res.json({
                success: 1,
                data: result
            })
        })

    }, 

    login: (req, res) => {
        const body = req.body;
        getCompanyByMobile(body.mobileNumber, (err, results) => {
            if (results.length == 0) {
                return res.json({
                    success: 0,
                    message: "mobile number not registered."
                });
            }
            else {
                const result = compareSync(body.password, results[0].password);
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({ result: results }, "mspass123", { expiresIn: "1h" });
                    return res.json({
                        success: 1,
                        status: true,
                        data: results,
                        message: "login Successfully.",
                        token: jsontoken
                    });
                }
                else {
                    return res.json({
                        success: 0,
                        status: false,
                        message: "Invalid password."
                    });
                }
            }





        });
    }

}