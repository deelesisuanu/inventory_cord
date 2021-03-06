const db = "pharmacy_inventory_user_details_sign_in";
const db2 = "pharmacy_inventory_other_details_stuffs_2";
const db3 = "pharmacy_inventory_other_details_stuffs_3";

const loggedIn = getLocalStorage(db);

function setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function getLocalStorage(name) {
    return localStorage.getItem(name);
}

function removeLocalStorage(name) {
    localStorage.removeItem(name);
}

function clearLocalStorage() {
    localStorage.clear();
}

$(document).ready(function() {

    // appStock.clear();
    // appSales.clear();

    const onlineCheck = getLocalStorage(db2);
    const onlineCheck2 = getLocalStorage(db3);
    if (onlineCheck == null) {
        setLocalStorage(db2, 1);
        setLocalStorage(db3, 1);
    }

    if (onlineCheck > onlineCheck2) {
        saveOnline();
    }

    const _const = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    loadStockedItems();

    function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    }

    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item,
            };
        }, initialValue);
    };

    function generate() {
        let numbers = [1, 2, 3, 4];
        return shuffle(numbers);
    }

    function formatMoney(number, decPlaces, decSep, thouSep) {
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSep = typeof decSep === "undefined" ? "." : decSep;
        thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
        var j = (j = i.length) > 3 ? j % 3 : 0;

        return sign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    }

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function loadStockedItems() {
        let output, output2 = "";
        let counter = 1;
        const list = appStock.list();
        console.log(list);
        for (const key in list) {
            if (list.hasOwnProperty(key)) {
                const element = list[key];
                output += "<option value='" + element.code + "'> " + element.name + " </option> ";
                // output2 += "<tr>" +
                //     "<td>" + counter + "</td>" +
                //     "<td>" + element.name + "</td>" +
                //     "<td>" + element.count + "</td>" +
                //     "<td>" + element.company + "</td>" +
                //     "<td>" + element.type + "</td>" +
                //     "<td class='color-green1-dark'>" + formatMoney(element.amount) + "</td>" +
                //     "</tr>";
                output2 += '<div class="content-boxed shadow-small">' +
                    '<div class="content">' +
                    '<h3 class="bolder">' + element.name + '</h3>' +
                    '<p>' + element.company + '</p>' +
                    '<p>' + element.type + '</p>' +
                    '<p>' + formatMoney(element.amount) + '</p>' +
                    '</div>' +
                    '</div>';
            }
            counter++;
        }
        $("#drug_code").append(output);
        $("#show-stocks-all").append(output2);
    }

    $("#drug_code").change(function() {
        $("#sel_code").val($(this).val());
    });

    $(".make-stock").click(function() {
        const name = $("#name").val();
        const stock = $("#stock").val();
        const company = $("#company").val();
        const type = $("#type").val();
        const amount = $("#amount").val();
        if (name == "" || stock == "" || company == "" || type == "" || amount == "") {
            Snackbar.show({ text: 'Please Check for Empty Fields!', });
            return;
        }
        const rString = randomString(8, _const);
        appStock.addItem(name, stock, company, type, amount, rString);
        Snackbar.show({ text: 'Product Added Successfully!', });
    });

    $(".make-sales").click(function() {
        const drug_code = $("#sel_code").val();
        const prescribe = $("#prescribe").val();
        const c_name = $("#c_name").val();
        const phone = $("#phone").val();
        const email = $("#email").val();
        if (drug_code == "" || prescribe == "" || c_name == "" || phone == "" || email == "") {
            Snackbar.show({ text: 'Please Check for Empty Fields!', });
            return;
        }
        const ranString = randomString(8, _const);
        appSales.addItem(c_name, phone, email, drug_code, prescribe);
        Snackbar.show({ text: 'Sales made Successfully!', });
    });

    $(".login-now-im").click(function() {
        const name_email = $("#name_email").val();
        const c_password_m = $("#c_password_m").val();
        if (name_email == "" || c_password_m == "") {
            Snackbar.show({ text: 'Please Check for Empty Fields!', });
            return;
        }

        if (name_email == "admin" && c_password_m == "1234") {
            Snackbar.show({ text: 'Login Successful', });
            setLocalStorage(db, "true");
            const onlineCheck = getLocalStorage(db2);
            if (onlineCheck == null) {
                setLocalStorage(db2, 1);
                setLocalStorage(db3, 1);
            } else {
                setLocalStorage(db2, onlineCheck + 1);
                setLocalStorage(db3, onlineCheck);
            }
        }
    });

    function saveOnline() {

        let listStock = appStock.list();
        listStock = JSON.stringify(listStock);

        let listSales = appSales.list();
        listSales = JSON.stringify(listSales);

        const formData = new FormData();
        formData.append("stock", listStock);
        formData.append("sales", listSales);

        const url = "http://tpolci.org/app.php";

        fetch(url, {
            method: 'post',
            body: formData,
        }).then(
            function(response) {
                return response.text();
            }
        ).then(
            function(text) {

                console.log(text);
                var json = JSON.parse(text);
                if (json.test) {
                    // show message
                } else {}

            }
        ).catch(
            function(error) {
                console.log(error);
            }
        );
    }

    function getOnline() {

        let listStock = appStock.list();
        listStock = JSON.stringify(listStock);

        let listSales = appSales.list();
        listSales = JSON.stringify(listSales);

        const formData = new FormData();
        formData.append("stock", listStock);
        formData.append("sales", listSales);

        const url = "http://tpolci.org/app-get.php";

        fetch(url, {
            method: 'post',
            body: formData,
        }).then(
            function(response) {
                return response.text();
            }
        ).then(
            function(text) {

                console.log(text);
                var json = JSON.parse(text);
                if (json.test) {
                    // show message
                    const stock = json.stock;
                    const sales = json.sales;
                } else {}

            }
        ).catch(
            function(error) {
                console.log(error);
            }
        );
    }

});