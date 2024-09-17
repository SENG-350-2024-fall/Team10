1. System Description

The system aims to target the currently very long ED wait times by allowing patients to forsee their waiting time, register online, and have clinicians assess what the patients next steps should be. The patient can either wait from the comfort of their own home or be redirected to a general practitioner or a pharmacy. This kind of system would be practical in the medical field worldwide, especially ones with a higher demand for doctors. Additionally, there are many cases of people misusing Emergency Departments for issues that do not require emergency care. This system will filter out false emergencies and reduce wait times in general.

There are two main users of the system: the patients and the clinicians. Each one is required to create an account and each actor is granted different permissions within the system. The patient will only have access to ED wait times, ED queue registration, their personal account and medical records, and communication with clinicians. The clinicians will have access to all patient files, all wait times, patients’ submitted assessment questionnaires, and communication with all clinics and all patients. The clinicians will be able to suggest a course of action for the patient to take based on their assessment of their questionnaire and figure out whether waiting for emergency services is appropriate in the patient’s case.


2. Use Case View
Actors: Patients Medical Staff in EDs


3. Use Case Tables

| Use Case 1 | Register Account |
| ----------- | ---------------------- |
| Description | A patient wants to create an account in order to use and interact with the system.|
| Actors | Patient |
| Assumptions | The patient has access to a device that can access the internet |
| Steps | <ul><li>Patient searches up the system name and navigates to the “Sign up” button.</li><li>Patient enters their health number and creates a password.</li></ul> |
| Variations | If patient already has an account, they must sign in (enter email and password) rather than sign up. |
| Non-Functional | <ul><li>Fast </li><li>Available in both English and French</li></ul> |
| Issues | <ul><li>No connection </li><li>Patient forgets login</li></ul> |


| Use Case 2 | Authentication |
| ----------- | ---------------------- |
| Description | The patient can log into the system |
| Actors | Patient |
| Assumptions | - The patient is already registered in the system (see Use Case 1 “Register Account”) <br> - Available clinics are already registered in the system|
| Steps | 1. The patient visits the website URL and sees the “Log in” button <br> 2. The patient clicks the button and is asked for their health number and password <br> 3. The patient enters their correct health number and password <br> 4. The patient is taken to the home page of thet application|
| Variations | Alternative flow: <br> 3. b) The patient enters incorrect information as their credentials <br> 4. b) The patient is prompted to retry logging in <br> 5) After 3 incorrect attempts, the patient must reset their password |
| Non-Functional | The database must securely store credentials in an encrypted format |
| Issues | The patient tries to log in before creating an account |


| Use Case 3 |  |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |

| Use Case 4 |  |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |

| Use Case 5 | Clinician Reviews Virtual Triage |
| ----------- | ---------------------- |
| Description | Clinician Review Virtual Triage
The clinician reviews the responses and information provided by the patient on the questionnaire. Using this information and the clinicians medical knowledge the clinician then triages the patient by severity and provides then with further instruction (referral, prescription, advice) |
| Actors | Clinician |
| Assumptions | A client has filled out and submitted a questionnaire.  |
| Steps | <ul><li>Clinician logs into account.</li><li>Navigate to patient case.</li><li>Assess individual case and provide diagnosis / next steps.</li><li>Submit diagnosis.</li></ul> |
| Issues | <ul><li>No patients </li><li>Diagnosis not successfully submitted </li><li>Staff takes too long to get to patients’ questionnaire</li></ul> |

| Use Case 6 |  |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |

| Use Case 7 |  |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |
