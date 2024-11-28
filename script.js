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
    return data; 
}