getAllOrders();

// ========== GETTING ALL ORDERS ==========
function getAllOrders() {
    $("#tblBodyOrders").empty();

    console.log(orderDb)

    for (let i = 0; i < orderDb.length; i++) {
        let id = orderDb[i].id;
        let date = orderDb[i].date;
        let cusID = orderDb[i].customerId;
        let cusName = orderDb[i].customerName;
        let total = orderDb[i].total;

        for(let j = 0; j < orderDb[i].cartDetail.length; j++){
            let iID = orderDb[i].cartDetail[j].ICode;
            let iName = orderDb[i].cartDetail[j].IName;
            let iUP = orderDb[i].cartDetail[j].IUnitPrice;
            let iQty = orderDb[i].cartDetail[j].IQty;

            let row = `<tr>
                     <td>${id}</td>
                     <td>${cusID}</td>
                     <td>${cusName}</td>
                     <td>${date}</td>
                     <td>${iID}</td>
                     <td>${iName}</td>
                     <td>${iUP}</td>
                     <td>${iQty}</td>
                     <td>${total}</td>
                    </tr>`

            $("#tableOrder").append(row);
        }

    }
}