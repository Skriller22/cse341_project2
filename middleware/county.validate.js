const { validateBody } = require("./validateDB");

const countyRules = {
    county_state: { type: "string" },
    county_name: { type: "string" },
    county_population: { type: "number", min: 0 },
    county_sq_mi: { type: "number", min: 0 },
    county_seat: { type: "string" },
    population_density: { type: "number", min: 0 },
    county_fips: { type: "string", pattern: /^\d{5}$/ },
    state_fips: { type: "string", pattern: /^\d{2}$/ },
    county_type: { type: "string" }
};

const validateCountyData = validateBody(countyRules);
const validateCountyUpdateData = validateBody(countyRules, { required: false });

module.exports = {
    validateCountyData,
    validateCountyUpdateData
};