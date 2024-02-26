import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Button, Dialog, Grid } from "@mui/material";
import styles from "./myevents.module.css";
import { enqueueSnackbar } from "notistack";
import axios from "../../api/axios";
import { CalendarMonth, Edit, LocationOn } from "@mui/icons-material";
import { formatDate } from "../../utils/FormateDate";
import EventForm from "./EventForm";
function MyEvents() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myEvents, setMyEvent] = useState(null);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getAllMyEvents = async () => {
    try {
      const res = await axios.get("v1/event/myEvents");
      setMyEvent(res.data);
    } catch (err) {
      enqueueSnackbar("Error retrieving events", { variant: "warning" });
      console.log("Error fetching Events");
    }
  };

  const handleClose = () => {
    setCreateEventOpen(false);
    setSelectedEvent(null);
  };
  const handleSelectedEventOpen = () => {};

  useEffect(() => {
    getAllMyEvents();
  }, []);

  return (
    <>
      <div className={styles.myEventContainer}>
        <div className={styles.myEventHeader}>
          <h1>My Events</h1>
          <Button
            className={styles.createEventButton}
            onClick={() => setCreateEventOpen(true)}
            variant="contained"
          >
            Create Event
          </Button>
        </div>
        <div className={styles.gridContainer}>
          {myEvents?.map((event) => (
            <div key={event._id} className={styles.gridItem}>
              <div className={styles.gridHeader}>
                <h5>{event.name}</h5>
                <Button
                  color="inherit"
                  onClick={() => {
                    setSelectedEvent(event);
                    setCreateEventOpen(true);
                  }}
                >
                  <Edit />
                </Button>
              </div>
              <div className={styles.gridDetails}>
                <p className={styles.subDetails}>
                  <CalendarMonth /> {formatDate(event.date)}
                </p>
                <p className={styles.subDetails}>
                  <LocationOn /> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={createEventOpen} onClose={handleClose}>
        <EventForm selectedEvent={selectedEvent} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default MyEvents;
