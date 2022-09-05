import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
    
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent));
    
    const startSavingEvent = async(calendarEvent) => {

        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            } 
                
            const { data } = await calendarApi.post('/events', calendarEvent);    
            dispatch(onAddNewEvent({ ...calendarEvent, _id: data.event.id, user }));
        } catch(error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id || activeEvent._id}`);
            dispatch(onDeleteEvent());
        } catch(error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(events));
        } catch(error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        //* Propiedades
        activeEvent, 
        events,
        hasEventSelected: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
