import avoidNames from "./avoid-names.js";

const customPlugin = {
  rules: {
    ...avoidNames,
  },
};

export default customPlugin;
