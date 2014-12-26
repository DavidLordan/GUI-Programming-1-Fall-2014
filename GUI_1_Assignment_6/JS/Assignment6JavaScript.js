/* File: Assignment6JavaScript.JS
 91.461 GUI Programming 1, Assignment 6: Creating an Interactive Dynamic Table
 David Lordan, UMass Lowell Computer Science, david_lordan@student.uml.edu
 Alternate email: davidlordan@gmail.com
 Created on Oct 16, 2014 12:23 AM, updated on October 23nd, 2014 5:06 PM
 
 This file contains a set of functions that are used to validate a form and 
 use it's information to create a multiplication table. 
 
 The purpose of this assignment is to create an interactive and dynamic table.
 A form is used to accept 4 integer inputs from the user which are then used
 to create a multiplication table. The first two integers determine the range
 of multipliers, while the final two integers determine the range of the 
 multiplicands. The user will be allowed to reset the form/table, and/or
 enter new values which will affect the size and content of the table.
 This is to be accomplished using a handful of custom Javascript functions
 as well as functions borrowed from JQuery. 
 
 
 The current version of this page allows for user input via text fields or 
 sliders. Much of this code is trying to implement somewhat intracite behavior
 without much knowledge of Javascript or jQuery. There are likely much simpler, cleaner
 and more effective ways to accomplish all of this behavior, so this page will
 be updated and improved in the future. Much of this can be refactored. 
 */


//Creates global variables which are used to keep track of the user inputs and
// their input type selection. 
var n1;
var n2;
var n3;
var n4;
var inputType;

//This function creates a form of text fields or sliders depending on the user's
// request. The opposite input type is also removed, but the values entered will
// be sustained if the user changes between types. 
function createInput(input) {

    inputType = input;

    if (input === "Sliders") {
        createSliders();
        jQuery("#Boxes").html("");
        createTable(n1, n2, n3, n4);
        frm.slider1.value = n1;
        frm.slider2.value = n2;
        frm.slider3.value = n3;
        frm.slider4.value = n4;
    }
    if (input === "Boxes") {
        createBoxes();
        jQuery("#sliders").html("");
        createTable(n1, n2, n3, n4);
        frm.firstInt.value = n1;
        frm.secondInt.value = n2;
        frm.thirdInt.value = n3;
        frm.fourthInt.value = n4;
    }
}

// Creates an array of strings identifying each of the user inputs. This is used in
// the 'formCheck' and 'clearPage' functions.  
var names = ["first", "second", "third", "fourth"];

// This function is used along with the 'validateInteger' function to confirm that 
// the user input is correct. If not, an error message is displayed to inform
// the user how to correct the error. 
// Much of the this function was refactored with help from Curran Kelleher, email: curran.kelleher@gmail.com
function formCheck() {

    // For loop which sets the background of each input box to white and calls
    // the 'validateInteger' function, passing the current input name. If the value
    // returned by 'validateInteger' is false, the program will break out of the function. 
    for (var i = 0; i < names.length; i++) {
        frm[names[i] + "Int"].style.backgroundColor = "White";
        if (validateInteger(names[i]) === false) {
            return false;
        }
    }

    //If the inputs validate they are converted to ints to be passed to the 
    //'createTable' function.
    n1 = parseInt(frm.firstInt.value);
    n2 = parseInt(frm.secondInt.value);
    n3 = parseInt(frm.thirdInt.value);
    n4 = parseInt(frm.fourthInt.value);

    // Removes any error messages.
    jQuery("#userInfo").html("");

    // If all checks are passed and the form is valid, the multiplication table 
    // is created. 
    createTable(n1, n2, n3, n4);
    return true;

}   // End of 'formCheck' function.


// Checks if the passed name refers to a valid input, meaning the box is not empty,
// the value is a number, and the number is greater than 1. If not, an error message
// is displayed informing the user where there is an error and how to correct it. 
// This has been changed to allow entries of '0'.
// Much of the this function was refactored with help from Curran Kelleher, email: curran.kelleher@gmail.com
function validateInteger(name) {

    var int = frm[name + "Int"];

    if (isNaN(parseInt(int.value)) || parseFloat(int.value) !== parseInt(int.value)) {
        var strUserInfo = "Please enter an integer into the " + name + " box.";
        jQuery("#userInfo").html(strUserInfo);
        int.style.backgroundColor = "red";
        int.focus();

        return false;
    }

    return true;
}

// Function to reset all values to 0, remove error messages and reset sliders.
// The table itself is also set to the default of '0 * 0' .
function clearPage() {
    n1 = 0;
    n2 = 0;
    n3 = 0;
    n4 = 0;

    jQuery("#userInfo").html("");

    createTable(0, 0, 0, 0);

    if (inputType === "Sliders") {

        frm.slider1.value = 0;
        frm.slider2.value = 0;
        frm.slider3.value = 0;
        frm.slider4.value = 0;

        for (var j = 1; j <= 4; j++) {
            jQuery("#slide" + j).html(0);
        }
    }
    else {
        for (var i = 0; i < names.length; i++) {
            frm[names[i] + "Int"].style.backgroundColor = "White";
            frm[names[i] + "Int"].value = 0;
        }
    }
} //End clearPage.


// Function to create the multiplcation table. 
function createTable(Int1, Int2, Int3, Int4) {

    //If the upper bound is less than the lower bound, they are swapped. 
    var temp;
    if (Int1 > Int2) {
        temp = Int1;
        Int1 = Int2;
        Int2 = temp;
    }
    if (Int3 > Int4) {
        temp = Int3;
        Int3 = Int4;
        Int4 = temp;
    }

    // Creates an empty string 'strTable' which will gradually become the html
    // code for the table. 
    var strTable = "";

    // Starts to create the table's html code. A table tag and top row are added
    // and given ids to help with the CSS. Also creates an empty item in the top
    // left of the table which will be blened into the background. 
    strTable += "<table id='productTable'><tr id='multiplier'><td id='corner'></td>";

    // For loop which takes the first and second integers and creates a row of
    // multipliers which will be the top row of the table. 
    for (var i = Int1; i <= Int2; i++) {
        strTable += "<td>" + i + "</td>";
    }

    // Pair of nested for loops, the first creates the far left column, containing
    // the multiplicands and the second loop creates each of the products.
    for (var j = Int3; j <= Int4; j++) {

        strTable += "<tr><td class='multiplicand'>" + j + "</td>";

        for (var i = Int1; i <= Int2; i++) {
            strTable += "<td><span class='products'>" + j * i + "</span></td>";
        }
        strTable += "</tr>";
    }

    // Adds the closing table tag to strTable.
    strTable += "</table>";

    // Uses jQuery to add the entire contents of strTable to the table div in 
    // 'GUI_1_Assignment_6.html, resulting in the multiplaction table
    // being displayed. 
    jQuery("#table").html(strTable);

}   //End of 'createTable' function. 


//This function is called anytime a slider value is changed. A new product table
// is created with the new values. 
function outputUpdate(value, id) {

    jQuery("#slide" + id).html(value);

    n1 = parseInt(frm.slider1.value);
    n2 = parseInt(frm.slider2.value);
    n3 = parseInt(frm.slider3.value);
    n4 = parseInt(frm.slider4.value);

    createTable(n1, n2, n3, n4);

}

// Function to create the slider controls. Maintains the current value of the inputs
// if the user switches from text fields to sliders and vice-versa. 
function createSliders() {

    var currValue = [n1, n2, n3, n4];
    var strSliders = "";
    strSliders += "<div id='sliderBox'>";

    for (var i = 1; i <= 4; i++) {
        if (i === 1) {
            strSliders += "<p>Multiplier range:</p>";
        }
        if (i === 3) {
            strSliders += "<p>Multiplicand range:</p>";
        }

        strSliders += "<p>-30<input type=range min=-30 max=30 value=" + currValue[i - 1];
        strSliders += " id=slider" + i + " step=1 onchange='outputUpdate(value," + i + ")'>30</p>";
        strSliders += "<p><div id='slide" + i + "'>" + currValue[i - 1] + "</div></p>";
    }

    strSliders += "<div class='buttons'><input type='button' onclick='clearPage()' value='RESET'></div>";
    strSliders += "</div>";

    jQuery("#sliders").html(strSliders);

}

//Function to create text fields. This can likely be refactored, however there are subtle
// differences that would occur within each loop. 
function createBoxes() {

    var strBoxes = "</div id='Boxes'><p>Multiplier Range:</p>";
    strBoxes += "<p><input type='text' size='1' name='firstInt' id='firstInt'>-";
    strBoxes += "<input type='text' size='1' name='secondInt' id='secondInt'></p>";

    strBoxes += "<p>Multiplicand Range:</p>";
    strBoxes += "<p><input type='text' size='1' name='thirdInt' id='thirdInt'>-";
    strBoxes += "<input type='text' size='1' name='fourthInt' id='fourthInt'></p></div>";

    strBoxes += "<div class='buttons'><input type='submit' value='ENTER'>";
    strBoxes += "<input type='button' onclick='clearPage()' value='RESET'></div>";

    jQuery("#Boxes").html(strBoxes);

}