const { value } = props;

const [storeEvents, setStoreEvents] = useState([]);
const [uiEvents, setUiEvents] = useState([]);
const [viewMode, setViewMode] = useState("ui");

function handleChangeEvent(event) {
  function logChangeEvent(eventName) {
    setStoreEvents((events) => [...events, eventName]);
  }

  // Process added records
  for (const record of Object.values(event.changes.added)) {
    logChangeEvent(
      `Added: ${record.typeName} (ID: ${record.id}, X: ${record.x}, Y: ${record.y})`
    );
  }

  // Process updated records
  for (const [from, to] of Object.values(event.changes.updated)) {
    logChangeEvent(
      `Updated: ${from.typeName} (ID: ${from.id}, X: ${from.x} -> ${to.x}, Y: ${from.y} -> ${to.y})`
    );
  }

  // Process removed records
  for (const record of Object.values(event.changes.removed)) {
    logChangeEvent(
      `Removed: ${record.typeName} (ID: ${record.id}, X: ${record.x}, Y: ${record.y})`
    );
  }
}

function handleUiEvent(name, data) {
  setUiEvents((events) => [...events, `${name} ${JSON.stringify(data)}`]);
}

function EventLog({ changeEvents, uiEvents }) {
  let eventsToShow = [];
  if (viewMode === "ui") {
    eventsToShow = uiEvents;
  } else if (viewMode === "change") {
    eventsToShow = changeEvents;
  }

  return (
    <div>
      <ul>
        {eventsToShow.map((eventName, index) => (
          <li key={index}>{eventName}</li>
        ))}
      </ul>
    </div>
  );
}

const ShapeRenderer = ({ shapes }) => {
  console.log(shapes);
  
  return (
    <div style={{ position: "relative", height: "100%" }}>
      {(shapes || []).map((shape) => {
        const { x, y, rotation, opacity, type, props } = shape;
        const style = {
          position: "absolute",
          left: x,
          top: y,
          width: props.w,
          height: props.h,
          transform: `rotate(${rotation}deg)`,
          opacity: opacity,
          backgroundColor:
            props.fill === "pattern" ? "patternColor" : props.fill,
          border: props.geo === "rectangle" ? "1px solid black" : "none",
        };

        if (type === "text") {
          return (
            <div key={shape.id} style={style}>
              <span style={{ fontSize: props.size, color: props.color }}>
                {props.text}
              </span>
            </div>
          );
        }

        return <div key={shape.id} style={style} />;
      })}
    </div>
  );
};

console.log("props", props);

return (
  <div style={{ display: "flex" }}>
    <div style={{ width: "60vw", height: "80vh" }}>
      <ShapeRenderer shapes={JSON.parse(value).shapes} />
    </div>
    <div>
      <h3>Event Log</h3>
      <div
        style={{
          width: "40vw",
          height: "80vh",
          padding: 8,
          background: "#eee",
          border: "none",
          fontFamily: "monospace",
          fontSize: 12,
          borderLeft: "solid 2px #333",
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "auto",
        }}
      >
        <EventLog changeEvents={storeEvents} uiEvents={uiEvents} />
      </div>
    </div>
  </div>
);