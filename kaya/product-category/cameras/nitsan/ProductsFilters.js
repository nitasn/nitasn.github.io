const FilterState = createGlobalState({}); // filtering rules (empty object means no filters)

const VALUES_TO_IGNORE = ["-", undefined];

function ProductsFilters() {
  return (
    <div className="products-filters">
      <h3 className="products-filters-header">Filter By...</h3>
      {Object.entries(attrTypes)
        .filter(([_, attrType]) => attrType === "number" || attrType === "string")
        .map(([attrName, attrType]) => {
          const Filter = attrType === "number" ? NumericalFilter : CategoricalFilter;
          return [
            <div key={attrName} className="product-filter">
              <h3>{attrName}</h3>
              <Filter attrName={attrName} />
            </div>,
          ];
        })}
    </div>
  );
}

function NumericalFilter({ attrName }) {
  const [min, max] = React.useMemo(() => {
    const bounds = findNumericalRange(attrName);
    return [Math.floor(bounds.min), Math.ceil(bounds.max)];
  }, [attrName]);

  const [lowerValue, setLowerValue] = React.useState(min);
  const [upperValue, setUpperValue] = React.useState(max);

  React.useEffect(() => {
    FilterState.set((filter) => ({
      ...filter,
      [attrName]: { min: lowerValue, max: upperValue },
    }));
  }, [lowerValue, upperValue]);

  return (
    <div className="numerical filter">
      <p className="verbal-description">
        Between <span>{lowerValue}</span> and <span>{upperValue}</span>
      </p>
      <TwoThumbedRange {...{ min, max, lowerValue, setLowerValue, upperValue, setUpperValue }} />
    </div>
  );
}

function CategoricalFilter({ attrName }) {
  const options = findCategoricalOptions(attrName);

  const checkboxChanged = (option, isChecked) => {
    FilterState.set(
      immer.produce(FilterState.get(), (filter) => {
        if (isChecked) {
          filter[attrName] ??= [];
          filter[attrName].push(option);
        } else {
          filter[attrName]?.splice(filter[attrName].indexOf(option), 1);
          if (filter[attrName]?.length === 0) {
            delete filter[attrName];
          }
        }
      })
    );
  };

  // TODO accordion

  return (
    <div className="categorical filter">
      {options
        .filter((option) => !VALUES_TO_IGNORE.includes(option))
        .map((option) => (
          <label key={option} className="checkbox-wrapper">
            <input type="checkbox" onInput={(e) => checkboxChanged(option, e.target.checked)} />
            <span>{option}</span>
          </label>
        ))}
    </div>
  );
}
