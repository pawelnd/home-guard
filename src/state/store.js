import {applyMiddleware, combineReducers, createStore} from "redux";
import {combineEpics, createEpicMiddleware,} from "redux-observable";
import {doorEpics} from "./epics";
import {doors} from "./reducers";

export const configureStore = () => {
    const rootReducer = combineReducers({doors});
    const rootEpic = combineEpics(...doorEpics);
    const epicMiddleware = createEpicMiddleware();
    const createdStore = createStore(rootReducer,
        applyMiddleware(epicMiddleware)
    );
    epicMiddleware.run(rootEpic);
    return createdStore;


}
