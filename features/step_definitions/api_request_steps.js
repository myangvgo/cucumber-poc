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
    console.log(res.data);
    assert.equal(res.data.id, 201);
});
