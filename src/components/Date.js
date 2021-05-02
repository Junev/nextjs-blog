import moment from "moment";
import PropTypes from "prop-types";

const Date = ({ dateString }) => {
  const date = moment(dateString);
  return <time dateTime={dateString}>{date.format("YYYY-MM-DD")}</time>;
};

Date.propTypes = {
  dateString: PropTypes.string,
};

export default Date;
