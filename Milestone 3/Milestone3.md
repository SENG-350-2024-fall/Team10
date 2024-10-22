# Milestone 3

# Incremental Construction

Milestone 3: Create database, server file, API connections for Wait Times Process, Patient Page
Milestone 4: Virtual Triage Form, Notifications, Referral Page, Wait Times/Queue front-end

# Architecture Tactics - Availability

*for each Availability Tactic:
   a. how it's manifested in the design
   b. how you plan to test whether your quality attribute objective will be met.

<br> 
1. Self Test 
   a. We implemented a selt test tactic for the database connection. We did this by creating the file    database.js. If the created database connection has any issues, it will output an error log to the console.
   b. The database.js file gets automatically run when the database connection gets started or interrupted, therefore ensuring that any exceptions will get caught and dealt with properly regarding the database connection.
   
2. exception handling
   a. show user friendly error messages on incorrect/invalid inputs to the system
   b.
   
3. graceful degradation
   a. if map library breaks, display error message/page
   b.
   
4. retry
   a. automatically retry failed database interactions after a short waiting period
   b.
   
5. removal from service
   a. remove triage feature when service unavailable
   b.
  
# Design Patterns

- state pattern
- decorator pattern


# Contributions

