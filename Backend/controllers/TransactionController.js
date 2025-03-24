import AttendanceData from "../models/AttendanceDataModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import PositionData from "../models/PositionDataModel.js";
import salaryDeduction from "../models/salaryDeductionModel.js";
import moment from "moment";
import "moment/locale/id.js";

// method untuk menampilkan semua Attendance Data
export const viewAttendanceData = async (req, res) => {
  let resultAttendanceData = [];
  try {
    // Get Attendance Data
    const attendance_data = await AttendanceData.findAll({
      attributes: [
        "id",
        "month",
        "nik",
        "emp_name",
        "gender",
        "position_name",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      distinct: true,
    });

    resultAttendanceData = attendance_data.map((attendance) => {
      const id = attendance.id;
      const createdAt = new Date(attendance.createdAt);
      const year = createdAt.getFullYear();
      const month = attendance.month;
      const nik = attendance.nik;
      const emp_name = attendance.emp_name;
      const position_name = attendance.position_name;
      const gender = attendance.gender;
      const present = attendance.present;
      const sick = attendance.sick;
      const absent = attendance.absent;

      return {
        id,
        month,
        year,
        nik,
        emp_name,
        position_name,
        gender,
        present,
        sick,
        absent,
      };
    });
    res.json(resultAttendanceData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan Attendance Data by ID
export const viewAttendanceDataByID = async (req, res) => {
  try {
    const AttendanceData = await AttendanceData.findOne({
      attributes: [
        "id",
        "month",
        "nik",
        "emp_name",
        "gender",
        "position_name",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      }
    });
    res.json(AttendanceData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// method untuk menambah Attendance Data
export const createAttendanceData = async (req, res) => {
  const {
    nik,
    emp_name,
    position_name,
    gender,
    present,
    sick,
    absent,
  } = req.body;

  try {
    const data_emp_name = await EmployeeData.findOne({
      where: {
        emp_name: emp_name,
      },
    });

    const position_data_name = await PositionData.findOne({
      where: {
        position_name: position_name,
      },
    });

    const data_nik_employee = await EmployeeData.findOne({
      where: {
        nik: nik,
      },
    });

    const name_already_exists = await AttendanceData.findOne({
      where: {
        emp_name: emp_name,
      },
    });

    if (!data_emp_name) {
      return res.status(404).json({ msg: "Data Employee Name not found" });
    }

    if (!position_data_name) {
      return res.status(404).json({ msg: "Data name position not found" });
    }

    if (!data_nik_employee) {
      return res.status(404).json({ msg: "Data nik not found" });
    }

    if (!name_already_exists) {
      const month = moment().locale("id").format("MMMM");
      await AttendanceData.create({
        month: month.toLowerCase(),
        nik: nik,
        emp_name: data_emp_name.emp_name,
        gender: gender,
        position_name: position_data_name.position_name,
        present: present,
        sick: sick,
        absent: absent,
      });
      res.json({ msg: "Added Attendance Data successful" });
    } else {
      res.status(400).json({ msg: "Data name already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk update Attendance Data
export const updateAttendanceData = async (req, res) => {
  try {
    await AttendanceData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Attendance Data successfully Updated" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk delete Attendance Data
export const deleteAttendanceData = async (req, res) => {
  try {
    await AttendanceData.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data deleted Successfully" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk create Deduction Salary Data
export const createDatasalaryDeduction = async (req, res) => {
  const { id, deduction, deduction_amt } = req.body;
  try {
    const deduction_name = await salaryDeduction.findOne({
      where: {
        deduction: deduction,
      },
    });
    if (deduction_name) {
      res.status(400).json({ msg: "Deduction Data already exists.!" });
    } else {
      await salaryDeduction.create({
        id: id,
        deduction: deduction,
        deduction_amt: deduction_amt.toLocaleString(),
      });
      res.json({ msg: "Deduction added successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan semua Deduction Data
export const viewDeductionData = async (req, res) => {
  try {
    const DeductionData = await salaryDeduction.findAll({
      attributes: ["id", "deduction", "deduction_amt"],
    });
    res.json(DeductionData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan Deduction Data By ID
export const viewDeductionDataByID = async (req, res) => {
  try {
    const DeductionData = await salaryDeduction.findOne({
      attributes: ["id", "deduction", "deduction_amt"],
      where: {
        id: req.params.id,
      },
    });
    res.json(DeductionData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk update Deduction Data
export const updateDeductionData = async (req, res) => {
  try {
    await salaryDeduction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Deduction Data successfully Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk delete Deduction Data
export const deleteDeductionData = async (req, res) => {
  try {
    await salaryDeduction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Data deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk mengambil Salary Data employee (Employee Data + Position Data + Attendance Data + Deduction Data)

// method untuk mengambil Employee Data :
export const getEmployeeData = async () => {
  let resultEmployeeData = [];

  try {
    // Get Employee Data:
    const employee_data = await EmployeeData.findAll({
      attributes: ["id", "nik", "emp_name", "gender", "position"],
      distinct: true,
    });

    resultEmployeeData = employee_data.map((employee) => {
      const id = employee.id;
      const nik = employee.nik;
      const emp_name = employee.emp_name;
      const gender = employee.gender;
      const position_name = employee.position;

      return { id, nik, emp_name, gender, position_name };
    });
  } catch (error) {
    console.error(error);
  }

  return resultEmployeeData;
};

// method untuk mengambil Position Data :
export const getPositionData = async () => {
  let resultPositionData = [];
  try {
    // get Position Data :
    const position_data = await PositionData.findAll({
      attributes: ["position_name", "basic_salary", "transport_allowance", "meal_allowance"],
      distinct: true,
    });

    resultPositionData = position_data.map((position) => {
      const position_name = position.position_name;
      const basic_salary = position.basic_salary;
      const transport_allowance = position.transport_allowance;
      const meal_allowance = position.meal_allowance;

      return { position_name, basic_salary, transport_allowance, meal_allowance };
    });
  } catch (error) {
    console.error(error);
  }
  return resultPositionData;
};

// method untuk mengambil Attendance Data :
export const getAttendanceData = async () => {
  try {
    // Get Attendance Data
    const attendance_data = await AttendanceData.findAll({
      attributes: [
        "month",
        "nik",
        "emp_name",
        "gender",
        "position_name",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      distinct: true,
    });

    const resultAttendanceData = attendance_data.map((attendance) => {
      const createdAt = new Date(attendance.createdAt);
      const year = createdAt.getFullYear();
      const month = attendance.month;
      const nik = attendance.nik;
      const emp_name = attendance.emp_name;
      const position_name = attendance.position_name;
      const present = attendance.present;
      const sick = attendance.sick;
      const absent = attendance.absent;

      return {
        month,
        year,
        nik,
        emp_name,
        position_name,
        present,
        sick,
        absent,
      };
    });
    return resultAttendanceData;
  } catch (error) {
    console.error(error);
  }
};

export const getDeductionData = async () => {
  let resultDeductionData = [];
  try {
    // get Deduction Data :
    const deduction_data = await salaryDeduction.findAll({
      attributes: ["id", "deduction", "deduction_amt"],
      distinct: true,
    });
    resultDeductionData = deduction_data.map((deduction) => {
      const id = deduction.id;
      const deduction_name = deduction.deduction;
      const deduction_amt = deduction.deduction_amt;

      return { id, deduction_name, deduction_amt };
    });
  } catch (error) {
    console.error(error);
  }
  return resultDeductionData;
};

// Logika matematika
export const getEmployeeSalaryData = async () => {
  try {
    // Salary employee :
    const resultEmployeeData = await getEmployeeData();
    const resultPositionData = await getPositionData();

    const employee_salary = resultEmployeeData
      .filter((employee) =>
        resultPositionData.some(
          (position) => position.position_name === employee.position_name
        )
      )
      .map((employee) => {
        const position = resultPositionData.find(
          (position) => position.position_name === employee.position_name
        );
        return {
          id: employee.id,
          nik: employee.nik,
          emp_name: employee.emp_name,
          position: employee.position_name,
          basic_salary: position.basic_salary,
          transport_allowance: position.transport_allowance,
          meal_allowance: position.meal_allowance,
        };
      });

    // deduction employee :
    const resultAttendanceData = await getAttendanceData();
    const resultDeductionData = await getDeductionData();

    const employee_deduction = resultAttendanceData.map((attendance) => {
      const deductionAbsent = attendance.absent > 0 ?
        resultDeductionData
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "absent")
          .reduce((total, deduction) => total + deduction.deduction_amt * attendance.absent, 0) : 0;

      const deductionsick = attendance.sick > 0 ?
        resultDeductionData
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "sick")
          .reduce((total, deduction) => total + deduction.deduction_amt * attendance.sick, 0) : 0;

      return {
        year: attendance.year,
        month: attendance.month,
        emp_name: attendance.emp_name,
        present: attendance.present,
        sick: attendance.sick,
        absent: attendance.absent,
        deductionsick: deductionsick,
        deductionAbsent: deductionAbsent,
        total_deduction: deductionsick + deductionAbsent
      };
    });

    // Total Salary employee :
    const total_employee_salary = employee_salary.map((employee) => {
      const id = employee.id;
      const attendance = resultAttendanceData.find(
        (attendance) => attendance.emp_name === employee.emp_name
      );
      const deduction = employee_deduction.find(
        (deduction) => deduction.emp_name === employee.emp_name
      );
      const total_salary =
      (employee.basic_salary +
      employee.transport_allowance +
      employee.meal_allowance -
      (deduction ? deduction.total_deduction : 0)).toLocaleString();

      return {
        year: deduction ? deduction.year : attendance ? attendance.year : 0,
        month: deduction ? deduction.month : attendance ? attendance.month : 0,
        id: id,
        nik: employee.nik,
        emp_name: employee.emp_name,
        position: employee.position,
        basic_salary: employee.basic_salary.toLocaleString(),
        transport_allowance: employee.transport_allowance.toLocaleString(),
        meal_allowance: employee.meal_allowance.toLocaleString(),
        present: attendance.present,
        sick: attendance.sick,
        absent: attendance.absent,
        deduction: deduction ? deduction.total_deduction.toLocaleString() : 0,
        total: total_salary,
      };
    });
    return total_employee_salary;
  } catch (error) {
    console.error(error);
  }
};

// method untuk melihat Salary Data employee
export const viewemployeeSalaryData = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    res.status(200).json(employeeSalaryData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewemployeeSalaryDataByName = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { name } = req.params;

    const salaryDataByName = employeeSalaryData
      .filter((salary_data) => {
        return salary_data.emp_name
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      })
      .map((salary_data) => {
        return {
          year: salary_data.year,
          month: salary_data.month,
          id: salary_data.id,
          nik: salary_data.nik,
          emp_name: salary_data.emp_name,
          position: salary_data.position,
          gender: salary_data.gender,
          position_name: salary_data.position_name,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (salaryDataByName.length === 0) {
      return res.status(404).json({ msg: 'Data not found' });
    }
    return res.json(salaryDataByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// method untuk melihat Salary Data employee berdasarkan ID
export const viewsalaryDataById = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData(req, res);
    const id = parseInt(req.params.id);

    const foundData = employeeSalaryData.find((data) => data.id === id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// method untuk melihat Salary Data employee berdasarkan Name
export const viewsalaryDataByName = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData(req, res);
    const name = req.params.name.toLowerCase();

    const foundData = employeeSalaryData.filter((data) => {
      const formattedName = data.emp_name.toLowerCase();
      const searchKeywords = name.split(" ");

      return searchKeywords.every((keyword) => formattedName.includes(keyword));
    });

    if (foundData.length === 0) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};



// method to search Salary Data employee berdasarkan month
export const viewemployeeSalaryDataByMonth = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const response = await AttendanceData.findOne({
      attributes: ["month"],
      where: {
        month: req.params.month,
      },
    });

    if (response) {
      const salaryDataByMonth = employeeSalaryData
        .filter((salary_data) => {
          return salary_data.month === response.month;
        })
        .map((salary_data) => {
          return {
            month: response.month,
            id: salary_data.id,
            nik: salary_data.nik,
            emp_name: salary_data.emp_name,
            gender: salary_data.gender,
            position_name: salary_data.position_name,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
          };
        });
      return res.json(salaryDataByMonth);
    }

    res
      .status(404)
      .json({ msg: `Data for the month ${req.params.month} not found` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method to search Salary Data employee berdasarkan year
export const viewEmployeeSalaryDataByYear = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salary_data) => {
        const SalaryYear = salary_data.year;
        return SalaryYear === parseInt(year);
      })
      .map((salary_data) => {
        return {
          year: salary_data.year,
          id: salary_data.id,
          nik: salary_data.nik,
          emp_name: salary_data.emp_name,
          gender: salary_data.gender,
          position_name: salary_data.position,
          present: salary_data.present,
          sick: salary_data.sick,
          absent: salary_data.absent,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (salaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data year ${year} not found` });
    }
    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method to search Salary Data employee berdasarkan year
export const salaryDataReportByYear = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salary_data) => {
        const SalaryYear = salary_data.year;
        return SalaryYear === parseInt(year);
      })
      .map((salary_data) => {
        return {
          year: salary_data.year,
          id: salary_data.id,
          nik: salary_data.nik,
          emp_name: salary_data.emp_name,
          gender: salary_data.gender,
          position_name: salary_data.position_name,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (salaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data year ${year} not found` });
    } else {
      const reportByYear = salaryDataByYear.map((data) => data.year)
      console.log(reportByYear)
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};