import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Select, Space, TimePicker } from "antd";
import { Dayjs } from "dayjs"; // Import Dayjs type

const { Option } = Select;

type PickerType = "date" | "month" | "year";
const dateFormat = "DD/MM/YYYY";
const PickerWithType = ({
  type,
  onChange,
  setDay,
  setMonth,
  setYear, // Add setDayy as a prop
}: {
  type: PickerType;
  onChange: (day: number, month: number, year: number) => void;
  setDay: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMonth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setYear: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const handleChange = (value: Moment | null, dateString: string) => {
    let day: number | undefined;
    let month: number | undefined;
    let year: number | undefined;

    if (value) {
      day = value.date();
      month = value.month() + 1; // Month is zero-based
      year = value.year();
    }

    // Provide default values if undefined
    onChange(
      day !== undefined ? day : 0,
      month !== undefined ? month : 0,
      year !== undefined ? year : 0
    );

    // Set dayy state
    setDay(day);
    setMonth(month);
    setYear(year);
  };

  const initialDate = moment();

  useEffect(() => {
    // Set initial values when the component mounts
    setDay(initialDate.date());
    setMonth(initialDate.month() + 1);
    setYear(initialDate.year());
    onChange(initialDate.date(), initialDate.month() + 1, initialDate.year());
  }, []); // Empty dependency array to run the effect only once

  if (type === "date") {
    return (
      <DatePicker
        defaultValue={initialDate as Moment as any} // Use defaultValue instead of value
        onChange={handleChange as any}
        format={dateFormat}
      />
    );
  }

  return (
    <DatePicker
      defaultValue={initialDate as Moment as any} // Use defaultValue instead of value
      picker={type}
      format={dateFormat}
      onChange={handleChange as any}
    />
  );
};
interface ChooseTimeProps {
  day: any;
  setDay: any;
  setMonth: any;
  month: any;
  year: any;
  setYear: any;
}
const ChooseTime: React.FC<ChooseTimeProps> = ({
  day,
  setDay,
  setMonth,
  month,
  setYear,
  year,
}) => {
  const [type, setType] = useState<PickerType>("date");

  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="date">Date</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType
        type={type}
        onChange={(day, month, year) => {
          console.log("Day:", day);
          console.log("Month:", month);
          console.log("Year:", year);
        }}
        setDay={setDay}
        setMonth={setMonth}
        setYear={setYear} // Pass setDayy function
      />
    </Space>
  );
};

export default ChooseTime;
