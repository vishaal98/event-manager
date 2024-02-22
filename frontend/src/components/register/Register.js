import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import styles from "./register.module.css";

export default function Register({ handleClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("v1/auth/register/", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.tokens.access.token)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoading(false);
      handleClose();
      window.location.reload();
    } catch (err) {
      if (err.response.status === 409) {
        setError("email", { message: err.response.data.message });
      }
    }
  };

  return (
    <>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <form component="form" onSubmit={handleSubmit(registerUser)}>
          <TextField
            fullWidth
            label="Username"
            {...register("name", {
              required: { value: true, message: "Name cannot be empty" },
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: { value: true, message: "Email cannot be empty" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            {...register("password", {
              required: { value: true, message: "Password cannot be empty" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  "Password length must be 8 characters or more and contain atleast 1 upper case, 1 lower case and 1 number",
              },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: { value: true, message: "Password do not match" },
              validate: (value) =>
                value === watch("password") || "Password do not match",
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            className={styles.button}
          >
            {isLoading ? <CircularProgress /> : "Register"}
          </Button>
        </form>
      </DialogContent>
    </>
  );
}
