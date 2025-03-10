
// Space Data Screen Actions
export const fetchApod = () => async (dispatch) => {
    dispatch({ type: 'FETCH_APOD_REQUEST' });
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
        dispatch({ type: 'FETCH_APOD_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_APOD_FAILURE', payload: error.message });
    }
};

export const fetchSpaceWeather = () => async (dispatch) => {
    dispatch({ type: 'FETCH_SPACE_WEATHER_REQUEST' });
    try {
        const response = await fetch(`https://services.swpc.noaa.gov/products/geospace/planetary-k-index.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_SPACE_WEATHER_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_SPACE_WEATHER_FAILURE', payload: error.message });
    }
};

  // Rocket Data Screen Actions
export const fetchLatestLaunch = () => async (dispatch) => {
    dispatch({ type: 'FETCH_LAUNCH_REQUEST' });
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches/latest');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_LAUNCH_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_LAUNCH_FAILURE', payload: error.message });
    }
};

export const fetchAstronauts = () => async (dispatch) => {
    dispatch({ type: 'FETCH_ASTRONAUTS_REQUEST' });
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_ASTRONAUTS_SUCCESS', payload: data.people });
    } catch (error) {
        dispatch({ type: 'FETCH_ASTRONAUTS_FAILURE', payload: error.message });
    }
};

  // Event Calendar Screen Actions
export const fetchSunriseSunset = (lat, lng) => async (dispatch) => {
    dispatch({ type: 'FETCH_SUNRISE_SUNSET_REQUEST' });
    try {
        const response = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&timezone=UTC&date=today`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_SUNRISE_SUNSET_SUCCESS', payload: data.results });
    } catch (error) {
        dispatch({ type: 'FETCH_SUNRISE_SUNSET_FAILURE', payload: error.message });
    }
};

export const fetchSpaceEvents = () => async (dispatch) => {
    dispatch({ type: 'FETCH_SPACE_EVENTS_REQUEST' });
    try {
        const response = await fetch('https://ll.thespacedevs.com/2.2.0/agencies/?limit=10');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_SPACE_EVENTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_SPACE_EVENTS_FAILURE', payload: error.message });
    }
};

  // Geolocation Action (used where needed)
export const fetchGeolocation = () => async (dispatch) => {
    dispatch({ type: 'FETCH_GEOLOCATION_REQUEST' });
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_GEOLOCATION_SUCCESS', payload: data });
        return data;
    } catch (error) {
        dispatch({ type: 'FETCH_GEOLOCATION_FAILURE', payload: error.message });
    return null;
    }
};