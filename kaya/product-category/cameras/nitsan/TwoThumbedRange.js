function TwoThumbedRange({ min, max, lowerValue, setLowerValue, upperValue, setUpperValue }) {
  const divInputsRef = React.useRef(null);

  const onLowerValue = (value) => {
    setLowerValue(Math.min(Math.floor(value), upperValue));
  };

  const onUpperValue = (value) => {
    setUpperValue(Math.max(Math.ceil(value), lowerValue));
  };

  const onRangeOverlayClick = (e) => {
    const rect = divInputsRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.x) / rect.width;
    const value = Math.round(percentage * (max - min) + min);
    const closerToLowerValue = value < lowerValue || value - lowerValue < upperValue - value;
    (closerToLowerValue ? setLowerValue : setUpperValue)(value);
  };

  const percentLeft = ((lowerValue - min) / (max - min)) * 100;
  const percentRight = ((upperValue - min) / (max - min)) * 100;

  return (
    <div className="two-thumbed-range">
      <div className="overlays" onClick={onRangeOverlayClick}>
        <div className="gray-track left" />
        <div className="gray-track right" />
        <div className="colored-track" style={{ left: `${percentLeft}%`, right: `${100 - percentRight}%` }} />
        <span className="thumb" style={{ left: `${percentLeft}%` }} />
        <span className="thumb" style={{ left: `${percentRight}%` }} />
      </div>

      <div className="inputs" ref={divInputsRef}>
        <input
          className="min"
          type="range"
          value={lowerValue}
          max={max}
          min={min}
          step="1"
          onInput={(e) => onLowerValue(e.target.value)}
        />
        <input
          className="max"
          type="range"
          value={upperValue}
          max={max}
          min={min}
          step="1"
          onInput={(e) => onUpperValue(e.target.value)}
        />
      </div>
    </div>
  );
}
