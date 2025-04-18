import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
  <div
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    style={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default Iconify;
