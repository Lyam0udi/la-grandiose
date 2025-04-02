# School's Website


## Overview
This project is a modern, fully responsive school website built using Laravel Inertia and React. It incorporates a powerful tech stack to ensure seamless performance and scalability.

### **Tech Stack:**
- **Frontend:** React, TailwindCSS, JavaScript, HTML, CSS
- **Backend:** PHP, Laravel
- **Database:** MySQL
- **Other Features:** Dark Mode, Internationalization, Authentication, Blog System, and Admin Dashboard

## Features
- **Dynamic Landing Page** with multiple sections
- **Blogging Platform** for publishing news and updates
- **User Authentication** (Registration, Login, Password Recovery)
- **Student Enrollment System**
- **Admin Dashboard** with CRUD functionalities
- **Multilingual Support**
- **Dark/Light Mode Toggle**

## Best Practices, SEO, Performance, Accessibility and Mobile Responsiveness

- This web application follows industry best practices to ensure high performance, accessibility, and SEO optimization:
- SEO-Friendly Structure: Proper meta tags, semantic HTML, and Open Graph support for better search engine visibility.
- High Performance: Optimized asset loading, lazy loading of images, and efficient API calls.
- Accessibility Compliance: ARIA attributes, keyboard navigation, and color contrast improvements for an inclusive user experience.
- Mobile Responsiveness: The application is fully responsive, ensuring seamless usability across all screen sizes and devices.

---

## Project Structure

### **1. Landing Page**
The homepage consists of multiple sections that provide an overview of the school and its offerings.

- **Navbar**
- **Home**
- **About**
- **Cycles**
- **Why Choose Us**
- **Testimonials**
- **Professors Cards**
- **Contact Us**
- **Footer**

#### **Home**
![image](https://github.com/user-attachments/assets/cb281972-d99f-4c2b-aa14-7a07db05fe49)

#### **About**
![image](https://github.com/user-attachments/assets/1fe41a0a-461d-4c42-a143-2512e9b9aa81)

#### **Cycles**
![image](https://github.com/user-attachments/assets/15b70d6f-4a58-4fd2-ad89-ff0b19c572c8)

#### **Why Choose Us**
![image](https://github.com/user-attachments/assets/476d4d43-127d-4d59-a594-b198c756e3ea)
![image](https://github.com/user-attachments/assets/94121a14-a82a-4443-900d-7e7cb8d6d405)

#### **Testimonials**
![image](https://github.com/user-attachments/assets/04abc8a9-e93b-45f9-aef9-508db9895644)

#### **Professors Cards**
![image](https://github.com/user-attachments/assets/c99bf912-36e7-41f1-a0ae-0b862e4d58cd)

#### **Contact Us**
![image](https://github.com/user-attachments/assets/46308380-9749-40b3-a7e1-ddf1d94ddcda)

#### **Dark/Light Mode Support**
![image](https://github.com/user-attachments/assets/953d31fe-9b35-41d1-94b5-0f7d1b4eea91)

#### **Internationalization Support**
![image](https://github.com/user-attachments/assets/fd4e4e00-6485-4b7b-b72f-831fcfa893e1)

---

### **2. Blogging Page**
Users can access a dynamic blog to stay updated with school news.
![image](https://github.com/user-attachments/assets/97146c33-f776-47e7-99b1-a2e608c2cb9e)

---

### **3. Authentication & User Management**
- **Inscription Page**
  ![image](https://github.com/user-attachments/assets/5d3a4603-d50e-4a85-818f-a1c6b1ccd951)

- **Register & Login Pages**
  ![image](https://github.com/user-attachments/assets/c6ca2f74-87b8-404f-8e48-dde3a77df9e0)

- **Forgotten Password Page** *(Image not available)*

---

### **4. Admin Dashboard**
Admins can manage website content, users, and enrollment records.

- **Dashboard Overview**
  ![image](https://github.com/user-attachments/assets/03088cd9-a89f-4505-ae05-39aea6896fef)

- **Dashboard CRUD Pages**
  ![image](https://github.com/user-attachments/assets/8e076dcf-afac-4f77-a6ca-6205baeaa9c4)

- **User Profile Page**
  ![image](https://github.com/user-attachments/assets/074c606a-7ca0-4396-9090-2222a5bc69b6)

---

## Installation & Setup
To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo-link.git
   cd project-directory
   ```

2. **Install Dependencies:**
   ```bash
   composer install
   npm install && npm run dev
   ```

3. **Set Up Environment Variables:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run Database Migrations:**
   ```bash
   php artisan migrate --seed
   ```

5. **Start the Development Server:**
   ```bash
   php artisan serve
   ```

Now, open your browser and go to `http://127.0.0.1:8000/` to access the project.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For any inquiries or suggestions, contact us at [My Portfolio](https://lyam0udi.netlify.app/) .

---

## Next Tasks : 
+ Landing Page :
	
	Changing URL while scrolling.
	Correct localization map in Contact and Inscription
	Display Testimonials, ProfCards, Cycles,
	Performance in Professors Cards
+ Blogging Page :	
	List of blogs Page,
	Single Blog Page (Improve design)
	Fixe bug search and category search in more than one page, page 2, 3 etc..
+ Inscription Page :
+ Register Page : 
	Translate Page based on Local storage (white and dark mode)
+ LogIn Page :
	Translate Page based on Local storage (white and dark mode)
+ Frgotten Password Page :
+ Dashboard :
	Fixe Slug bugs (Case of delete, Slug Based on title and not content for blog[Fixe the Slug to the first word or 3 first words?])
	Improve inputs (Required)
	Support dark/white mode
+ Profile Page :
    Make it support i18n.
+ DashboardCrud Pages :
+ Profile Page : support i18n
+ 404 Page :
	Display the 404 Page in Case of the error 404.
+ Entire Web App :
	Performance,
	Support Arabic display right to life (Tailwind CSS) 
	Content in i18n JSON files.
	i18n support, (in alerts and error messages too)
	SEO, robots? 
	Good Practices,
	Tests, front/back/ different browsers, PHP Unit.
	Delete images after deleting (storage link)
	Hosting,
	Check and improve security.
	Titles in the entire web pages.
+ Security :
      Improve security.
  

Sending Mails option via Inscription page and contact section. Fixe bug blog carousel, (it dosent maintain local storage theme) 

