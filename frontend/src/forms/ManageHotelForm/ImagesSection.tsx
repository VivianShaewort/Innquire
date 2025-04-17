import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const ImagesSection = () => {
    const { 
        register, 
        formState: { errors },
        watch,
        setValue, 
    } = useFormContext<HotelFormData>();

    const existingImageURLS = watch("imageURLS");

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
         imageURL: string
        ) => {
            event.preventDefault();
            setValue("imageURLS", existingImageURLS.filter((url)=> url !== imageURL));


    };

    return(
        <div className="md:p-15">
        <span>
        <h2 className="text-2xl font-bold font-headers mb-3">
            Images
        </h2>
        <p className="text-xs font-normal font-body mb-3">Can not accept files that are larger than 5 mb.</p>
        </span>

        <div className="border rounded p-4 flex flex-col gap-4">
            {existingImageURLS && (
                <div className="grid grid-cols-6 gap-4">
                    {existingImageURLS.map((url)=>(
                        <div className="relative group">
                            <img src={url} className="min-h-full object-cover"/>
                            <button 
                            onClick={(event) => handleDelete(event, url)}
                            className="
                            absolute 
                            inset-0 
                            flex 
                            items-center 
                            justify-center 
                            bg-black 
                            bg-opacity-50 
                            opacity-0 
                            group-hover:opacity-100 
                            text-white">
                                Delete
                                </button>
                        </div>
                    ))}
                </div>
            )}

            <input 
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register("imageFiles", {
                validate: (imageFiles) => {
                    const totalLength = imageFiles.length + (existingImageURLS?.length || 0);
                    

                    if(totalLength === 0) {
                     return "Please add at least one image.";
                    }

                    if(totalLength > 6) {
                        return "Total number of images cannot exceed 6."
                    }

                    return true;

                }
            })}/>
        </div>

        {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
    )
};

export default ImagesSection;