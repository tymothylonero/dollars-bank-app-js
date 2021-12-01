const prompt = require("prompt-sync")();



// Main menu function, allows users to create an account or log into an account
function mainMenu() {

    running = true;

    let accounts = [];

    do {
        console.log("Welcome to DOLLARSBANK!!!\n\nWhat would you like to do today?\n1. Create a new account\n2. Transaction with existing account\n3. Exit");

        var action = get3NumberInput();
        switch(action) {
            // Create a new account and call the account menu
            case "1":
                console.log("\nCreating a new account!\n");
                let newAccount = createAccount(accounts);
                accounts.push(newAccount);
                accountMenu(newAccount);
                break;
            // Log into an account and call the account menu
            case "2":
                console.log("\nLogging into an account!\n");
                let account = accountLogin(accounts);
                if(account != -1) {
                    accountMenu(account);
                }
                break;
            // Exits the application
            case "3":
                running = false;
                break;
            // Invalid selection
            default:
                console.log("Error: Invalid input!");
                break;
        }
    } while (running);
    console.log("\nGoodbye!\n")
}


// Account menu allows logged in users to perform transactions
function accountMenu(account) {

    loggedIn = true;

    do {
        console.log("Transaction Menu:\n1. Account Balance Check\n2. Print Transactions\n3. Update PIN\n4. Withdraw Amount\n5. Deposit Amount\n6. Exit");
        var action = get6NumberInput();
        switch(action) {
            // Displays the account's current balance
            case "1":
                console.log(`\nYour balance is: $${account.balance}\n`);
                break;
            // Displays the five most recent transactions
            case "2":
                console.log("\nThese are your five most recent transactions:\n");
                console.log(account.t1 + account.t2 + account.t3 + account.t4 + account.t5);
                break;
            // Allows the user to change their 4-digit PIN
            case "3":
                account.pin = updatePIN();
                break;
            // Allows the user to withdraw money from their account
            case "4":
                console.log("\nEnter an amount to withdraw:\n");
                var amount = getFloat("Please enter an amount: $");
                if(amount > account.balance)
                    console.log("Cannot withdraw more than what is in your account!");
                else {
                    console.log(`Successfully withdrew $${amount}!\n`);
                    account.balance = account.balance - amount;
                    console.log(`Your new balance is: $${account.balance}\n`);
                    addTransaction(account, createTransaction("Withdrawl", "User withdrawl", amount, account.balance));
                }
                break;
            // Allows the user to deposit money into their account
            case "5":
                console.log("\nEnter an amount to deposit:\n");
                var amount = getFloat("Please enter an amount: $");
                console.log(`Successfully deposited $${amount}!`);
                account.balance = account.balance + amount;
                console.log(`Your new balance is: $${account.balance}\n`);
                addTransaction(account, createTransaction("Deposit", "User deposit", amount, account.balance));
                break;
            // Log out of the user's account
            case "6":
                loggedIn = false;
                break;
            // Invalid selection
            default:
                console.log("Error: Invalid input!");
                break;
        }
    } while (loggedIn);
    console.log("\nLogging out...\n");
}


// Create account
function createAccount(accounts) {

    // Get a new account ID
    inputId = "";
    valid = false;
    do {
        inputId = prompt("Please enter an account ID: ");
        let found = accounts.find(found => found.id === inputId);
        if(accounts.indexOf(found) != -1) {
            console.log("Account ID alreay exists. Try again.\n");
        } else {
            valid = true;
        }
    } while(!valid);

    // Get a valid 4-digit PIN
    validPin = false;
    do {
        inputPin = newPin("Please enter a 4-digit PIN for this account: ");
        verifyPin = prompt("Please verify the PIN: ");
        if(inputPin == verifyPin)
            validPin = true;
        else
            console.log("The PINs do not match. Try again.\n");
    } while(!validPin);

    // Get an initial deposit amount
    var inputInit = getFloat("Please enter an initial deposit: $");

    // Create the new account
    t1 = createTransaction("Deposit", "Initial deposit", inputInit, inputInit);
    let newAccount = {

        "id": inputId,
        "pin": inputPin,
        "balance": inputInit,
        "t1": t1,
        "t2": "",
        "t3": "",
        "t4": "",
        "t5": "",

    }
    console.log("\nSuccessfully created your account!\n");
    return newAccount;
}

// Login into account
function accountLogin(accounts) {

    // Get the account ID and PIN
    id = prompt("Enter your account ID: ");
    pin = prompt("Enter your account PIN: ");

    // Check if the given credentials exist
    let found = accounts.find(found => found.id === id && found.pin === pin);
    if(accounts.indexOf(found) == -1) {
        console.log("\nInvalid credentials. Try again.\n");
        return -1;
    } else {
        console.log("\nWelcome back!\n");
        return found;
    }
}

// Adds a transaction to the account, shifting the old ones down
function addTransaction(account, transaction) {
    account.t5 = account.t4;
    account.t4 = account.t3;
    account.t3 = account.t2;
    account.t2 = account.t1;
    account.t1 = transaction;
}

// Creates a transaction, which formats the parameters into a readable string
function createTransaction(type, description, amount, balance) {
    return "Type: " + type + "\n" + description + "\nFor: $" + amount + "\nAccount balance is: $" + balance + "\nAs of " + new Date().toString() + "\n\n";
}

// Allows the user to change their PIN
function updatePIN() {
    updatedPin = "";
    valid = false;
    do {
        updatedPin = newPin("Please enter a new PIN for this account: ");
        verifyPin = prompt("Please verify the PIN: ");
        if(updatedPin == verifyPin)
            valid = true;
        else
            console.log("The PINs do not match. Try again.\n");
    } while(!valid);
    return updatedPin;
}


// Gets numbered input, 1-3.
function get3NumberInput() {
    
    valid = false;
    var input;

    do {
        input = prompt("Please enter a selection (1 - 3) ");
        if(input == "1" || input == "2" || input == "3")
            valid = true;
        else
            console.log(`Invalid input '${input}'! Try again.`)
    } while (valid == false);
    return input;
}


// Gets numbered input, 1-6.
function get6NumberInput() {
    
    valid = false;
    var input;

    do {
        input = prompt("Please enter a selection (1 - 6) ");
        if(input == "1" || input == "2" || input == "3" || input == "4" || input == "5" || input == "6")
            valid = true;
        else
            console.log(`Invalid input '${input}'! Try again.`)
    } while (valid == false);
    return input;
}


// Gets a positive double from the user with validation
function getFloat(message) {

    valid = false;
    var input;

    do {
        input = prompt(message);
        value = parseFloat(input);
        if(value >= 0)
            valid = true;
        else
            console.log(`Error: '${input}' is an invalid amount.`);
    } while (valid == false);

    return value;
}


// Manages the creation of a new pin
function newPin(message) {

    valid = false;
    var input;
    var pin;

    do {
        pin = prompt(message);
        input = parseFloat(pin);
        if(input >= 0 && input < 10000 && pin.length == 4)
            valid = true;
        else
            console.log(`Error: '${pin}' is an invalid 4-digit pin.`);
    } while (!valid);

    return pin;
}


// Start with the main menu
mainMenu();