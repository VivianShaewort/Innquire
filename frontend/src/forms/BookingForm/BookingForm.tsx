import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";


type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    totalCost: number,
    paymentIntentId: string;

}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {

    const stripe = useStripe();
    const elements = useElements();

    const search = useSearchContext();

    const { hotelId } = useParams();

    const { showToast } = useAppContext();

    const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
        onSuccess: () => {
            showToast({message: "Booking Confirmed!", type:"SUCCESS"})
        },

        onError: () => {
            showToast({message: "Booking Failed...Try Again", type: "ERROR"})
        }

    })

    const { handleSubmit, register } = useForm<BookingFormData>(
        {
            defaultValues:{
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                adultCount: search.adultCount,
                childCount: search.childCount,
                checkIn: search.checkIn.toISOString(),
                checkOut: search.checkOut.toISOString(),
                hotelId: hotelId,
                totalCost: paymentIntent.totalCost,
                paymentIntentId: paymentIntent.paymentIntentId,
            }
        }
    );

    const onSubmit = async (formData:BookingFormData) => {
        if(!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
            }
        });

        if(result.paymentIntent?.status === "succeeded") {
            bookRoom({...formData, paymentIntentId: result.paymentIntent.id})
        }
    };

    

    return(
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
            <span className="text-3xl font-bold font-headers">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className= "mt-1 rounded border w-full px-3 py-2 text-gray-700 bg-gray-200 font-normal"
                    type="text"
                    readOnly
                    disabled
                    {...register("firstName")}
                    >

                    </input>
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className= "mt-1 rounded border w-full px-3 py-2 text-gray-700 bg-gray-200 font-normal"
                    type="text"
                    readOnly
                    disabled
                    {...register("lastName")}
                    >

                    </input>
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input className= "mt-1 rounded border w-full px-3 py-2 text-gray-700 bg-gray-200 font-normal"
                    type="text"
                    readOnly
                    disabled
                    {...register("email")}
                    >

                    </input>
                </label>
            </div>

            <div className="space-y-2">
                <h2 className="font-semibold text-xl font-headers">Your Price Summary</h2>

                <div className="bg-seafoam p-4 rounded-md font-body">
                <div className="font-semibold text-lg">
                    Total Cost: ${paymentIntent.totalCost.toFixed(2)}
                </div>
                <div className="text-xs">
                    Includes taxes and charges
                </div>
            </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-xl font-headers">Payment Details</h3>

                <CardElement 
                id="payment-element"
                className="border rounded-md p-2 text-sm" />
            </div>

            <div className="flex justify-end">
                <button
                disabled= {isLoading} 
                type="submit" 
                className="bg-dgreen text-white p-2 hover:bg-shadow font-bold text-md disabled:bg-gray-500">
                    {isLoading ? "Saving..." : "Confirm Booking"}
                </button>
            </div>
           
        </form>
    )

}

export default BookingForm;