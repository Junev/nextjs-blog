import moment from "moment";

const Date = ({ dateString} ) => {
  const date = moment(dateString);
  return (
    <time dateTime={dateString}>{date.format("YYYY-MM-DD")}</time>
  )
};

export default Date;