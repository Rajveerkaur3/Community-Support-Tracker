/**
 * Unit tests for the handleFormSubmit function.
 * These tests ensure that form submission is handled correctly, and validation rules are applied.
 */
const { handleFormSubmit } = require('./script');

describe('handleFormSubmit', () => {
  let mockEvent;

  beforeEach(() => {
    // Mock the event object with a form submission
    mockEvent = {
      preventDefault: jest.fn(),
      target: {
        charityName: { value: 'PMan donation' },
        donationAmount: { value: '450' },
        dateOfDonation: { value: '2024-11-14' },
        donorMessage: { value: 'Thank you!' },
      },
    };
  });

  /**
   * Test that checks if the default form submission behavior is prevented.
   */
  test('should prevent the default form submission behavior', () => {
    handleFormSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  /**
   * Test that checks if the form data is correctly collected.
   * It validates that the charity name, donation amount, date of donation, and donor message are captured properly.
   */
  test('should collect form data correctly', () => {
    const data = handleFormSubmit(mockEvent);
    expect(data).toEqual({
      charityName: 'PMan donation',
      donationAmount: 450,
      dateOfDonation: '2024-11-14',
      donorMessage: 'Thank you!',
    });
  });

  /**
   * Test that validates that all required fields are filled.
   * If any required field is missing, it should throw an error.
   */
  test('should validate that all required fields are filled', () => {
    mockEvent.target.charityName.value = ''; // Simulate missing charity name
    expect(() => handleFormSubmit(mockEvent)).toThrow('Charity name is required.');
  });

  /**
   * Test that validates that the donation amount is a positive number.
   * If the donation amount is not a positive number, it should throw an error.
   */
  test('should validate that donation amount is a positive number', () => {
    mockEvent.target.donationAmount.value = '-50'; // Simulate invalid donation amount
    expect(() => handleFormSubmit(mockEvent)).toThrow('Donation amount must be a positive number.');
  });
});