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
import * as actions from "../actions/product";
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
  name: "",
  price: "",
  productTypeId: 0,
  productType: null,
};

const ProductForm = ({ classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is required.";

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
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      // props.createProduct(values, () => {
      //   window.alert("inserted.");
      // });
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) props.createProduct(values, onSuccess);
      else props.updateProduct(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.productList.find((x) => x.id == props.currentId),
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
            name="name"
            variant="outlined"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            {...(errors.name && {
              error: true,
              helperText: errors.name,
            })}
          />
          <TextField
            name="price"
            variant="outlined"
            label="Price"
            value={values.price}
            onChange={handleInputChange}
            {...(errors.price && { error: true, helperText: errors.price })}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.productType && { error: true })}
          >
            <InputLabel ref={inputLabel}>Product Type</InputLabel>
            <Select
              name="productTypeId"
              value={values.productTypeId}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              {props.productList.map((record, index) => {
                return (
                  <MenuItem value={record.productTypeId}>
                    {record.productTypeId}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.productType && (
              <FormHelperText>{errors.productType}</FormHelperText>
            )}
          </FormControl>

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
  productList: state.product.list,
  productTypeList: state.productType.list,
});

const mapActionToProps = {
  createProduct: actions.create,
  updateProduct: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ProductForm));
