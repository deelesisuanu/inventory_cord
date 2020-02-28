$(document).ready(function() {

    appStock.clear();

    window.cordova.plugins.snackbar.create('This is a indefinite snackbar text', 'INDEFINITE', "Dismiss", function() {
        console.log('Dismiss Button Clicked!');
    });

    $("#staffCheck").change(function() {

        const data = "staff";
        if ($(this).is(':checked')) {
            if (app.checkItem(data)) {
                $(this).prop("checked", true);
            } else {
                app.addItem(data, 1);
            }
        } else {
            app.removeItem(data);
        }

    });

    $("#fleetCheck").change(function() {

        const data = "fleet";
        if ($(this).is(':checked')) {
            if (app.checkItem(data)) {
                $(this).prop("checked", true);
            } else {
                app.addItem(data, 1);
            }
        } else {
            app.removeItem(data);
        }

    });

    $("#tripCheck").change(function() {

        const data = "trip";
        if ($(this).is(':checked')) {
            if (app.checkItem(data)) {
                $(this).prop("checked", true);
            } else {
                app.addItem(data, 1);
            }
        } else {
            app.removeItem(data);
        }

    });

    $("#maintainCheck").change(function() {

        const data = "maintain";
        if ($(this).is(':checked')) {
            if (app.checkItem(data)) {
                $(this).prop("checked", true);
            } else {
                app.addItem(data, 1);
            }
        } else {
            app.removeItem(data);
        }

    });

    $("#financeCheck").change(function() {

        const data = "finance";
        if ($(this).is(':checked')) {
            if (app.checkItem(data)) {
                $(this).prop("checked", true);
            } else {
                app.addItem(data, 1);
            }
        } else {
            app.removeItem(data);
        }

    });

    $("#othersCheck").change(function() {

        const data = "others";
        if ($(this).is(':checked')) {
            if (app.checkItem(data)) {
                $(this).prop("checked", true);
            } else {
                app.addItem(data, 1);
            }
        } else {
            app.removeItem(data);
        }

    });

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

    function autoAdd() {

        const staffData = "staff";
        const tripData = "fleet";
        const fleetData = "trip";
        const maintainData = "maintain";
        const financeData = "finance";
        const otherData = "others";

        if ($("#staffCheck").is(':checked')) {
            app.addItem(staffData, 1);
        }

        if ($("#fleetCheck").is(':checked')) {
            app.addItem(fleetData, 1);
        }

        if ($("#tripCheck").is(':checked')) {
            app.addItem(tripData, 1);
        }

        if ($("#maintainCheck").is(':checked')) {
            app.addItem(maintainData, 1);
        }

        if ($("#financeCheck").is(':checked')) {
            app.addItem(financeData, 1);
        }

        if ($("#othersCheck").is(':checked')) {
            app.addItem(otherData, 1);
        }

    }

    $(".assign-admin").click(function() {

        let listData1 = app.list();
        let listData = JSON.stringify(listData1);

        let lister = convertArrayToObject(listData1, 'name');

        let lister2 = JSON.stringify(lister);

        const adminId = $("#current_adminId").val();
        const terminal = $("#current_adminTerminal").val();

        if (listData1.length == 0) {
            alert("Select an Option");
            return;
        }

        const formData = new FormData();
        formData.append("list", listData);
        formData.append("admin", adminId);
        formData.append("terminal", terminal);

        const url = "../api/services/admin-assign.php";

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
                Validations.reset(
                    "assign-admin",
                    "passive-message",
                    "none"
                );

                Validations.setVisibility("assign-admin", "block");
                Validations.setVisibility("spinner_", "none");

                var json = JSON.parse(text);
                if (json.test) {
                    // show message
                    // const pass = json.pass;
                    Message.messageBoxConfirm(json.msg, true, "view-staffs");
                } else {
                    Validations.setHtmlErrorBgColor("passive-message");
                    Validations.setHtmlMessage(
                        "passive-message",
                        json.msg
                    );
                    Validations.setHtmlColor("passive-message", "white");
                    Validations.reset(
                        "assign-admin",
                        "passive-message",
                        "none"
                    );
                }

            }
        ).catch(
            function(error) {
                console.log(error);
            }
        );

    });

    $(".make-stock").click(function() {
        const name = $("#name").val();
        const stock = $("#stock").val();
        const company = $("#company").val();
        const type = $("#type").val();
        const amount = $("#amount").val();



    });

});