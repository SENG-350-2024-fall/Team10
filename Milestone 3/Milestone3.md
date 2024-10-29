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

- state pattern
- decorator pattern
**Singleton pattern** <br>
In object oriented programming the singleton design pattern reduces the instances of a class to one. Mister ED encapsulates many different functionalities that require saving and modifying a lot of different information. To ensure the most up-to-date database is always being accessed, we implemented the singleton pattern to use one global database for all the necessary system information, including triage and patient information as well as ED information. <br>

**Strategy pattern** <br>
In software development, the strategy pattern allows developers to implement multiple algorithms that are interchangeable depending on the systems current user. Our systems supports several different use cases including a patient, triage clinician, ED admin among others. While the stategy pattern affects how nearly the entire system is viewed depending on the user, one notable example is that only the ED admin can access and modify ED wait times, while all other users can only view these wait times. <br>

**Facade pattern** <br>
Similarly to a real life facade, the facade pattern is a design pattern in which a front facing interface is used to maske more in-depth and complex structural code. In our Mister ED system, the virtual triage relies on a survey that patients fill out regarding their ailment. The system then takes the information from the patients input and runs diagnosis to evaluate the patients input the provide the triage clinician with a useful analysis. The facade pattern allows us to hide the in depth evaluation the system does from the both the patients and the triage clinician, but still provide the users with the necessary information. <br>


# Contributions

