let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

function addStudent() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;
    let mobile = document.getElementById("mobile").value;
    let admissionDate = document.getElementById("admissionDate").value;
    let address = document.getElementById("address").value;
    let gender = document.getElementById("gender").value;

    if (name === "" || email === "" || age === "" || course === "" || gender === "") {
        alert("Fill all fields");
        return;
    }
// if edit
if(window.editIndex != undefined){
    students[window.editIndex] = {
        name,
        email,
        age,
        course,
        mobile,
        admissionDate,
        address,
        gender
    };
    window.editIndex = undefined;
}
else{
    students.push({
        name: name,
        email: email,
        age: age,
        course: course,
        mobile: mobile,
        admissionDate: admissionDate,
        address: address,
        gender: gender

    });
}    

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("addmissionDate").value = "";

}

function displayStudents() {

    let list = document.getElementById("studentList");

    list.innerHTML = "";

    students.forEach((student, index) => {

        list.innerHTML += `
        <tr>
        
            <td>${index + 1}</td>
            <td>${student.studentID}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.mobile}</td>
            <td>${student.address}</td>
            <td>${student.gender}</td>
            <td>${student.dob}</td>
            <td>${student.admissionDate}</td>
            
            
            <td>
            <button class="edit-btn" onclick="editStudent(${index})">Edit </button>
            <button class="delete-btn" onclick="deleteStudent(${index})">Delete
                </button>
            </td>
        </tr>`;
    });

    let total = students.length;
    document.getElementById("totalStudents").textContent = total;
    let maleCount = students.filter(student => student.gender === "Male").length;
    let femaleCount = students.filter(student => student.gender === "Female").length;
    document.getElementById("maleCount").textContent = maleCount;
    document.getElementById("femaleCount").textContent = femaleCount;

}

function deleteStudent(index) {
    if(confirm("Are you sure you want to delete this student?")){
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
}


function clearAllStudents(){
    if(confirm("Delete all students?")){
        localStorage.removeItem("students");

        students = [];

        displayStudents();
    }
}

function searchStudent() {

    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#studentList tr");

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();

        if(text.includes(input)){
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function editStudent(index){

    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("mobile").value = student.mobile;
    document.getElementById("address").value = student.address;
    document.getElementById("gender").value = student.gender;
    document.getElementById("photo").value = student.photo;

    // store index for update
    window.editIndex = index;
}