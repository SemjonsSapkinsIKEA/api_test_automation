# api_test_automation

## Setting Up a Project

* Request Access to Github from Semjons Sapkins.

* Clone the repository
```git clone https://github.com/SemjonsSapkinsIKEA/api_test_automation ```

* Install dependencies

npm install
npm install playwright
npx playwright install
npm i --save-dev @playwright/test

## Overview
The following is an educational project used to practice REST API
Test Automation using PlayWright, developed by Semjons Sapkins. 

The focus of this project is the following website and API: 
* https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth. 
Relevant credentials, URLs and status codes can be found exploring the link listed. 

The purpose of the project is to act as a proof of concept in favor of using PlayWright to automate 
the testing of APIs. Currently, manual testing together with Postman is the favor alternative, but 
given the transition to using PlayWright for test automation, it would be highly beneficial to 
centralize the testing to just one tool, PlayWright.

PlayWright offers a robust library and support that allows for more complex testing 
of APIs. This is done through use of e.g. Javascript conditionals, loops, and other logic, which is the "backbone" of PlayWright. 

It also supports the basic:
GET, POST, DELETE, and PUT operations necessary for API testing.

**IMPORTANT**
Instead of using page fixtures (which is typical for PlayWright) for testing, request fixtures are used to test APIs. It is these fixtures that allow for typical API calls such as POST, GET, etc. to be used. 


## Why Automate API Tests?

* Reduce human error: Tests can be defined and run without the risk of human caused errors.
* Speed: Automated API Tests run very quickly 
* Portability: The tests can be sent around, edited, updated and maintained by anyone with access to the code.

## Benefits of API Test Automation with PlayWright 

* Centralized test tool for both API and UI End to End testing.
* Completely free of charge, no limits on number of collaborators or requests as in Postman.
* Robust Javascript library allows for complex testing.
* Highly portable and deployable, can be included in respositories/directories with other applications/tests. 
* MANY options for CI/CD, e.g Azure, GitHub Actions, Docker, etc.

## Drawbacks of API Test Automation with PlayWright 

* More setup is required to get started, no "plug and play" options.
* Basic Javascript and Playwright knowledge is required.
* More maintenance and debugging required.

## Prereqs.

* Node.js. (To install, visit: nodejs.org). 
    * To verify if Node.js is installed, run ```node -v``` and ```npm -v``` in the terminal.
* Npm
* Playwright
* Access credentials for website which is the focus of the test automation, can optionally be listed in credentials.json:
    * Refer to the useful links section for more information.

## Explanation of Classes and Files 
    
* Api_test_demo.spec.js
Within the project directory, the main file which houses all of the test cases 
is the "api_test_demo.spec.js" file. Here, one can find all tests that pertain to for example the creation and deletion 
of a booking through the REST API. The test cases mostly consist of function calls to methods found in api_helper. 

* Api_helper.js 
Comprises the bulk of the logic and functionality. Const objects are created to hold and handle the request fixtures to allow the use of API post, get and delete functions. Information is sent to the API via provided API Links using PlayWright's in-built GET, POST, PUT and DELETE functions. Expected resources are thereafter verified by comparing received data to expected data, or by verifying returned status codes (using e.g. toBe(200)). This file makes use of links.json, credentials.json and api_response_texts.json which are json files that house important data required for the API testing. 

* Links.json
Contains all of the API links necessary for testing. The links and their functions are relatively self-explanatory. 

* Api_response_texts.json 
Contains all of the text data needed for booking via the API. This includes the entire json booking data. The titles of each booking and their purpose is relatively self explanatory, e.g. a "createBookingRequest" is used to create a booking, and a "checkInDate" json is used to update the booking dates for an existing booking. 

* Credentials.json
Stores credentials necessary for creating sessions tokens via the API. It is highly important that in the future for REAL projects that credentials are not stored openly in files in such a manner. Ideally, GitHub secrets or similar should be used to hide sensitive data. Refer to the GitHub secrets link under "Useful Links" to learn more. 



## Useful Links 

The following links are highly useful to understand the project.

The API used for the project

* https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth

Educational Youtube tutorial on API Testing With PlayWright - **A MUST WATCH**
* https://youtu.be/EEjyLfp6DoQ 

PlayWright's own documentation for API Testing 
* https://playwright.dev/docs/api-testing#:~:text=Learn%20how%20to%20use%20%EE%80%80Playwright%EE%80%81%20to%20%EE%80%80test%EE%80%81%20your

More information on GitHub Secrets
* https://www.howtogeek.com/devops/what-are-github-secrets-and-how-do-you-use-them/ 




    
