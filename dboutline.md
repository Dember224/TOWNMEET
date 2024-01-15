# Database Outline

### State List
- State Name
: Varchar
- State Initials 
: Varchar
- State ID (PK)
: Int 

### City List 
- City Name
: Varchar
- City ID (PK)
: Int
- State ID (FK)
: Int


### Location
- State ID (FK)
: Int
- City ID (FK)
: Int
- Location ID (PK)
: Int 
- Address
: Varchar

### Departments
- Government Department (council, education, urban planning, etc.)
: Varchar
- Department ID (PK) 
: Int

### Meeting
- Meeting ID (PK)
: Int
- Location ID (FK)
: Int
- MeetTime
: Datetime
- Status (scheduled, past, cancelled, rescheduled, ongoing)
: Varchar
- Department ID (FK)
: Int
- Description
: Varchar 

### Users
- UserID (PK)
- Password 
: Password
- Email 
: Varchar

### Follows

- UserId (FK)
: Int
- City (ID)
: Int
- Department ID (FK)
: Int (Might use 0 to represent following all departments)
