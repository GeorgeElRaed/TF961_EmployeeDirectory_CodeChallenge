# Employee Directory

This project is aimed at interviewers for an 'Employee Directory' code challenge.

## Prerequisites

To be able to run this project, you will need to [nodeJS](https://nodejs.org/en/) and a relatively modern browser.

## Running to the project

### Start up the server:
```bash
cd server;
npm start;
```

The server is very simple and not intended to be reviewed in details. It offers some capabilities like CRUD operations and pagination. It doesn't use a database. The data is loaded from a file `Data.json`. The data it contains is snippet of 50 generic users loaded from https://randomuser.me. It could be reloaded from their API with the appropriate seed. The data can be interchanged with others without issues.

### Running the Front-end client

```bash
cd client;
npm start;
```

The client is a React app that is built entirely with [MUI](https://mui.com). 

It also uses react router for easy page lookup and has 4 main views.

### The Login view:
The login view is a standard template from MUI. To login use a user and password from any generated user in `Data.json`. This will save a token sent by the server to the `localstorage`. The project doesn't use this token for autorizing view. Its only purpose is to bypass the login screen as it is only for show.

### The Home View:
The Home view shows some statistics made on the generated data in the form of a Line Chart, BarChart and a PieChart using a MUI related project called [devexpress](https://devexpress.github.io/devextreme-reactive/).

### The Employee Directory:
This view shows basic details about employees. The employee table uses server sided pagination and filtering.

The grid also has a toolbar of its own.

Clicking the `...` button in the toolbar will reveal 2 options to download selection as JSON or to print current screen.

The `Filter` button will open a menu that allows adding multiple filters. Each filter will has 3 fields: The `Field` to be filtered, the `Condition` to be tested, and the `Value` to be compared with the selected field using that the selected condition.

The `Row Height` button will open a menu to show 3 row size options to show more or less data per page.

The `Add` button will open a Form Dialog containing data to be filled to add a new Employee while other fields will be generated on client and server side.

The `Delete` button will delete all checked employees.

The `Update` button will open a similar dialog to `Add` which allows you to update an employee. The button will be enabled only when one row is selected.


### The Employee Details: 
Double clicking a row in the employee directory will load that Employee's detials page. You can find 2 buttons to email or call the employee on a supported browser.



The .env file is left in the project for convenience.