import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar';

function CalendarForm() {
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        console.log(value)
    }, [value]);

    let calendarRef = useRef()

    const freeDays = ['14-09-2022', '16-09-2022', '19-09-2022', '02-09-2022', '01-10-2022']
    const [scale, setScale] = useState("scale-0");
  useEffect(() => {
    setTimeout(() => {
      setScale("scale-1");
    }, 1000);
  }, []);
  return (
    <div className={`transition-all duration-150 ease-out relative ${scale}`}>
      <div className="w-full flex flex-row">
        <div className="w-full m-5 rounded-2xl shadow-xl break-all outline-dotted outline-1 outline-gray-500 pb-6 bg-gradient-to-r from-gray-300 to-gray-200">
          <div className="flex flex-row">
      <Calendar 
        className={"w-full"}
        onChange={onChange} 
        value={value} 
        view={"month"}
        // calendarType={"Arabic"}
        showNeighboringMonth={false}
        showNavigation={true}
        prevLabel={<Previous/>}
        prev2Label={<PreviousTwo/>}
        nextLabel={<Next/>}
        next2Label={<NextTwo/>}
        // minDate={new Date()}
        inputRef={calendarRef}
        // TODO fr-FR as constante
        formatShortWeekday={(locale, date) => date.toLocaleDateString('fr-FR', { weekday: 'short' })}
        navigationLabel={({ date, label, locale, view }) => getDate(date, locale)}
        // tileClassName={({ date, view }) => view === 'month' && date.getDay() === 0 ? 'bg-teal-500' : null}
        tileClassName={({ date, view }) => view === 'month' && freeDays.includes(date.toLocaleDateString('fr-FR').replaceAll('/','-')) ? 'h-14 bg-amber-200 hover:bg-teal-500' : 'h-14 bg-gray-300'}
        tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>...</p> : null}
        tileDisabled={({activeStartDate, date, view }) => !freeDays.includes(date.toLocaleDateString('fr-FR').replaceAll('/','-'))}
        // TODO ... date utils
        onClickDay={(value, event) => console.log(value.toLocaleDateString('fr-FR').replaceAll('/','-'))}
        />
    </div>
    </div>
    </div>
    </div>
  )
}

const PreviousTwo = () => {
    return (
        <div className='mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
        </div>
    )
}
const NextTwo = () => {
    return (
        <div className='mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    )
}

const Previous = () => {
    return (
        <div className='mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </div>
    )
}
const Next = () => {
    return (
        <div className='mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    )
}

// TODO .. don't save client before choosing calendar !!!

const getDate = (date, locale) => {
    return (
        <div className='mx-3'>
            {date.toLocaleDateString(locale)}
        </div>
    )
}

const getDay = (date, locale) => {
    return (
        <div>
            {
                date.toLocaleDateString(locale, { weekday: 'short' })
            }
        </div>
    )
}
export default CalendarForm