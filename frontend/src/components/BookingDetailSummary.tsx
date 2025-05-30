import { HotelType } from "../../../backend/src/shared/types"

type Props = {
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    numberOfNights: number,
    hotel: HotelType
};

const BookingDetailSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
    return(
    <div className="grid gap-4 border border-slate-300 rounded-lg h-fit p-5">
        <h2 className="text-xl font-bold font-headers">Your Booking Details</h2>

        <div className="border-b py-2">
            Location:  
            <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
        </div>

        <div className="flex justify-between">
            <div>Check In:
                <div className="font-bold">{checkIn.toDateString()}</div>
            </div>
            <div>Check Out:
                <div className="font-bold">{checkOut.toDateString()}</div>
            </div>
        </div>

        <div className="border-t border-b py-2">
            Total length of stay:
            <div className="font-bold">
                {numberOfNights} nights
            </div>

        </div>

        <div>
            Guests:
            <div className="font-bold">
                {adultCount} adults & {childCount} children
            </div>
        </div>
    </div>
    )
};

export default BookingDetailSummary;