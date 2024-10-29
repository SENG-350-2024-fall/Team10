# Milestone 3

# Incremental Construction

Milestone 3: Create database, server file, API connections for Wait Times Process, Patient Page
<br>
Milestone 4: Virtual Triage Form, Notifications, Referral Page, Wait Times/Queue front-end
<br>

# Architecture Tactics - Availability

*for each Availability Tactic:
<br>
   a. how it's manifested in the design
   <br>
   b. how you plan to test whether your quality attribute objective will be met.
<br>
<br> 
1. Self Test 
<br>
      a. We implemented a selt test tactic for the database connection. We did this by creating the file    database.js. If the created database connection has any issues, it will output an error log to the console.
   <br>
      b. The database.js file gets automatically run when the database connection gets started or interrupted, therefore ensuring that any exceptions will get caught and dealt with properly regarding the database connection.
   <br>
   <br>
2. Exception Handling
<br>
      a. show user friendly error messages on incorrect/invalid inputs to the system
   <br>
      b.
   <br>
   <br>
3. Graceful Degradation
<br>
      a. If the map library used to display ED locations and wait times breaks, the list view of the EDs and all other functionality of the system is still available to users. An error message is displayed on the map area indicating to users that the map functionality is temporarily unavailable. This approach ensures that the core functionality of the system is maintained and users are informed of unavailable services untill map functionality can be restored. 
   <br>
      b. This tactic can be tested by simulating a map outtage and ensuring that the error message is appropriately displayed and core functionality of the system is maintained. 
   <br>
   <br>
4. Retry
<br>
      a. automatically retry failed database interactions after a short waiting period
   <br>
      b.
   <br>
   <br>
   
5. Removal from Service
<br>
      a. In the event of failures or high loads on the system, lower priority functionalities are temporarily disabled in order to prioritize critical functionalities of the system and manage resources effectively. The ED map and ED Wait Times features are manually disabled (in that order) upon high system stress loads. 
   <br>
      b. This tactic can be tested by ensuring that low priority features can easily be toggled on and off and that this does not impact the functionality of other critical system services such as Log-in and Virtual Triage. 
   <br>
   <br>
  
# Design Patterns

- state pattern
- decorator pattern
- singleton pattern - virtual triage, database
- strategy pattern - different user roles (methods) but one overall user class
- facade pattern - The virtual triage uses a survey that patients fill out. The system then takes the info from the patients input and runs diagnosis to evaluate the patients input the provide the triage clinician with a useful analysis. The facade pattern should hides the in depth evaluation the system does from the both the patients and the triage clinician.



# Contributions

