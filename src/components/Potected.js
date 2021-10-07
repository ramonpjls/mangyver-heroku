import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Protected(props) {
  let Component = props.component;
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
