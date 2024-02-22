import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import styles from "./eventform.module.css";
import { enqueueSnackbar } from "notistack";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

function EventForm({ handleClose, selectedEvent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(null);
  const { time, __v, _id, ...finalSelectedEvent } = selectedEvent || {};
  const categoriesList = ["Event", "Exhibition", "Workshop", "Class", "Cinema"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: categoriesList[0],
      ...(finalSelectedEvent || {}),
    },
  });
  const createEvent = async (data) => {
    setIsLoading(true);
    data = { ...data, date: new Date(date.$d).toISOString() };
    try {
      await axios.post("v1/event/create", data);
      setIsLoading(false);
      handleClose();
      window.location.reload();
    } catch (err) {
      enqueueSnackbar("Error creating the Event", { variant: "error" });
      console.log("Error creating the Event", err);
    }
  };
  const updateEvent = async (data) => {
    setIsLoading(true);
    data = { ...data, date: new Date(date.$d).toISOString() };
    console.log(data);
    try {
      await axios.put(`v1/event/update/${selectedEvent._id}`, data);
      setIsLoading(false);
      handleClose();
      window.location.reload();
    } catch (err) {
      enqueueSnackbar("Error updating the Event", { variant: "error" });
      console.log("Error updating the Event", err);
    }
  };

  return (
    <>
      <DialogTitle>
        {selectedEvent ? "Edit Event" : "Create a new Event"}
      </DialogTitle>
      <DialogContent>
        <form
          component="form"
          onSubmit={
            selectedEvent
              ? handleSubmit(updateEvent)
              : handleSubmit(createEvent)
          }
        >
          <TextField
            fullWidth
            label="Event Name"
            {...register("name", {
              required: { value: true, message: "Event Name cannot be empty" },
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...register("description", {
              required: { value: true, message: "Description cannot be empty" },
            })}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            {...register("location", {
              required: { value: true, message: "Location cannot be empty" },
            })}
            error={Boolean(errors.location)}
            helperText={errors.location?.message}
            margin="normal"
          />
          <InputLabel id="category">Category</InputLabel>
          <Select
            fullWidth
            labelId="category"
            label="category"
            {...register("category", {
              required: { value: true, message: "Location cannot be empty" },
            })}
          >
            {categoriesList.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDateTimePicker"]}>
              <MobileDateTimePicker
                value={date}
                onChange={(value) => setDate(value)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            className={styles.button}
            sx={{ mt: "20px" }}
          >
            {isLoading ? <CircularProgress /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </>
  );
}

export default EventForm;
