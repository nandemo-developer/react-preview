import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

export default function Calendar(){
  return (
    <div className='justify-center w-[340px] mx-auto'>
      <FullCalendar
        viewClassNames={"text-xs"}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        height={500}
        aspectRatio={4}
      />
    </div>
  )
}