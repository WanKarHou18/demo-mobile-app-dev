import moment from "moment";

/**
 * Formats a date using moment.js
 *
 * @param {string | Date} inputDate - The date to format (can be a string or Date object)
 * @param {string} format - The desired output format (e.g., 'YYYYMMDD', 'DD/MM/YYYY')
 * @returns {string} - Formatted date string
 */
const formatDateWithMoment = (inputDate, format = "YYYY-MM-DD") => {
  return moment(inputDate).format(format);
};

export default formatDateWithMoment;
