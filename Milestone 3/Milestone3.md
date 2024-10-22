# Milestone 3

# Incremental Construction

Milestone 3: Create database, server file, API connections for Wait Times Process, Patient Page
<br>
Milestone 4: Virtual Triage Form, Notifications, Referral Page, Wait Times/Queue front-end
<br>

# Architecture Tactics - Availability

*for each Availability Tactic:
   a. how it's manifested in the design
   b. how you plan to test whether your quality attribute objective will be met.

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
3. graceful degradation
<br>
      a. if map library breaks, display error message/page
   <br>
      b.
   <br>
   <br>
4. retry
<br>
      a. automatically retry failed database interactions after a short waiting period
   <br>
      b.
   <br>
   <br>
   
5. removal from service
 <br>
      a. remove triage feature when service unavailable
   <br>
      b.
   <br>
   <br>
  
# Design Patterns

- state pattern
- decorator pattern


# Contributions

