import './LinkBtn.css';
import {Link} from "react-router-dom";

function LinkBtn({url, children, disabled}) {
  return (
    <button disabled={disabled}>
      <Link to={url}>
        {children}
      </Link>
    </button>
  );
}

export default LinkBtn;