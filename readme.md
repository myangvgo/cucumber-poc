

# Introduction to Cucumber

[TOC]

## 1. What is Cucumber 🔗︎

Cucumber is a testing framework that supports [Behavior Driven Development (BDD)](https://cucumber.io/docs/bdd/).

It allows users to define application opeartions in natural text.

It is based on [Gherkin Domain Specific Language (DSL)](https://cucumber.io/docs/gherkin/).

### 1.1 The way cucumer works

* Reads executable **specifications** written in plain text.
* Validates that application does what the **specifications** say.
  * The specifications consists of multiple ***scenarios***
  * Each scenarios is a list of ***steps*** for Cucumber to walk through
  * Scenarios and steps follow the ***Gherkin*** syntax rules

* Generates a report indicating success ✅  or faliure ❌ for each scenario.

#### An simple example of scenario

```gherkin
Scenario: Shaleen drinks coffee
	Given The cafe machine works fine
	When Shaleen chooses double expresso without sugar
	Then Shaleen is happy to drink his coffee
```

### 1.2 BDD

Behaviour-Driven Development (BDD) is a **collaborative** approach to software development that bridges the communication gap between business and IT. 

#### Some benefits

* Helps teams communicate requirements with more precision
* Discover defects early
* Produce software that remains maintainable over time

#### Two main practices in BDD approach

##### 1. Discovery workshops

##### 2. Executable Specifications

* The concrete examples that are created can be used as executable software specifications to automatically verify that the software behaves as intended.

* With Cucumber, this means writing **Given-When-Then** scenarios to illustrate the examples.

* The build and design of the application is guided by **failing tests**, like TDD.

* The main difference is that Cucumber operates on **a higher abstraction level**, closer to the domain and farther away from classes and methods.

```js
const assert = require('assert');
const webdriver = require('selenium-webdriver');
const browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({'browserName': 'chrome' })
  .build();

browser.get('http://en.wikipedia.org/wiki/Wiki');
browser.findElements(webdriver.By.css('[href^="/wiki/"]'))
.then(function(links){
  assert.equal(19, links.length); // Made up number
  browser.quit();
});
```

vs

```gherkin
Given I have opened a Web Browser
When I load the Wikipedia article on "Wiki"
Then I have "19" Wiki Links
```

### 1.3 Gherkin - The language of cucumber

Gherkin is a line-oriented language using line endings, indentations and keywords to define documents. 

Each non-blank line usually starts with a Gherkin keyword, followed by an arbitrary text, which is usually a description of the keyword.

Comment lines are allowed anywhere in the file. They begin with zero or more spaces, followed by a hash sign (`#`) and some text. Comments do have to start on a new line.

The whole structure must be written into a file with the *feature* extension to be recognized by Cucumber.

#### Keywords

Each line that isn’t a blank line has to start with a Gherkin *keyword*, followed by any text you like. The only exceptions are the feature and scenario descriptions.

The primary keywords are:

- `Feature`
- `Rule` (as of Gherkin 6)
- `Example` (or `Scenario`)
- `Given`, `When`, `Then`, `And`, `But` (steps)
- `Background`
- `Scenario Outline` (or `Scenario Template`)
- `Examples`

There are a few secondary keywords as well:

- `"""` (Doc Strings)
- `|` (Data Tables)
- `@` (Tags)
- `#` (Comments)

#### Features

The purpose of the `Feature` keyword is to provide a high-level description of a software feature, and to group related scenarios.

#### Rule

The purpose of the `Rule` keyword is to represent one *business rule* that should be implemented. 

It provides additional information for a feature. 

A `Rule` is used to group together several scenarios that belong to this *business rule*. 

A `Rule` should contain one or more scenarios that illustrate the particular rule.

#### Example

This is a *concrete example* that *illustrates* a business rule. It consists of a list of [steps](https://cucumber.io/docs/gherkin/reference/#steps).

The keyword `Scenario` is a synonym of the keyword `Example`.

It is recommended to keep the number of steps at 3-5 per example.

In addition to being a specification and documentation, an example is also a *test*. As a whole, your examples are an *executable specification* of the system.

#### Steps

Each step starts with `Given`, `When`, `Then`, `And`, or `But`.

Cucumber executes each step in a scenario one at a time, in the sequence you’ve written them in. When Cucumber tries to execute a step, it looks for a matching step definition to execute.

Implementation details should be hidden in the [step definitions](https://cucumber.io/docs/cucumber/step-definitions).

#### Given, When, Then

`Given` steps are used to describe the initial context of the system - the *scene* of the scenario. It is typically something that happened in the *past*.

`When` steps are used to describe an event, or an *action*. 

`Then` steps are used to describe an *expected* outcome, or result.

#### Background

Occasionally you’ll find yourself repeating the same `Given` steps in all of the scenarios in a feature.

Since it is repeated in every scenario, this is an indication that those steps are not *essential* to describe the scenarios; they are *incidental details*. You can literally move such `Given` steps to the background, by grouping them under a `Background` section.

A `Background` allows you to add some context to the scenarios in the feature. It can contain one or more `Given` steps.

A `Background` is run before *each* scenario, but after any [Before hooks](https://cucumber.io/docs/cucumber/api/#hooks). 

```gherkin
Feature: Multiple site support
  Only blog owners can post to a blog, except administrators,
  who can post to all blogs.

  Background:
    Given a global administrator named "Greg"
    And a blog named "Greg's anti-tax rants"
    And a customer named "Dr. Bill"
    And a blog named "Expensive Therapy" owned by "Dr. Bill"

  Scenario: Dr. Bill posts to his own blog
    Given I am logged in as Dr. Bill
    When I try to post to "Expensive Therapy"
    Then I should see "Your article was published."

  Scenario: Dr. Bill tries to post to somebody else's blog, and fails
    Given I am logged in as Dr. Bill
    When I try to post to "Greg's anti-tax rants"
    Then I should see "Hey! That's not your blog!"

  Scenario: Greg posts to a client's blog
    Given I am logged in as Greg
    When I try to post to "Expensive Therapy"
    Then I should see "Your article was published."
```

#### Scenario Outline

The `Scenario Outline` keyword can be used to run the same `Scenario` multiple times, with different combinations of values.

The keyword `Scenario Template` is a synonym of the keyword `Scenario Outline`.

Scenario outlines allow us to more concisely express these scenarios through the use of a template with `< >`-delimited parameters:

```gherkin
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers

  Examples:
    | start | eat | left |
    |    12 |   5 |    7 |
    |    20 |   5 |   15 |
```

## 2. Cucumber JavaScript Implementation

### 2.1 Setup and add dependencies

```sh
$ mkdir cucumber-poc
$ cd cucumber-poc
$ npm init -y
$ npm install --save-dev cucumber
$ mkdir features features/step_definitions features/support
```

Create `cucumber.js` and add the following

```js
module.exports = {
    default: `--format-options '{"snippetInterface": "synchronous"}'`
};
```

Update `package.json` 

```json
{
  "name": "cucumber-poc",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "cucumber-js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.0",
    "cucumber": "^5.1.0"
  }
}
```

Now we can run tests by `npm test` command.

### 2.2 Add the feature file

Create a feature file with the in the features folder:

```sh
$ touch features/api.test.feature
```

And declaring the below scenarios and steps in the file:

```gherkin
Feature: Testing JSONPlaceholder REST API
	Users should be able to fire GET and POST requests to JSONPlaceholder
	REST API Service.
	
	Scenario: Making a GET request
		When User makes a GET request to "/todos/1"
		Then the response should be todo
		"""json
		{
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    }
		"""
		
	Scenario: Making a POST request with JSON payload
		Given The JSON request data is json
		"""json
		{
      "userId": 1,
      "title": "To eat",
      "completed": false
    }
		"""
		When I make a POST request to /todos
		Then The response property id should be "101"
```

### 2.3 World object

*World* is an isolated context for each scenario, exposed to the hooks and steps as `this`. 

All [step definitions](https://cucumber.io/docs/cucumber/step-definitions) will run in the context of the current `World` instance; a new instance is created for each scenario. 

We need to create a `world.js` to share state between steps.

```sh
$ touch support/world.js
```

The default constructor is:

```js
function World({attach, parameters}) {
  this.attach = attach
  this.parameters = parameters
}
```

The default can be overridden with `setWorldConstructor`.

```js
const { setWorldConstructor } = require('cucumber');

class CustomWorld {
    constructor() {
        this.getTodo = {}; // response of get todo
        this.postPayload = {}; // payload of a post request
    }
}

setWorldConstructor(CustomWorld);
```

### 2.4 Writing Step Definitions

When Cucumber parses steps, it will search for methods annotated with Gherkin Keywords to locate the matching step definitions.

We create a `api_request_steps.js` in step_definitions folder

```sh
$ touch step_definition/api_request_steps.js
```

* Use axios to call the REST APIs
* Use assertion(chai, etc.) to validate the process
* Handle aynchronous steps (callback, promise, await/async)

```js
const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const axios = require('axios');
const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

When('I make a GET request to todos', async function() {
    const res = await axiosClient.get(`/todos/1`);
    this.getTodo = res.data;
});

Then('The response is {}', async function(_, todo) {
    const data = JSON.parse(todo);
    assert.deepEqual(this.getTodo, data);
});

Given('The JSON request data is {}', async function(_, json) {
    const postPayload = JSON.parse(json);
    this.postPayload = postPayload;
});

When('I make a POST request to /todos', async function() {});

Then('The response property id should be "101"', async function() {
    const res = await axiosClient.post('/todos', this.postPayload);
    assert.equal(res.data.id, 201);
});

```

### 2.5 Reporting

Cucumber uses reporter plugins to produce reports that contain information about what scenarios have passed or failed.

Use `--format <TYPE[:PATH]>` to specify the format of the output. If PATH is not supplied, the formatter prints to `stdout`. If PATH is supplied, it prints to the given file. 

Use `multiple-cucumber-html-reporter` package to generate report.

#### Add dependency

```sh
$ npm install multiple-cucumber-html-reporter --save-dev
```

#### Create genReport.js

```sh
$ touch genReport.js
```

and then add following content:

```js
const report = require('multiple-cucumber-html-reporter');
 
report.generate({
    jsonDir: './reports/',
    reportPath: './reports/',
    metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Cycle', value: 'B11221.34321'}
        ]
    }
});
```

#### Create a reports folder

```sh
$ mkdir reports
```

#### Generate cucumber json file

```sh
$ ./node_modules/.bin/cucumber-js --format json:./reports/cucumber_report.json
```

#### Run generation report script

```sh
$ node genReport.js
```



## 3. Hooks

Hooks are used for setup and teardown the environment before and after each scenario. 

```js
var {After, Before} = require('cucumber');

// Synchronous
Before(function () {
  this.count = 0;
});

// Asynchronous Callback
Before(function (testCase, callback) {
  var world = this;
  tmp.dir({unsafeCleanup: true}, function(error, dir) {
    if (error) {
      callback(error);
    } else {
      world.tmpDir = dir;
      callback();
    }
  });
});

// Asynchronous Promise
After(function () {
  // Assuming this.driver is a selenium webdriver
  return this.driver.quit();
});
```

## 4. [Anti-Patterns](https://cucumber.io/docs/guides/anti-patterns/)

