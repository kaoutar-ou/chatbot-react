import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import * as calendarService from "../../services/CalendarService"
import SingleChoiceForm from "./SingleChoiceForm";

function CalendarForm(props) {

    const {setInfos, infos, setInfosErrors, infosErrors, handleSendForm, isSent, ...others} = props

  const [value, onChange] = useState(new Date());
  useEffect(() => {
    // console.log(value);
  }, [value]);

  let calendarRef = useRef();

  // TODO .. message sorry if nothing exist ... or .. contact later .. required = false

//   const freeDays = [
//     "14-09-2022",
//     "16-09-2022",
//     "19-09-2022",
//     "02-09-2022",
//     "01-10-2022",
//   ];

  const [freeCalendar, setFreeCalendar] = useState({});
  const [freeDays, setFreeDays] = useState([]);
  const [freeTime, setFreeTime] = useState([]);
  const [isTimeView, setIsTimeView] = useState(false);
//   const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const getAllFreeCalendar = async () => {
        let response = await calendarService.getAllFreeCalendar();
        setFreeCalendar(response.data.calendars);
        let days = []
        Object.entries(response.data.calendars).map((value) => (
            // days.push(new Date(value[1].date).toLocaleDateString('fr-FR').replaceAll('/','-'))
            days.push(new Date(value[1].date).toLocaleDateString('fr-FR'))
        ))
        setFreeDays(days)
      };
      getAllFreeCalendar();
  }, []);

  const getFreeTime = (date) => {
    // console.log(date.toLocaleDateString())
    let times = []
    Object.entries(freeCalendar).map((value) => {
        // console.log(new Date(value[1].date).toLocaleDateString('fr-FR'))
        // console.log(date.toLocaleDateString('fr-FR'))
        if (date.toLocaleDateString('fr-FR') === new Date(value[1].date).toLocaleDateString('fr-FR')) {
            times.push({id: value[1].id, name: value[1].time})
        }
    }
    // days.push(new Date(value[1].date).toLocaleDateString('fr-FR'))
    )
    setFreeTime(times)
  }

  useEffect(() => {
    if(freeTime.length !== 0) {
        setIsTimeView(true)
    } else {
      setIsTimeView(false)
    }
  }, [freeTime]);

  const timePage = {
    calendar: "Heure",
  };

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
          <div className="flex flex-row bg-slate-100 m-5 rounded-xl outline-dotted outline-1 outline-gray-500">
            {
            (!isTimeView) ? (
            <Calendar
              className={"w-full p-3"}
              onChange={onChange}
              value={value}
              view={"month"}
              // calendarType={"Arabic"}
              showNeighboringMonth={false}
              showNavigation={true}
              prevLabel={<Previous />}
              prev2Label={<PreviousTwo />}
              nextLabel={<Next />}
              next2Label={<NextTwo />}
              minDate={new Date()}
              inputRef={calendarRef}
              // TODO fr-FR as constante
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString("fr-FR", { weekday: "short" })
              }
              navigationLabel={({ date, label, locale, view }) =>
                getDate(date, locale)
              }
              // tileClassName={({ date, view }) => view === 'month' && date.getDay() === 0 ? 'bg-teal-500' : null}
              // TODO .. only after today
              tileClassName={({ date, view }) =>
                // view === "month" &&
                // date == new Date()
                freeDays.includes(
                //   date.toLocaleDateString("fr-FR").replaceAll("/", "-")
                  date.toLocaleDateString("fr-FR")
                )
                  ? "h-9 bg-amber-200 rounded-full hover:bg-teal-500"
                  : "h-9 rounded-full"
                // Object.entries(freeCalendar).map((value) => new Date(value[1]) == date)
              }
              // tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Weekend</p> : null}
              tileDisabled={({ activeStartDate, date, view }) =>
                !freeDays.includes(
                //   date.toLocaleDateString("fr-FR").replaceAll("/", "-")
                  date.toLocaleDateString("fr-FR")
                )
              }
              // TODO ... date utils
              onClickDay={(value, event) => getFreeTime(value)
                // console.log(
                // //   value.toLocaleDateString("fr-FR").replaceAll("/", "-")
                // value.toLocaleDateString()
                //     // new Date(value.getFullYear(), value.getMonth(), value.getDate())
                // )
              }
            />
            ) : (
                <SingleChoiceForm
                    key={"CalendarSingleChoiceForm"}
                    content={Object.entries(timePage).at(0)}
                    choices={freeTime}
                    setInfos={setInfos}
                    infos={infos}
                    setInfosErrors={setInfosErrors}
                    infosErrors={infosErrors}
                    isSent={isSent}
                />
            )
            }
          </div>
          {
            (isTimeView) ? (
              <div className="-mt-2 -mb-3 text-left ml-5">
                <button className="place-self-start flex place-items-center disabled:text-gray-500"
                  onClick={() => setIsTimeView(false)}
                  disabled={isSent}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                <div className="mx-1">précédent</div>
                </button>
              </div>
            ) : null
          }
        </div>
      </div>
      <button
        className="rounded-full bg-gray-100 outline-dotted outline-1 outline-gray-500 hover:outline-offset-2 w-10 h-10 absolute -mt-10 -ml-5 enabled:hover:bg-teal-500 enabled:hover:text-white disabled:text-gray-300"
        onClick={handleSendForm}
        disabled={isSent || !isTimeView}
      >
        OK
      </button>
    </div>
  );
}

const PreviousTwo = () => {
  return (
    <div className="mx-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
};

const NextTwo = () => {
  return (
    <div className="mx-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

const Previous = () => {
  return (
    <div className="mx-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
};
const Next = () => {
  return (
    <div className="mx-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

// TODO .. don't save client before choosing calendar !!!

const getDate = (date, locale) => {
  return <div className="mx-3">{date.toLocaleDateString(locale)}</div>;
};

const getDay = (date, locale) => {
  return <div>{date.toLocaleDateString(locale, { weekday: "short" })}</div>;
};
export default CalendarForm;


// TODO email .. click here to confirm .. then .. here are your infos

// TODO two choices .. check if != "" before OK click