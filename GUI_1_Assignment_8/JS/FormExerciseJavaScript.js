/* File: FormExerciseJavaScript.JS
 91.461 GUI Programming 1, Assignment 6: Form Exercise
 David Lordan, UMass Lowell Computer Science, david_lordan@student.uml.edu
 Alternate email: davidlordan@gmail.com
 Created on Oct 21, 2014 1:15 PM, updated on October 22th, 2014 6:53 PM
 
 
 This is a stripped down version of Assignment 6, which is to create a multiplication
 table. This is just the input verification portion and the table has been replaced
 with a simple message. 
 */

// Creates an array of strings identifying each of the user inputs. This is used in
// the 'formCheck' and 'clearPage' functions.  
var names = ["first", "second", "third", "fourth"];


// This function is used along with the 'validateInteger' function to confirm that 
// the user input is correct. If not, an error message is displayed to inform
// the user how to correct the error. 
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

    // Confirms that int1 <= int2 and int3 <= int4. If not, an alert is 
    // displayed to the user and BOTH of the possibly incorrect fields
    // have their backgrounds changed to red. Returns false, breaking out of the function.
    for (var i = 0; i < names.length; i = i + 2) {

        var int1 = frm[names[i] + "Int"];
        var int2 = frm[names[i + 1] + "Int"];

        if (parseInt(int1.value) > parseInt(int2.value)) {
            jQuery("#Success").html("The " + names[i] + " integer must be less than or equal to the " + names[i + 1] + ".");
            int1.style.backgroundColor = "red";
            int2.style.backgroundColor = "red";
            int1.focus();
            return false;
        }
    }

    // If all checks are passed and the form is valid, the verification message
    // is displayed. 
    verified();
    return true;

}   // End of 'formCheck' function.


// Checks if the passed name refers to a valid input, meaning the box is not empty
//  and the value is a number. If not, an error message
// is displayed informing the user where there is an error and how to correct it. 
function validateInteger(name) {

    var int = frm[name + "Int"];

    if (int.value === "" || isNaN(parseInt(int.value)) || parseFloat(int.value) !== parseInt(int.value)) {
        //alert("Please enter an integer into the " + name + " box.");

        jQuery("#Success").html("Please enter an integer into the " + name + " box.");
        int.style.backgroundColor = "red";
        int.focus();


        return false;
    }

    return true;
}

// Function to reset all form data.
function clearPage() {

    for (var i = 0; i < names.length; i++) {
        frm[names[i] + "Int"].style.backgroundColor = "White";
    }

    document.getElementById("frm").reset();
    jQuery("#Success").html("");
}

// Function to output the verfication message. 
function verified() {

    var strSuccess = "";

    strSuccess += "Integers are in the correct format.";

    jQuery("#Success").html(strSuccess);

}