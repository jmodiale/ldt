import "./App.css";
import { useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { items } from "./data";
import Ticket from "./Ticket";

export default function Dashboard() {
  const [entry, setEntry] = useState("");
  const [organiser, setOrganiser] = useState("");
  const [data, setData] = useState(items);

  const filteredItems = data.filter((item) => {
    return (
      item.organiserTitle.toLowerCase().includes(entry.toLowerCase())||
      item.firstName.toLowerCase().includes(entry.toLowerCase()) ||
      item.lastName.toLowerCase().includes(entry.toLowerCase()) ||
      item.eventTitle.toLowerCase().includes(entry.toLowerCase()) ||
      item.raceTitle.toLowerCase().includes(entry.toLowerCase())
    );
  });

  const handleSubmit = (e) => {
    setData(filteredItems);
    e.preventDefault();
  };

  const handleEnter = () => {
    let sum = 0;

    const result = items.reduce((a, curr) => {
      let found = a.find(
        (elem) => elem.organiserId === curr.organiserId && elem.status === "CONFIRMED"
      );
      if (found) {
        found.ticketPrice.value += curr.ticketPrice.value;
      } else {
        a.push(curr);
      }
      return a;
    }, []);

    result.map((item) => {
      if ((item.organiserId === parseInt(organiser)) && (item.status === "CONFIRMED")) {
        sum = item.ticketPrice.value;
        console.log(sum);
      } else {
        return 0;
      }
      return sum;
    });

    return <Ticket value={sum} />;

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Search by name, event or race"
          size="30"
        />
      </form>
      <br />
      <form onSubmit={handleEnter}>
        <label style={{ fontSize: "14px" }}>
          Enter organiser Id to view total ticket sales:{" "}
        </label>
        <input
          type="search"
          value={organiser}
          onChange={(e) => setOrganiser(e.target.value)}
          size="20"
        />
      </form>
      <br />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Table size="small">
            <TableHead className="header">
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder" }}>
                  Booking Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>
                  Email Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Event Title</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Organiser</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Race Title</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>
                  Ticket Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.length !== 0 &&
                filteredItems.map((item) => {
                  return (
                    <>
                      <TableRow key={item.id}>
                        <TableCell>
                          {new Date(item.bookingDate).toDateString()}
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform="capitalize"
                            sx={{ fontSize: 14 }}
                          >
                            {item.firstName + " " + item.lastName}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.emailAddress}</TableCell>
                        <TableCell>{item.eventTitle}</TableCell>
                        <TableCell>{item.organiserTitle}</TableCell>
                        <TableCell>{item.raceTitle}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell align="right">
                          {item.ticketPrice.currencyCode}{" "}
                          {item.ticketPrice.value}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  );
}
