<!-- REPLACE ALL THE [USERNAME] TEXT WITH YOUR GITHUB PROFILE NAME & THE [PROJECTNAME] WITH THE NAME OF YOUR GITHUB PROJECT -->

<!-- Repository Information & Links-->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/KIRSTEN-23/DeluxeBookings?color=000000)
![GitHub watchers](https://img.shields.io/github/watchers/KIRSTEN-23/DeluxeBookings?color=000000)
![GitHub top language](https://img.shields.io/github/languages/top/KIRSTEN-23/DeluxeBookings?color=000000)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KIRSTEN-23/DeluxeBookings?color=000000)
<!--[![LinkedIn][linkedin-shield]][linkedin-url]
[![Instagram][instagram-shield]][instagram-url]
[![Behance][behance-shield]][behance-url]

<!-- HEADER SECTION -->
<h5 align="center" style="padding:0;margin:0;"> Kirsten Venter
, Joelene du Toit and Khanyisile Manana
</h5>
<!-- <h5 align="center" style="padding:0;margin:0;">Student Number</h5>  -->
<h6 align="center">DV 200</h6>
</br>
<p align="center">

  <a href="https://github.com/username/projectname">
    <img src="./frontend/src/Assets/images/DeluxeLogo.svg" alt="Logo" width="140" height="140">
  </a>
  
  # DeluxeBookings

  <p>
    A full stack MERN e-commerce application for discerning travellers looking for luxury accommodation

 <br>
      <a href="https://github.com/username/projectname"><strong>Explore the docs »</strong></a>
   <br />
   <br />
   <a href="path/to/demonstration/video">View Demo</a>
    ·
    <a href="https://github.com/username/projectname/issues">Report Bug</a>
    ·
    <a href="https://github.com/username/projectname/issues">Request Feature</a>
</p>
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Project Description](#project-description)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [How to install](#how-to-install)
* [Features and Functionality](#features-and-functionality)
* [Concept Process](#concept-process)
   * [Ideation](#ideation)
   * [Wireframes](#wireframes)
   * [User-flow](#user-flow)
* [Development Process](#development-process)
   * [Implementation Process](#implementation-process)
        * [Highlights](#highlights)
        * [Challenges](#challenges)
   * [Reviews and Testing](#peer-reviews)
        * [Feedback from Reviews](#feedback-from-reviews)
        * [Unit Tests](#unit-tests)
   * [Future Implementation](#peer-reviews)
* [Final Outcome](#final-outcome)
    * [Mockups](#mockups)
    * [Video Demonstration](#video-demonstration)
* [Conclusion](#conclusion)
* [Roadmap](#roadmap)
* [Acknowledgements](#acknowledgements)

<!--PROJECT DESCRIPTION-->
## About the Project
<!-- header image of project -->
![image1][image1]

### Project Description

Deluxe Bookings is a premium e-commerce ecosystem designed to facilitate the buying and selling of luxury hospitality services.

### Built With

* [MongoDB](https://www.mongodb.com/products/platform/atlas-database)
* [Express](https://www.mongodb.com/resources/products/compatibilities/express)
* [React](https://react.dev/)
* [Node](https://nodejs.org/en)

<!-- GETTING STARTED -->
<!-- Make sure to add appropriate information about what prerequesite technologies the user would need and also the steps to install your project on their own machines -->
## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of [Node.js](https://nodejs.org/) installed on your machine, and a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance running.

### How to install

### Installation
Here are a couple of ways to clone this repo:

1. Clone repositories </br>
   Run the following command in your terminal to download the project files:
   ```sh
   git clone [https://github.com/KIRSTEN-23/DeluxeBookings.git](https://github.com/KIRSTEN-23/DeluxeBookings.git)

2. Install Dependencies </br>
Run the following in the command-line to install all the required dependencies for the backend:
   ```sh
   cd backend
   npm install express mongoose cors dotenv jsonwebtoken bcryptjs && npm install --save-dev nodemon @eslint/js eslint globals
   ```
Run the following in the command-line to install all the required dependencies for the frontend:
   ```sh
   cd frontend && npm install framer-motion react-datepicker react-icons react-router-dom react-toastify react-transition-group swiper && npm install --save-dev @eslint/js @vitejs/plugin-react axios bootstrap eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals lucide-react react react-bootstrap react-dom vite
   ```


<!-- FEATURES AND FUNCTIONALITY-->
<!-- You can add the links to all of your imagery at the bottom of the file as references -->
## Features and Functionality

![Account][image2]
### Account page

Users can see their account information, edit their profile, log out, or delete their account.

![image3][image3]
![image4][image4]
![image5][image5]
### checkout form

Users fill in a checkout form with all of the necessary details.

![image6][image6]
### product filtering

Users can search and filter listings to better match their needs.

![image7][image7]
![image8][image8]
### Sign up/log in

Users can create/register an account by filling in their details and creating a password by choosing a unique picture pattern.

### Seller dashboard

Sellers can create and edit listings

![image15][image15]
### Review component

Users can review individual listings


<!-- CONCEPT PROCESS -->
<!-- Briefly explain your concept ideation process -->
## Concept Process

The `Conceptual Process` is the set of actions, activities and research that was done when starting this project.

### Ideation

![image9][image9]
<br>

### Wireframes

![image10][image10]
![image11][image11]
![image12][image12]
![image13][image13]

### User-flow

![image14][image14]

<!-- DEVELOPMENT PROCESS -->
## Development Process

The `Development Process` is the technical implementations and functionality done in the frontend and backend of the application.

### Implementation Process
<!-- stipulate all of the functionality you included in the project 

* Made use of both `functionality` to implement a specific feature.
* `MVC/MVVM` design architecture implemented.
* `Plugin` for this.
* ETC.-->

* MERN Architecture: Implemented a Model-View-Controller (MVC) pattern on the backend to decouple database schemes from routing logic.
* State Management: Integrated React state hooks and context APIs to securely propagate user session state and booking criteria across pages.
* Component-Driven UI: Styled modular components with an emphasis on responsive design, ensuring a seamless luxury feel on mobile screens and desktop monitors alike.

#### Highlights
<!-- stipulated the highlight you experienced with the project -->
* We learned how to create a secure authentication process, with password hashing.
* We also learned how to make a MERN stack application

#### Challenges
<!-- stipulated the challenges you faced with the project and why you think you faced it or how you think you'll solve it (if not solved) -->
* Major technical challenges: Github, MongoDB Database
* Problems encountered during development: merging Errors we had to solve, files paths during merging, and missing dependencies.

### Future Implementation
<!-- stipulate functionality and improvements that can be implemented in the future. -->

* Save bookings for later
* Admins can alter &  delete listings, and review flagged reviews.
* Sellers have access to analytics.

<!-- MOCKUPS -->
## Final Outcome

### Mockups

![image9][image1]

<!-- VIDEO DEMONSTRATION -->
### Video Demonstration

To see a run through of the application, click below:

[View Demonstration](path/to/video/demonstration)

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/username/projectname/issues) for a list of proposed features (and known issues).

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
<!-- all resources that you used and Acknowledgements here -->
* [W3 schools](https://www.w3schools.com/)


<!-- MARKDOWN LINKS & IMAGES -->
[image1]: frontend/src/Assets/ReadMeimages/hero-header.png
[image2]: frontend/src/Assets/ReadMeimages/account.png
[image3]: frontend/src/Assets/ReadMeimages/form-check.png
[image4]: frontend/src/Assets/ReadMeimages/form-date.png
[image5]: frontend/src/Assets/ReadMeimages/form-pay.png
[image6]: frontend/src/Assets/ReadMeimages/product.png
[image7]: frontend/src/Assets/ReadMeimages/sign-up.png
[image8]: frontend/src/Assets/ReadMeimages/spassword.png
[image9]: frontend/src/Assets/ReadMeimages/planning%20document.png
[image10]: frontend/src/Assets/ReadMeimages/wireframes1.png
[image11]: frontend/src/Assets/ReadMeimages/wireframes2.png
[image12]: frontend/src/Assets/ReadMeimages/wireframes3.png
[image13]: frontend/src/Assets/ReadMeimages/wireframes4.png
[image14]: frontend/src/Assets/ReadMeimages/userflow.png
[image15]: frontend/src/Assets/ReadMeimages/ReviewForm.jpeg


<!-- Refer to https://shields.io/ for more information and options about the shield links at the top of the ReadMe file -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/nameonlinkedin/
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&colorB=555
[instagram-url]: https://www.instagram.com/instagram_handle/
[behance-shield]: https://img.shields.io/badge/-Behance-black.svg?style=flat-square&logo=behance&colorB=555
[behance-url]: https://www.behance.net/name-on-behance/
