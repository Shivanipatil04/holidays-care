import Snowfall from "react-snowfall";

export default function SnowEffect() {
  return (
    <Snowfall
      snowflakeCount={120}
      speed={[0.6, 1.7]}
      radius={[0.5, 3]}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        pointerEvents: "none"
      }}
    />
  );
}
