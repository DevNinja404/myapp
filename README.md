# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Small Walkthrough
Applying Clean Architecture to ASP.NET Core Web API

Folder Structure: (ErpOperatation) Folder Outside its a ASP.NET Core Web API(Backend) dotnet --version 7.0.402
Folder Structure: (myapp) Front End Angular Version 17.0.3
Step 1: Project Structure
Create the following folders in your project:

Core: Contains application entities and business logic.
Infrastructure: Contains implementations of external services and databases.
Application: Orchestrates the flow of data and tasks between the UI, the entities, and the infrastructure.
WebApi: Contains the presentation layer.


Step 2: Core Layer (Model Class)
Core/Entities/SO2_Operation.cs

Step 3: Infrastructure Layer
Infrastructure/Persistence/APIDbContext.cs
and 
Infrastructure/Repositories/SO2OperationRepository.cs

New (***********)
Step 4: Application Layer
Application/Services/SO2OperationService.cs

Step 5: WebApi Layer
WebApi/Controllers/SO2OperationController.cs

Step 6: Dependency Injection Setup
In the Startup.cs file of your WebApi project, configure the dependency injection:
public void ConfigureServices(IServiceCollection services)
{
    services.AddScoped<ISO2OperationRepository, SO2OperationRepository>();
    services.AddScoped<SO2OperationService>();
}
This service acts as an intermediary between the repository and the controller.
It contains methods to get, add, update, and delete SO2 operations.
The service methods call corresponding methods in the repository.
Now, you can inject the SO2OperationService into your controller in the WebApi layer and use it to interact with your SO2 operation data.
