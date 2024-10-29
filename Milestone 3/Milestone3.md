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
<b>1. Self Test</b>
<br>
      a. We implemented a selt test tactic for the database connection. We did this by creating the file database.js. If the created database connection has any issues, it will output an error 
        log to the console.
   <br>
      b. The database.js file gets automatically run when the database connection gets started or interrupted, therefore ensuring that any exceptions will get caught and dealt with properly 
        regarding the database connection.
   <br>
   <br>
<b>2. Exception Handling</b>
<br>
      a. User friendly error messages are displayed to the user on the website when invalid information is inputted. More specifically, when a User is updating their profile, they get an error 
        message if they add non-character letters in their Name tab. 
   <br>
      b. This availability tactic can be tested manually by the developer to ensure if invalid information, looking the business logic of Mister ED, is inputted it would be carefully dealt with and properly showed to the user. We were able to validate this tactic by following this protocol completely.
   <br>
   <br>
<b>3. Graceful Degradation</b>
<br>
      a. If the map library used to display ED locations and wait times breaks, the list view of the EDs and all other functionality of the system is still available to users. An error message is displayed on the map area indicating to users that the map functionality is temporarily unavailable. This approach ensures that the core functionality of the system is maintained and users are informed of unavailable services untill map functionality can be restored. 
   <br>
      b. This tactic can be tested by simulating a map outtage and ensuring that the error message is appropriately displayed and core functionality of the system is maintained. 
   <br>
   <br>
<b>4. Retry</b>
<br>
      a. This tactic is manifested within the database code, and it automatically retries any failed database interactions after waiting for a short period, around 10ms. If the task failed the second time due to reasons like a Network Connection error, it will provide an error message saying it tried twice and will not try again.
   <br>
      b. If this tactic can be simulated successfully by redoing the transaction, failing, and displaying the proper message that it pinged the database twice, then it will be considered successful. 
   <br>
   <br>
<b>5. Removal of Service</b>
<br>
      a. In the event of failures or high loads on the system, lower priority functionalities are temporarily disabled in order to prioritize critical functionalities of the system and manage resources effectively. The ED map and ED Wait Times features are manually disabled (in that order) upon high system stress loads. 
   <br>
      b. This tactic can be tested by ensuring that low priority features can easily be toggled on and off and that this does not impact the functionality of other critical system services such as Log-in and Virtual Triage. 
   <br>
   <br>
  
# Design Patterns
**State Pattern** 
- The state pattern allows objects in the application to alter their own behaviour when their internal states change. An example of where this could be found and implimented in our application is in the virtual triage stage. When a patient is doing the virtual triage questionaire, the interanl state of the virtual triage object can change. An example of some of the states would be triageUnopened, triageStarted, triageFinished, and more. An example of how the object can change its behaviour based on the chnging of internal states would be when the triage goes from started to finished. The behaviors available in the finsihed state are different from the behaviors in the started state. Once finished, the patient has the option to view their results, nearby clinics, and more. Whereasduring the started state, the patient does not have the option to view these pages and can just continue the triage. This is jsut one exmaple of how the state pattern can manifest in our system. It can be applied to any object that has multiple states and transitions.


- decorator pattern
**Singleton pattern** <br>
In object oriented programming the singleton design pattern reduces the instances of a class to one. Mister ED encapsulates many different functionalities that require saving and modifying a lot of different information. To ensure the most up-to-date database is always being accessed, we implemented the singleton pattern to use one global database for all the necessary system information, including triage and patient information as well as ED information. <br>

**Strategy pattern** <br>
In software development, the strategy pattern allows developers to implement multiple algorithms that are interchangeable depending on the systems current user. Our systems supports several different use cases including a patient, triage clinician, ED admin among others. While the stategy pattern affects how nearly the entire system is viewed depending on the user, one notable example is that only the ED admin can access and modify ED wait times, while all other users can only view these wait times. <br>

**Facade pattern** <br>
Similarly to a real life facade, the facade pattern is a design pattern in which a front facing interface is used to maske more in-depth and complex structural code. In our Mister ED system, the virtual triage relies on a survey that patients fill out regarding their ailment. The system then takes the information from the patients input and runs diagnosis to evaluate the patients input the provide the triage clinician with a useful analysis. The facade pattern allows us to hide the in depth evaluation the system does from the both the patients and the triage clinician, but still provide the users with the necessary information. <br>


# Contributions

| Name | Contributions | 
| ----------- | ---------------------- |
| Ella | Graceful Degredation, Removal of Service |
| Andra | Singleton pattern, Strategy Pattern, Facade Pattern |
| Shyla | Self Test, Retry, Exception Handling Availability Tactic, Updating Code README.md , and Sprint Plan |
| Val | | 
| Alex | |
