import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";



const myHotels = () => {
    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {}
    });

    if (!hotelData) {
        return <span className="font-headers">No Hotels Found</span>;
    }

    return(
        <div className="space-y-5">
            <span>
                <h1 className="text-3xl font-bold text-center font-headers">My Hotels</h1>
                <Link to="/add-hotel" className="
                flex 
                justify-center
                align-center
                bg-marigold 
                text-black 
                text-xl 
                w-[200px] 
                rounded-md 
                font-bold 
                m-3 
                p-2 
                hover:bg-shadow 
                hover:text-white">
                Add Hotel</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                { hotelData.map((hotel) => (
                    <div className="flex flex-col justify-between bg-seafoam border border-slate-300 rounded-lg p-8 gap-5">
                        <h2 className="text-2xl font-bold font-headers"> {hotel.name}</h2>
                        <div className="whitespace-pre-line font-body">{hotel.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-1"/>
                                {hotel.city}, {hotel.country}
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-1"/>
                                {hotel.type}
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1"/>
                                ${hotel.pricePerNight} per night
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiHotel className="mr-1"/>
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1"/>
                                {hotel.starRating} Star Rating
                            </div>
                        </div>

                        <span className="flex justify-end">
                            <Link to={`/edit-hotel/${hotel._id}`} className="flex bg-dgreen text-white text-xl font-bold p-2 hover:bg-shadow">
                            View Details
                            </Link>
                        </span>

                    </div>
                ))}
            </div>
        </div>
    )
};

export default myHotels;