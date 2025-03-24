import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import { verifyUser } from "../middleware/AuthUser.js";

export const Login = async (req, res) => {
  let user = {};
  const employee = await EmployeeData.findOne({
    where: {
      username: req.body.username
    }
  });

  if (!employee) {
    return res.status(404).json({ msg: "Employee Data not found" });
  }

  const match = await argon2.verify(employee.password, req.body.password);

  if (!match) {
    return res.status(400).json({ msg: "Incorrect password" });
  }

  req.session.userId = employee.emp_id;

  user = {
    emp_id: employee.id,
    emp_name: employee.emp_name,
    username: employee.username,
    access_rights: employee.access_rights
  }

  res.status(200).json({
    emp_id: user.emp_id,
    emp_name: user.emp_name,
    username: user.username,
    access_rights: user.access_rights,
    msg: "Login successful"
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please log in to your account!" });
  }
  const employee = await EmployeeData.findOne({
    attributes: ['id', 'nik', 'emp_name', 'username', 'access_rights'],
    where: {
      emp_id: req.session.userId
    }
  });
  if (!employee) return res.status(404).json({ msg: "User Not found" });
  res.status(200).json(employee);
}

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Unable to log out" });
    res.status(200).json({ msg: "You have logged out" });
  });
}

export const changePassword = async (req, res) => {
  await verifyUser(req, res, () => { });

  const userId = req.userId;

  const user = await EmployeeData.findOne({
    where: {
      id: userId
    }
  });

  const { password, confPassword } = req.body;

  if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

  try {
    const hashPassword = await argon2.hash(password);

    await EmployeeData.update(
      {
        password: hashPassword
      },
      {
        where: {
          id: user.id
        }
      }
    )
    res.status(200).json({ msg: "Password successfully updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};