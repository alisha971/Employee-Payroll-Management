import EmployeeData from "../models/EmployeeDataModel.js";
import AttendanceData from "../models/AttendanceDataModel.js";
import { getEmployeeSalaryData } from "./TransactionController.js";
import { verifyUser } from "../middleware/AuthUser.js";

// method untuk dashboard employee
export const dashboardEmployee = async (req, res) => {
    await verifyUser(req, res, () => {});

    const userId = req.userId;

    const response = await EmployeeData.findOne({
      where:{
        id: userId
      },
      attributes: [
        'id', 'nik', 'emp_name',
        'gender', 'position', 'join_date',
        'status', 'photo', 'access_rights'
      ]
    });

    res.status(200).json(response);
  };

// method untuk view Salary single employee by month
export const viewSingleEmployeeSalaryDataByMonth = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where:{
      id: userId
    }
  });

  try {
      const employeeSalaryData = await getEmployeeSalaryData();

      const response = await AttendanceData.findOne({
          attributes: [
              'month'
          ],
          where: {
              month: req.params.month
          }
      });

      if (response) {
        const salaryDataByMonth = employeeSalaryData.filter((salary_data) => {
          return salary_data.id === user.id && salary_data.month === response.month;
        }).map((salary_data) => {
          return {
            month: response.month,
            year: salary_data.year,
            nik: user.nik,
            emp_name: user.emp_name,
            gender: user.gender,
            position: user.position,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
          };
        });
          return res.json(salaryDataByMonth);
      }

      res.status(404).json({ msg: `Salary data for the month ${req.params.month} was not found for the employee ${user.emp_name}` });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// method untuk view Salary single employee by year
export const viewSingleEmployeeSalaryDataByYear = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where:{
      id: userId
    }
  });

  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData.filter((salary_data) => {
        return salary_data.id === user.id && salary_data.year === parseInt(year);
    }).map((salary_data) => {
        return {
            year: salary_data.year,
            month: salary_data.month,
            nik: user.nik,
            emp_name: user.emp_name,
            gender: user.gender,
            position: user.position,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
        };
    });

    if (salaryDataByYear.length === 0) {
        return res.status(404).json({ msg: `Data for the year ${year} not found` });
    }
    res.json(salaryDataByYear)
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

