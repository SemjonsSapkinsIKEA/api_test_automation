import { test, expect } from "@playwright/test";
import links from "../links.json";
import { api_helper } from "../api_helper_folder/api_helper.js";
import credentials from "../credentials.json";
import api_response_texts from "../api_response_texts.json";

test.describe("Restful Booker API Test Automation", () => {
  //Healthcheck Ping: Simple endpoint ping to confirm API is up and running
  //Should receive 201 response.
  test.describe("API Ping Functionality Tests", () => {
    //Verify that a 201 status code is returned upon healthcheck ping
    test("HealthCheck Ping Status Code Check", async ({ request }) => {
      const apiHelper = new api_helper(request);
      await apiHelper.verifyStatusCode(links["restful-ping"], 201);
    });

    //Verify that a 'Created' string is returned upon healthcheck ping
    test("HealthCheck Ping Status Message Check", async ({ request }) => {
      const apiHelper = new api_helper(request);
      await apiHelper.verifyStatusMessage(links["restful-ping"], "Created");
    });
  });

  //Test suite that covers invalid booking creations and API operations.
  test.describe("Invalid Booking Creation", () => {
    //Verify return of 404 error code when creating null user booking
    test("Null User Creation", async ({ request }) => {
      await test.step("", async () => {});
    });

    test("Invalid Date Creation", async ({ request }) => {});
  });

  test.describe("Restful API Booking Verification ", () => {
    //The following test suite verifies the entire booking creation, update and
    test("Booking Creation and Update Flow", async ({ request }) => {
      let authToken; //  Shared for session persistence reasons
      let bookingID; // Shared for booking verification
      const apiHelper = new api_helper(request);

      //Create an API authentication token
      await test.step("Create an authentication token", async () => {
        const tokenResponse = await apiHelper.createToken(
          links["restful-auth"],
          credentials.username,
          credentials.password
        );
        authToken = tokenResponse.token; // Extract the actual token string
        console.log("Auth token created:", authToken);
      });

      //Post and create a booking
      await test.step("Create the booking", async () => {
        const bookingData = await apiHelper.createBooking(
          links["restful-booking"],
          api_response_texts.createBookingRequest
        );
        console.log("Created booking data:", bookingData);
        bookingID = bookingData.bookingid;
        console.log("Booking ID:", bookingID);
      });

      //Verify the existence of the booking using the booking ID
      await test.step("Verify Booking by ID", async () => {
        await apiHelper.getBookingVerification(
          links["restful-booking"],
          bookingID,
          true
        );
      });

      //Update the existing bookings booking date
      await test.step("Update Existing Booking", async () => {
        await apiHelper.updateBooking(
          links["restful-booking"],
          api_response_texts.updatedSingleBooking,
          bookingID,
          authToken
        );
      });

      //Verify that the booking is instead listed with the new booking date
      await test.step("Verify updated booking", async () => {
        await apiHelper.verifyBookingViaDate(
          links["restful-booking"],
          bookingID
        );
      });
    });

    // Verify the creation and deletion functionalities of the API
    test.describe("Booking Deletion Flow Verification", async () => {
      test("Booking Creation and Deletion Flow", async ({ request }) => {
        let authToken; //  Shared for session persistence reasons
        let bookingID; // Shared for booking verification
        const apiHelper = new api_helper(request);

        //Create an API authentication token
        await test.step("Create an authentication token", async () => {
          const tokenResponse = await apiHelper.createToken(
            links["restful-auth"],
            credentials.username,
            credentials.password
          );
          authToken = tokenResponse.token;
        });

        //Post and create a booking, verification in function
        await test.step("Create the booking", async () => {
          const bookingData = await apiHelper.createBooking(
            links["restful-booking"],
            api_response_texts.deleteBooking
          );
          console.log("Created booking data:", bookingData);
          bookingID = bookingData.bookingid;
        });

        //Verify the functionality of the delete function
        await test.step("Delete Booking", async () => {
          await apiHelper.deleteBooking(
            links["restful-booking"],
            bookingID,
            authToken
          );
        });

        //Verify that the previously created booking is no longer returned
        await test.step("Verify Booking No Longer Exists", async () => {
          await apiHelper.getBookingVerification(
            links["restful-booking"],
            bookingID,
            false
          );
        });
      });
    });

    //Tests the APIs ability to partially update bookings
    test("Booking Creation and Partial Update Flow", async() => {
            test("Booking Creation and Deletion Flow", async ({ request }) => {
        let authToken; //  Shared for session persistence reasons
        let bookingID; // Shared for booking verification
        const apiHelper = new api_helper(request);

        //Create a new API authentication token
        await test.step("Create an authentication token", async () => {
          const tokenResponse = await apiHelper.createToken(
            links["restful-auth"],
            credentials.username,
            credentials.password
          );
          authToken = tokenResponse.token;
        });

        //Post and create a booking, verification in function
        await test.step("Create the booking", async () => {
          const bookingData = await apiHelper.createBooking(
            links["restful-booking"],
            api_response_texts.deleteBooking
          );
          console.log("Created booking data:", bookingData);
          bookingID = bookingData.bookingid;
        });

        //Only partially update the booking 
        await test.step("Partially Update Booking", async ()=> {
            const partiallyUpdateBooking = await apiHelper.updateBooking(
              links["restful-booking"],
              bookingID,
              api_response_texts.updatedNameOnly
            )
        });

        await test.step("")

    });
  });
  });
});
