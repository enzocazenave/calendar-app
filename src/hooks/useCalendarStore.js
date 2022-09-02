import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
    
    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent));
    
    const startSavingEvent = async(calendarEvent) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        //* Propiedades
        activeEvent, 
        events,
        hasEventSelected: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
