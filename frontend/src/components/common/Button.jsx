import { Link } from "react-router-dom";

function Button({ children, to, type = "button", variant = "primary", className = "" }) {
  const classes = `button button-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}

export default Button;
