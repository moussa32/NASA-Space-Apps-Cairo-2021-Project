import React from "react";

const Loader = ({ isLoadding, Color }) => {
  return (
    <>{isLoadding && <div className={`lds-dual-${Color === "main" ? "ring" : "second"}`}></div>}</>
  );
};

export default Loader;
