import PropTypes from "prop-types";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.object,
};

export default App;
