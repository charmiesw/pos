let itemAutoCode = "I00-00";
let itemNo = 4;

setItemCode();

let isUpdateModeItem = false;
let selectedItemCode = null;

// ========== CHECKING MODE ==========
$('#onActionSaveItem').click(() => {
    if (isUpdateModeItem) {
        updateItem();
    } else {
        saveItem();
    }
});

// ========== SETTING THE ITEM CODE ==========
function setItemCode() {
    $('#itemCode').val(itemAutoCode+ itemNo);
    console.log(Number(itemNo));
}

getAllItems();

// ========== SAVING AN ITEM ==========
function saveItem() {
    let iCode = $('#itemCode').val();
    let name = $('#itemName').val();
    let quantity = $('#quantity').val();
    let unitPrice = $('#uPrice').val();

    let newItem = Object.assign({}, ItemOb);
    newItem.itemCode = iCode;
    newItem.itemName = name;
    newItem.itemQuantity = quantity;
    newItem.itemUnitPrice = unitPrice;

    if (true){
        itemDetails.push(newItem);
        getAllItems();
        clearItemFeilds();

        alert(" ITEM ADDED SUCCSESSFULLY..!!");

        itemNo++;
        setItemCode();
        console.log(itemNo);

    } else {
        alert("THIS ITEM ALREADY IN THIS SYSTEM");
        clearItemFeilds();
    }
}

// ========== GETTING ALL ITEMS ==========
function getAllItems() {
    $('#itemTbody').empty();
    for (let i = 0; i < itemDetails.length; i++) {
        let code = itemDetails[i].itemCode;
        let name = itemDetails[i].itemName;
        let quantity = itemDetails[i].itemQuantity;
        let up = itemDetails[i].itemUnitPrice;

        let itemRow = `<tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${up}</td>
                    <td><button class="delete-btn text-white btn btn-outline-danger" onclick="deleteItem('${code}', this)">Remove</button></td>
                </tr>`

        $('#tblItem').append(itemRow);
        bindItemTrEvents();
    }
}

// ========== CHANGING SAVE TO UPDATE ==========
function bindItemTrEvents() {
    $('#itemTbody>tr').click(function (event) {

        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let quantity = $(this).children().eq(2).text();
        let up = $(this).children().eq(3).text();

        $('#itemCode').val(code);
        $('#itemName').val(name);
        $('#quantity').val(quantity);
        $('#uPrice').val(up);

        selectedItemCode = code;
        isUpdateModeItem = true;
        $('#onActionSaveItem').text('U P D A T E').removeClass('save').addClass('update');

    });
}

// ========== UPDATING AN ITEM ==========
function updateItem() {

    let iCode = $('#itemCode').val();
    let name = $('#itemName').val();
    let quantity = $('#quantity').val();
    let unitPrice = $('#uPrice').val();

    let itemConsent = confirm("DO YOU WANT UPDATE THIS ITEM ?");

    if (itemConsent){
        for (let i = 0; i < itemDetails.length; i++) {
            if (itemDetails[i].itemCode == selectedItemCode){
                itemDetails[i].itemCode = iCode;
                itemDetails[i].itemName = name;
                itemDetails[i].itemQuantity = quantity;
                itemDetails[i].itemUnitPrice = unitPrice;
                
                getAllItems();
                clearItemFeilds();
                alert("ITEM UPDATED SUCCSESSFULLY..!!");
                break;
            }
        }

        isUpdateModeItem = false;
        selectedItemCode = null;
        $('#onActionSaveItem').text('A D D').removeClass('update').addClass('save');

    }else {
        clearItemFeilds();
    }

    setItemCode();

}

// ========== DELETING AN ITEM ==========
function deleteItem(itemCode, button) {
    let consent = confirm("DO U WANT DELETE THIS ITEM ?");

    if(consent){
        for (let i = 0; i < itemDetails.length; i++) {
            if (itemDetails[i].itemCode == itemCode){
                itemDetails.splice(i,1);
                getAllItems();
                clearItemFeilds()
    
                alert("ITEM DELETED SUCCSESSFULLY..!!");
                break;
            }
        }
    }else{
        clearItemFeilds();
    }

    setItemCode();
    
}

// ========== CLEARING THE FEILDS ==========
function clearItemFeilds() {
    $("#itemCode, #itemName, #quantity, #uPrice").val("");
    $('#itemCode').focus();
}

$('#searchItem').on('input', function () {
    filterItems();
});

//  ========== SEARCHING ITEMS ==========
function filterItems() {
    $('#itemTbody').empty();
    let searchValue = $('#searchItem').val().toLowerCase();
    for (let i = 0; i < itemDetails.length; i++) {
        if (itemDetails[i].itemCode.toLowerCase().includes(searchValue) ||
            itemDetails[i].itemName.toLowerCase().includes(searchValue) ||
            itemDetails[i].itemQuantity.toLowerCase().includes(searchValue) ) {

                let code = itemDetails[i].itemCode;
                let name = itemDetails[i].itemName;
                let quantity = itemDetails[i].itemQuantity;
                let up = itemDetails[i].itemUnitPrice;

            let row=`<tr>
                        <td>${code}</td>
                        <td>${name}</td>
                        <td>${quantity}</td>
                        <td>${up}</td>
                        <td><button class="delete-btn text-white btn btn-outline-danger" onclick="deleteItem('${code}', this)">Remove</button></td>
                    </tr>`

            $("#tblItem").append(row);
            bindItemTrEvents();
        }
    }
}