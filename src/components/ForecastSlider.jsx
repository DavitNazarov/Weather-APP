import PropTypes from "prop-types";

const ForecastSlider = ({ list }) => {
  console.log(list);
  return <div>ForecastSlider</div>;
};

export default ForecastSlider;

ForecastSlider.propTypes = {
  list: PropTypes.array.isRequired,
};
