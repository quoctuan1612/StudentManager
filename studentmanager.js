var readlineSync = require('readline-sync');
var fs = require('fs');
var listStudents = [];

function loadData(){
    var fileContent = fs.readFileSync('./data.json');
    listStudents = JSON.parse(fileContent);
}

function showMenu(){
    console.log("1. Nhập thông tin sinh viên");
    console.log("2. Sửa thông tin sinh viên");
    console.log("3. Xoá sinh viên");
    console.log("4. Hiển thị dữ liệu sinh viên theo mã sinh viên cần tìm");
    console.log("5. Hiển thị danh sách sinh viên (Sắp xếp theo thứ tự tăng dần MSV)");
    console.log("6. Lưu và Thoát")
}

function createStudent(){
    var studentCode = readlineSync.question("Student Code: ");
    var studentName = readlineSync.question("Student Name: ");
    var phoneNumber = readlineSync.question("Phone Number: ");
    var student = {
        studentCode: studentCode,
        studentName: studentName,
        phoneNumber: phoneNumber
    }
    listStudents.push(student);
}

function fixStudentInformation(){
    var studentNeedFix = readlineSync.question("Write the student to fix (student code): ");
    var flag = false;
    var index = 0;
    for (var student of listStudents){
        if (studentNeedFix === student.studentCode){
            console.log("Thông tin sinh viên cần sửa: ");
            console.log("Mã sinh viên: ", student.studentCode);
            console.log("Tên sinh viên: ", student.studentName);
            console.log("Số điện thoại: ", student.phoneNumber);
            console.log("");
            flag = true;
            break;
        }
        index++;
    }

    if (flag){
        var newStudentCode = readlineSync.question("Write new student code: ");
        var newStudentName = readlineSync.question("Write new student name: ");
        var newPhoneNumber = readlineSync.question("Write new phone number: ");
        listStudents[index].studentCode = newStudentCode;
        listStudents[index].studentName = newStudentName;
        listStudents[index].phoneNumber = newPhoneNumber;
    } else {
        console.log("Không tìm thấy mã sinh viên");
    }
}

function deleteStudent(){
    var deleteStudent = readlineSync.question("Write the student to delete (student code): ");
    for (var i = 0; i<listStudents.length; i++) {
        if (listStudents[i].studentCode === deleteStudent) {
            listStudents.splice(i, 1);
            break;
        }
    }
}

function findStudentByCode(){
    var findStudent = readlineSync.question("Write the student to find (student code): ");
    var listStudentNeedFind = [];
    for (var student of listStudents){
        if (student.studentCode.toLowerCase().indexOf(findStudent.toLowerCase()) >= 0){
            listStudentNeedFind.push(student);
        }
    }
    listStudentNeedFind.sort(function(student1, student2){
        return student1.studentCode.localeCompare(student2.studentCode);
    });
    for (var student of listStudentNeedFind){
        console.log(student.studentCode, "\t\t", student.studentName, "\t\t", student.phoneNumber);
    }
}

function showListStudent(){
    if (listStudents.length === 0){
        console.log("Không có dữ liệu sinh viên");
    } else {
        console.log("Mã sinh viên", "\t", "Tên sinh viên", "\t\t\t", "Số điện thoại");
        listStudents.sort(function(student1, student2){
            return student1.studentCode.localeCompare(student2.studentCode);
        });
        for (var student of listStudents){
            console.log(student.studentCode, "\t\t", student.studentName, "\t\t", student.phoneNumber);
        }
    }
}

function saveAndExit(){
    var content = JSON.stringify(listStudents);
    fs.writeFileSync('./data.json', content);
}


function main(){
    loadData();
    do{
        console.log("");
        showMenu();
        console.log("");
        var option = readlineSync.question("Select: ");
        switch (option){
            case '1':
                createStudent();
                break;
            case '2':
                fixStudentInformation();
                break;
            case '3':
                deleteStudent();
                break;
            case '4':
                findStudentByCode();
                break;
            case '5':
                showListStudent();
                break;
            case '6':
                saveAndExit();
                break;
            default:
                console.log("Chọn lại!");
                break;
        };
    } while (option != 6);
}

main();