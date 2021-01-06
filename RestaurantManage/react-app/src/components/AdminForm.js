import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/admin";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  fullName: "",
  phone: "",
  address: "",
  email: "",
  accout: "",
  password: "",
};

const AdminForm = ({ classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone ? "" : "This field is required.";
    if ("accout" in fieldValues)
      temp.accout = fieldValues.accout ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      // props.createAdmin(values, () => {
      //   window.alert("inserted.");
      // });
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) props.createAdmin(values, onSuccess);
      else props.updateAdmin(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.adminList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
          <TextField
            name="phone"
            variant="outlined"
            label="Phone"
            value={values.phone}
            onChange={handleInputChange}
            {...(errors.phone && { error: true, helperText: errors.phone })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
            {...(errors.address && { error: true, helperText: errors.address })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <TextField
            name="accout"
            variant="outlined"
            label="Accout"
            value={values.accout}
            onChange={handleInputChange}
            {...(errors.accout && { error: true, helperText: errors.accout })}
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            value={values.password}
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  adminList: state.admin.list,
});

const mapActionToProps = {
  createAdmin: actions.create,
  updateAdmin: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(AdminForm));
