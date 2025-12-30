import React, { useState, useEffect } from 'react';

export const WorldClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Force EST/New York Timezone
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    hour12: false, // Image shows 24hr format or 08:53, usually financial sites use 24h or strict 2-digit
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };

  const formatTime = (date: Date) => {
    // Manually formatting to match 08:53:56 ET style if needed, but locale string is safer
    return date.toLocaleTimeString('en-US', timeOptions);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', dateOptions);
  };

  return (
    <div className="flex flex-row gap-8 text-[11px] md:text-xs font-normal tracking-[0.1em] text-[#e5e5e5]">
      <span>{formatTime(time)} ET</span>
      <span>{formatDate(time)}</span>
    </div>
  );
};