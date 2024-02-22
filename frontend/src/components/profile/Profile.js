import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import axios from "../../api/axios";
import { enqueueSnackbar } from "notistack";
import styles from "./profile.module.css";

const Profile = () => {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const [edit, setEdit] = useState(false);
  const [closeChangePassword, setCloseChangePassword] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [ordersList, setOrdersList] = useState([]);

  const handleExpandClick = (id) => {
    setExpanded(id);
  };

  const handleEdit = () => setEdit(!edit);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      ...user,
    },
  });

  const {
    register: registePassword,
    formState: { errors: passwordErrors },
    handleSubmit: handleSubmitPassword,
    watch,
    reset,
  } = useForm();

  const handleSave = async (data) => {
    try {
      const res = await axios.put(`v1/user/${user._id}`, data);
      console.log(res.data);
      enqueueSnackbar("Profile updated Successfully!", { variant: "success" });
      localStorage.setItem("user", JSON.stringify(res.data));
      //   navigate("/");
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Could not update the profile", { variant: "error" });
      }
    }
  };

  const handleSavePassword = async (data) => {
    try {
      const res = await axios.put(`v1/user/${user._id}`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      console.log(res.data);
      enqueueSnackbar("Password updated Successfully!", { variant: "success" });
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Could not update the password", { variant: "error" });
      }
    }
  };

  const tableContent = [
    {
      rowName: "Name",
      fieldName: "name",
      disabled: false,
    },
    {
      rowName: "Email",
      fieldName: "email",
      disabled: true,
    },
  ];

  const [passwordTableContent, setPasswordTableContent] = useState([
    {
      rowName: "Current Password",
      fieldName: "currentPassword",
      visible: false,
    },
    {
      rowName: "New Password",
      fieldName: "newPassword",
      visible: false,
    },
    {
      rowName: "Confirm New Password",
      fieldName: "confirmNewPassword",
      visible: false,
    },
  ]);

  const updatePasswordTableContent = (field) => {
    setPasswordTableContent(
      passwordTableContent.map((val) => {
        let visible;
        if (val.fieldName === field) {
          visible = !val.visible;
        }
        return {
          ...val,
          visible,
        };
      })
    );
  };

  return (
    <div className={styles.profileParent}>
      <div className={styles.profile}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Profile Settings</Typography>
          </AccordionSummary>
          <div className={styles.profileContent}>
            <form
              className={styles.profileForm}
              onSubmit={handleSubmit(handleSave)}
            >
              <table className={styles.formTable}>
                <tbody>
                  {tableContent.map((row, index) => {
                    return (
                      <tr key={index}>
                        <th>{row.rowName}</th>
                        <td>
                          {edit ? (
                            <TextField
                              disabled={row.disabled}
                              placeholder={`Enter ${row.rowName}`}
                              {...register(
                                row.fieldName,
                                !row.disabled && {
                                  required: {
                                    value: true,
                                    message: "Name cannot be empty",
                                  },
                                }
                              )}
                              error={Boolean(errors[row.fieldName])}
                              helperText={errors[row.fieldName]?.message}
                              sx={{
                                width: "100%",
                              }}
                            />
                          ) : (
                            user[row.fieldName]
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {edit && (
                <div className={styles.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      //   color: theme.palette.primary.contrastText,
                      //   backgroundColor: theme.palette.primary.dark,
                      "&:hover": { backgroundColor: "#ACA5D3" },
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleEdit}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>

            {!edit && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                sx={{
                  //   color: theme.palette.primary.contrastText,
                  //   backgroundColor: theme.palette.primary.dark,
                  "&:hover": { backgroundColor: "#ACA5D3" },
                }}
              >
                EDIT
              </Button>
            )}
          </div>
        </Accordion>
        <Accordion
          expanded={closeChangePassword}
          onChange={() => setCloseChangePassword(!closeChangePassword)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Change Password</Typography>
          </AccordionSummary>
          <div className={styles.profileContent}>
            <form
              className={styles.profileForm}
              onSubmit={handleSubmitPassword(handleSavePassword)}
            >
              <table className={styles.formTable}>
                <tbody>
                  {passwordTableContent.map((row, index) => {
                    return (
                      <tr key={index}>
                        <th>{row.rowName}</th>
                        <td>
                          <TextField
                            className="text-field"
                            type={row.visible ? "text" : "password"}
                            placeholder={`Enter ${row.rowName}`}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {row.visible ? (
                                    <IconButton
                                      onClick={() => {
                                        updatePasswordTableContent(
                                          row.fieldName
                                        );
                                      }}
                                    >
                                      <Visibility color="primary" />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      onClick={() => {
                                        updatePasswordTableContent(
                                          row.fieldName
                                        );
                                      }}
                                    >
                                      <VisibilityOff color="primary" />
                                    </IconButton>
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            {...registePassword(row.fieldName, {
                              required: {
                                value: true,
                                message: `${row.rowName} cannot be empty`,
                              },
                              pattern: row.fieldName === "newPassword" && {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message:
                                  "Password length must be 8 characters or more and contain atleast 1 upper case, 1 lower case and 1 number",
                              },
                              validate:
                                row.fieldName === "confirmNewPassword" &&
                                ((value) =>
                                  value === watch("newPassword") ||
                                  "Password do not match"),
                            })}
                            error={Boolean(passwordErrors[row.fieldName])}
                            helperText={passwordErrors[row.fieldName]?.message}
                            // sx={{
                            //   width: "100%",
                            // }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={styles.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    // color: theme.palette.primary.contrastText,
                    // backgroundColor: theme.palette.primary.dark,
                    "&:hover": { backgroundColor: "#ACA5D3" },
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setCloseChangePassword(!closeChangePassword)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default Profile;
