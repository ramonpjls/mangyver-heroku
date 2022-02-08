import { Typography, Grid, Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { types } from "../types/types";

import axios from "../axiosinstance";

const Landing = () => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const configCall = {
    headers: {
      auth: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get("/profiles", configCall)
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
          <Avatar alt={user?.name} src="./" />
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {user?.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
