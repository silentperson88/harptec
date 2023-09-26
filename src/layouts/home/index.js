import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PageTitle from "examples/NewDesign/PageTitle";
import CustomButton from "examples/NewDesign/CustomButton";
import Users from "layouts/home/userList";
import NewUser from "examples/modal/NewUser";
import IndexedDBManager from "database/dbAction";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Sessions from "utils/Sessions";

function index() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleOpen = async () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dbManager = new IndexedDBManager();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!open) {
        dbManager.retrieveAllData().then((result) => {
          console.log("Data retrieved successfully", result);
          setUsers(result);
        });
      }
    })();
  }, [open]);

  const handleLogout = async () => {
    Sessions.setClear();
    navigate("/authentication/sign-in", { replace: true });
  };
  return (
    <DashboardLayout>
      {open && <NewUser open={open} handleClose={handleClose} />}
      <MDBox py={2} display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title="Home" />
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <CustomButton
            title="New User"
            icon="add_circle_outline"
            background="#191A51"
            color="#ffffff"
            openModal={handleOpen}
          />
          <CustomButton
            title="Logout"
            icon="power_settings_new"
            background="#191A51"
            color="#ffffff"
            openModal={handleLogout}
          />
        </MDBox>
      </MDBox>
      <MDBox mt={2}>
        <Users userList={users} />
      </MDBox>
    </DashboardLayout>
  );
}

export default index;
