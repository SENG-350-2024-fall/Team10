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
        log to the console. It will also communicate a successful connection as shown in the image below. <br> 
        <img width="485" alt="Screenshot 2024-10-31 at 2 41 55 PM" src="https://github.com/user-attachments/assets/eec9708d-e200-4aa9-b053-e6b52fcfd639">
        
   <br>
      b. The database.js file gets automatically run when the database connection gets started or interrupted, therefore ensuring that any exceptions will get caught and dealt with properly 
        regarding the database connection. The code below shows how this is executed. The database will try to connect twice and if cannot connect, the error log will say which try failed.
        
   <br><img width="768" alt="Screenshot 2024-10-31 at 2 42 07 PM" src="https://github.com/user-attachments/assets/46a9ce10-618d-4e01-814b-50ee52245d49">

   
   <br>
<b>2. Exception Handling</b>
<br>
      a. User friendly error messages are displayed to the user on the website when invalid information is inputted. More specifically, when a User is updating their profile, they get an error 
        message if they add non-character letters in their Name tab. 
   <br> 
   <img width="1053" alt="Screenshot 2024-10-31 at 3 12 05 PM" src="https://github.com/user-attachments/assets/af4b6201-cb69-4270-8e58-4e0d448d37c4">
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
   <img width="1382" alt="Screenshot 2024-10-31 at 3 23 22 PM" src="https://github.com/user-attachments/assets/e59d4e1f-7611-4c60-ac50-e29009946418">
 Here is the effect simulated. When the map has an error, it turns off as an option (users cannot use it) and only shows the list as well as an error message. Here is the code for this - a UseEffect hook is used to detect any live changes and deal with breaks.
 <br>
 <img width="849" alt="Screenshot 2024-10-31 at 3 25 57 PM" src="https://github.com/user-attachments/assets/8524d145-b6e1-403d-bc2f-a8d76b849944">
To test that this works, the try block had setMapError(true); and setIsMapView(false); to immitate a break.
   <br>
<b>4. Retry</b>
<br>
      a. This tactic is manifested within the database code, and it automatically retries any failed database interactions after waiting for a short period, around 10ms. If the task failed the second time due to reasons like a Network Connection error, it will provide an error message saying it tried twice and will not try again.
   <br> <img width="676" alt="Screenshot 2024-10-31 at 4 20 58 PM" src="https://github.com/user-attachments/assets/9d7cc888-3240-4e9e-a6cf-48cf9ff11770">
<br> This is the function for retrying database interactions. It is wrapped around each database interaction. For example, here is the update function wrapped with the retry <img width="837" alt="Screenshot 2024-10-31 at 4 22 50 PM" src="https://github.com/user-attachments/assets/53d8e875-dc4c-4d6b-924c-4a9fed3d3dee">
<br>
      b. If this tactic can be simulated successfully by redoing the transaction, failing, and displaying the proper message that it pinged the database twice, then it will be considered successful. 
   <br>
   <br>
<b>5. Removal of Service</b>
<br>
      a. In the event of failures or high loads on the system, lower priority functionalities are temporarily disabled in order to prioritize critical functionalities of the system and manage resources effectively. The ED map and ED Wait Times features are still available, however, the Triage process is unavailable as it requires most traffic (to send the form, clinician review, send back etc).
   <br>
      b. This tactic can be tested by ensuring that low priority features can easily be toggled on and off and that this does not impact the functionality of other critical system services such as Log-in and Virtual Triage. Below is demonstration of the high load state turned, the triage button greyed out, and and the error message to the user.
   <br>
   <img width="1408" alt="Screenshot 2024-10-31 at 4 36 21 PM" src="https://github.com/user-attachments/assets/a262d7c7-f662-4c54-b954-e8cd5e6421c0">
   <br>
  
# Design Patterns
**State pattern** <br>
The state pattern allows objects in the application to alter their own behaviour when their internal states change. An example of where this could be found and implimented in our application is in the virtual triage stage. When a patient is doing the virtual triage questionaire, the interanl state of the virtual triage object can change. An example of some of the states would be triageUnopened, triageStarted, triageFinished, and more. An example of how the object can change its behaviour based on the chnging of internal states would be when the triage goes from started to finished. The behaviors available in the finsihed state are different from the behaviors in the started state. Once finished, the patient has the option to view their results, nearby clinics, and more. Whereasduring the started state, the patient does not have the option to view these pages and can just continue the triage. This is just one exmaple of how the state pattern can manifest in our system. It can be applied to any object that has multiple states and transitions.

**Decorator pattern** <br>
The decorator pattern adds additional responsibilities objects dynamically in our Mister ED system. The decorators provide flexible alternatives to subclassing which extends the functionality. An exmaple of how the decorator pattern shows up in our system is in the Virtual Triage part. Using the decorator pattern we can add different layers of assessment to enhance the basic functionality depending in the patients answers. A decorator could focus on high-risk symptoms that the patient describes during the traige. Things like shortness of breath could lead to the decorator adding more in-depth questions about this serious symptom. Another example could be in our map of ED's a decorator could contain all the possible filters for the map layers instead of having many subclasses. These are jsut a couple exmapls of the decorator pattern being implimented in the sturcture of our system.
 
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
| Val | Coded the mentioned tactic/patterns| 
| Alex | State Pattern, Decorator Pattern |
