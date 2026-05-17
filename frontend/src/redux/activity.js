// ACTION
const LOAD_ACTIVITIES = "activities/loadActivities";
const CREATE_ACTIVITY = "activities/createActivity";


// ACTION CREATOR
const loadActivities = (activities) => ({
    type: LOAD_ACTIVITIES,
    activities
});

const createActivity = (activity) => ({
    type: CREATE_ACTIVITY,
    activity
})


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

export const thunkCreateActivity = (activity) => async (dispatch) => {
    const response = await fetch("/api/activities/newActivity", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: activity.user_id,
            target_id: activity.target_id,
            notebook_id: activity.notebook_id ?? null,
            target_type: activity.target_type,
            text: activity.text,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return dispatch(createActivity(data.activities));
    } else {
        const errors = await response.json();
        return errors;
    }
}


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
        case CREATE_ACTIVITY: {
            const newState = {...state};
            newState[action.activity.id] = action.activity;
            return newState;
        }

        default:
            return state;
    }
}