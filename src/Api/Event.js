import OutlitData from '../outlitdata/OutlitData';

const outlit = new OutlitData();

export const getLocalEvents = (location) => {
  return outlit.getNearbyEvents(location, {}, (eventData) => {}).then((allEvents) => {
      return allEvents
    }).catch((ex) => {
      return []
    });
}