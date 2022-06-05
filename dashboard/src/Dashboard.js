import React from 'react'
import { useState } from 'react';
import { items } from './data'

export default function Dashboard() {
    const [entry, setEntry] = useState("");
    const [organiser, setOrganiser] = useState("");
    const [data, setData] = useState("items");

    const filteredItems = data.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(entry.toLowerCase()) ||
        item.lastName.toLowerCase().includes(entry.toLowerCase()) ||
        item.eventTitle.toLowerCase().includes(entry.toLowerCase()) ||
        item.raceTitle.toLowerCase().includes(entry.toLowerCase())
      );
    });

    const handleSubmit = (e) =>{
         setData(filteredItems);
         e.preventDefault();
    }

    const handleClick = () => {

    }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Search by name, event or race"
        />
      </form>
      <form>
        <input
          type="search"
          value={organiser}
          onChange={(e) => setOrganiser(e.target.value)}
          placeholder="Enter organiser Id"
        />
      </form>
    </>
  );
}
