import OutlitData from '../outlitdata/OutlitData';

const outlit = new OutlitData();

export const getLocalVenues = (location) => {
  return outlit.getNearbyVenues(location, {}, (eventData) => {}).then((allEvents) => {
      return allEvents
    }).catch((ex) => {
      return []
    });
}