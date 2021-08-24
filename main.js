// Buttons
let accountsBtn    = document.querySelector("#accountsBtn");
let addAccountBtn  = document.querySelector("#addAccountBtn");
let editDeleteBtn  = document.querySelector("#editDeleteBtn");
let saveAccountBtn = document.querySelector("#saveAccountBtn");
let editAccountBtn = document.querySelector("#editAccountBtn");


// Views
let accountsView          = document.querySelector("#accountsView");
let addAccountView        = document.querySelector("#addAccountView");
let editDeleteAccountView = document.querySelector("#editDeleteAccountView");
let editAccountView       = document.querySelector("#editAccountView");

// Accounts tables
let accountsTable     = document.querySelector("#accountsTable");
let editAccountsTable = document.querySelector("#editAccountsTable"); 

// inputs
let full_name    = document.getElementsByName("full_name")[0];
let city         = document.getElementsByName("city")[0];
let credit_card  = document.getElementsByName("credit_card")[0];
let email        = document.getElementsByName("email")[0];
let phone        = document.getElementsByName("phone")[0];

// inputs edit
let full_name_edit    = document.getElementsByName("full_name_edit")[0];
let city_edit         = document.getElementsByName("city_edit")[0];
let credit_card_edit  = document.getElementsByName("credit_card_edit")[0];
let email_edit        = document.getElementsByName("email_edit")[0];
let phone_edit        = document.getElementsByName("phone_edit")[0];
let index;


// Listeners
accountsBtn.addEventListener("click",accountsTableDisplay);
addAccountBtn.addEventListener("click",addAccountFormDisplay);
editDeleteBtn.addEventListener("click",editDeleteTableDisplay);
saveAccountBtn.addEventListener("click",saveNewAccount);
editAccountBtn.addEventListener("click",editedAccount);


// Functions display tables and forms account
function accountsTableDisplay() {
    accountsView.style.display          = "block";
    addAccountView.style.display        = "none";
    editDeleteAccountView.style.display = "none";
    editAccountView.style.display       = "none";
}

function addAccountFormDisplay() {
    accountsView.style.display          = "none";
    addAccountView.style.display        = "block";
    editDeleteAccountView.style.display = "none";
    editAccountView.style.display       = "none";
}

function editDeleteTableDisplay() {
    accountsView.style.display          = "none";
    addAccountView.style.display        = "none";
    editDeleteAccountView.style.display = "block";
    editAccountView.style.display       = "none";
}

function editFormDisplay() {
    index = this.getAttribute("data-id");
    full_name_edit.value   = accountDb[index].full_name;
    city_edit.value        = accountDb[index].city;
    credit_card_edit.value = accountDb[index].credit_card;
    email_edit.value       = accountDb[index].email;
    phone_edit.value       = accountDb[index].phone;

    accountsView.style.display          = "none";
    addAccountView.style.display        = "none";
    editDeleteAccountView.style.display = "none";
    editAccountView.style.display       = "block";
}

// end of functions display tables and forms account


createTable();
createEditTable();

function createTable() {
    let txt = ``;
    for(let i = 0; i < accountDb.length; i++) {
        txt += `
        <tr>
            <td>${accountDb[i].full_name}</td>
            <td>${accountDb[i].city}</td>
            <td>${accountDb[i].credit_card}</td>
            <td>${accountDb[i].email}</td>
            <td>${accountDb[i].phone}</td>
        </tr>
        `;
    }
    accountsTable.innerHTML = txt;
}



function createEditTable() {
    let txt = ``;
    for(let i = 0; i < accountDb.length; i++) {
        txt += `
        <tr>
            <td>${accountDb[i].full_name}</td>
            <td>${accountDb[i].city}</td>
            <td>${accountDb[i].credit_card}</td>
            <td>${accountDb[i].email}</td>
            <td>${accountDb[i].phone}</td>
            <td><i data-id="${i}" class="btn btn-warning fas fa-user-edit form-control edit"></i></td>
            <td><i data-id="${i}" class="btn btn-danger far fa-trash-alt form-control delete"> </i></i></td>
        </tr>
        `;
    }
    editAccountsTable.innerHTML = txt;
    let deleteBtns = document.querySelectorAll(".delete");
    let editBtns   = document.querySelectorAll(".edit");
    for(let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click",deleteUser);
        editBtns[i].addEventListener("click",editFormDisplay);
    }
    
}

function deleteUser() {
    let index = this.getAttribute("data-id");
    let sure = confirm("Da li ste sigurni da hocete da obrisete?");
    if(sure) {
        accountDb.splice(index,1);
        createTable();
        createEditTable();
        accountsTableDisplay();
    }
}

function saveNewAccount(e) {
    e.preventDefault();
    let newAccount = {
        full_name: full_name.value,
        city: city.value,
        credit_card: credit_card.value,
        email: email.value,
        phone: phone.value
    }

    if(validate(newAccount)) {
       accountDb.push(newAccount);
       full_name.value = city.value = credit_card.value = email.value = phone.value = "";
       createTable();
       createEditTable();
       accountsTableDisplay();
    } else {
     alert("Greska,popunite formu ponovo");
    }
}

function validate(account) {
    if(account.full_name.length < 4 || account.city.length < 5 || account.credit_card.length < 5 || account.phone.length < 5) {
        return false;
    } else {
        return true;
    }
}


function editedAccount(e) {
    e.preventDefault();
    accountDb[index] = {
        full_name: full_name_edit.value,
        city: city_edit.value,
        credit_card: credit_card_edit.value,
        email: email_edit.value,
        phone: phone_edit.value
    }
    createTable();
    accountsTableDisplay();
}