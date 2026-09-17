const { validateBody } = require("./validateDB");

const stateRules = {
    state_name: { type: "string" },
    state_code: { type: "string", pattern: /^[A-Z]{2}$/ },
    state_fips: { type: "string", pattern: /^\d{2}$/ },
    region: { type: "string" }
};

const validateStateData = validateBody(stateRules);
const validateStateUpdateData = validateBody(stateRules, { required: false });

module.exports = {
    validateStateData,
    validateStateUpdateData
};