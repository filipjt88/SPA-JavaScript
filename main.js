// Filter search
let search = document.querySelector("#search");

// Buttons
let accountsBtn           = document.querySelector("#accountsBtn");
let addAccountBtn         = document.querySelector("#addAccountBtn");
let editDeleteBtn         = document.querySelector("#editDeleteBtn");
let saveAccountBtn        = document.querySelector("#saveAccountBtn");
let editAccountBtn        = document.querySelector("#editAccountBtn");


// Views
let accountsView          = document.querySelector("#accountsView");
let addAccountView        = document.querySelector("#addAccountView");
let editDeleteAccountView = document.querySelector("#editDeleteAccountView");
let editAccountView       = document.querySelector("#editAccountView");


// Accounts tables
let accountsTable         = document.querySelector("#accountsTable");
let editAccountsTable     = document.querySelector("#editAccountsTable"); 



// inputs
let full_name             = document.getElementsByName("full_name")[0];
let city                  = document.getElementsByName("city")[0];
let credit_card           = document.getElementsByName("credit_card")[0];
let email                 = document.getElementsByName("email")[0];
let phone                 = document.getElementsByName("phone")[0];


// Edit inputs
let full_name_edit        = document.getElementsByName("full_name_edit")[0];
let city_edit             = document.getElementsByName("city_edit")[0];
let credit_card_edit      = document.getElementsByName("credit_card_edit")[0];
let email_edit            = document.getElementsByName("email_edit")[0];
let phone_edit            = document.getElementsByName("phone_edit")[0];
let index;



// Listeners
accountsBtn.addEventListener("click",accountsTableDisplay);
addAccountBtn.addEventListener("click",addAccountFormDisplay);
editDeleteBtn.addEventListener("click",editDeletTableDisplay);
saveAccountBtn.addEventListener("click",saveNewAccount);
editAccountBtn.addEventListener("click",saveEditAccount);
search.addEventListener("keyup",function() {
    let term = this.value;
    let filtered = accountDb.filter(function(acc) {
        if(acc.full_name.indexOf(term) > -1 || acc.city.indexOf(term) > -1 || acc.credit_card.indexOf(term) > -1 || acc.email.indexOf(term) > -1 || acc.phone.indexOf(term) > -1) {
            return true;
        } else {
            return false;
        }
    })
    createTable(filtered);
})


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

function editDeletTableDisplay() {
    accountsView.style.display          = "none";
    addAccountView.style.display        = "none";
    editDeleteAccountView.style.display = "block";
    editAccountView.style.display       = "none";
}

function editFormDisplay() {
    accountsView.style.display          = "none";
    addAccountView.style.display        = "none";
    editDeleteAccountView.style.display = "none";
    editAccountView.style.display       = "block";
    index                  = this.getAttribute("data-id");
    full_name_edit.value   = accountDb[index].full_name;
    city_edit.value        = accountDb[index].city;
    credit_card_edit.value = accountDb[index].credit_card;
    email_edit.value       = accountDb[index].email;
    phone_edit.value       = accountDb[index].phone;
}

// end of functions display tables and forms account


createTable();
createEditTable();


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
        full_name.value = city.value = credit_card.value = email.value = phone.value = ""; 
        accountDb.push(newAccount);
        save();
        createTable();
        createEditTable();
        accountsTableDisplay();
    } else {
        alert("Error input");
    }
}

function validate(account) {
    if(account.full_name.length < 3 || account.city.length < 3 || account.credit_card.length < 3  || account.phone.length < 3) {
        return false;
    } else {
        return true;
    }
}


function saveEditAccount(e) {
    e.preventDefault();
    accountDb[index] = {
        full_name: full_name_edit.value,
        city: city_edit.value,
        credit_card: credit_card_edit.value,
        email: email_edit.value,
        phone: phone_edit.value
    }
    save();
    let edit = confirm("Da li ste sigurni da hocete da izmenite " + accountDb[index].full_name + " ?");
    if(edit) {
    createTable();
    createEditTable();
    accountsTableDisplay();
    }
}



function createTable(accounts = accountDb) {
    let text = ``;
    accounts.forEach(accounted => {
        text += `
        <tr>
        <td>${accounted.full_name}</td>
        <td>${accounted.city}</td>
        <td>${accounted.credit_card}</td>
        <td>${accounted.email}</td>
        <td>${accounted.phone}</td>
        </tr>
        `;
    })
    accountsTable.innerHTML = text;
}



function createEditTable() {
    let text = ``;
    accountDb.forEach((accounted,index) => {
        text += `
        <tr>
            <td>${accounted.full_name}</td>
            <td>${accounted.city}</td>
            <td>${accounted.credit_card}</td>
            <td>${accounted.email}</td>
            <td>${accounted.phone}</td>
            <td><i data-id="${index}" class="btn btn-warning fas fa-user-edit form-control edit"></i></td>
            <td><i data-id="${index}" class="btn btn-danger far fa-trash-alt form-control delete"> </i></i></td>
        </tr>
        `;
    })
    editAccountsTable.innerHTML = text;
    let deleteAcc = document.querySelectorAll(".delete");
    let editAcc   = document.querySelectorAll(".edit");
    for(let i = 0; i < deleteAcc.length; i++) {
        deleteAcc[i].addEventListener("click",deleteAccount);
        editAcc[i].addEventListener("click",editFormDisplay);
    }
    
}

function deleteAccount() {
    index = this.getAttribute("data-id");
    let sure = confirm("Da li ste sigurni da hocete da obrisete " + accountDb[index].full_name + " ?");
  if(sure) {
    accountDb.splice(index,1);
    save();
    createTable();
    createEditTable();
    accountsTableDisplay();
    }
}

function save() {
    localStorage.accountDb = JSON.stringify(accountDb);
}
