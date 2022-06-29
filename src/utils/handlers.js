import _ from "lodash";
// import { MANDATORY_FIELD_PREF } from "../constants/settings.constant";

export const getOr = (obj, path, def) => {
  var val = _.get(obj, path);
  return _.isEmpty(val) ? def : val;
};