import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://www.misteraladin.com/api/members/v2/");

describe("Register Mister Aladin", () => {
  describe("Negative Case", () => {
    it("Failed - existing email", () => {
      const data = {
        email: "farisyaaah@gmail.com",
        phone_number_country_code: "62",
        phone_number: 85608869639
      };
      return request
        .post("auth/register-check")
        //  .set("Authorization", 'Bearer null')
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error.message).to.equal("Your e-mail address has been registered");
        });
    });
    it("Failed - existing phone number", () => {
      const data = {
        email: "ahdinfm@gmail.com",
        phone_number_country_code: "62",
        phone_number: 85608869638
      };
      return request
        .post("auth/register-check")
        //  .set("Authorization", 'Bearer null')
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error.message).to.equal("Your phone number has been registered.");
        });
    });
    it("Failed - existing email and phone number", () => {
      const data = {
        email: "farisyaaah@gmail.com",
        phone_number_country_code: "62",
        phone_number: 85608869638
      };
      return request
        .post("auth/register-check")
        //  .set("Authorization", 'Bearer null')
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error.message).to.equal("Your e-mail address has been registered Your phone number has been registered.");
        });
    });
  });
  describe("Positive Case", () => {
    it("Success - register with valid data", () => {
      const data = {
        email: "fluffyshark68@gmail.com",
        phone_number_country_code: "62",
        phone_number: 85608869639
      };
      return request
        .post("auth/register-check")
        //  .set("Authorization", 'Bearer null')
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(204);
        });
    });
  });
});
