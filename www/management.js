// ***************************************************

const appStock = (function() {
    // Private methods and properties
    var cart = [];
    var cartDb = "drug_112087_store_09999_pharmacy_1654_inventory_998";

    function Item(name, count, company, type, amount, code) {
        this.name = name;
        this.count = count;
        this.company = company;
        this.type = type;
        this.amount = amount;
        this.code = code;
    }

    function saveCart() {
        localStorage.setItem(cartDb, JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem(cartDb));
        if (cart === null) {
            cart = [];
        }
    }

    loadCart();

    // Public methods and properties
    var obj = {};

    obj.addItem = function(name, count, company, type, amount, code) {
        for (var i in cart) {
            if (cart[i].code === code) {
                saveCart();
                return;
            }
        }
        var item = new Item(name, count, company, type, amount, code);
        cart.push(item);
        saveCart();
    };

    obj.checkItem = function(code) {
        for (var i in cart) {
            if (cart[i].code === code) {
                saveCart();
                return true;
            }
        }
        return false;
    };

    obj.setCountForItem = function(code, count) {
        for (var i in cart) {
            if (cart[i].code === code) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };

    obj.removeItem = function(code) { // Removes one item
        for (var i in cart) {
            if (cart[i].code === code) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemAll = function(code) { // removes all item name
        for (var i in cart) {
            if (cart[i].code === code) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    obj.clear = function() {
        cart = [];
        saveCart();
    };

    obj.countCart = function() { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function() { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            // totalCost += cart[i].price * cart[i].count;
        }
        // return totalCost.toFixed(2);
        return totalCost;
    };

    obj.list = function() { // -> array of Items
        var cartCopy = [];
        // console.log("Listing cart");
        // console.log(cart);
        for (var i in cart) {
            // console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            // itemCopy.total = (item.price * item.count).toFixed(2);
            // itemCopy.total = (item.price * item.count);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();

const appSales = (function() {
    // Private methods and properties
    var cart = [];
    var cartDb = "drug_112087_store_09999_pharmacy_1654_inventory_99108";

    function Item(c_name, phone, email, code, prescribe, saleCode) {
        this.c_name = c_name;
        this.phone = phone;
        this.email = email;
        this.code = code;
        this.prescribe = prescribe;
        this.saleCode = saleCode;
    }

    function saveCart() {
        localStorage.setItem(cartDb, JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem(cartDb));
        if (cart === null) {
            cart = [];
        }
    }

    loadCart();

    // Public methods and properties
    var obj = {};

    obj.addItem = function(c_name, phone, email, code, prescribe, saleCode) {
        for (var i in cart) {
            if (cart[i].code === code) {
                saveCart();
                return;
            }
        }
        var item = new Item(c_name, phone, email, code, prescribe, saleCode);
        cart.push(item);
        saveCart();
    };

    obj.checkItem = function(code) {
        for (var i in cart) {
            if (cart[i].code === code) {
                saveCart();
                return true;
            }
        }
        return false;
    };

    obj.setCountForItem = function(code, count) {
        for (var i in cart) {
            if (cart[i].code === code) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };

    obj.removeItem = function(code) { // Removes one item
        for (var i in cart) {
            if (cart[i].code === code) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemAll = function(code) { // removes all item name
        for (var i in cart) {
            if (cart[i].code === code) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    obj.clear = function() {
        cart = [];
        saveCart();
    };

    obj.countCart = function() { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function() { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            // totalCost += cart[i].price * cart[i].count;
        }
        // return totalCost.toFixed(2);
        return totalCost;
    };

    obj.list = function() { // -> array of Items
        var cartCopy = [];
        // console.log("Listing cart");
        // console.log(cart);
        for (var i in cart) {
            // console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            // itemCopy.total = (item.price * item.count).toFixed(2);
            // itemCopy.total = (item.price * item.count);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();

/**
 * 
 */