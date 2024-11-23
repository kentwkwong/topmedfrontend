// src/Timesheet.tsx
import React, { useState } from "react";
import "./Timesheetsample.css";

interface TimesheetEntry {
  date: string;
  hoursWorked: number;
  description: string;
}

const Timesheetsample: React.FC = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);

  const handleAddEntry = () => {
    const newEntry: TimesheetEntry = {
      date: "",
      hoursWorked: 0,
      description: "",
    };
    setEntries([...entries, newEntry]);
  };

  const handleInputChange = (
    index: number,
    field: keyof TimesheetEntry,
    value: string | number
  ) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setEntries(updatedEntries);
  };

  return (
    <div className="timesheet-container">
      <h1>Timesheet</h1>
      <button className="add-entry-btn" onClick={handleAddEntry}>
        Add Entry
      </button>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) =>
                    handleInputChange(index, "date", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.hoursWorked}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "hoursWorked",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={entry.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheetsample;
