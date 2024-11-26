## Milestone 4

### Architecture documentation package.

   Please refer to the ArchitecturePackage.md file.


### Plan and conduct the review of the architecture package

Question Set Name:  Analysts Architectural Review of Mister ED System

Purpose: Assess the performance, accuracy, modifiability, security, availability, & usability of Mister ED.

Stakeholders and Concerns: Software Analysts

Questions:

Respondents = Analyst
Criticality = questions revealing incompleteness & issues are most critical

Can you identify any unresolved issues?
Expected answer: Hopefully no, although very open-ended.

Performance:
How does it handle peak load scenarios & traffic spikes?
Expected answers: Disabling less important features.

What is in place for optimizing db queries?
Expected answers: Singleton pattern for the DB.

Accuracy:
How is the data accuracy validated?
Expected answers: 

Modifiability:
What design patterns are used to support future changes?
Expected answers: Strategy, Decorator.

Are there areas that are difficult/risky to modify?
Expected answers: The DB schema.

Security:
How is authentication handled?
Expected answers: Log-in.

Availability:
How is system health monitored?
Expected answers: Self-testing.

Usability:
What usability goals are prioritized?
Expected answers: ER locations and wait times, the triage survey


How are the user interfaces designed for ease of use?
Expected answers: There are different user interfaces for each user to streamline the experience for each unique use case.


Are there any known usability pain points?
Expected answers: Ideally no.




-result of the review with the 6 step process

### Design Diagrams and System Description
To do:
- Update class diagram to include strategy patterns from last milestone <br>



4. System Implementation
 The goals for Milestone 4 was to finish coding the front-end of the remaining pages: Virtual Triage Form, the Log In Notifications, and the Patient's live status in the triage process.  
 
 The Virtual Triage Form just got a UI tune up.

 Log In was created for Patients and Clinicians. Patients are to sign in with their Health Number and the password they create. Clinicians are to sign in with their Employee ID. Authentification must be handled carefully and requires more work than the time that we have for this, thus, it was coded strictly in the frontend for a specific user that already exists in the database (see Figure #). The Log In is required to use the services and other pages cannot be accessed otherwise (see Figure #). 

 ![Alt](Diagrams/ClassDiagram.svg)
 Figure #: The UI for the Log In page

 Figure #: The user in the database

 Figure #: Log in is required
 
 The Notifications page was created to include a Patient's previous notifications and present new notifications from the Clinician's Triage.


The Current Status page shows the user where they are in the Triage process at that moment (see Figure #) and once the triage is finished, they are told to navigate to the Notifications page to view their results (Figure #).

Figure #: Live Status

Figure #: Redirection to Notifications

All pages can be navgated to via the Home Page

Figure #: Home Page


5. Contributions


| Name | Contributions | 
| ----------- | ---------------------- |
| Ella |  |
| Andra | allocation table |
| Shyla | C&C View Section (primary presentation, element catalog, context diagram, variability, rationale) |
| Val |  | 
| Alex |  |
