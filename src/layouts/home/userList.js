import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Icons } from "utils/Constants";
import { IconButton, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import moment from "moment";

function checkboxListSecondary({ userList }) {
  const today = moment();

  return (
    <List mt={2} dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {userList.length > 0 ? (
        userList.map((value) => (
          <ListItem key={value} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <IconButton aria-label="Edit Safety Card" color="info">
                  {value.gender === "Male" ? Icons.MAN : Icons.WOMAN}
                </IconButton>
              </ListItemAvatar>
              <ListItemText
                primary={`${value.firstName} ${value.surName}`}
                secondary={
                  <MDBox sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {value.gender}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {today.diff(moment(value.dob), "years")}
                    </Typography>
                  </MDBox>
                }
              />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <Typography variant="h2" textAlign="center">
          No Users Found. Please register user
        </Typography>
      )}
    </List>
  );
}

export default checkboxListSecondary;
