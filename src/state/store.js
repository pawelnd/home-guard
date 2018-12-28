import {applyMiddleware, combineReducers, createStore} from "redux";
import {combineEpics, createEpicMiddleware,} from "redux-observable";
import {doorEpics} from "./epics";
import {doors} from "./reducers";
import {Observable} from "rxjs";

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

export const myStore = configureStore();

export const getState$ = () =>  new Observable(function (observer) {
    observer.next(myStore.getState());
    const unsubscribe = myStore.subscribe(function () {
        observer.next(myStore.getState());
    });
    return unsubscribe;
});
