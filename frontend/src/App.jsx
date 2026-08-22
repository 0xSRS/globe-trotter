import React from 'react';
import CalendarView from './CalendarView'; // This imports the file you just made

const App = () => {
  return (
    <div>
      {/* This tells the main screen to display your calendar */}
      <CalendarView />
    </div>
  )
}

export default App