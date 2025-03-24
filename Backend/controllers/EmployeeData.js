import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import path from "path";

// Displaying semua Employee Data
export const getEmployeeData = async (req, res) => {
    try {
        const response = await EmployeeData.findAll({
            attributes: [
                'id', 'nik', 'emp_name',
                'gender', 'position', 'join_date',
                'status', 'photo', 'access_rights'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk menSeach Employee Data berdasarkan ID
export const getEmployeeDataByID = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'emp_name',
                'gender', 'position', 'username', 'join_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                id: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that ID not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk menSeach Employee Data berdasarkan NIK
export const getEmployeeDataByNik = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'emp_name',
                'gender', 'position', 'join_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                nik: req.params.nik
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee Data not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// method untuk menSeach Employee Data berdasarkan Name
export const getEmployeeDataByName = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nik', 'emp_name',
                'gender', 'position', 'join_date',
                'status', 'photo', 'access_rights'
            ],
            where: {
                emp_name: req.params.name
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee Data not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//  method untuk Add Employee Data
export const createEmployeeData = async (req, res) => {
    const {
        nik, emp_name,
        username, password, confPassword, gender,
        position, join_date,
        status, access_rights
    } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    if (!req.files || !req.files.photo) {
        return res.status(400).json({ msg: "Photo Upload Error. Please Upload the Photo Again" });
    }

    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Photo File Does Not Match the Format" });
    }

    if (fileSize > 2000000) {
        return res.status(422).json({ msg: "Image size must be less than 2 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }

        const hashPassword = await argon2.hash(password);

        try {
            await EmployeeData.create({
                nik: nik,
                emp_name: emp_name,
                username: username,
                password: hashPassword,
                gender: gender,
                position: position,
                join_date: join_date,
                status: status,
                photo: fileName,
                url: url,
                access_rights: access_rights
            });

            res.status(201).json({ success: true, message: "Registration successful" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    });
};


// method untuk update Employee Data
export const updateEmployeeData = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employee) return res.staus(404).json({ msg: "Employee Data not found" });
    const {
        nik, emp_name,
        username, gender,
        position, join_date,
        status, access_rights
    } = req.body;

    try {
        await EmployeeData.update({
            nik: nik,
            emp_name: emp_name,
            username: username,
            gender: gender,
            position: position,
            join_date: join_date,
            status: status,
            access_rights: access_rights
        }, {
            where: {
                id: employee.id
            }
        });
        res.status(200).json({ msg: "Employee Data successfully Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Method untuk update password employee
export const changePasswordAdmin = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employee) return res.status(404).json({ msg: "Employee Data not found" });


    const { password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

    try {
        if (employee.access_rights === "employee") {
            const hashPassword = await argon2.hash(password);

            await EmployeeData.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id: employee.id
                    }
                }
            );

            res.status(200).json({ msg: "Password employee successfully Updated" });
        } else {
            res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// method untuk delete Employee Data
export const deleteEmployeeData = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!employee) return res.status(404).json({ msg: "Employee Data not found" });
    try {
        await EmployeeData.destroy({
            where: {
                id: employee.id
            }
        });
        res.status(200).json({ msg: "Employee Data Successfully Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}