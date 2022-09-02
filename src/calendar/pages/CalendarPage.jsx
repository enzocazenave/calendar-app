import { useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesES } from '../../helpers';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { useUiStore, useCalendarStore } from '../../hooks/';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            notSelected: {
                backgroundColor: '#347CF7',
                borderRadius: '0px',
                opacity: 0.8,
                color: 'white'
            },
            selected: {
                backgroundColor: '#347CF7',
                borderRadius: '0px',
                opacity: 0.6,
                color: 'white'
            },            
        }

        if (isSelected) {
            return style.selected
        }

        return style.notSelected
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es' 
                localizer={ localizer } 
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal/>
            <FabAddNew />
            <FabDelete />
        </>
    )
}
