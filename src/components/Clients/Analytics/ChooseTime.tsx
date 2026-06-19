import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Select, Space } from "antd";

const { Option } = Select;

type PickerType = "date" | "month" | "year";
const dateFormat = "DD/MM/YYYY";

const PickerWithType = ({
  type,
  day,
  month,
  year,
  onChange,
  setDay,
  setMonth,
  setYear,
}: {
  type: PickerType;
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;
  onChange: (day: number, month: number, year: number) => void;
  setDay: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMonth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setYear: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const handleChange = (value: Dayjs | null, dateString: string) => {
    let d: number | undefined;
    let m: number | undefined;
    let y: number | undefined;

    if (value) {
      d = value.date();
      m = value.month() + 1; // Month is zero-based
      y = value.year();
    }

    if (type === "date") {
      setDay(d);
      setMonth(m);
      setYear(y);
      onChange(d !== undefined ? d : 0, m !== undefined ? m : 0, y !== undefined ? y : 0);
    } else if (type === "month") {
      setDay(undefined);
      setMonth(m);
      setYear(y);
      onChange(0, m !== undefined ? m : 0, y !== undefined ? y : 0);
    } else if (type === "year") {
      setDay(undefined);
      setMonth(undefined);
      setYear(y);
      onChange(0, 0, y !== undefined ? y : 0);
    }
  };

  // Derive value for DatePicker from current parent state (controlled component)
  const currentValue = (day || month || year)
    ? dayjs()
        .year(year || dayjs().year())
        .month((month || dayjs().month() + 1) - 1)
        .date(day || 1)
    : null;

  const getFormat = () => {
    if (type === "month") return "MM/YYYY";
    if (type === "year") return "YYYY";
    return dateFormat;
  };

  if (type === "date") {
    return (
      <DatePicker
        value={currentValue}
        onChange={handleChange as any}
        format={dateFormat}
      />
    );
  }

  return (
    <DatePicker
      value={currentValue}
      picker={type}
      format={getFormat()}
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
  setStartDate?: any;
  setEndDate?: any;
}

const ChooseTime: React.FC<ChooseTimeProps> = ({
  day,
  setDay,
  setMonth,
  month,
  setYear,
  year,
  setStartDate,
  setEndDate,
}) => {
  const [type, setType] = useState<PickerType | "range">("date");

  // Initialize values when component loads
  useEffect(() => {
    const today = dayjs();
    if (day === undefined && month === undefined && year === undefined && !setStartDate && !setEndDate) {
      setDay(today.date());
      setMonth(today.month() + 1);
      setYear(today.year());
    }
  }, []);

  useEffect(() => {
    if (type !== "range") {
      if (setStartDate) setStartDate(undefined);
      if (setEndDate) setEndDate(undefined);
    }
  }, [type, setStartDate, setEndDate]);

  const handleTypeChange = (newType: PickerType | "range") => {
    setType(newType);
    const today = dayjs();
    if (newType === "range") {
      setDay(undefined);
      setMonth(undefined);
      setYear(undefined);
    } else {
      if (setStartDate) setStartDate(undefined);
      if (setEndDate) setEndDate(undefined);

      // Preserve logical states when switching between picker types
      if (newType === "year") {
        setDay(undefined);
        setMonth(undefined);
        if (!year) setYear(today.year());
      } else if (newType === "month") {
        setDay(undefined);
        if (!month) setMonth(today.month() + 1);
        if (!year) setYear(today.year());
      } else if (newType === "date") {
        if (!day) setDay(today.date());
        if (!month) setMonth(today.month() + 1);
        if (!year) setYear(today.year());
      }
    }
  };

  const handleRangeChange = (values: any) => {
    if (values && values[0] && values[1]) {
      const startStr = values[0].format("YYYY-MM-DD");
      const endStr = values[1].format("YYYY-MM-DD");
      if (setStartDate) setStartDate(startStr);
      if (setEndDate) setEndDate(endStr);
      setDay(undefined);
      setMonth(undefined);
      setYear(undefined);
    } else {
      if (setStartDate) setStartDate(undefined);
      if (setEndDate) setEndDate(undefined);
    }
  };

  return (
    <Space>
      <Select value={type} onChange={handleTypeChange} style={{ width: 130 }}>
        <Option value="date">Ngày</Option>
        <Option value="month">Tháng</Option>
        <Option value="year">Năm</Option>
        <Option value="range">Khoảng ngày</Option>
      </Select>
      {type === "range" ? (
        <DatePicker.RangePicker
          format={dateFormat}
          onChange={handleRangeChange}
        />
      ) : (
        <PickerWithType
          type={type as PickerType}
          day={day}
          month={month}
          year={year}
          onChange={(day, month, year) => {
            console.log("Day:", day);
            console.log("Month:", month);
            console.log("Year:", year);
          }}
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
        />
      )}
    </Space>
  );
};

export default ChooseTime;
