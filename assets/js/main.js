document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form form");
  const studentsList = document.getElementById("students-ul");
  const genderCountsElement = document.getElementById("genderCounts");

  // Function to get students from localStorage
  const getstudentsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("students")) || [];
  };

  // Function to save students to localStorage
  const savestudentsToLocalStorage = (students) => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  // Function to update gender and total counts
  const updateCounts = () => {
    const students = getstudentsFromLocalStorage();

    // Initialize counts
    let maleCount = 0;
    let femaleCount = 0;

    // Count genders
    students.forEach((student) => {
      const gender = (student.gender || "").toLowerCase(); // Normalize to lowercase
      if (gender === "male") maleCount++;
      else if (gender === "female") femaleCount++;
    });

    // Calculate total
    const totalCount = maleCount + femaleCount;

    // Update the gender counts element
    genderCountsElement.textContent = `Male: ${maleCount} | Female: ${femaleCount} | Total: ${totalCount}`;
  };

  // Function to display students in the list
  const displaystudents = () => {
    const students = getstudentsFromLocalStorage();

    // Clear the list
    studentsList.innerHTML = "";

    if (students.length === 0) {
      studentsList.innerHTML = `<p style="text-align: center;">No student found</p>`;
      return;
    }

    students.forEach((student, index) => {
      const item = document.createElement("div");
      item.innerHTML = `
       <div class="profile-card">
          <div class="avatar"><img src="${student.gender === "male" ? "./assets/images/man.png" : "./assets/images/girl.png"}"  alt="boy">
          </div>
          <div class="details">
            <p><strong style="margin-right:5px;">Name:</strong> ${student.firstname} ${student.middlename} ${student.lastname}</p>
            <p><strong style="margin-right:5px;">Course:</strong> ${student.course}</p>
            <a href="callto:${student.phone}" style="text-decoration:none; color:#000;display:block; margin-bottom:8px;"><strong style="margin-right:5px;">Phone:</strong>${student.phone}</a>
            <a href="mailto:${student.email}" style="text-decoration:none; color:#000;display:block; margin-bottom:8px;"><strong style="margin-right:5px;">Email:</strong> ${student.email}</a>
            <p><strong style="margin-right:5px;">Address:</strong> ${student.address}</p>
          </div>
          <button class="editButton">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          </button>
          <button class="deleteButton">
<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 12V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 12V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 7H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          </button>
        </div>
      `;
      // Attach delete functionality to the button
      const deleteBtn = item.querySelector(".deleteButton");
      deleteBtn.addEventListener("click", () => {
        deletestudent(index);
      });

      const editBtn = item.querySelector(".editButton");
      editBtn.addEventListener("click", () => editStudent(index));

      studentsList.appendChild(item);
    });

    // Update gender and total counts
    updateCounts();
  };

  // Function to delete a student
  const deletestudent = (index) => {
    const students = getstudentsFromLocalStorage();
    students.splice(index, 1); // Remove student from array
    savestudentsToLocalStorage(students);
    displaystudents(); // Refresh the list
  };

  const editStudent = (index) => {
    const students = getstudentsFromLocalStorage();
    const student = students[index];

    // Populate form fields with student data
    document.getElementById("firstname").value = student.firstname;
    document.getElementById("middlename").value = student.middlename;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("course").value = student.course;
    document.querySelector(
      `input[name="gender"][value="${student.gender}"]`
    ).checked = true;
    document.getElementById("phone").value = student.phone;
    document.getElementById("address").value = student.address;
    document.getElementById("email").value = student.email;
    document.getElementById("password").value = student.password;

    // Update form submit event to handle editing
    form.onsubmit = (e) => {
      e.preventDefault();

      // Update the student data
      students[index] = {
        firstname: document.getElementById("firstname").value,
        middlename: document.getElementById("middlename").value,
        lastname: document.getElementById("lastname").value,
        course: document.getElementById("course").value,
        gender: document.querySelector("input[name='gender']:checked")?.value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      // Save and refresh
      savestudentsToLocalStorage(students);
      form.reset();
      form.onsubmit = handleFormSubmit; // Revert to default submit handler
      displaystudents();
    };
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const newstudent = {
      firstname: document.getElementById("firstname").value,
      middlename: document.getElementById("middlename").value,
      lastname: document.getElementById("lastname").value,
      course: document.getElementById("course").value,
      gender: document.querySelector("input[name='gender']:checked")?.value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    // Add new student to the list
    const students = getstudentsFromLocalStorage();
    students.push(newstudent);
    savestudentsToLocalStorage(students);

    // Reset form and refresh students list
    form.reset();
    displaystudents();
  };

  // Set default form submit handler
  form.onsubmit = handleFormSubmit;

  // Event listener for form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form data
    const firstname = document.getElementById("firstname").value;
    const middlename = document.getElementById("middlename").value;
    const lastname = document.getElementById("lastname").value;
    const course = document.getElementById("course").value;
    const gender = document.querySelector(
      "input[name='gender']:checked"
    )?.value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate data (optional)
    if (!firstname || !lastname || !course || !gender) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create a new student object
    const newstudent = {
      firstname,
      middlename,
      lastname,
      course,
      gender,
      phone,
      address,
      email,
      password,
    };

    // Add to localStorage
    const students = getstudentsFromLocalStorage();
    students.push(newstudent);
    savestudentsToLocalStorage(students);

    // Reset the form
    form.reset();

    // Refresh the students list
    displaystudents();
  });

  document.querySelectorAll(".eye").forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling; // The associated input field
      const openEye = this.querySelector(".open-eye"); // Open-eye SVG
      const closeEye = this.querySelector(".close-eye"); // Close-eye SVG

      // Toggle password visibility
      if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Show password
        openEye.style.display = "none"; // Hide open-eye
        closeEye.style.display = "inline"; // Show close-eye
      } else {
        passwordInput.type = "password"; // Hide password
        openEye.style.display = "inline"; // Show open-eye
        closeEye.style.display = "none"; // Hide close-eye
      }
    });
  });

  // Display students on page load
  displaystudents();
});
