import React from "react";
import IconButton from "@mui/material/IconButton";
import { Help } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const HelpButton = () => {
  const getHelp = () => {
    //const help = await axiosinstance.get('/helps')
    //window.location = "https//google.com"
    //window.location.replace("https//google.com")
    //window.location.href = "https//google.com"
    //window.open("https//google.com")
    //history.go("https//google.com")
  };

  return (
    <div>
      <a
        href="https://ab-inbev.acadia.sysalli.com/browse/HQM-500054/es-mx"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "#4d4d4d", fontSize: "20px" }}
      >
        <Tooltip title="Ayuda" sx={{ color: "#4d4d4d" }}>
          <IconButton onClick={getHelp}>
            <Help sx={{ fontSize: 40, color: "#3f51b5" }} />
          </IconButton>
        </Tooltip>
        Ayuda
      </a>
    </div>
  );
};

export default HelpButton;
