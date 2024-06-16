let OrderAutoId = "O00-00";
let orderNo = 1;

cusNames();
itemNames();
setOrderId();

function cusNames() {
    var optionCus = '';
    for (var i = 0; i < customerDetails.length; i++) {
        optionCus += '<option value="' + customerDetails[i].customerName + '">' + customerDetails[i].customerName + '</option>';
    }
    $('#cmbCusNames').append(optionCus);
    $('filterInputCusName').val($('#cmbCusNames').val);
}

function itemNames() {
    var optionItem = '';
    for (var i = 0; i < itemDetails.length; i++) {
        optionItem += '<option value="' + itemDetails[i].itemName + '">' + itemDetails[i].itemName + '</option>';
    }
    $('#cmbItemNames').append(optionItem);
    $('filterInputItemName').val($('#cmbItemNames').val);
}

// ========== SETTING THE ORDER ID ==========
function setOrderId() {
    $('#InputOID').val(OrderAutoId + orderNo);
    console.log(Number(orderNo));
}

// ========== LOADING CUSTOMERS ==========
$('#filterInputCusName').change(function () {
    for (let i = 0; i < customerDetails.length; i++) {
        if ($(this).val() == customerDetails[i].customerName){
            $('#selectedCusId').val(customerDetails[i].customerId);
            $('#selectedCusName').val(customerDetails[i].customerName);
            break;
        }
    }
});

// ========== LOADING ITEMS ==========
$('#filterInputItemName').change(function () {
    for (let i = 0; i < itemDetails.length; i++) {
        if ($(this).val() == itemDetails[i].itemName){
            $('#selectedItemCode').val(itemDetails[i].itemCode);
            $('#selectedItemName').val(itemDetails[i].itemName);
            $('#selectedItemUP').val(itemDetails[i].itemUnitPrice);
            break;
        }
    }
});

$("#btnAddToCart").click(function () {
    addToCart();
});

// ========== ADDING DETAILS TO THE CART ==========
function addToCart() {
    let subTotal = 0;
    let oItemCode = $("#selectedItemCode").val();
    let oItemName = $("#selectedItemName").val();
    let oItemUnitPrice = $("#selectedItemUP").val();
    let oItemQty = $("#selectedQty").val();
    let oTotal = oItemUnitPrice*oItemQty;

    let newCart = Object.assign({}, cartOb);
    newCart.ICode = oItemCode;
    newCart.IName = oItemName;
    newCart.IUnitPrice = oItemUnitPrice;
    newCart.IQty = oItemQty;
    newCart.ITotal = oTotal;

    orderDetailDb.push(newCart);

    let row=`<tr>
                    <td>${newCart.ICode}</td>
                    <td>${newCart.IName}</td>
                    <td>${newCart.IUnitPrice}</td>
                    <td>${newCart.IQty}</td>
                    <td>${newCart.ITotal}</td>
                    <td><button class="delete-btn text-white btn btn-outline-danger btn-xs" onclick="deleteItem('${newCart.ICode}', this)">Remove</button></td>
                </tr>`;

    $("#tBodyPlaceOrder").append(row);

    clearItemDetails();

    for (let i = 0; i <= orderDetailDb.length; i++) {
        subTotal += orderDetailDb[i].ITotal;
        $('#inputTotal').val(parseInt(subTotal));
        console.log(parseInt(subTotal));
    }
}

// ========== SETTING THE BALANCE ==========
$('#inputCash').keydown(function (event){

    if (event.key === 'Enter'){
        let balance = Number($('#inputCash').val())-Number($('#inputTotal').val());

        $('#balance').val(balance);
    }

});

$('#btnPurchase').click(function () {
    purchaseOrder();
});

// ========== PURCHASING THE ORDER ==========
function purchaseOrder() {
    let IdOfOrder = $('#InputOID').val();
    let cusIDOfOrder = $('#selectedCusId').val();
    let cusNameOfOrder = $('#selectedCusName').val();
    let dateOfOrder = $('#InputDate').val();
    let cartDetails = orderDetailDb;
    let subTotal = $('#inputTotal').val();

    let newOrder = Object.assign({},orderOb);
    newOrder.id = IdOfOrder;
    newOrder.customerId = cusIDOfOrder;
    newOrder.customerName = cusNameOfOrder;
    newOrder.date = dateOfOrder;
    newOrder.cartDetail = cartDetails;
    newOrder.total = subTotal;

    orderDb.push(newOrder);


    orderNo++;
    setOrderId();
    console.log(orderNo);

    orderDetailDb=[];
    alert("ORDER PLACED SUCCESSFULLY..!!");
    console.log(orderDb);
    clearFields();
    getAllOrder();
}

// ========== CLEARING THE DETAILS ==========
function clearFields() {
    $("#inputCash").val("");
    $("#selectedCusID").val("");
    $("#selectedCusName").val("");
    $("#inputTotal").val("");
    $("#selectedItemCode").val("");
    $("#selectedItemName").val("");
    $("#tBodyPlaceOrder").empty();
    $("#selectedItemUP").val("");
    $("#selectedQty").val("");
    $("#balance").val("");
    $("#filterInputCusName").val("");
    $("#filterInputItemName").val("");
}


function clearItemDetails() {
    $("#selectedItemCode").val("");
    $("#selectedItemName").val("");
    $("#selectedItemUP").val("");
    $("#selectedQty").val("");
    $("#filterInputItemName").val("");
}