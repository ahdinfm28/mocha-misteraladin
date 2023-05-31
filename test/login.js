import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://www.misteraladin.com/api/members/");

describe("Login Mister Aladin", () => {
  describe("Positive Case", () => {
    it("Success - register with email password", () => {
      const data = {
        email: "farisyaaah@gmail.com",
        password: "frsyhdn"
      };
      return request
        .post("auth/login")
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(200);
        });
    });
    it("Success - register with phone", () => {
      const data = {
        phone_number: 85608869638,
        phone_number_country_code: "62"
      };
      return request
        .post("v2/auth/login-phone-number-check")
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(204);
        });
    });
  });
  describe("Negative Case", () => {
    it("Failed - invalid credentials", () => {
      const data = {
        email: "farisyaaah@gmail.com",
        password: "invalidpasss"
      };
      return request
        .post("auth/login")
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors).to.equal("Your e-mail address and/or password is incorrect");
        });
    });
    it("Failed - phone number not registered", () => {
      const data = {
        phone_number: 128379812703,
        phone_number_country_code: "62"
      };
      return request
        .post("v2/auth/login-phone-number-check")
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error.message).to.equal("Your phone number has not been registered.");
        });
    });
  });
});
