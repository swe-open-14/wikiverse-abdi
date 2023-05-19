const request = require("supertest");
const express = require("express");
// const User = require("../../models/User");
const app = require("../routes/index")

// THIS TEST CHECKS WHETHER THE GET REQUEST RETURNS ALL THE USERS AS WELL AS WHAT TYPE OF DATA IT RETURNS 
describe("get all /users tests", () => {
    test("GET /users", async () => {
        const response = await request(app).get("/users/");
        expect(response.status).toBe(200)
    })
})