import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { enqueueSnackbar } from "notistack";
import styles from "./events.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import { CalendarMonth } from "@mui/icons-material";
import { formatDate } from "../../utils/FormateDate";

function Events() {
  const [events, setEvents] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  //   const [attendIsLoading, setAttendIsLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("v1/event/list");
      res.data.forEach((element) => {
        element.isOpen = false;
      });
      setEvents(res.data);
    } catch (err) {
      enqueueSnackbar("Error retrieving events", { variant: "warning" });
      console.log("Error fetching Events");
    }
  };

  const checkAlreadyRegistered = (id) => {
    const event = events.find((e) => e._id === id);
    // return event.attendees.includes(user._id)
    return event.attendees.some((u) => u._id === user._id);
  };

  const handleAttend = async (id) => {
    // console.log(id);
    // console.log(checkAlreadyRegistered(id));
    if (!checkAlreadyRegistered(id)) {
      try {
        const event = await axios.post(`v1/event/regiterEvent/${id}`);
        await fetchEvents();
      } catch (err) {
        if (err.response.status === 401) {
          enqueueSnackbar("Please login to register for Events", {
            variant: "error",
          });
          return;
        }
        if (err.response.status === 208) {
          enqueueSnackbar("Already Registereds", {
            variant: "warning",
          });
          return;
        }
        enqueueSnackbar("Error registering for event", { variant: "error" });
        console.log("Error registering for the event", err);
        return;
      }
    } else {
      enqueueSnackbar("Already Registered for the event", {
        variant: "warning",
      });
    }
  };
  const handleMoreDetails = (id) => {
    console.log(id);
    setEvents(
      events.map((e) => (e._id === id ? { ...e, isOpen: !e.isOpen } : e))
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className={styles.eventContainer}>
      {events?.length > 0 ? (
        events?.map((e) => (
          <Accordion
            key={e._id}
            expanded={e.isOpen}
            className={styles.accordion}
          >
            <AccordionSummary>
              <div className={styles.card}>
                <div className={styles.eventHead}>
                  <h3>{e.name}</h3>
                  <h4>{e.location}</h4>
                </div>

                <div className={styles.eventDetails}>
                  <div className={styles.time}>
                    <CalendarMonth />
                    &nbsp;
                    {formatDate(e.date)}
                  </div>

                  <div className={styles.buttonContainer}>
                    <Button
                      onClick={() => handleMoreDetails(e._id)}
                      className={styles.moreButton}
                    >
                      {e.isOpen ? "Less" : "More"}
                    </Button>
                    {token &&
                      (checkAlreadyRegistered(e._id) ? (
                        <Button disabled className={styles.moreButton}>
                          Attending
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            handleAttend(e._id);
                          }}
                          variant="contained"
                          className={styles.button}
                        >
                          Attend
                        </Button>
                      ))}
                    {/* {console.log(
                    "user eevents: ",
                    user?.events,
                    "event id",
                    e._id
                  )} */}
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={styles.accordianDetail}>
              <div className={styles.description}>
                <h4>Description</h4>
                <p>{e.description}</p>
              </div>
              <div>
                <h4>Attendees</h4>
                <List>
                  {e.attendees?.length > 0
                    ? e.attendees?.map((user) => (
                        <ListItem
                          className={styles.listItem}
                          key={user._id}
                          // style={{ justifyContent: "space-between" }}
                        >
                          <div>{user.name}</div>
                          <div> {user.email}</div>
                        </ListItem>
                      ))
                    : "No participants"}
                  {/* {e.attendees.length} */}
                </List>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <h2>No Events</h2>
      )}
    </div>
  );
}

export default Events;
