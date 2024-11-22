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

### System Implementation @VALLLLL
Specify the remaining implementation goals for this last sprint. Implement them and comment on the completion. Describe what goals were in the previous sprints, why they were shifted, and when they were completed.


### Contributions

| Name | Contributions | 
| ----------- | ---------------------- |
| Ella |  |
| Andra | allocation table |
| Shyla | C&C View Section (primary presentation, element catalog, context diagram, variability, rationale) |
| Val |  | 
| Alex |  |
