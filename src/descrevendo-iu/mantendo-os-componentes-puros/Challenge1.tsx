export default function Clock({ time }: { time: Date }) {
  return (
    <h1
      id="time"
      className={time.getHours() >= 0 && time.getHours() <= 6 ? "night" : "day"}
    >
      {time.toLocaleTimeString()}
    </h1>
  );
}
