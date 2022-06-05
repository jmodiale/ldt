import React from 'react'
import { useState } from 'react';

export default function Dashboard() {
    const [entry, setEntry] = useState("");
    const [organiser, setOrganiser] = useState("");

    const handleSubmit = () =>{

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
