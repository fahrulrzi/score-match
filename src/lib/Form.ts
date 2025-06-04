import axios from "axios";

export interface CustomerRequest {
    username: string;
    job: string;
    income: number;
    installment: number;
    age: number;
    marital_status: string;
    length_of_work: string;
    purpose: string;
    collateral: string;
}


export const submitForm = async (formData: CustomerRequest) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/score`,
        formData,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                // Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
};