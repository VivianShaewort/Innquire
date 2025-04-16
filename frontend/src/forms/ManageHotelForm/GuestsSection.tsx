import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const { register, formState: { errors }} = useFormContext<HotelFormData>(); 

    return (
        <div className="md:p-15">
            <h2 className="text-2xl font-bold font-headers mb-3">
                Guests
            </h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-seafoam">
                <label className="text-sm font-semibold text-gray-700">
                    Adults
                    <input className="rounded border w-full py-2 px-3 font-normal" 
                    type="number"
                    min={1}
                    {...register("adultCount", {
                        required: "This field is required."
                    })}
                    />
                     {errors.adultCount?.message && (
                    <span className="font-bold text-red-500 text-sm">
                        {errors.adultCount?.message}
                    </span>
                )}
                </label>
               
                <label className="text-sm font-semibold text-gray-700">
                    Children
                    <input className="rounded border w-full py-2 px-3 font-normal" 
                    type="number"
                    min={0}
                    {...register("childCount", {
                        required: "This field is required."
                    })}
                    />
                     {errors.childCount?.message && (
                    <span className="font-bold text-red-500 text-sm">
                        {errors.childCount?.message}
                    </span>
                )}
                </label>

            </div>
        </div>
    )

    
};

export default GuestsSection;