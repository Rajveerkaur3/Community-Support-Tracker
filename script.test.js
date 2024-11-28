// script.test.js
const { handleFormSubmit } = require("../script"); // Adjust the path as necessary

describe("handleFormSubmit", () => {
    // Mock event object for testing
    const createMockEvent = (values) => ({
        preventDefault: jest.fn(),
        target: {
            elements: {
                volunteerName: { value: values.volunteerName || "" },
                charityName: { value: values.charityName || "" },
                volunteerHours: { value: values.volunteerHours || "" },
                volunteerDate: { value: values.volunteerDate || "" },
                experienceRating: { value: values.experienceRating || "" },
            },
        },
    });

    test("should return the form data when inputs are valid", () => {
        const event = createMockEvent({
            volunteerName: "John Doe",
            charityName: "Helping Hands",
            volunteerHours: "5",
            volunteerDate: "2024-11-01",
            experienceRating: "4",
        });

        const result = handleFormSubmit(event);
        expect(result).toEqual({
            volunteerName: "John Doe",
            charityName: "Helping Hands",
            volunteerHours: 5,
            volunteerDate: "2024-11-01",
            experienceRating: 4,
        });
    });

    test("should throw an error when charity name is missing", () => {
        const event = createMockEvent({
            volunteerName: "John Doe",
            charityName: "",
            volunteerHours: "5",
            volunteerDate: "2024-11-01",
            experienceRating: "4",
        });

        expect(() => handleFormSubmit(event)).toThrow('Charity name is required.');
    });

    test("should throw an error when volunteer hours are not positive", () => {
        const event = createMockEvent({
            volunteerName: "John Doe",
            charityName: "Helping Hands",
            volunteerHours: "0",
            volunteerDate: "2024-11-01",
            experienceRating: "4",
        });

        expect(() => handleFormSubmit(event)).toThrow('Volunteer hours must be a positive number.');
    });

    test("should throw an error when experience rating is not between 1 and 5", () => {
        const event = createMockEvent({
            volunteerName: "John Doe",
            charityName: "Helping Hands",
            volunteerHours: "5",
            volunteerDate: "2024-11-01",
            experienceRating: "6",
        });

        expect(() => handleFormSubmit(event)).toThrow('Experience rating must be an integer between 1 and 5.');
    });

    test("should throw an error when volunteer date is missing", () => {
        const event = createMockEvent({
            volunteerName: "John Doe",
            charityName: "Helping Hands",
            volunteerHours: "5",
            volunteerDate: "",
            experienceRating: "4",
        });

        expect(() => handleFormSubmit(event)).toThrow('Volunteer date is required.');
    });
});
