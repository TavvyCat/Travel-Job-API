# Travel Rehab Jobs
This is an app that connects traveling rehab specialists looking for contracts to facilities and companies offering contracts. When someone signs in they can choose employer or employee, and employees choose which occupation they are. The Employers can post new jobs that anyone can see. And the employees see those jobs (next version will have ability to apply).

### Planning
My wife is a traveling physical therapist, and we had this idea for a website/app that would remove the need for a recruiter or recruiting company. This project is the bare bones of that idea. I knew there needed to be different types of users. On the front end, the two types of users have different options, but both types use the same schema on the back end. At first, I had the info about the employer in the job schema, but then realized I could easily have that as part of the user schema. Then the job schema only needed a few things.

### ERD

![https://user-images.githubusercontent.com/56958408/99131542-0d86c880-25d9-11eb-8b68-26d8336a9b3d.png]

### Technologies used:
* Node.js
* Express 
* MongoDB 
* Mongoose
* Bcrypt
* Passport

### Problems
I didn't have many problems I wasn't able to solve quickly, but I knew I wanted for users to be able to update their info. If a phone number changed, it would be very inconvenient to have to sign-up again. So I had to have an update route for my users, where before I had only had the authorization routes. I was provided with a template from General Assembly, and was able to use that to make sure my back-end was done properly.

### Future
There are several additions I would like to make. First, I want a real way for employees to actually apply. Ideally they could send a cover letter and resume file in an email straight from the website to the employer. I need to research sendGrid to accomplish this. Additionally, I want employees to be able to see the jobs they have applied to, and for the employers to see their jobs postings and all the employees that have applied. I may do this on the back end by adding a key to the schema that is an array which has all the ids of employees that have applied. Then I would filter it on the front end.

#### Links
[Deployed Front End](https://tavvycat.github.io/Travel-Jobs-Client/)

[Repo for Front End](https://github.com/TavvyCat/Travel-Jobs-Client)

[Deployed Back End](https://travel-jobs-api.herokuapp.com/)