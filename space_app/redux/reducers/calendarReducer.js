
const initialState = {
    sunriseSunset: null,
    spaceEvents: [],
    loading: false,
    error: null,
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SUNRISE_SUNSET_REQUEST':
      case 'FETCH_SPACE_EVENTS_REQUEST':
        return { ...state, loading: true, error: null };

      case 'FETCH_SUNRISE_SUNSET_SUCCESS':
        return { ...state, sunriseSunset: action.payload, loading: false };

      case 'FETCH_SPACE_EVENTS_SUCCESS':
        return { ...state, spaceEvents: action.payload.results, loading: false }; // Extract results from payload

      case 'FETCH_SUNRISE_SUNSET_FAILURE':
      case 'FETCH_SPACE_EVENTS_FAILURE':
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
};

export default calendarReducer;