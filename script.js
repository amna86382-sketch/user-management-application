const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const cityInput = document.getElementById("city");
const userList = document.getElementById("userList");
const submitBtn = document.getElementById("submitBtn");
const emptyMessage = document.getElementById("emptyMessage");
// localStorage se users load karna
let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = -1;
// Form submit hone par user add ya update hoga
userForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const city = cityInput.value.trim();
    const user = {
        id: editIndex === -1 ? Date.now() : users[editIndex].id,
        name: name,
        email: email,
        phone: phone,
        city: city
    };
    if (editIndex === -1) {
        // Create: naya user add karna
        users.push(user);
    } else {
        // Update: purana user edit karna
        users[editIndex] = user;
        editIndex = -1;
        submitBtn.textContent = "Add User";
    }
    localStorage.setItem("users", JSON.stringify(users));

    userForm.reset();
    displayUsers();
});
// Users ko table mein show karna
function displayUsers() {
    userList.innerHTML = "";
    emptyMessage.style.display = users.length === 0 ? "block" : "none";
    for (let i = 0; i < users.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="edit-btn" data-index="${i}">Edit</button>
                <button class="delete-btn" data-index="${i}">Delete</button>
            </td>
        `;
        // User ka data safely table mein lagana
        row.cells[1].textContent = users[i].name;
        row.cells[2].textContent = users[i].email;
        row.cells[3].textContent = users[i].phone;
        row.cells[4].textContent = users[i].city;
        userList.appendChild(row);
    }
}
// Edit aur Delete buttons handle karna
userList.addEventListener("click", function(event) {
    const index = Number(event.target.dataset.index);
    if (event.target.dataset.index === undefined) {
        return;
    }
    if (event.target.classList.contains("edit-btn")) {
        // User ki details form mein lana
        nameInput.value = users[index].name;
        emailInput.value = users[index].email;
        phoneInput.value = users[index].phone;
        cityInput.value = users[index].city;
        editIndex = index;
        submitBtn.textContent = "Update User";
    }
    if (event.target.classList.contains("delete-btn")) {
        // Delete: user remove karna
        users.splice(index, 1);
        if (editIndex === index) {
            editIndex = -1;
            userForm.reset();
            submitBtn.textContent = "Add User";
        } else if (editIndex > index) {
            editIndex--;
        }
        localStorage.setItem("users", JSON.stringify(users));
        displayUsers();
    }
});
// Page load hone par saved users show karna
displayUsers();
