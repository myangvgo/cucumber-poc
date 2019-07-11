Feature: API Test
    In order to test todo REST API
    As a developer
    I want to check API availability

    Scenario: Make a GET request to todos API
        When I make a GET request to todos
        Then The response is todo
            """json
            { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }
            """

    Scenario: Make a POST request with JSON payload
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