import {
    getEmployeeSalaryData,
    getAttendanceData,
    viewEmployeeSalaryDataByYear
} from "./TransactionController.js"

// method untuk melihat Salary Report employee
export const viewEmployeeSalaryReport = async(req, res) => {
    try {
        const employeeSalaryReport = await getEmployeeSalaryData(req, res);
        res.status(200).json(employeeSalaryReport);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat Salary Report employee berdasarkan month
export const viewEmployeeSalaryReportByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const salaryDataReportByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = salaryDataReportByMonth.filter((data) => {
            return data.month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    emp_name: data.emp_name,
                    position: data.position_name,
                    basic_salary: data.basic_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// method untuk melihat Salary Report employee berdasarkan year
export const viewEmployeeSalaryReportByYear = async (req, res) => {
    try {
         await viewEmployeeSalaryDataByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// method untuk melihat Salary Report employee berdasarkan name
export const viewEmployeeSalaryReportByName = async (req, res) => {
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

// method untuk melihat Employee Attendance Report berdasarkan month (menggunakan DROP DOWN)
export const viewEmployeeAttendanceReportByMonth = async (req, res) => {
    try {
        const attendanceDataByMonth = await getAttendanceData();
        const { month } = req.params;

        const attendanceData = attendanceDataByMonth.filter((attendance) => attendance.month.toLowerCase() === month.toLowerCase()).map((attendance) => {
            return {
                year: attendance.year,
                month: attendance.month,
                nik: attendance.nik,
                emp_name: attendance.emp_name,
                position_name: attendance.position_name,
                present: attendance.present,
                sick: attendance.sick,
                absent: attendance.absent
            };
        });

        if (attendanceData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(attendanceData);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// method untuk melihat Employee Attendance Report berdasarkan year
export const viewEmployeeAttendanceReportByYear = async (req, res) => {
    try {
        const attendanceDataByYear = await getAttendanceData();
        const { year } = req.params;

        const attendanceData = attendanceDataByYear.filter((attendance) => attendance.year.toString() === year.toString()).map((attendance) => {
            return {
                year: attendance.year,
                month: attendance.month,
                nik: attendance.nik,
                emp_name: attendance.emp_name,
                position_name: attendance.position_name,
                present: attendance.present,
                sick: attendance.sick,
                absent: attendance.absent
            };
        });

        if (attendanceData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(attendanceData);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};



// method untuk melihat Salary Slip employee By Name
export const viewSalarySlipByName = async (req, res) => {
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
}

// method untuk melihat Salary Slip employee By Month
export const viewSalarySlipByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const salaryDataReportByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = salaryDataReportByMonth.filter((data) => {
            return data.month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: `Data for the month ${month} not found ` });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    year: data.year,
                    emp_name: data.emp_name,
                    position: data.position,
                    basic_salary: data.basic_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat Salary Slip employee By Year
export const viewSalarySlipByYear = async (req, res) => {
    try {
        await viewEmployeeSalaryDataByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}