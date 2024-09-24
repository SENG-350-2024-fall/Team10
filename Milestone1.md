# 1. System Description

The system aims to target the currently very long ED wait times by allowing patients to forsee their waiting time, register online, and have clinicians assess what the patients next steps should be. The patient can either wait from the comfort of their own home or be redirected to a general practitioner or a pharmacy. This kind of system would be practical in the medical field worldwide, especially ones with a higher demand for doctors. Additionally, there are many cases of people misusing Emergency Departments for issues that do not require emergency care. This system will filter out false emergencies and reduce wait times in general.

There are two main users of the system: the patients and the clinicians. Each one is required to create an account and each actor is granted different permissions within the system. The patient will only have access to ED wait times, ED queue registration, their personal account and medical records, and communication with clinicians. The clinicians will have access to all patient files, all wait times, patients’ submitted assessment questionnaires, and communication with all clinics and all patients. The clinicians will be able to suggest a course of action for the patient to take based on their assessment of their questionnaire and figure out whether waiting for emergency services is appropriate in the patient’s case.


# 2. Use Case View
Actors: 
Patient
ED Admin
Virtual Triage Clinician
GP/clinic


Use Case 3 Diagram  - Patient wants to only check times

Use Case 4 Diagram - Patient Virtual Triage

![Alt](patientB.drawio.svg)

Note: if viewing in dark mode and you cannot see the lines, please try viewing in light mode (with white background)

# 3. Use Case Tables

| Use Case 1 | Register Account |
| ----------- | ---------------------- |
| Description | A user wants to create an account to use and interact with the system.|
| Actors | User = Patient, Virtual Triage Clinician, GP, ED Admin|
| Assumptions | The user has access to a device that can access the internet |
| Steps | 1. a. Patient searches up the system name and navigates to the “Sign up” button. <br> 1. b. Virtual Triage Clinician, GP, or ED Admin receives an invitation email to register and navigates to the "Provider Sign up" button. <br> 2. a. Patient enters their health number and creates a password. <br> 2. b.  Virtual Triage Clinician, GP, or ED Admin enters their employee number and creates a password.|
| Variations | 2. If the user already has an account, they must sign in (See Use Case 2 "Authentication") rather than sign up. |
| Non-Functional | 1. Fast <br> 2. Available in both English and French |
| Issues | 1. No connection <br> 2. User forgets login |


| Use Case 2 | Authentication |
| ----------- | ---------------------- |
| Description | The user can log into the system |
| Actors | User = Patient, Virtual Triage Clinician, GP, ED Admin |
| Assumptions | - The user is already registered in the system (see Use Case 1 “Register Account”) <br> - Available EDs are already registered in the system|
| Steps | 1. The user visits the website URL and sees the “Log in” button <br> 2. The user clicks the button and is asked for their credentials <br> 3. The user enters their correct credentials <br> 4. The user is taken to the home page of the application|
| Variations | Alternative flow: <br> 3. b) The user enters incorrect information as their credentials <br> 4. b) The user is prompted to retry logging in <br> 5) After 3 incorrect attempts, the user must reset their password |
| Non-Functional | The database must securely store credentials in an encrypted format |
| Issues | The user tries to log in before creating an account |


| Use Case 3 | Check ED Wait Times |
| ----------- | ---------------------- |
| Description | The patient can view current wait times for nearby emergency departments. |
| Actors | Patient |
| Assumptions |- The patient is already registered in the system (see Use Case 1 “Register Account”). <br> - The patient is logged in (and is not about to have a timed-out session) (see Use Case 2 “Authentication”). <br> - The patient allows their location to be shared with their browser|
| Steps | 1. The patient clicks the “View Wait Times” button <br> 2. The patient is shown ED near them in a map format <br> 3. The patient can hover over each ED to view their wait times. <br> 4. The patient clicks on an ED to register in line. <br> 5. The patient is presented the triage questionnaire (see Use Case 4 “Patient Virtual Triage”) <br> 6. Upon completion of the questionnaire, the patient submits the questionnaire for review (see Use Case 5 “Clinician Review Virtual Triage”). |
| Variations | 3.b) The patient chooses “List View” and sees the ED near them with their wait times in a list format |
| Non-Functional Requirements | - The ED wait time display must be real-time -> servers must be scalable for busy hours and must have a load balancer <br> Website must be available 99.9% of the time|
| Issues |- Website is down and shows inaccurate times <br> - ED is too busy to update and the times are inaccurate <br> - Patients with severe emergency issues may take precedence and come unannounced <br> - Patient does not share location with their browser and has to manually enter it (lowers usability a little) |

| Use Case 4 | Patient Virtual Triage |
| ----------- | ---------------------- |
| Description | The patient can complete a dynamic virtual questionnaire that adapts to the patient's previous answers. |
| Actors | Patient |
| Assumptions | The patient is already registered in the system. See use case 1. <br> The patient is logged in to the system. |
| Steps |  1.  The patient licks the “new virtual triage” button. <br> 2. The patient is taken to the virtual triage page. <br> 3. The patient is asked a question about their current situation/symptoms. <br> 4. The patient is shown the next question built off of the previous answer(s). Patient repeats until no questions remain. <br> 5. The patient clicks the “submit” button to submit the virtual triage for review. <br> 6. The patient is provided with a next course of action upon completion of their virtual triage’s review (See use case 5).|
| Issues | Virtual triage review may take too long. <br> No clinicians available to review the triage.|

| Use Case 5 | Clinician Reviews Virtual Triage |
| ----------- | ---------------------- |
| Description | The clinician reviews the responses and information provided by the patient on the questionnaire (see use case 4). Using this information and the clinicians medical knowledge the clinician then triages the patient by severity and provides then with further instruction (ie. referral, prescription, advice) |
| Actors | Clinician |
| Assumptions | A client has filled out and submitted a questionnaire (see use case 4).  |
| Steps | 1. Clinician logs into account.<br>2. Navigate to patient case. <br>3. Assess individual case and provide diagnosis / next steps. <br>4. Submit diagnosis.<br> |
| Issues | <ul><li>No patients </li><li>Diagnosis not successfully submitted </li><li>Staff takes too long to get to patients’ questionnaire</li></ul> |

| Use Case 6 | Patient Check Referral / Notification |
| ----------- | ---------------------- |
| Description | The patient views the next step(s) recommendation of the clinician through a notification in the system. |
| Actors | Patient |
| Assumptions | Clinician has reviewed virtual triage case (see Use Case 5) and submitted recommendations to the system (see Use Case 7). |
| Steps | 1. Patient signs into their system account (see Use Case 2) <br> 2. Patient checks notification from clinician<br> 3. Patient waits for ED notification<br>|
| Variations| 3b. Patient follows Clinicians referral that is external to the system (visit GP, over the counter medication, call hotline, or visit ED immediately)|
| Issues | <ul><li>Untimely status notification |

| Use Case 7 | Clinician Provides Referral or Diagnosis |
| ----------- | ---------------------- |
| Description | After reviewing the virtual triage case, the clinician will provide their referral and or diagnosis of the submission. This will allow the patient to confirm the next steps they need to take.  |
| Actors | Clinician |
| Assumptions | Clinician has an account (See Use Case 2 “Authentication”). Clinician has already reviewed the virtual triage case, previously submitted by a patient (See Use Case 5 “Clinician Review Virtual Triage”). |
| Steps | 1. Clinician logs in (See Use Case 2 "Authentication"). <br> 2. Clinician navigates to the patients' virtual triage case. <br> 3. Clinician enters their medical referral or diagnosis through the patient profile. <br> 4. Clinician submits the referral or diagnosis.|
| Issues | 1. How will the status be delivered to the patient? <br>2. How does the Clinician follow up with the patient?|

| Use Case 10 | Find Closest ED |
| ----------- | ---------------------- |
| Description | A patient can view the locations of ED's in their area. |
| Actors | Patient |
| Assumptions | Patient has an account (See Use Case 2 “Authentication”). |
| Steps | 1. Patient logs in (See Use Case 2 "Authentication"). <br> 2. Patient navigates to the ED map. <br> 3. Patient views ED's. |

| Use Case 8 | Update or View Patient Queue |
| ----------- | ---------------------- |
| Description | GP can view a list of patients who have been referred to the clinic. Additionally, ED Admin can view a list of patients who have been referred to the ED, and the waitlist. |
| Actors | User = GP, ED Admin |
| Assumptions | User has an account (See Use Case 2 “Authentication”). |
| Steps | 1. User logs in (See Use Case 2 "Authentication"). <br> 2. User navigates to the patient queue. <br> 3. User views patient queue. |
| Variations | 3. a) ED Admin sends notification to patient. |

  
| Use Case 9 | Update ED Information |
| ----------- | ---------------------- |
| Description |   |
| Actors | ED Admin |
| Assumptions | ED is registered with the system (See Use Case 2 “Authentication”) |
| Steps | 1. ED Admin logs into system <br> 2. ED navigates to the information tab and changes the necessary information <br> 3. Admin submits the changes |
| Variations| - Change ED hours <br> -Change ED wait times |
| Issues | 1.Wait times aren't accurate |


# 4. Contributions

| Name | Contributions | 
| ----------- | ---------------------- |
| Ella | Use Case: "Patient Check Referral/Notification", edited use case 1 with Shyla|
| Andra | Use Cases: "Clinician Reviews Virtual Triage" / "Register Account", Markdown Formatting |
| Val | Summary, Use Cases: “Authentication” and “Check ED / Clinic Wait Times”, Use Case Diagram | 
| Shyla | Edited Summary, Use Case: “Clinician Provides Referral / Diagnosis”, Edited Use Case 1 with Ella, Edited Use Case Diagram|
| Alex | Use Cases: “Patient Virtual Triage”, Markdown Formatting |
