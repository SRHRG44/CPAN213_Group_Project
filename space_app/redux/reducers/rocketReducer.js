
const initialState = {
    latestLaunch: null,
    astronauts: [],
    loading: false,
    error: null,
};

const rocketReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_LAUNCH_REQUEST':
      case 'FETCH_ASTRONAUTS_REQUEST':
        return { ...state, loading: true, error: null };

      case 'FETCH_LAUNCH_SUCCESS':
        return { ...state, latestLaunch: action.payload, loading: false };

      case 'FETCH_ASTRONAUTS_SUCCESS':
        return { ...state, astronauts: action.payload, loading: false };

      case 'FETCH_LAUNCH_FAILURE':
      case 'FETCH_ASTRONAUTS_FAILURE':
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
};

export default rocketReducer;