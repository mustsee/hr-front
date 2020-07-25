const faker = require("faker");

const domains = ["Finance", "Assurances", "Banques"];

function ads() {
  var adverts = [];
  for (let id = 1; id < 55; id++) {
    const domain = domains[Math.floor(Math.random() * Math.floor(3))];
    const companyName = faker.company.companyName();
    const url = faker.internet.url();
    const jobPosition = faker.name.jobTitle();
    const technicalStack = faker.name.jobDescriptor();
    const impressions = faker.lorem.sentence();
    const date = faker.date.past();
    adverts.push({
      id,
      domain,
      companyName,
      url,
      jobPosition,
      technicalStack,
      impressions,
      date,
    });
  }
  return { adverts };
}
module.exports = ads;
