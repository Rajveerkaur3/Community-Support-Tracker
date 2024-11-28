// script.js
function handleFormSubmit(event) {
    event.preventDefault();
    const { volunteerName, charityName, volunteerHours, volunteerDate, experienceRating } = event.target.elements;

    // Input validation
    if (!charityName.value.trim()) {
        throw new Error('Charity name is required.');
    }

    const hours = parseFloat(volunteerHours.value);
    if (isNaN(hours) || hours <= 0) {
        throw new Error('Volunteer hours must be a positive number.');
    }

    const experience = parseInt(experienceRating.value, 10); // Parse as an integer
    if (isNaN(experience) || experience < 1 || experience > 5) {
        throw new Error('Experience rating must be an integer between 1 and 5.');
    }

    if (!volunteerDate.value.trim()) {
        throw new Error('Volunteer date is required.');
    }

    // Return or store the collected data
    const data = {
        volunteerName: volunteerName.value.trim(),
        charityName: charityName.value.trim(),
        volunteerHours: hours,
        volunteerDate: volunteerDate.value.trim(),
        experienceRating: experience,
    };

    console.log('Form Data:', data); 
   

    // Add the new row to the table
    addTableRow(data);

    // Clear the form after submission
    event.target.reset();

    return data;
}

// Function to add a new row to the table
function addTableRow(data) {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${data.charityName}</td>
        <td>${data.volunteerHours}</td>
        <td>${data.volunteerDate}</td>
        <td>${data.experienceRating} Star${data.experienceRating > 1 ? 's' : ''}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(row);
}

// Function to delete a row
function deleteRow(button) {
    // Remove the row containing the button
    const row = button.parentElement.parentElement;
    row.remove();

    // Update localStorage
    updateLocalStorage();

    // Update the summary section after deletion
    displaySummary();


    function displaySummary() {
        const dataArray = JSON.parse(localStorage.getItem('volunteerLogs')) || [];
        const totalHours = dataArray.reduce((sum, data) => sum + data.volunteerHours, 0);
        const summaryElement = document.getElementById('summary');
        summaryElement.textContent = `Total Volunteer Hours: ${totalHours.toFixed(2)}`;
    }

    function updateLocalStorage() {
        const tableBody = document.getElementById('tableBody');
        const rows = tableBody.getElementsByTagName('tr');
        const dataArray = [];
        
        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            if (cells.length > 0) {
                const data = {
                    charityName: cells[0].textContent,
                    volunteerHours: parseFloat(cells[1].textContent),
                    volunteerDate: cells[2].textContent,
                    experienceRating: parseInt(cells[3].textContent),
                };
                dataArray.push(data);
            }
        }
        localStorage.setItem('volunteerLogs', JSON.stringify(dataArray));
    }

}

function saveToLocalStorage(data) {
    // Get existing data from localStorage
    const dataArray = JSON.parse(localStorage.getItem('volunteerLogs')) || [];
    // Add the new data to the array
    dataArray.push(data);
    // Save the updated array back to localStorage
    localStorage.setItem('volunteerLogs', JSON.stringify(dataArray));
}

function loadTableData() {
    const dataArray = JSON.parse(localStorage.getItem('volunteerLogs')) || [];
    dataArray.forEach(data => {
        addTableRow(data);
    });
}

test('should save data to localStorage', () => {
    const mockData = {
        volunteerName: 'John Doe',
        charityName: 'Charity ABC',
        volunteerHours: 5,
        volunteerDate: '2024-11-28',
        experienceRating: 4,
    };

    saveToLocalStorage(mockData);
    const storedData = JSON.parse(localStorage.getItem('volunteerLogs'));
    expect(storedData).toContainEqual(mockData);
});


