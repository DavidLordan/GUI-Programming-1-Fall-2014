/* File: Assignment6JavaScript.JS
 91.461 GUI Programming 1, Assignment 6: Creating an Interactive Dynamic Table
 David Lordan, UMass Lowell Computer Science, david_lordan@student.uml.edu
 Alternate email: davidlordan@gmail.com
 Created on Oct 16, 2014 12:23 AM, updated on October 19th, 2014 7:30 PM
 
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
 
 */


// This function is used to validate the user input. If the input is not a positive
// integer, or if the second or fourth integers are less than the first and third 
// respectively, the function is able to notify the user to make a correction. 
function formCheck() {

    // When the function is first called, all form backgrounds are set to white.
    // This clears any error fields which are indicated by a red background. 
    frm.firstInt.style.backgroundColor = "white";
    frm.secondInt.style.backgroundColor = "white";
    frm.thirdInt.style.backgroundColor = "white";
    frm.fourthInt.style.backgroundColor = "white";

    // Confirms that the first integer is not empty, is indeed an integer, and 
    // and is positve. If not, an alert is displayed to the user and the field
    // background is changed to red. The check will return false, ending the function. 
    if (frm.firstInt.value == ""
            || frm.firstInt.value != parseInt(frm.firstInt.value)
            || frm.firstInt.value < 1) {

        alert("Please enter a positive integer into the 1st box.");
        frm.firstInt.style.backgroundColor = "red";
        frm.firstInt.focus();
        return false;
    }

    // Indentical to the validation above, but for the second integer. 
    if (frm.secondInt.value == ""
            || frm.secondInt.value != parseInt(frm.secondInt.value)
            || frm.secondInt.value < 1) {

        alert("Please enter a positive integer into the 2nd box.");
        frm.secondInt.style.backgroundColor = "red";
        frm.secondInt.focus();
        return false;
    }

    // Validation check for the third integer. Identical to above. 
    if (frm.thirdInt.value == ""
            || frm.thirdInt.value != parseInt(frm.thirdInt.value)
            || frm.thirdInt.value < 1) {

        alert("Please enter a positive integer into the 3rd box.");
        frm.thirdInt.style.backgroundColor = "red";
        frm.thirdInt.focus();
        return false;
    }

    // Validation check for the fourth integer. Identical to above. 
    if (frm.fourthInt.value == ""
            || frm.fourthInt.value != parseInt(frm.fourthInt.value)
            || frm.fourthInt.value < 1) {

        alert("Please enter a positive integer into the 4th box.");
        frm.fourthInt.style.backgroundColor = "red";
        frm.fourthInt.focus();
        return false;
    }

    // Confirms that the 2nd integer is equal to or greater than the first. If 
    // not, an alert is displayed to the user and BOTH the first and second fields
    // have their background chaned to red. Returns false, ending the function. 
    if (parseInt(frm.firstInt.value) > parseInt(frm.secondInt.value)) {
        alert("The 2nd integer must be greater than or equal to the 1st.");
        frm.firstInt.style.backgroundColor = "red";
        frm.secondInt.style.backgroundColor = "red";
        frm.firstInt.focus();
        return false;
    }

    // Indentical to above, but for the third and fourth integer.
    if (parseInt(frm.thirdInt.value) > parseInt(frm.fourthInt.value)) {
        alert("The 4th integer must be greater than or equal to the 3rd.");
        frm.thirdInt.style.backgroundColor = "red";
        frm.fourthInt.style.backgroundColor = "red";
        frm.thirdInt.focus();
        return false;
    }

    // If all checks are passed and the form is valid, the multiplication table 
    // is created. 
    createTable();

    return true;
}

// Functiont to reset all form data and remove the table. 
function clearPage() {
    document.getElementById("frm").reset();
    $("#productTable").remove();
}

// Function to create the multiplcation table. 
function createTable() {

    // Assigns each of the integers from the form to a variable. 
    var n1 = parseInt(frm.firstInt.value);
    var n2 = parseInt(frm.secondInt.value);
    var n3 = parseInt(frm.thirdInt.value);
    var n4 = parseInt(frm.fourthInt.value);

    // Creates an empty string 'strTable' which will gradually become the html
    // code for the table. 
    var strTable = "";

    // Starts to create the table's html code. A table tag and top row are added
    // and given ids to help with the CSS. Also creates an empty item in the top
    // left of the table which will be blened into the background. 
    strTable += "<table id='productTable'>" + "<tr id='multiplier'>"
            + "<td id='corner'></td>";

    // For loop which takes the first and second integers and creates a row of
    // multipliers, which will be the top row of the table. 
    for (var i = n1; i <= n2; i++) {
        strTable += "<td>" + i + "</td>";
    }

    // Pair of nested for loops, the first creates the far left column, containing
    // the multiplicands, and the second creates each of the products.
    for (var j = n3; j <= n4; j++) {

        strTable += "<tr><td class='multiplicand'>" + j + "</td>";

        for (var i = n1; i <= n2; i++) {
            strTable += "<td>" + "<span class='products'>" + j * i + "</span>" + "</td>";
        }

        strTable += "</tr>";

    }

    // Adds the closing table tag to strTable.
    strTable += "</table>";

    // Uses jQuery to add the entire contents of strTable to the table div in 
    // 'GUI_1_Assignment_6.html, resulting in the multiplaction table
    // being displayed. 
    jQuery("#table").html(strTable);

}



