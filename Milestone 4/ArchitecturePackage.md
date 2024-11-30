# MisterED Software Architecture Document (SAD)
Content Owners: Ella Palter, Shyla Burns, Andra Rice, Val Savchenko, Alex Moody

## Sections
1. Documentation Roadmap and Overview
2. Architecture Background
3. Views <br>
  3.1 Module Views <br>
  3.2 C&C Views <br>
  3.3 Allocation Views<br>
4. Mapping Between Views
5. Referenced Materials
6. Glossary and Acronyms

## 1. Documentation Roadmap and Overview
Sub-parts of this section provide information that will help readers or users of the Software Architecture Document (SAD) quickly find information that will enable them to do their jobs. Readers of the SAD seeking an overview should begin here, as should readers interested in finding particular information to answer a specific question.

How the SAD is organized explains the information that is found in each section of the SAD.
How a view is documented explains how architectural views are documented in this SAD.
### Purpose and Scope of the SAD
TODO
### How the SAD is Organized
This SAD is organized into the following seven sections:

- This Documentation Roadmap and Overview provides information about this document and its intended audience. It provides the roadmap and document overview. Every reader who wishes to find information relevant to the software architecture described in this document should begin by reading this section, which describes how the document is organized, and where information may be found.
- Architecture Background provides information about the software architecture. It describes the background and rationale for the software architecture. It explains the constraints and influences that led to the current architecture, and it describes the major architectural approaches that have been utilized in the architecture.
- Views and Mapping Between Views specify the software architecture.
- Referenced Materials and Glossary and Acronyms provide reference information. Referenced Materials provides look-up information for documents that are cited elsewhere in this SAD. Glossary and Acronyms is an index of architectural elements and relations giving their definition, and where each is used in this SAD.
### How a View is Documented 
1. Primary Presentation
- Is usually graphical
- Should include a key that explains the notation
- Shows elements and relations among them
- Shows the information you want to convey about the view first
- Should identify elements that are external to scope of the view
- If external entities are not clearly marked in the diagram, consider adding a context diagram
2. Element Catalog
- Explains elements depicted in primary presentation and their properties
- Is usually a table with element name and textual description
- May contain interface documentation
- May contain behavior documentation
3. Variability Guide
- Points where system can be parameterized or reconfigured. Examples:
- Number of instances in a pool
- Support for plug-ins or add-ons
- Support for different versions of OS, database server or runtime environment
- Maybe the view is a reference architecture
- Provide guidelines to instantiate it
4. Other Information
- Description and rationale for important design decisions (including relevant rejected alternatives)
- Results of analysis, prototypes and experiments
- Context diagram
5. Parent View
- If the current view is the refinement of another view, indicate which one

## 2. Architecture Background

### Problem Background

### System Overview

### Context

### Driving Requirements

### Solution Background

### Architectural Approaches

### Analysis Results

### Mapping Requirements to Architecture

## 3. Views

### 3.1 Module View

#### Primary Presentation
![Alt](Diagrams/Module_view.drawio.svg)
#### Element Catalog
The following table describes all elements included in the primary presentation above. 

| Element Name | Description |
| -------------| ------------|
| VirtualTriageManager | Manages the end-to-end process of virtual triage for patients. Coordinates between different subcomponents to ensure accurate data collection and review. |
| VirtualTriageProcessing | Handles the collection and validation of patient triage form data submitted through the application. |
| VirtualTriageReview | Finalizes triage information by integrating clinician review to assign urgency levels and queue patients appropriately. |
| EDWaitTimes | Provides patients with estimated wait times for Emergency Departments (EDs).|
| Update (EDWaitTimes) | Handles updating ED wait times dynamically as new patients are added to queues. |
| Display| Displays real-time ED Wait Time information to patients|
| Status | Manages patient notifications about triage results and wait time updates. Tracks and manages the state of virtual triage objects throughout their lifecycle. |
| Notify | Sends out notifications to patients based on their triage and queue status. |
| Update (Status) | Tracks and applies updates to virtual triage objects, ensuring their status reflects the latest changes. |
| Data | Central repository for managing patient, ED, and triage data. |
| EDs | Maintains data on emergency department capacities and locations. |
| Patients | Stores individual patient records, including triage information and notifications. |
| VirtualTriage | Tracks triage processes and their outcomes. |
| Relational DB Interface | Provides an interface for data retrieval and updates across the system. |
#### Context Diagram
![Alt](Diagrams/Context_diagram.drawio.svg)
#### Variability Guide
TODO: Describe here any variability mechanisms used in the portion of the system shown in this view, along with how and when (build time, deploy time, run time) those mechanisms may be exercised.

Examples of variability include: optional components (e.g., plug-ins, add-ons); configurable replication of components and connectors; selection among different implementations of an element or different vendors; parameterized values set in build flags, .properties files, .ini files, or other config files.
#### Rationale
The follwing points summarize the key design decisions visible in this view <br>
- The system is designed with individual modules to ensure that each has a distinct responsiblity. This approach simplifies maintenance and testing of the system.
- The Data module acts as a central repository to ensure consistency of patient, triage, and ED data.
- The VirtualTriageReview module includes a step for clinician review to ensure that patient triage outcomes are medically accurate and trustworthy.
- Modules like Status and EDWaitTimes are designed to dynamically update their data and status at runtime. This was chosen to ensure real-time accuracy for patient notifications and ED wait times.

#### Related Views
N/A


### 3.2 C&C Views
#### Primary Presentation
UML Notation<br> <br>
![Alt](Diagrams/C&C_View.svg)

#### Element Catalog

The following table lists all elements present in the Primary Presentation shown above. It includes textual descriptions of each element which also includes their relationships to other elements.
<br>

| Element Name | Description |
| -------------| ------------|
| Login Service | Handles user authentication and authorization for patients and ED staff. Validates credentials by querying the Mister ED DB |
| HomePage Service | The front-end component of the system that interacts with users. Handles HTTP requests to register patients, show ED load, manage triage results, and display notifications. |
| Triage Service | Responsible for assessing patient condition through virtual triage. Fetches ED load data from the ED Queue Service and updates patient priority in the Mister ED DB. |
| ED Queue Service | Manages the patient queue in real-time. Updates and retrieves the status of patients in the queue and communicates ED load to the Triage Service for recommendations. |
| Notification Service | Sends notifications to patients. Retrieves contact information from the Mister ED DB and sends app-based alerts. |
| Mister ED DB | Central database which stores all system information, including user credentials, patient records, triage results, ED load, and notification logs. |

#### Context Diagram
See Context Diagram in Module View section.

#### Variability Guide

- Database compatibility: Support for different relational database systems, for example: PostgreSQL and MySQL, during deployment.
- Add Notification Services: Add new plug-ins for notifications, for example: SMS text and email, during build time/deployment.

#### Rationale

The rationale for choosing an app-based alert is mainly due to time constraints with the project. Our team needed to ensure all other major functionality like authentication and authorization of the log-in page and website were fully implemented to ensure the system was secure. Moving forward with the project, our plan entails adding additional plug-ins for notifications like SMS text and email described above in the variability guide section.


### 3.3 Allocation Views
#### Primary Presentation
UML Notation<br> <br>
![Alt](Diagrams/allocationdiagram.drawio.png)
#### Element Catalog
The following table describes all elements present in the Primary Presentation above.

| Element Name | Description |
| -------------| ------------|
| Client Device | Supports the Mister Ed user interface. Is the device users use when accessing the system. |
| Web Server | Utilizes the API gateway to support our frontend application. | 
| Application Server | Manages the load and request, and contains the virtual triage model. | 
| Database Server | Contains the database, supports user requests to access info and provides requested data. | 
| External Systems | Includes the nurse and clinician api as well as the clinic and ED api. Allows for external parties to privide info to our system. | 
| Notification Service | Sends SMS and email notifications. | 
| Patient | Acesses ED and clinic wait times. Submits virtual triage requests. Uses map. | 
| Virtual Triage | Object acessible by both the patient and virtual triage clinician. Allows patients to submit their requests and recieve advice. | 
| GP | GP provides professional advice to patients based on virtual triage submissions. | 
| ED Registration | Object for all users to register with the system regardless of their role. | 
| ED | ED's register with the system to submit wait times and accept patients.| 

#### Context Diagram
See Context Diagram in Module View section.

#### Variability Guide
TODO: Describe here any variability mechanisms used in the portion of the system shown in this view, along with how and when (build time, deploy time, run time) those mechanisms may be exercised.

Examples of variability include: optional components (e.g., plug-ins, add-ons); configurable replication of components and connectors; selection among different implementations of an element or different vendors; parameterized values set in build flags, .properties files, .ini files, or other config files.

#### Rationale

The main design decisions made that are outlined in this view include:
- Using a web server as the first heirarchical entry to the system. Doing this makes our system more accesible for all users with various devices.
- Creating just one database for all information, including user logins and triage submissions. This makes the system more reliable as it employs the singleton design pattern for consistency.
- Utilising a seperate SMS/Email service for notifications allowed us to provide more options for users to recieve their notifications and therefore support more users. 

#### Related Views
Related views include the deployment model diagram and component diagram from milestone 2 as allocation views are generally some combination of the two.

## 4. Mapping Between Views

## 5. Referenced Materials

## 6. Glossary and Acronyms

