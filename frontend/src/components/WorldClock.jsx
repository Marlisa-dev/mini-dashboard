import Clock from 'react-clock';
import { useEffect, useState } from 'react';
import './WorldClock.css'
import 'react-clock/dist/Clock.css'

const cities = [
  { label: 'New York', timeZone: 'America/New_York' },
  { label: 'London', timeZone: 'Europe/London' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { label: 'Sydney', timeZone: 'Australia/Sydney' },
];

const WorldClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCityTime = (timeZone) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const hour = +parts.find(p => p.type === 'hour')?.value;
    const minute = +parts.find(p => p.type === 'minute')?.value;
    const second = +parts.find(p => p.type === 'second')?.value;

    const localTime = new Date(now);
    localTime.setHours(hour);
    localTime.setMinutes(minute);
    localTime.setSeconds(second);

    return localTime;
  };

  const formatDigitalTime = (date, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone,
    }).format(date);
  };


  return (
<div>
  <h2 style={{ textAlign: 'center', color: 'var(--text-color)', marginBottom: '5px' }}>World Clock</h2>
  <div className="clock-grid">
    {cities.map((city) => (
      <div key={city.label} className="clock-item">
        <h4 style={{ color: 'var(--text-color)', marginBottom: '6px' }}>{city.label} - {formatDigitalTime(now, city.timeZone)}</h4>
        <Clock value={getCityTime(city.timeZone)} size={100} />
      </div>
    ))}
  </div>
</div>
  )
}

export default WorldClock