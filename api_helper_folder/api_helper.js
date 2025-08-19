let api_response_texts = require("../api_response_texts.json");
import { expect } from "@playwright/test"; 

export class api_helper {
  constructor(request) {
    this.request = request;
  }

  //Verifies the statuscode returned by the API is either a success or a fail.
  async verifyStatusCode(apiLink, statusCode) {
    const healthPing = await this.request.get(apiLink);
    expect(healthPing.status()).toBe(statusCode);
  }

  //Verifies the validity of the status ping message by comparing it to the expected msg.
  async verifyStatusMessage(apiLink, statusMessage) {
    const healthPing = await this.request.get(apiLink);
    const healthPingText = await healthPing.text();
    expect(healthPingText).toBe(statusMessage);
  }

  //Creates a session token to bind to a booking.
  async createToken(apiLink, username, password) {
    const response = await this.request.post(apiLink, {
      header: api_response_texts.header,
      data: {
        username: username,
        password: password,
      },
    });
    expect(response.status()).toBe(200);
    const authToken = await response.json(); // Add await here
    return authToken;
  }

  //Method to create booking to a given username and password
  async createBooking(apiLink, detailsFile) {
    const createBooking = await this.request.post(apiLink, {
      headers: api_response_texts.header,
      data: detailsFile,
    });
    console.log("Response status:", createBooking.status());
    expect(createBooking.status()).toBe(200);

    const bookingData = await createBooking.json(); // Parse JSON here
    console.log("Booking created:", bookingData);
    return bookingData; // Return parsed data
  }

  // Method to verify that booking that was returned exists
  async getBookingVerification(apiLink, bookingID, pass) {
    const bookingIDLink = apiLink + "/" + bookingID;
    console.log(bookingIDLink);
    const checkBookingByID = await this.request.get(bookingIDLink);
    console.log(checkBookingByID.status());

    if (pass){expect(checkBookingByID.status()).toBe(200);}
    else {expect(checkBookingByID.status()).toBe(404);}
  }

//Puts a json file (booking information) to an existing booking given bookingID.
  async updateBooking(apiLink, updatedText, bookingID, token) {
    const updateBookingLink = apiLink + "/" + bookingID;
    const updateBooking = await this.request.put(updateBookingLink, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: "token=" + token,
      },
      data: updatedText,
    });
   // console.log("Updated Booking:", updateBooking.json());
    expect(updateBooking.status()).toBe(200);
  }

//Compares and verifies that the dates for a booking are  
  async verifyBookingViaDate(apiLink, bookingID) {
    const verifyByDate = await this.request.get(apiLink, {
      ...api_response_texts.checkInDates
    });
    expect(verifyByDate.bookingid == bookingID);
    expect(verifyByDate.status()).toBe(200);
  }

async verifyBookingByName(apiLink, bookingID){
  const verifyByName = await this.request.get(apiLink, {
    ...api_response_texts.updatedNameOnly
  })
}
  //Delete a specific booking given the API link.
  async deleteBooking(apiLink, bookingID, sessionToken) {
    const urlWithID = apiLink + "/" + bookingID;
    const deleteBooking = await this.request.delete(urlWithID, {
          headers: {
             "Content-Type": "application/json",
              Cookie: "token=" + sessionToken,
      }
    });
    expect(deleteBooking.status()).toBe(201);
  }

  
}
