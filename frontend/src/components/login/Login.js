import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import styles from "./login.module.css";

export default function Login({ handleClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("v1/auth/login/", data);
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "token",
        JSON.stringify(response.data.tokens.access.token)
      );
      setIsLoading(false);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log("Error logging in the user: ", err);
      if (err.response.status === 401) {
        setError("email", { message: err.response.data.message });
      }
    }
  };

  const loginHandler = async () => {};

  return (
    <>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form component="form" onSubmit={handleSubmit(loginUser)}>
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
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            className={styles.button}
          >
            {isLoading ? <CircularProgress /> : "Login"}
          </Button>
        </form>
      </DialogContent>
    </>
  );
}
