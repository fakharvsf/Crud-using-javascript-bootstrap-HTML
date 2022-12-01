var selectedRow = null;

///For Showing Alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".ali");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 2000);
}
///Clear all Fields
function clearField() {
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#rollno").value = "";
}

//ADD Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get form Values

  const firstName = document.querySelector("#firstname").value;
  const lastName = document.querySelector("#lastname").value;
  const rollno = document.querySelector("#rollno").value;

  //Validiate
  if (firstName == "" || lastName == "" || rollno == "") {
    showAlert("Please Fill in All the Balnks", "danger");
  } else if (isNaN(rollno)) {
    showAlert("Roll number is not integer", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollno}</td>
            <td>
              <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
              <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Student Added", "success");
    } else {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = rollno;
      selectedRow = null;
      showAlert("Student info edited", "info");
    }
    clearField();
  }
});

////Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstname").value =
      selectedRow.children[0].textContent;
    document.querySelector("#lastname").value =
      selectedRow.children[1].textContent;
    document.querySelector("#rollno").value =
      selectedRow.children[2].textContent;

    // showAlert("Student Data is being edited", "info");
  }
});

///Delete Data

const ali = document.querySelector("#student-list");
ali.addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Student Data Deleted", "danger");
  }
});
