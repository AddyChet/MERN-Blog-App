import React from 'react';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DateFormat = ({ date }) => {
  const d = new Date(date);
  const hours24 = d.getHours();
  const mins = d.getMinutes();
  const month = d.getMonth();

  // Convert to 12-hour format
  const hours12 = hours24 % 12 || 12; // Converts 0 to 12
  const paddedHours = hours12 < 10 ? `0${hours12}` : hours12;
  const paddedMins = mins < 10 ? `0${mins}` : mins;
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  return (
    <span>
      {d.getDate()} {months[month]}, {paddedHours}:{paddedMins} {ampm}
    </span>
  );
};

export default DateFormat;
