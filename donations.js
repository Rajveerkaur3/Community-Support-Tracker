// Select the form and input elements
const donationForm = document.getElementById("donationForm");
const charityNameInput = document.getElementById("charityName");
const donationAmountInput = document.getElementById("donationAmount");
const donationDateInput = document.getElementById("donationDate");
const donorMessageInput = document.getElementById("donorMessage");
const donationHistory = document.getElementById("donationHistory");

// Handle the form submission
function handleDonationSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form fields
    const charityName = charityNameInput.value;
    const donationAmount = parseFloat(donationAmountInput.value);
    const donationDate = donationDateInput.value;
    const donorMessage = donorMessageInput.value;

    // Validate the form input
    if (!charityName || !donationAmount || isNaN(donationAmount) || donationAmount <= 0 || !donationDate || !donorMessage) {
        alert("Please fill in all fields correctly. Donation amount must be a valid positive number.");
        return; // Stop further processing if validation fails
    }

    // Create a new donation object
    const donationData = {
        charityName,
        donationAmount,
        donationDate,
        donorMessage
    };

    // Retrieve the existing donations from localStorage or create an empty array if none exist
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Add the new donation to the list
    donations.push(donationData);

    // Save the updated list of donations to localStorage
    localStorage.setItem("donations", JSON.stringify(donations));

    // Display the new donation in the table
    appendDonationToTable(donationData);

    // Reset the form fields
    donationForm.reset();  
}

// Append a donation entry to the history table
function appendDonationToTable(donation) {
    const table = document.getElementById("donationTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Create and populate cells with donation details
    const cellCharity = newRow.insertCell(0);
    const cellAmount = newRow.insertCell(1);
    const cellDate = newRow.insertCell(2);
    const cellMessage = newRow.insertCell(3);
    const cellDelete = newRow.insertCell(4);

    cellCharity.textContent = donation.charityName;
    cellAmount.textContent = `$${donation.donationAmount.toFixed(2)}`;
    cellDate.textContent = donation.donationDate;
    cellMessage.textContent = donation.donorMessage;

    // Create a delete button to remove the donation
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        deleteDonation(donation, newRow);
    };
    cellDelete.appendChild(deleteButton);
}

// Delete a donation entry from both the table and localStorage
function deleteDonation(donationToDelete, row) {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const updatedDonations = donations.filter(donation => 
        donation.charityName !== donationToDelete.charityName || 
        donation.donationAmount !== donationToDelete.donationAmount ||
        donation.donationDate !== donationToDelete.donationDate ||
        donation.donorMessage !== donationToDelete.donorMessage
    );

    // Save the updated donations back to localStorage
    localStorage.setItem("donations", JSON.stringify(updatedDonations));

    // Remove the row from the table
    row.remove();
}

// Load donations from localStorage on page load
function loadDonations() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.forEach(donation => {
        appendDonationToTable(donation);
    });
}

// Handle form submission and validate inputs
donationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    clearAllErrors(); // Clear previous error messages
    let isValid = true;

    // Validate each input field
    if (!charityNameInput.value.trim()) {
        showError(charityNameInput, "Charity name is required.");
        isValid = false;
    }

    const donationAmount = parseFloat(donationAmountInput.value);
    if (isNaN(donationAmount) || donationAmount <= 0) {
        showError(donationAmountInput, "Donation amount must be greater than $0.");
        isValid = false;
    }

    const currentDate = new Date();
    const selectedDate = new Date(donationDateInput.value);
    if (!donationDateInput.value || selectedDate > currentDate) {
        showError(donationDateInput, "Date must be today or earlier.");
        isValid = false;
    }

    if (!donorMessageInput.value.trim()) {
        showError(donorMessageInput, "Donor message is required.");
        isValid = false;
    }

    // If valid, submit the donation
    if (isValid) {
        handleDonationSubmit(event);
    }
});

// Show an error message next to an invalid input
function showError(inputElement, errorMessage) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = errorMessage;

    // Insert the error message after the input field
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    inputElement.classList.add("invalid");
}

// Clear all error messages
function clearAllErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());
    const invalidInputs = document.querySelectorAll(".invalid");
    invalidInputs.forEach((input) => input.classList.remove("invalid"));
}

// Load donations when the page is loaded
window.addEventListener("load", loadDonations);

