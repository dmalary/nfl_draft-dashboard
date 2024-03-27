/* eslint-disable react/prop-types */

import { useState } from 'react';

import DropdownFilter from '../components/DropdownFilter';

const NavBar = () => {

  const filters = {
    position: "position",
    yearsPlayed: "yearsPlayed",
    round: "round",
    team: "team",
    year: "year",
  }
// pass down data (dropdown options) based on filter key
// update/filter data in App based on NavBar selection
  return (
    <div>
      <DropdownFilter filterKey={filters.round}/> 
      <DropdownFilter filterKey={filters.position}/>
      <DropdownFilter filterKey={filters.team}/>
      <DropdownFilter filterKey={filters.year}/>
    </div>
  )
};

export default NavBar;