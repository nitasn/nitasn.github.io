// README
// this component started as a generic "SorableTable" (that takes props like { columns, rows, extractId }).
// when the needs changed, I decided it's better to instead make it tightly coupled with our project;
// this way we don't need overly done abstractions like passing a { displayIdAs: "Model" } prop;
// the table is free to do whatever with the data (like displaying a column of images that are links, etc).
// we draw data from the global variables `productObjects` and `attrTypes` (see pre-process-jsons.js).

function SorableTable() {
  const [orderBy, setOrderBy] = React.useState(null);
  const [ascending, setAscending] = React.useState(true);

  const objectsSorted = React.useMemo(() => {
    return [...productObjects].sort((obj1, obj2) => {
      const prop = orderBy ?? "name";
      const precedence = obj1[prop] < obj2[prop];
      return (precedence ? -1 : +1) * (ascending ? +1 : -1);
    });
  }, [orderBy, ascending]);

  const columns = Object.keys(attrTypes).filter((key) => {
    return attrTypes[key] === "number" || attrTypes[key] === "string";
  });

  const onHeaderPressed = (e, attrName) => {
    e.preventDefault();
    if (orderBy !== attrName) {
      return setOrderBy(attrName);
    }
    if (ascending) {
      return setAscending(false);
    }
    setOrderBy(null);
    setAscending(true);
  };

  const gridTemplateRows = `repeat(${productObjects.length}, 1fr)`;
  const gridTemplateColumns = `repeat(${columns.length + 1}, 1fr)`;

  return (
    <div className="sortable-table" style={{ gridTemplateColumns, gridTemplateRows }}>
      <div className="sortable-table-head">
        <div className="sortable-table-row">
          <span>Model</span>
          {columns.map((attrName) =>
            attrTypes[attrName] === "number" || attrTypes[attrName] === "string" ? (
              <a key={attrName} href="#" onClick={(e) => onHeaderPressed(e, attrName)}>
                {attrName}
                {attrName === orderBy && <i className={`icon fas fa-arrow-${ascending ? "down" : "up"}`} />}
              </a>
            ) : (
              <span key={attrName}>{attrName}</span>
            )
          )}
        </div>
      </div>
      <div className="sortable-table-body">
        {objectsSorted.map((obj) => (
          <div className="sortable-table-row" key={obj.name}>
            <div className="sortable-table-column">
              <a href={obj.aHref} style={{ textDecoration: "underline "}}>
                {/* <img src={obj.imgSrc} alt={obj.name} style={{ width: 50, height: 50 }} /> */}
                {obj.name}
              </a>
            </div>
            {columns.map((attrName) => (
              <div className="sortable-table-column" key={attrName}>
                {obj[attrName]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
