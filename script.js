// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("student-form");
    const tableBody = document.querySelector("#student-table tbody");
  
    // Load student data from localStorage or initialize an empty array if not available
    let students = JSON.parse(localStorage.getItem("students")) || [];
  
    // Function to render student records into the table
    function renderTable() {
      tableBody.innerHTML = ""; // Clear existing table rows
  
      // Loop through students array and create rows dynamically
      students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.studentId}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
          <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>`;
        tableBody.appendChild(row); // Append row to the table
      });
    }
  
    // Function to save student data to localStorage
    function saveToLocalStorage() {
      localStorage.setItem("students", JSON.stringify(students));
    }
  
    // Function to validate form input
    function validateInput(name, id, email, contact) {
      const nameRegex = /^[a-zA-Z ]+$/;            // Only letters and spaces allowed
      const idRegex = /^[0-9]+$/;                  // Only digits allowed
      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;   // Basic email pattern
      const contactRegex = /^[0-9]{10,}$/;         // At least 10 digits for contact
  
      // Return true only if all validations pass
      return (
        nameRegex.test(name) &&
        idRegex.test(id) &&
        emailRegex.test(email) &&
        contactRegex.test(contact)
      );
    }
  
    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form from submitting normally
  
      // Get trimmed values from input fields
      const name = document.getElementById("name").value.trim();
      const studentId = document.getElementById("studentId").value.trim();
      const email = document.getElementById("email").value.trim();
      const contact = document.getElementById("contact").value.trim();
  
      // Check if any field is empty
      if (!name || !studentId || !email || !contact) {
        alert("Please fill all fields.");
        return;
      }
  
      // Validate the inputs
      if (!validateInput(name, studentId, email, contact)) {
        alert("Please enter valid inputs.");
        return;
      }
  
      // Add the new student to the array
      students.push({ name, studentId, email, contact });
      saveToLocalStorage(); // Persist data
      renderTable(); // Update the UI
      form.reset(); // Clear form fields
    });
  
    // Function to edit a student record
    window.editStudent = (index) => {
      const student = students[index];
  
      // Pre-fill the form fields with the existing data
      document.getElementById("name").value = student.name;
      document.getElementById("studentId").value = student.studentId;
      document.getElementById("email").value = student.email;
      document.getElementById("contact").value = student.contact;
  
      // Remove the old record from the array
      students.splice(index, 1);
      saveToLocalStorage();
      renderTable();
    };
  
    // Function to delete a student record
    window.deleteStudent = (index) => {
      if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1); // Remove student from array
        saveToLocalStorage();      // Update localStorage
        renderTable();             // Re-render table
      }
    };
  
    // Initial table rendering on page load
    renderTable();
  });
  