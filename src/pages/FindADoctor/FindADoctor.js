import { useState } from "react";
import PatientHeader from "../../components/PatientHeader/PatientHeader";
import Appointment from "../../components/Appointment/Appointment";
import doctorImage from "../../assets/images/doctor.jpg";
import doctorImage2 from "../../assets/images/doctor2.jpg";
import { GoCheckCircleFill } from "react-icons/go";
import { SiIfixit } from "react-icons/si";
import "./FindADoctor.css";

export default function FindADoctor() {
    const [speciality, setSpeciality] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [covid19Care, setCovid19Care] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCovid19CareChange = () => {
        setCovid19Care(!covid19Care);
    };

    return (
        <div className="findADoctor-page">
            <PatientHeader />
            <div className="search">
                <h2>Find a Dcotor</h2>
                <form>
                    <div>
                        <div className="text-inputs">
                            <div>
                                <label>Speciality:</label>
                                <input
                                    type="text"
                                    id="speciality"
                                    placeholder="Speciality"
                                    value={speciality}
                                    onChange={(event) => setSpeciality(event.target.value)}
                                />
                            </div>
                            <div>
                                <label>Doctor Name:</label>
                                <input
                                    type="text"
                                    id="doctor-name"
                                    placeholder="Doctor Name"
                                    value={doctorName}
                                    onChange={(event) => setDoctorName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="covid-19-care">
                            <input
                                type="checkbox"
                                checked={covid19Care}
                                onChange={handleCovid19CareChange}
                            />
                            <label>COVID-19 Care</label>
                        </div>
                    </div>
                    <input type="submit" value="SEARCH" />
                </form>
            </div>
            <div className="content">
                {/* <p>No doctors match this search criteria.</p> */}
                <p>2 Doctors</p>
                <div className="doctors">
                    <div className="doctor">
                        <img src={doctorImage} alt="Doctor" />
                        <div className="doctor-details">
                            <h1>Jack Joliet</h1>
                            <div className="doctor-address">
                                <p>527 E 1st St</p>
                                <p>Bloomington, IN 47401</p>
                            </div>
                        </div>
                        <div className="doctor-speciality">
                            <span>
                                <GoCheckCircleFill className="green" />
                                <p>COVID-19 care</p>
                            </span>
                            <ul>
                                <li>Immunology</li>
                                <li>Family Medicine</li>
                                <li>Obstetrics</li>
                            </ul>
                            <button className="book-online-btn" onClick={() => setIsOpen(true)}>BOOK ONLINE</button>
                            {isOpen && <Appointment setIsOpen={setIsOpen} />}
                        </div>
                    </div>
                </div>
                <div className="doctors">
                    <div className="doctor">
                        <img src={doctorImage2} alt="Doctor" />
                        <div className="doctor-details">
                            <h1>Tom Gibbs</h1>
                            <div className="doctor-address">
                                <p>525 E 1st St</p>
                                <p>Bloomington, IN 47401</p>
                            </div>
                        </div>
                        <div className="doctor-speciality">
                            <span>
                                <SiIfixit className="red" />
                                <p>COVID-19 care</p>
                            </span>
                            <ul>
                                <li>Allergy</li>
                                <li>Emergency Medicine</li>
                                <li>Neurology</li>
                            </ul>
                            <button className="book-online-btn" onClick={() => setIsOpen(true)}>BOOK ONLINE</button>
                            {isOpen && <Appointment setIsOpen={setIsOpen} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}