import EmployeeData from './EmployeeDataModel.js';
import PositionData from './PositionDataModel.js';
import AttendanceData from './AttendanceDataModel.js';

/* Method untuk mengambil Employee Data */

async function getEmployeeData() {
    try {
        const employeeData = await EmployeeData.findAll();
        const employeeDatamep = new Map();
        EmployeeData.forEach(employee => {
            const {nik, emp_name, position} = employee;
            employeeDatamep.set(emp_name, {nik, position});
        });

        const resultEmployeeData = [];
        employeeDatamep.forEach(({nik, position}, emp_name) => {
            resultEmployeeData.push({nik, emp_name, position});
        });

        const data_emp_name = resultEmployeeData.map(employee => employee.emp_name);
        const data_nik = resultEmployeeData.map(employee => employee.nik);
        const position_data = resultEmployeeData.map(employee => employee.position);

        return { data_emp_name, data_nik, position_data };
    } catch (error) {
        console.log(error);
    }
}

/* Method untuk mengambil Attendance Data */

async function getAttendanceData() {
    try {
    const attendanceData = await AttendanceData.findAll();
    const attendanceDatamep = new Map();

    const { data_emp_name } = await getEmployeeData();
    const { data_nik } = await getEmployeeData();

    attendanceData.forEach(attendance => {
        const { nik, month, gender, position_name, present, sick, absent } = attendance;
        const emp_name = data_emp_name.find(name => name === attendance.emp_name) || "-";
        const nik_employee = data_nik.find(nik => nik === attendance.nik) || "-";
        attendanceDatamep.set(nik_employee, { emp_name, month, gender, position_name, present, sick, absent });
    });

    const resultAttendanceData = [];
    attendanceDatamep.forEach(({ nik, month, gender, position_name, present, sick, absent }, nikemployee) => {
        const emp_name = data_emp_name.find(name => name === attendanceDatamep.get(nikemployee).emp_name) || "-";
        resultAttendanceData.push({ emp_name, nik, month, gender, position_name, present, sick, absent });
    });

    console.log(resultAttendanceData);

    } catch (error) {
    console.log(error);
    }
}

getAttendanceData();



/* Method untuk mengambil Employee Data */

async function getPositionData() {
    const positionData = await PositionData.findAll();
    const positionDatamep = new Map();
    try {
        positionData.forEach(position => {
            const {position_name, basic_salary, transport_allowance, meal_allowance} = position;
            positionDatamep.set(position_name, {basic_salary, transport_allowance, meal_allowance});
        });

        const resultPositionData = [];
        positionDatamep.forEach(({basic_salary, transport_allowance, meal_allowance}, position_name) => {
            resultPositionData.push({position_name, basic_salary, transport_allowance, meal_allowance});
        });

        return resultPositionData;
    } catch (error) {
        console.log(error);
    }
}