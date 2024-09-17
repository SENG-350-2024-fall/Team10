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

| Use Case 2 |  |
| ----------- | ---------------------- |
| Description |  |
| Actors |  |
| Assumptions |  |
| Steps |  |

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

| Use Case 7 | Clinician Provides Referral or Diagnosis |
| ----------- | ---------------------- |
| Description | After reviewing the virtual triage case, the clinician will provide their referral and or diagnosis of the submission. This will allow the patient to confirm the next steps they need to take.  |
| Actors | Clinician |
| Assumptions | Clinician has an account (See Use Case 2 “Authentication”). Clinician has already reviewed the virtual triage case, previously submitted by a patient (See Use Case 5 “Clinician Review Virtual Triage”). |
| Steps | 1. Clinician logs in (See Use Case 2 "Authentication"). <br> 2. Clinician navigates to the patients' virtual triage case. <br> 3. Clinician enters their medical referral or diagnosis through the patient profile. <br> 4. Clinician submits the referral or diagnosis.|
| Issues | 1. How will the status be delivered to the patient? <br>2. How does the Clinician follow up with the patient?|
