# Fitness App 

An APP designed to manage Heart Cycling Studio Member subscriptions ☺

## Structure

- html/css for main layout
- js to generate member-list table dynamically
- SQL database used for storing members
- static json files used as database for live preview
- Gravatar used for profile photo source

## Content

- CRUD operations:
    - **C**reate new member (main window)
    - **R**ead members from db (main window)
    - **U**pdate member (member detail window)
    - **D**elete member (member details window)

- Other opperations: 
    - **Search** members
    - **Present** to log every presence of selected member
    - **Browse** details (personal details + membership status)
    - **Edit** the number of available sessions

- Operations in **Member details**
    - **Add 4/8/12** sessions
    - **Edit** member details (name/password/phone/e-mail/sessions/subscription validity)

## Live preview

Open [Live demo](https://1lucianmoldovan.github.io/node-fitness-app/public/index.html)

## Setup

```
git clone https://github.com/1lucianmoldovan/node-fitness-app.git
cd node-fitness-app
npm install
```

## Data base integration

```
Donwload & install XAMPP
Run Xampp -> Start Apache & MySQL
Go to browser -> localhost -> phpMyAdmin
Create new db & name it "fitness" (utf8_general_ci)
Go to "import" tab -> select fitness.sql from project folder -> "GO"
Open terminal -> npm install 
```

## Running app

```
npm run devstart
```

Open http://localhost:3000/