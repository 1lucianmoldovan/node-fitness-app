# Fitness App

An APP designed to manage Fitness Studio Members recording daily activity ☺

## Structure

- html/css for main layout
- js to generate member-list table dynamically
- static json files as current database

## Content

- CRUD operations:
    - **C**reate new member (main window)
    - **R**ead member from [members.json](public/data/contacts.json) file
    - **U**pdate member (member detail window)
    - **D**elete member (member details window)

- Other opperations: 
    - **Search** members
    - **Browse** details (personal details + membership status)

- Operations in **Member details**
    - **Add** new sessions
    - **Update** start date for current subscription

## Live preview

Open [admin.html](https://1lucianmoldovan.github.io/node-fitness-app/public/admin.html)

## Setup

```
git clone https://github.com/1lucianmoldovan/node-fitness-app.git
cd node-fitness-app
npm install
```

## Running app

```
npm run devstart
```

Open http://localhost:3000/admin.html