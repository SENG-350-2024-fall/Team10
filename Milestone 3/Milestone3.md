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
      a. if map library breaks, display error message/page
   <br>
      b.
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
      a. remove triage feature when service unavailable
   <br>
      b.
   <br>
   <br>
  
# Design Patterns
**State Pattern** 
- The state pattern allows objects in the application to alter their own behaviour when their internal states change. An example of where this could be found and implimented in our application is in the virtual triage stage. When a patient is doing the virtual triage questionaire, the interanl state of the virtual triage object can change. An example of some of the states would be triageUnopened, triageStarted, triageFinished, and more. An example of how the object can change its behaviour based on the chnging of internal states would be when the triage goes from started to finished. The behaviors available in the finsihed state are different from the behaviors in the started state. Once finished, the patient has the option to view their results, nearby clinics, and more. Whereasduring the started state, the patient does not have the option to view these pages and can just continue the triage. This is jsut one exmaple of how the state pattern can manifest in our system. It can be applied to any object that has multiple states and transitions.

**Decorator pattern**
 - 

- singleton pattern - virtual triage, database

- strategy pattern - different user roles (methods) but one overall user class
- facade pattern - The virtual triage uses a survey that patients fill out. The system then takes the info from the patients input and runs diagnosis to evaluate the patients input the provide the triage clinician with a useful analysis. The facade pattern should hides the in depth evaluation the system does from the both the patients and the triage clinician.



# Contributions

