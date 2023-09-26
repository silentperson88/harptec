/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { Grid, Icon, Modal, TextField } from "@mui/material";
import style from "assets/style/Modal";
import pxToRem from "assets/theme/functions/pxToRem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React, { forwardRef, useState } from "react";
import ModalTitle from "examples/NewDesign/ModalTitle";
import Validations from "utils/Validations/index";
import Constants, { Icons, defaultData } from "utils/Constants";
import ReactDatePicker from "react-datepicker";
import MDInput from "components/MDInput";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import FDropdown from "components/Dropdown/FDropdown";
import IndexedDBManager from "database/dbAction";
import { useDispatch } from "react-redux";
import { openSnackbar } from "redux/Slice/Notification";

function index({ open, handleClose }) {
  const [values, setValues] = useState({
    firstName: "",
    surName: "",
    gender: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const disptach = useDispatch();
  const dbManager = new IndexedDBManager(); // Instantiate the class

  const validate = () => {
    const firstNameValidate = Validations.validate("basic", values.firstName, 3, 30, true);
    const surNameValidate = Validations.validate("basic", values.surName, 3, 30, true);
    const genderValidate = Validations.validate("basic", values.gender, 3, 30, true);
    const dobValidate = Validations.validate("basic2", values.dob, 3, 30, true);

    const newErrors = {};

    if (firstNameValidate !== "") {
      newErrors.firstName = firstNameValidate;
    }
    if (surNameValidate !== "") {
      newErrors.surName = surNameValidate;
    }
    if (genderValidate !== "") {
      newErrors.gender = genderValidate;
    }
    if (dobValidate !== "") {
      newErrors.dob = dobValidate;
    }

    setErrors(newErrors);
    return Object.values(newErrors).filter((val) => val !== "").length === 0;
  };
  const handleResetModal = () => {
    setErrors({});
    handleClose();
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const val = validate();
    if (val) {
      setIsSubmitting(true);
      const newData = {
        ...values,
        id: Math.floor(Math.random() * 1000000000),
      };
      const isInserted = await dbManager.insertData(newData);
      if (isInserted) {
        await disptach(
          openSnackbar({
            message: Constants.ADDED_SUCCESSFULLY,
            notificationType: Constants.SUCESS_NOTIFICATION,
          })
        );
        handleClose();
      } else {
        await disptach(
          openSnackbar({
            message: Constants.ADDED_FAILED,
            notificationType: Constants.ERROR_NOTIFICATION,
          })
        );
      }
    }
    setLoading(false);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <MDInput
      error={Boolean(errors?.dob)}
      helperText={errors?.dob}
      FormHelperTextProps={{
        sx: { marginLeft: 1, color: "red" },
      }}
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
      sx={{ ml: 0, width: 650 }}
      placeholder="Date of Birth*"
      onClick={onClick}
      ref={ref}
    />
  ));
  return (
    <MDBox>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDBox
            bgColor="info"
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="lg"
            sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, height: pxToRem(72) }}
          >
            <ModalTitle title="New User" color="white" />
            <Icon
              sx={{ cursor: "pointer", color: "beige" }}
              fontSize="medium"
              onClick={handleResetModal}
            >
              {Icons.CROSS}
            </Icon>
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            px={3}
            py={2}
            sx={{
              maxHeight: 500,
              overflowY: "scroll",
              "::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <TextField
              sx={{ marginBottom: 2 }}
              name="firstName"
              label="First Name*"
              value={values.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              name="surName"
              label="Surname*"
              value={values.surName}
              onChange={handleChange}
              error={Boolean(errors.surName)}
              helperText={errors.surName}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <FDropdown
              label="Gender*"
              id="gender"
              name="gender"
              displayProperty="name"
              options={["Male", "Female"]}
              error={errors?.gender}
              helperText={errors?.gender}
              handleChange={(e) => handleChange(e)}
              marginBottom={2}
            />
            <ReactDatePicker
              selected={values.dob ? moment(values.dob).toDate() : ""}
              onChange={(date) =>
                handleChange({
                  target: {
                    name: "dob",
                    value: moment(date).format(defaultData.DATABASE_24_HOURS_FORMAT).toString(),
                  },
                })
              }
              customInput={<ExampleCustomInput />}
              dateFormat={defaultData.REACTDATETIMEPICKER_24_HOURS_FORMAT}
            />
          </MDBox>

          <MDBox px={0} mb={2} ml={2}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Grid item xs={2}>
                <MDButton
                  variant="contained"
                  color={isSubmitting ? "secondary" : "info"}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  style={{ textTransform: "none", boxShadow: "none" }}
                >
                  {loading ? "Loading..." : "Submit"}
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

export default index;
