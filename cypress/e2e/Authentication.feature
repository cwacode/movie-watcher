Feature: Authentication

  Scenario: Successfully logging in with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I submit the form
    Then I should be redirected to the movies page

  Scenario: Failing to log in with incorrect credentials
    Given I am on the login page
    When I enter incorrect credentials
    And I submit the form
    Then an error message should be visible

  Scenario: Navigating to registration and registering a new user successfully
    Given I am on the login page
    When I navigate to the registration page
    And I register with a new user's credentials
    Then I should see a success message and be redirected to the login page

  Scenario: Failing to register with an existing username
    Given I am on the login page
    When I navigate to the registration page
    And I try to register with an existing username
    Then I should see a message that the username is already taken
