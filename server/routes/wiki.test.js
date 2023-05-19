const request = require("supertest");
const express = require("express");
// const User = require("../../models/User");
const app = require("../routes/index")

// THIS TEST CHECKS WHETHER THE GET REQUEST RETURNS ALL THE USERS AS WELL AS WHAT TYPE OF DATA IT RETURNS 
describe("get all /pages tests", () => {
    test("GET /wiki", async () => {
        const response = await request(app).get("/wiki/");
        expect(response.status).toBe(200)
    })

    test("GET /wiki returns an array", async () => {
        const response = await request(app).get("/wiki/");
        expect(Array.isArray(response.body)).toBe(true)
    })

    test("GET /wiki returns correct number of pages", async () => {
        const response = await request(app).get("/wiki/")
        expect(response.body.length).toBe(4)
    })

})