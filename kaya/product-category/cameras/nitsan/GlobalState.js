function createGlobalState(param = undefined) {
  const subs = new Set();
  let value = typeof param === "function" ? param() : param;

  return {
    get() {
      return value;
    },

    set(param) {
      value = typeof param === "function" ? param(value) : param;
      subs.forEach((callback) => callback(value));
    },

    subscribe(callback) {
      subs.add(callback);
      return function unsubscribe() {
        subs.delete(callback);
      };
    },
  };
}

function useGlobalState(globalState) {
  const [value, setValue] = React.useState(globalState.get);
  React.useEffect(() => globalState.subscribe(setValue), [globalState]);
  return [value, globalState.set];
}
