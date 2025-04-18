import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import  SearchResultCard  from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import TypeFilter from "../components/TypeFilter";
import FacilityFilter from "../components/FacilityFilter";
import PriceFilter from "../components/PriceFilter";



const Search = () => {
    const search = useSearchContext();

    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,



    };

    const { data: hotelData} = useQuery(["searchHotels", searchParams], () => 
        apiClient.searchHotels(searchParams));

    const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStars((prevStars)=>
        event.target.checked ?
        [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating))

    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const type = event.target.value;

        setSelectedTypes((prevTypes)=>
        event.target.checked ?
        [...prevTypes, type]
        : prevTypes.filter((type) => type !== type))

    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;

        setSelectedFacilities((prevFacilities)=>
        event.target.checked ?
        [...prevFacilities, facility]
        : prevFacilities.filter((facility) => facility !== facility))

    };


    

  

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10 bg-seafoam">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold font-headers border-b border-slate-300 pb-5">
                     Filter by:
                    </h3>
                    <StarRatingFilter 
                    selectedStars={selectedStars}
                    onChange={handleStarChange}
                    />

                    <TypeFilter 
                    selectedTypes={selectedTypes}
                    onChange={handleTypeChange}
                    />

                    <FacilityFilter 
                    selectedFacilities={selectedFacilities}
                    onChange={handleFacilityChange}
                    />

                    <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value?: number) => setSelectedPrice(value)} 
                    />
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold font-body">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? `in ${search.destination}` : ""}
                        
                    </span>
                    <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                    className="p-2 rounded border-md"
                    >
                     <option value="">Sort By</option>
                     <option value="starRating">Star Rating</option>
                     <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                     <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                     

                    </select>
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel}/>
                    ))}
                    <div>
                        <Pagination 
                        page={hotelData?.pagination.page || 1} 
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}/>
                    </div>
            </div>
        </div>
    );
};

export default Search;