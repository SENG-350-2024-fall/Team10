System Description


Describe the system in your own words (0.5-1 page)
The system aims to target the currently very long ED wait times by allowing patients to forsee their waiting time, register online, and have clinicians assess what the patients next steps should be. The patient can either wait from the comfort of their own home or be redirected to a general practitioner or a pharmacy. This kind of system would be practical in the medical field worldwide, especially ones with a higher demand for doctors. Additionally, there are many cases of people misusing Emergency Rooms for issues that do not require emergency care. This system will filter out false emergencies and reduce wait times in general.

There are two main users of the system: the patients and the clinicians. Each one is required to create an account and each actor is granted different permissions within the system. The patient will only have access to wait times, ED queue registration, their own account and medical records, and to communication with medical staff. The medical staff will have access to all patient files, all wait times, patients’ submitted assessment questionnaires, and communication with all clinics and all patients. The medical staff will be able to suggest a course of action for the patient to take based on their assessment of their questionnaire and figure out whether waiting for emergency services is appropriate in the patient’s case.

Bullet Point: Interactive virtual software that enables patients to get the help they need faster than everyone waiting in the ED Patients can view the stat Patient logs in/registers Dynamic questionnaire that adapts to the patient's previous answers. Recommends next steps: Go to GP Over the counter medication Use hotline Visit ED immediately Visit ED when notified by system


2. Use Case View
Actors: Patients Medical Staff in EDs


3. Use Case Tables

| Use Case 1 | Register Account |
| ----------- | ---------------------- |
| Description | A patient wants to create an account in order to use and interact with the system.|
| Actors | Patient |
| Assumptions | The patient has access to a device that can access the internet |
| Steps | <ul><li>Patient searches up the system name and navigates to the “Sign up” button.</li><li>Patient enters their health number and creates a password.</li></ul> |


| Use Case 2 | Authentication |
| ----------- | ---------------------- |
| Description | The patient can log into the system |
| Actors | Patient |
| Assumptions | - The patient is already registered in the system (see Use Case 1 “Register Account”) <br> - Available clinics are already registered in the system|
| Steps | 1. The patient visits the website URL and sees the “Log in” button <br> 2. The patient clicks the button and is asked for their health number and password <br> 3. The patient enters their correct health number and password <br> 4. The patient is taken to the home page of thet application|
| Variations | Alternative flow: <br> 3. b) The patient enters incorrect information as their credentials <br> 4. b) The patient is prompted to retry logging in <br> 5) After 3 incorrect attempts, the patient must reset their password |
| Non-Functional | The database must securely store credentials in an encrypted format |
| Issues | The patient tries to log in before creating an account |


| Use Case 3 | Check ED / Clinic Wait Times |
| ----------- | ---------------------- |
| Description | The patient can view current wait times for nearby in person clinics and emergency departments. |
| Actors | Patient |
| Assumptions |- The patient is already registered in the system (see Use Case 1 “Register Account”). <br> - The patient is logged in (and is not about to have a timed-out session) (see Use Case 2 “Authentication”). <br> - The patient allows their location to be shared with their browser|
| Steps | 1. The patient clicks the “View Wait Times” button <br> 2. The patient is shown clinics near them in a map format <br> 3. The patient can hover over each clinic to view their wait times. <br> 4. The patient clicks on a clinic to register in line. <br> 5. The patient is presented the triage questionnaire (see Use Case 4 “Patient Virtual Triage”) <br> 6. Upon completion of the questionnaire, the patient submits the questionnaire for review (see Use Case 5 “Clinician Review Virtual Triage”). |
| Variations | 3.b) The patient chooses “List View” and sees the clinics near them with their wait times in a list format |
| Non-Functional Requirements | - The clinic wait time display must be real-time -> servers must be scalable for busy hours and must have a load balancer <br> Website must be available 99.9% of the time|
| Issues |- Website is down and shows inaccurate times <br> - ED is too busy to update the business of the clinic and the times are inaccurate <br> - Patients with severe emergency issues may take precedence and come unannounced <br> - Patient does not share location with their browser and has to manually enter it (lowers usability a little) |

| Use Case 4 |  |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |

| Use Case 5 | Clinician Reviews Virtual Triage |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |

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
