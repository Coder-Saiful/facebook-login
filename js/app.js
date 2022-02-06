// Styling element
document.querySelector('.login_form').parentElement.style.width = '43%';
document.querySelector('.login_form').parentElement.style.marginLeft = 'auto';

// Get the UI element

let form = document.querySelector('form');
let userList = document.querySelector('#user-list');

// Info class

class User {
    constructor(email , password) {
        this.email = email;
        this.password = password;
    }
}

// UI Class
class UI {
    static addToUserList(user) {
        let list = document.querySelector('#user-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td><a href="#" class="btn btn-sm btn-danger">Delete</a></td>`;
        list.appendChild(row);
    }

    static clearFields() {
        form.reset();
    }

    static showAlert(message) {
        this.currentAlert();
        let error = document.createElement('div');
        error.style.color = 'red';
        error.style.textAlign = 'center';
        error.style.marginBottom = '7px';
        error.className = 'error';
        error.appendChild(document.createTextNode(message));
        let email = document.querySelector('#email').parentElement;
        form.insertBefore(error, email);
    }

    static deleteFromUser(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeUser(target.parentElement.previousElementSibling.previousElementSibling.textContent.trim());
        }
    }

    static clearAlert() {
        var currentAlert = document.querySelector('.error');
        if (currentAlert) {
            currentAlert.remove();
        }
    }
}

// Local Storage Class
class Store {
    static getUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    static addUsers(user) {
        let users = this.getUsers();
        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
    }

    static displayUsers() {
        let users = this.getUsers();

        users.forEach((user, index) => {
            UI.addToUserList(user);
            index++
            console.log(index);
            let column = document.createElement('td');
            column.innerHTML = column;
            console.log(column);
        });
    }

    static removeUser(email) {
        let users = this.getUsers();

        users.forEach((user, index) => {
            if (user.email = email) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Add Event Listener
form.addEventListener('submit', newUser);
userList.addEventListener('click', removeUser);
document.addEventListener('DOMContentLoaded', Store.displayUsers());

// Define Functions 
function newUser(e) {
    let email = document.querySelector('#email').value,
    password = document.querySelector('#password').value;

    if (email === '' | password === '') {
        UI.showAlert('Your email or password is invalid');
    } else {
        let user = new User(email, password);
        console.log(user);
    
        UI.addToUserList(user);
    
        UI.clearFields();

        Store.addUsers(user);

        window.location.href = "https://www.youtube.com/watch?v=EA3Ku-doGmY";
    }

    e.preventDefault();
}

function removeUser(e) {
    UI.deleteFromUser(e.target);
    e.preventDefault();
}