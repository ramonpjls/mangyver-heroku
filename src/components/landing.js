import { Typography, Grid, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { types } from "../types/types";

import axios from "../axiosinstance";

const Landing = () => {
  const user = useSelector((state) => state.user.user);
  const [disButton, setDisButton] = useState(true);

  const dispatch = useDispatch();
  // const configCall = {
  //   headers: {
  //     auth: localStorage.getItem("token"),
  //   },
  // };

  useEffect(() => {
    if (user?.role === null) {
      setDisButton(true);
    } else {
      setDisButton(false);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("/profiles", {
        headers: { auth: localStorage.getItem("token") },
      })
      .then((useRes) => {
        dispatch({
          type: types.LOGIN,
          payload: useRes.data.profile,
        });
      })
      .catch((err) => {
        console.log(err);
      }); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item alignItems="center" justifyContent="center">
          <Avatar alt={user?.name || ""} src="./" />
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {user?.name || ""}
          </Typography>
        </Grid>
        <Grid item>
          {user?.name ? <Typography>{user.operation.name}</Typography> : ""}
        </Grid>
        <Grid item>
          <Link style={{ textDecoration: "none" }} to="/UserManagementLanding">
            <Button variant="text" disabled={disButton}>
              Control de usuarios
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
