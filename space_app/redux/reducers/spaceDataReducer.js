
const initialState = {
    apod: null,
    spaceWeather: null,
    loading: false,
    error: null,
};

const spaceDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_APOD_REQUEST':
      case 'FETCH_SPACE_WEATHER_REQUEST':
        return { ...state, loading: true, error: null };

      case 'FETCH_APOD_SUCCESS':
        return { ...state, apod: action.payload, loading: false };

      case 'FETCH_SPACE_WEATHER_SUCCESS':
        return { ...state, spaceWeather: action.payload, loading: false };

      case 'FETCH_APOD_FAILURE':
      case 'FETCH_SPACE_WEATHER_FAILURE':
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
};

export default spaceDataReducer;