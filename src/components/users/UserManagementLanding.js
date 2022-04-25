import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link } from "react-router-dom";

const UserManagementLanding = () => {
  return (
    <Box sx={{ flexGrow: 1, paddingTop: "1rem" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={12}
      >
        <Grid item xs={4} md={4}>
          <Link style={{ textDecoration: "none" }} to="/Register">
            <Card
              sx={{ width: 245, height: 345 }}
              style={{
                textAlign: "center",
                display: "flex",
                backgroundColor: "#3E3E3E",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <GroupAddIcon style={{ fontSize: 100, color: "#fff" }} />
                </CardContent>
                <CardContent>
                  <Typography variant="h5" color="white">
                    Nuevo usuario
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={4} md={4}>
          <Link style={{ textDecoration: "none" }} to="/users">
            <Card
              sx={{ width: 245, height: 345 }}
              style={{
                textAlign: "center",
                display: "flex",
                backgroundColor: "#3E3E3E",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <GroupIcon style={{ fontSize: 100, color: "#fff" }} />
                </CardContent>
                <CardContent>
                  <Typography variant="h5" color="white" fontStyle="bold">
                    Lista de usuarios
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserManagementLanding;
