import { IoIosCloseCircle } from "react-icons/io";
import { GoCheckCircleFill } from "react-icons/go";
import doctorImage from "../../assets/images/doctor.jpg";
import "./Appointment.css";

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, getJson, Page, setOptions } from '@mobiscroll/react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';

setOptions({
    theme: 'windows',
    themeVariant: 'light'
});

export default function Appointment({ setIsOpen }) {
    const [multiple, setMultiple] = useState(['2024-03-11T00:00', '2024-03-16T00:00', '2024-03-17T00:00']);
    const min = '2024-03-22T00:00';
    const max = '2024-09-22T00:00';
    const [singleLabels, setSingleLabels] = useState([]);
    const [singleInvalid, setSingleInvalid] = useState([]);
    const [datetimeLabels, setDatetimeLabels] = useState([]);
    const [datetimeInvalid, setDatetimeInvalid] = useState([]);
    const [multipleLabels, setMultipleLabels] = useState([]);
    const [multipleInvalid, setMultipleInvalid] = useState([]);

    const invalid = useMemo(() => {
        return [{
            start: '2024-03-22T08:00',
            end: '2024-03-22T13:00'
        }, {
            start: '2024-03-22T15:00',
            end: '2024-03-22T17:00'
        }, {
            start: '2024-03-22T19:00',
            end: '2024-03-22T20:00'
        }];
    }, []); // Dependencies array is empty, indicating this memoization doesn't depend on props or state

    const labels = useMemo(() => {
        return [{
            start: '2024-03-21',
            textColor: '#e1528f',
            title: '2 SPOTS'
        }];
    }, []); // Similarly, an empty dependencies array

    const handlePageLoadingSingle = useCallback((args) => {
        const d = args.firstDay;

        getJson(
            'https://mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
            (bookings) => {
                for (let i = 0; i < bookings.length; ++i) {
                    const booking = bookings[i];
                    const d = new Date(booking.d);

                    if (booking.price > 0) {
                        labels.push({
                            start: d,
                            title: '$' + booking.price,
                            textColor: '#e1528f',
                        });
                    } else {
                        invalid.push(d);
                    }
                }
                setSingleLabels(labels);
                setSingleInvalid(invalid);
            },
            'jsonp',
        );
    }, []);

    const handlePageLoadingDatetime = useCallback((args) => {
        const d = args.firstDay;
        const invalid = [];
        const labels = [];

        getJson(
            'https://mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
            (bookings) => {
                for (let i = 0; i < bookings.length; ++i) {
                    const booking = bookings[i];
                    const d = new Date(booking.d);

                    if (booking.nr > 0) {
                        labels.push({
                            start: d,
                            title: booking.nr + ' SPOTS',
                            textColor: '#e1528f',
                        });
                        invalid.push(...booking.invalid);
                    } else {
                        invalid.push(d);
                    }
                }
                setDatetimeLabels(labels);
                setDatetimeInvalid(invalid);
            },
            'jsonp',
        );
    }, []);

    const handlePageLoadingMultiple = useCallback((args) => {
        const d = args.firstDay;
        const invalid = [];
        const labels = [];

        getJson(
            'https://mobiscroll.com/getbookings/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
            (bookings) => {
                for (let i = 0; i < bookings.length; ++i) {
                    const booking = bookings[i];
                    const d = new Date(booking.d);

                    if (booking.nr > 0) {
                        labels.push({
                            start: d,
                            title: booking.nr + ' SPOTS',
                            textColor: '#e1528f',
                        });
                    } else {
                        invalid.push(d);
                    }
                }
                setMultipleLabels(labels);
                setMultipleInvalid(invalid);
            },
            'jsonp',
        );
    }, []);

    const handleChangeMultiple = useCallback((args) => {
        setMultiple(args.value);
    }, []);

    return (
        <div className="appointment">
            <div className="appointment-modal">
                <IoIosCloseCircle className="close-btn" onClick={() => setIsOpen(false)} />
                <div className="appointment-header">
                    <img src={doctorImage} alt="Doctor" />
                    <h1>Jack Joliet</h1>
                </div>
                <div className="appointment-content">
                    <div className="doctor-details">
                        <div className="doctor-location">
                            <h2>Location</h2>
                            <p>527 E 1st</p>
                            <p>Bloomington, IN 47401</p>
                        </div>
                        <div className="doctor-specializations">
                            <div className="doctor-specializations-header">
                                <h2>Specializations</h2>
                                <span>
                                    <GoCheckCircleFill className="green" />
                                    <p>COVID-19 care</p>
                                </span>
                            </div>
                            <ul>
                                <li>Immunology</li>
                                <li>Family Medicine</li>
                                <li>Obstetrics</li>
                            </ul>
                        </div>
                    </div>
                    <div className="book-an-appointment">
                        <h2>Book an Appointment</h2>
                        <Page className="md-calendar-booking">
                            <div className="mbsc-form-group">
                                <Datepicker
                                    display="inline"
                                    controls={['calendar', 'timegrid']}
                                    min={min}
                                    max={max}
                                    minTime="08:00"
                                    maxTime="19:59"
                                    stepMinute={60}
                                    width={null}
                                    labels={datetimeLabels}
                                    invalid={datetimeInvalid}
                                    onPageLoading={handlePageLoadingDatetime}
                                    cssClass="booking-datetime"
                                />
                            </div>
                        </Page>
                    </div>
                </div>
            </div>
        </div>
    );
}