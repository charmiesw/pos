let CusAutoId = "C00-00";
let cusNo = 4;

setCusId();

let isUpdateMode = false;
let selectedCustomerId = null;

// ========== CHECKING MODE ==========
$('#onActionSave').click(() => {
    if (isUpdateMode) {
        updateCustomer();
    } else {
        saveCustomer();
    }
});

// ========== SETTING THE CUSTOMER ID ==========
function setCusId() {
    $('#cusId').val(CusAutoId + cusNo);
    console.log(Number(cusNo));
}

getAllCustomers();

// ========== SAVING A CUSTOMER ==========
function saveCustomer() {
    let cusId = $('#cusId').val();
    let cusName = $('#cusName').val();
    let cusAddress = $('#cusAddress').val();
    let cusContact = $('#cusContact').val();

    let newCustomer = Object.assign({}, customerOb);
    newCustomer.customerId = cusId;
    newCustomer.customerName = cusName;
    newCustomer.customerAddress = cusAddress;
    newCustomer.customerContact = cusContact;

    if (true){
        customerDetails.push(newCustomer);
        console.log(customerDetails);
        clearCustomerFeilds();
        getAllCustomers();

        alert(" CUSTOMER SAVED SUCCSESSFULLY..!!");

        cusNo++;
        setCusId();
        console.log(cusNo);

    } else {
        alert("THIS CUSTOMER ALREADY IN THIS SYSTEM");
        clearCustomerFeilds();
    }
}

// ========== GETTING ALL CUSTOMERS ==========
function getAllCustomers() {
    $('#customerTbody').empty();
    for (let i = 0; i < customerDetails.length ; i++) {

        let id = customerDetails[i].customerId;
        let name = customerDetails[i].customerName;
        let address = customerDetails[i].customerAddress;
        let contact = customerDetails[i].customerContact;

        let row = `<tr>
                    <td> ${id} </td>
                    <td> ${name} </td>
                    <td> ${address} </td>
                    <td> ${contact} </td>
                    <td><button class="delete-btn text-white btn btn-outline-danger btn-xs" onclick="deleteCustomer('${id}', this)">Remove</button></td>
                </tr>`
        $("#tblcustomer").append(row);
        bindCustomerTrEvents();
    }
}

// ========== CHANGING SAVE TO UPDATE ==========
function bindCustomerTrEvents() {
    $('#customerTbody>tr').click(function (event) {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $('#cusId').val(id);
        $('#cusName').val(name);
        $('#cusAddress').val(address);
        $('#cusContact').val(contact);

        selectedCustomerId = id;
        isUpdateMode = true;
        $('#onActionSave').text('U P D A T E').removeClass('save').addClass('update');

    });
}

// ========== UPDATING A CUSTOMER ==========
function updateCustomer() {

    let cusId = $('#cusId').val();
    let cusName = $('#cusName').val();
    let cusAddress = $('#cusAddress').val();
    let cusContact = $('#cusContact').val();

    let consent = confirm("DO U WANT TO UPDATE THIS CUSTOMER ?");

    if (consent){
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].customerId == selectedCustomerId){
                customerDetails[i].customerId = cusId;
                customerDetails[i].customerName = cusName;
                customerDetails[i].customerAddress = cusAddress;
                customerDetails[i].customerContact = cusContact;

                getAllCustomers();
                clearCustomerFeilds();
                alert("CUSTOMER UPDATED SUCCSESSFULLY..!!");

                break;
            }
        }

        isUpdateMode = false;
        selectedCustomerId = null;
        $('#onActionSave').text('REGISTER CUSTOMER').removeClass('update').addClass('save');

    } else {
        clearCustomerFeilds();
    }
    setCusId();
}

// ========== DELETING A CUSTOMER ==========
function deleteCustomer(customerId, button) {
    let consent = confirm("DO U WANT TO DELETE THIS CUSTOMER ?");

    if(consent){
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].customerId == customerId){
                customerDetails.splice(i,1);
                getAllCustomers();
                clearCustomerFeilds();
    
                alert("CUSTOMER DELETED SUCCSESSFULLY..!!");
                break;
            }
        }
    } else {
        clearCustomerFeilds();
    }

    setCusId();
    
}

// ========== CLEARING THE FEILDS ==========
function clearCustomerFeilds() {
    $("#cusId, #cusName, #cusAddress, #cusContact").val("");
    $('#cusId').focus();
}

$('#searchCus').on('input', () => {
    filterCustomers();
});

//  ========== SEARCHING CUSTOMERS ==========
function filterCustomers() {
    $('#customerTbody').empty();
    let searchValue = $('#searchCus').val().toLowerCase();

    for (let i = 0; i < customerDetails.length; i++) {
        if (customerDetails[i].customerId.toLowerCase().includes(searchValue) ||
            customerDetails[i].customerName.toLowerCase().includes(searchValue) ||
            customerDetails[i].customerAddress.toLowerCase().includes(searchValue) ||
            customerDetails[i].customerContact.toLowerCase().includes(searchValue)) {

            let id = customerDetails[i].customerId;
            let name = customerDetails[i].customerName;
            let address = customerDetails[i].customerAddress;
            let contact = customerDetails[i].customerContact;

            let row = `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${address}</td>
                        <td>${contact}</td>
                        <td><button class="delete-btn text-white btn btn-outline-danger btn-xs" onclick="deleteCustomer('${id}', this)">Remove</button></td>
                    </tr>`;

            $("#customerTbody").append(row);
            bindCustomerTrEvents();
        }
    }
}