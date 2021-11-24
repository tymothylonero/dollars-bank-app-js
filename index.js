const prompt = require("prompt-sync")();


class Account {
    constructor(id, pin, balance, t1, t2, t3, t4, t5) {
        this.id = id;
        this.pin = pin;
        this.balance = balance;
        this.t1 = t1;
        this.t2 = t2;
        this.t3 = t3;
        this.t4 = t4;
        this.t5 = t5;
    }
}


// Main menu function, allows users to create an account or log into an account
function mainMenu() {

    running = true;

    // Test code for accounts?
    //let accounts = {};
    //newAcc = new Account(1,2,3,4,5,6,7,8);
    //accounts.push(newAcc);

    do {
        console.log("Welcome do DOLLARSBANK!!!\n\nWhat would you like to do today?\n1. Create a new account\n2. Transaction with existing account\n3. Exit");
        var action = get3NumberInput();
        switch(action) {
            case "1":
                console.log("\nCreating a new account!\n");
                accountMenu();
                break;
            case "2":
                console.log("\nLogging into an account!\n");
                accountMenu();
                break;
            case "3":
                running = false;
                break;
            default:
                console.log("Error: Invalid input!");
                break;
        }
    } while (running);
    console.log("\nGoodbye!\n")
}


// Account menu allows logged in users to perform transactions
function accountMenu() {

    loggedIn = true;
    accountBalance = 0;

    do {
        console.log("Transaction Menu:\n1. Account Balance Check\n2. Print Transactions\n3. Update PIN\n4. Withdraw Amount\n5. Deposit Amount\n6. Exit");
        var action = get6NumberInput();
        switch(action) {
            case "1":
                console.log(`\nYour balance is: $${accountBalance}\n`);
                break;
            case "2":
                console.log("\nPrinting transactions!\n");
                break;
            case "3":
                console.log("\nUpdating PIN!\n");
                break;
            case "4":
                console.log("\nEnter an amount to withdraw:\n");
                var amount = getFloat();
                console.log(`Successfully withdrew $${amount}!`);
                accountBalance = accountBalance - amount;
                break;
            case "5":
                console.log("\nEnter an amount to deposit:\n");
                var amount = getFloat();
                console.log(`Successfully deposited $${amount}!`);
                accountBalance = accountBalance + amount;
                break;
            case "6":
                loggedIn = false;
                break;
            default:
                console.log("Error: Invalid input!");
                break;
        }
    } while (loggedIn);
    console.log("\nLogging out...\n")
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
            console.log(`Invalid input ${input}! Try again.`)
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
            console.log(`Invalid input ${input}! Try again.`)
    } while (valid == false);
    return input;
}


// Gets a positive, non-zero double
function getFloat() {

    valid = false;
    var input;

    do {
        input = parseFloat(prompt("Please enter an amount: $"));
        if(input > 0)
            valid = true;
        else
            console.log(`Error: ${input} is an invalid amount.`);
    } while (valid == false);

    return input;
}


// Start with the main menu
mainMenu();