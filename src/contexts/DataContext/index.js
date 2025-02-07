import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const eventData = await api.loadData();

      const lastEvent =
        eventData?.events?.reduce((prevEvent, currentEvent) =>
          new Date(currentEvent.date) > new Date(prevEvent.date)
            ? currentEvent
            : prevEvent
        ) ?? null;

      console.log(lastEvent);

      setData(eventData);
      setLast(lastEvent);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  // const last = data?.events[data.events.length - 1];

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
