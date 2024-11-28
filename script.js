// script.js
function handleFormSubmit(event) {
    event.preventDefault();
  
    const { charityName, donationAmount, dateOfDonation, donorMessage } = event.target;
  
    // Input validation
    if (!charityName.value.trim()) throw new Error('Charity name is required.');
    const amount = parseFloat(donationAmount.value);
    if (isNaN(amount) || amount <= 0) throw new Error('Donation amount must be a positive number.');
  
    if (!dateOfDonation.value.trim()) throw new Error('Date of donation is required.');
  
    // Return collected data as an object
    return {
      charityName: charityName.value.trim(),
      donationAmount: amount,
      dateOfDonation: dateOfDonation.value.trim(),
      donorMessage: donorMessage.value.trim(),
    };
  }
  
  module.exports = { handleFormSubmit };