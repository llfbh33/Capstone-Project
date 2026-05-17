// ACTION
const LOAD_ACTIVITIES = "activities/loadActivities";


// ACTION CREATOR
const loadActivities = (activities) => ({
    type: LOAD_ACTIVITIES,
    activities
});



// THUNK
export const thunkGetCurrentUserActivities = () => async (dispatch) => {
    const response = await fetch("/api/activities/current");

    if (response.ok) {
        const data = await response.json();
        return dispatch(loadActivities(data));
    } else {
        return { server: "Something went wrong. Please try again" };
    }
};




// INITIAL STATE
const initialState = {};


// REDUCER
export default function activitiesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ACTIVITIES: {
            const newState = {...state};

            action.activities.forEach((activity) => {
                newState[activity.id] = activity;
            });

            return newState;
        }

        default:
            return state;
    }
}