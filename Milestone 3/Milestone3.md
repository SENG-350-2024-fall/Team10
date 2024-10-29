# Milestone 3

# Incremental Construction

Milestone 3: Create database, server file, API connections for Wait Times Process, Patient Page, Log In Page
<br>
Milestone 4: Virtual Triage Form, Notifications, Referral Page, Wait Times/Queue front-end
<br>

We were able to complete most of the goals for Milestone 3, the only task we are pushing to next milestone is the Log In Page.
<br>
# Architecture Tactics - Availability

<br> 
1. Self Test 
<br>
      a. We implemented a selt test tactic for the database connection. We did this by creating the file database.js. If the created database connection has any issues, it will output an error 
        log to the console.
   <br>
      b. The database.js file gets automatically run when the database connection gets started or interrupted, therefore ensuring that any exceptions will get caught and dealt with properly 
        regarding the database connection.
   <br>
   <br>
2. Exception Handling
<br>
      a. User friendly error messages are displayed to the user on the website when invalid information is inputted. More specifically, when a User is updating their profile, they get an error 
        message if they add non-character letters in their Name tab. 
   <br>
      b. This availability tactic can be tested manually by the developer to ensure if invalid information, looking the business logic of Mister ED, is inputted it would be carefully dealt with and properly showed to the user. We were able to validate this tactic by following this protocol completely.
   <br>
   <br>
3. Graceful Degradation
<br>
      a. if map library breaks, display error message/page
   <br>
      b.
   <br>
   <br>
4. Retry
<br>
      a. This tactic is manifested within the database code, and it automatically retries any failed database interactions after waiting for a short period, around 10ms. If the task failed the second time due to reasons like a Network Connection error, it will provide an error message saying it tried twice and will not try again.
   <br>
      b. If this tactic can be simulated successfully by redoing the transaction, failing, and displaying the proper message that it pinged the database twice, then it will be considered successful. 
   <br>
   <br>
   
5. Removal from Service
<br>
      a. remove triage feature when service unavailable
   <br>
      b.
   <br>
   <br>
  
# Design Patterns

- state pattern
- decorator pattern
- singleton pattern - virtual triage, database
- strategy pattern - different user roles (methods) but one overall user class
- facade pattern - virtual triage, the virtual triage survey does under the hood math / evaluation of the patients inputs. The facade pattern should hide this evaluation from the patients and from the triage clinician.



# Contributions

| Name | Contributions | 
| ----------- | ---------------------- |
| Ella | |
| Andra | |
| Shyla | Self Test, Retry, Exception Handling Availability Tactic, Updating Code README.md , and Sprint Plan |
| Val | | 
| Alex | |
