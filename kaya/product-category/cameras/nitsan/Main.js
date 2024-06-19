const InTableMode = createGlobalState(false);

/**
 * Keeps the table mounted for a little longer after InTableMode has become false,
 * to let the fade-out animation complete.
 */
function useShouldRenderTable() {
  const [inTableMode] = useGlobalState(InTableMode);
  const [renderTable, setRenderTable] = React.useState(inTableMode);

  const justMounted = React.useRef(true);

  React.useEffect(() => {
    if (justMounted.current) {
      // don't run the effect just because we mounted
      return void (justMounted.current = false);
    }

    if (inTableMode) {
      return setRenderTable(true);
    }

    const onTableFadedOut = () => {
      if (InTableMode.get() === false) {
        setRenderTable(false);
      }
    };

    const table = document.querySelector(".table-wrapper");
    table.addEventListener("animationend", onTableFadedOut, { once: true });
  }, [inTableMode]);

  return renderTable;
}

function Main() {
  const renderTable = useShouldRenderTable();

  return (
    <>
      <ProductsFilters />
      {renderTable && (
        <Portal targetSelector="main .products-main-area">
          <div className="table-wrapper">
            <SorableTable />
          </div>
        </Portal>
      )}
    </>
  );
}

function Portal({ children, targetSelector }) {
  const parentDiv = document.querySelector(targetSelector);
  return ReactDOM.createPortal(children, parentDiv);
}
