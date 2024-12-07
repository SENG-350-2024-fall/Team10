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
The general purpose of the MisterED system is to alleviate the overcrowding and overloading of Emergency Departments (EDs) as well as the overly-long patient wait times by using software technology to optimize patient flow and resource management. This purpose will improve the patient expereience as well as help the emergency departments function better. <br>
The system provides an interace for users to register as a patient, asses the current ED load, perform a virtual triage of their symptoms, check-in to ED's virtually and receive notifications. 

### Context
Goals of the MisterED Software Architecture:<br>
1. Improve ED efficiency
    - Help minimize the overcrowding of ED's by directing non-urgent patients to different care options.
    - Allow ED staff to prioritize and allocate resources to more critical patients/cases. 
2. Improve the patient healthcare experience
   - By providing virtual triage options and real-time updates, patients can avoid long grueling waits at the ED.
3. Supports Scalabitilty and Flexibility
   - The software architecture supports varying ED capacities and workflows.
   - The system allows integration with external systems such as pharmacies, primary care centres, etc.
  
Major Contextual Factors:<br>
1.  Real-time complexity
    - Real-time data from more than one source (ED capacities, ED wait times, virtual triage results, etc.) need to be integrated and processed correctly.
2. User Diversity
    - The system caters to a broad user base, including patients with varying levels of technical proficiency, clinicians, and administrative staff.
3. System incorporation and regulation requirements
    - The system must be able to integrate seamlessly with other systems such as the ED software systems, appointment scheduling programs at clinics, and more.
    - The system needs to be comliant with healthcare legal standards for data privacy
4. Performance
    - Must handle many concurrent requests efficiently and without error, especially during healthcare surges
  
Role of Software Architecture in System Lifecycle <br>
1. Development
     - Defines a clear plan for design, testing, development and integration of system pieces.
     - Ensures alignment with largerer system goals such as performance, function, scalanbility and more.
2. Facilitates communication
     - The architecture serves as a common language and landscape between developers and stakeholders.
3. Relationship to System Engineering Artifacts
     - It links the systems requirements to the actual software implimentation.
     - Uses and incorporates teh results of system analysis into software design decisions
4. Helps manage complexity.
     - it helps to mange the complexity by breaking the system down into smaller more manageable components that have their own clear responsibilities.
6. Lifecycle Support
     - The architecture accomodates future iintegration and development.
     - Supports iterative development methadolagies.

### Driving Requirements
#### Functional Requirements
1. Virtual Triage<br>
Patients are able to answer questions about their symptoms to determine the severity of their condition and further actions.

2. ED Load monitoring<br>
The system displays real-time ED capcities and wait times for ED's near by.

3. Virtual sign up / login<br>
Patients/users can sign up and register online as well as log in once an account has been created. 

4. Notifications<br>
Notifies patients when it is time to visit the ED or receive care.

5. Care guidance<br>
Provide instructions and next actions to take or care to receive. This includes directiosn to nearby clinics, pharmacies or ED's. Can offer self-care recommendations for less critical cases.

6. System admin<br>
Administrators can update data, manage workflows and access sytem analytics.

7. Integration<br>
Integrate with external systems such as ED systems, appointment schedulers, etc.

#### Quality Attributes
1. Reliability<br>
Ensure reliability of system, especially during high demand periods. This could include fail-safe mechanisms for critical features in case of failure.

2. Scalability<br>
Scale easily to include new regions or additional hospitals.

3. Performance<br>
Process triage results and load data quickly (under 30s) for each patient. Notifications are sent in near-real time. 

4. Security<br>
Patient data is protected in a safe and secure manner. 

5. Usability<br>
Provide an intuitive and accessible interface for diverse users and user-groups. 

6. Maintanability<br>
Use modular, well-documented code to facilitate future updates and troubleshooting. Allow fairly seamless integration of new algorithms or features.

#### Design Constraints
1. Technological<br>
It supports operation on common platforms (web browsers, mobile apps, desktop, mobile browsers, etc.).

2. Integration<br>
Designed to be compatible with ED and other clinic software systems. 

3. Geographic<br>
Accommodates the differences in regulations, software systems and other resources/factors across different healthcare regions.

### Solution Background
#### Key Architectural Choices
1. User centred design<br>
The interface is designed with accessibility and ease-of-use for users and patients in mind. Diverse user groups, including patients and clinicians, can interact seamlessly with the system. This aligns with our usability and performance goals by simplifying the experience.

2. Integratable<br>
The sytem adheres to a base standard taht allows it to be easuly integratable with other softeware systems at EDs and clinics. This standardization ensures compatibility, data accuracy, and compliance. This architectural choice aligns with our integration goals by helping the system integrate with any basic software system.

3. Modular Microservices Architecture<br>
The system is decomposed into distinct, independently deployable services, each responsible for a specific function (e.g., triage, notifications, load monitoring).
This approach provides flexibility, scalability, and maintainability. Each service can be updated or scaled independently to handle increased demand or incorporate new features.

#### Why this architecture works
Behavioral Goals<br>
    Supports virtual triage, real-time ED monitoring, and timely notifications.<br>
    Handles high demand efficiently with modular and scalable components.

Quality Attributes<br>
    Scalability: Modular design supports future growth.<br>
    Reliability: Simple, high availability design with distributed deployment.<br>
    Security: Pricate data and information protected appropriately.<br>
    Usability: Accessible, intuitive interfaces for all users.<br>

Design Constraints<br>
    Complies with and integrates seamlessly with existing healthcare systems.

#### Conclusion
Our Mister Ed architecture balances functionality, usability, and performance to meet its goals of reducing ED overcrowding while improving patient care and experience.
 
### Architectural Approaches
#### Design Rationale
The Mister Ed system architecture reflects important decisions made to address the challenges of ED overcrowding and meet the outlined goals for efficiency, scalability, and user experience. Key architectural decisions were made based on their ability to satisfy the functional and quality requirements while adhering to the design constraints.

**User-Centered Design<br>**
Why Chosen: <br>
        Usability: An intuitive, accessible interface caters to diverse user groups, including patients and clinicians, ensuring inclusivity.
<br>Alternatives Considered:<br>
        Basic UI with Limited Accessibility: Rejected as it would alienate non-technical users and fail to meet inclusivity goals.

**Integratability <br>**
Why Chosen:<br>
        Integrability: THis facilitates seamless integration with existing ED systems and external services, ensuring the correct data exchange.
<br>Alternatives Considered:<br>
        Custom Protocols: Rejected due to potential integrability issues and higher maintenance cost.
        
**Microservices Architecture<br>**
Why Chosen:<br>
        Scalability: Each service (e.g., triage, notifications, monitoring) operates independently, allowing horizontal scaling to handle high demand.
        <br>Maintainability: This modularity enables easier updates, debugging, and incremental feature additions.
        <br>Alignment with Goals: Matches the scalability and reliability requirements, supports integration with diverse systems, and simplifies geographic customizations.
<br>Alternatives Considered:<br>
        Monolithic Architecture: Rejected due to the challenges in scaling and maintaining a single large codebase. It was less suited for accommodating regional and functional differences across varying healthcare systems.

### Analysis Results
Usability Testing<br>
Method:<br>Conducted usability tests with a diverse group of participants and potential users. THen, evaluated the ease of navigation, accessibility, and response time. <br>
Results:<br>
The majority of participants described the interface as intuitive and easy to navigate.
<br><br>
Performance Modeling<br>
Method:<br>Simulated concurrent virtual triage to measure system under various loads.<br>
Results:<br>
Average processing time for virtual triage questions was low (a few seconds) which was deemed as more than acceptable.

### Mapping Requirements to Architecture

#### Functional Requirements
| **Requirement**            | **Architectural Element**                                              | **Description**                                                                 |
|-----------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Virtual Triage**          | **Triage Service**                                                | Processes patient symptom inputs, applies decision-tree algorithms, and provides guidance or recommendations. |
| **ED Load Monitoring**      | **Load Monitoring Service**                                       | Continuously fetches and aggregates real-time ED load and wait time data from external systems. |
| **Virtual Signup/Login**    | **User Management Service**                                       | Handles user registration, ensuring secure and compliant management of patient data. |
| **Notifications**           | **Notification Service**                                         | Sends real-time alerts to patients about ED visit times or care updates using an event-driven messaging system. |
| **Care Guidance**           | **Decision Support System (within Triage Service)**              | Suggests alternate care options (GPs, pharmacies, self-care) based on triage results. |
| **System Admin**            | **Administrative Interface and Backend**                              | Allows administrators to manage workflows, update triage protocols, and access analytics. |
| **Integration**             | **Integration Layer**                                                 | Connects with ED systems and third-party services like appointment schedulers and clinic directories. |

#### Quality Attributes
| **Quality Attribute**       | **Architectural Element**                                              | **Description**                                                                 |
|-----------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Reliability**             | **Event-Driven Architecture Design**                      | Ensures fault tolerance with fail/rollback mechanisms. |
| **Scalability**             | **Microservices Architecture Design**                  | Supports scaling of individual services to accommodate changing user demand. |
| **Performance**             | **Event-Driven Communication**                        | Low-latency messaging ensures real-time notifications. |
| **Security**                | **Secure Data Storage**                               | Implements secure protocols to protect patient data. |
| **Usability**               | **User-Centered Design**                                   | Provides an intuitive, accessible interface, ensuring usabiligty by diverse user groups. |
| **Maintainability**         | **Modular Codebase**        | Modular design simplifies updates and maintenance. |

#### Design Constraints
| **Constraint**              | **Architectural Element**                                              | **Description**                                                                 |
|-----------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Technological**           | **Cross-Platform Development Frameworks (e.g., React, Flutter)**       | Enables deployment across web browsers, mobile devices, and desktop platforms seamlessly. |
| **Integration**             | **Integration Layer with Standards (HL7, FHIR)**                      | Adheres to established healthcare data exchange protocols, ensuring compatibility with existing ED and clinic systems. |
| **Geographic**              | **Configurable Localization Features**                                | Supports region-specific regulatory requirements, language options, and healthcare workflows. |


## 3. Views

### 3.1 Module Views
Each view must contain the following categories<br>
#### Primary Presentation
TODO: Add here the diagram (or non-graphical representation) that shows the elements and relations in this view. Indicate the language or notation being used. If it's not a standard notation such as UML, add a notation key.
#### Element Catalog
TODO: This section can be organized as a dictionary where each entry is an element of the Primary Presentation. For each element, provide additional information and properties that the readers would need that would not fit in the Primary Presentation. Optionally, you can add interface specifications and behavior diagrams (e.g., UML sequence diagrams, statecharts).
#### Context Diagram
TODO: Add here a context diagram that graphically shows the scope of the part of the system represented by this view. A context diagram typically shows the part of the system as a single, distinguished box in the middle surrounded by other boxes that are the external entities. Lines show the relations between the part of the system and the external entities.
#### Variability Guide
TODO: Describe here any variability mechanisms used in the portion of the system shown in this view, along with how and when (build time, deploy time, run time) those mechanisms may be exercised.

Examples of variability include: optional components (e.g., plug-ins, add-ons); configurable replication of components and connectors; selection among different implementations of an element or different vendors; parameterized values set in build flags, .properties files, .ini files, or other config files.
#### Rationale
TODO: Describe here the rationale for any significant design decisions whose scope is limited to this view. Also describe any significant rejected alternatives. This section may also indicate assumptions, constraints, results of analysis and experiments, and architecturally significant requirements that affect the view.
#### Related Views
TODO: Add here links to the parent view and to any children (i.e., refined) views, if they exist.
### 3.2 C&C Views
#### Primary Presentation
TODO: Add here the diagram (or non-graphical representation) that shows the elements and relations in this view. Indicate the language or notation being used. If it's not a standard notation such as UML, add a notation key.
#### Element Catalog
TODO: This section can be organized as a dictionary where each entry is an element of the Primary Presentation. For each element, provide additional information and properties that the readers would need that would not fit in the Primary Presentation. Optionally, you can add interface specifications and behavior diagrams (e.g., UML sequence diagrams, statecharts).
#### Context Diagram
TODO: Add here a context diagram that graphically shows the scope of the part of the system represented by this view. A context diagram typically shows the part of the system as a single, distinguished box in the middle surrounded by other boxes that are the external entities. Lines show the relations between the part of the system and the external entities.
#### Variability Guide
TODO: Describe here any variability mechanisms used in the portion of the system shown in this view, along with how and when (build time, deploy time, run time) those mechanisms may be exercised.

Examples of variability include: optional components (e.g., plug-ins, add-ons); configurable replication of components and connectors; selection among different implementations of an element or different vendors; parameterized values set in build flags, .properties files, .ini files, or other config files.
#### Rationale
TODO: Describe here the rationale for any significant design decisions whose scope is limited to this view. Also describe any significant rejected alternatives. This section may also indicate assumptions, constraints, results of analysis and experiments, and architecturally significant requirements that affect the view.
#### Related Views
TODO: Add here links to the parent view and to any children (i.e., refined) views, if they exist.
### 3.3 Allocation Views
#### Primary Presentation
TODO: Add here the diagram (or non-graphical representation) that shows the elements and relations in this view. Indicate the language or notation being used. If it's not a standard notation such as UML, add a notation key.
#### Element Catalog
TODO: This section can be organized as a dictionary where each entry is an element of the Primary Presentation. For each element, provide additional information and properties that the readers would need that would not fit in the Primary Presentation. Optionally, you can add interface specifications and behavior diagrams (e.g., UML sequence diagrams, statecharts).
#### Context Diagram
TODO: Add here a context diagram that graphically shows the scope of the part of the system represented by this view. A context diagram typically shows the part of the system as a single, distinguished box in the middle surrounded by other boxes that are the external entities. Lines show the relations between the part of the system and the external entities.
#### Variability Guide
TODO: Describe here any variability mechanisms used in the portion of the system shown in this view, along with how and when (build time, deploy time, run time) those mechanisms may be exercised.

Examples of variability include: optional components (e.g., plug-ins, add-ons); configurable replication of components and connectors; selection among different implementations of an element or different vendors; parameterized values set in build flags, .properties files, .ini files, or other config files.
#### Rationale
TODO: Describe here the rationale for any significant design decisions whose scope is limited to this view. Also describe any significant rejected alternatives. This section may also indicate assumptions, constraints, results of analysis and experiments, and architecturally significant requirements that affect the view.
#### Related Views
TODO: Add here links to the parent view and to any children (i.e., refined) views, if they exist.
## 4. Mapping Between Views

## 5. Referenced Materials

## 6. Glossary and Acronyms

