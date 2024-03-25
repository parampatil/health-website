import axios from "axios";
import { API_URL } from "../services/config";

export default function register(user) {
    return axios.post(
        API_URL + "register",
        {
            userId: user.userId,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            streetAddress: user.streetAddress,
            country: user.country,
            state: user.state,
            city: user.city,
            zipCode: user.zipCode,
            doctorLic: user.role === "doctor" ? user.doctorlic : undefined,
            company: user.role === "insuranceProvider" ? user.company : undefined,
            companyLic: user.role === "insuranceProvider" ? user.companylic : undefined,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};