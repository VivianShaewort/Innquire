import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string;
};

const Register = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { showToast } = useAppContext();

    const { register, watch, handleSubmit, formState:{errors} } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message:"Registration successful!", type:"SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },

        onError: (error: Error) => {
            showToast({ message:error.message, type:"ERROR"});

        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return <form className="flex flex-col p-15 gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold font-headers text-center">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
         <label className="text-gray-800 font-bold text-sm flex-1">
            First Name
            <input className=
            "border rounded w-full py-1 px-2 font-normal" {...register("firstName", { required: "This field is required."})}>
            </input>
            {errors.firstName && (
                <span className="text-yellow-500">{errors.firstName.message}</span>
            )}
         </label>
         <label className="text-gray-800 font-bold text-sm flex-1">
           Last Name
            <input className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required."})} ></input>
              {errors.lastName && (
                <span className="text-yellow-500">{errors.lastName.message}</span>
            )}
         </label>

        </div>


        <label className="text-gray-800 font-bold text-sm flex-1">
           Email
            <input type="email" className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required."})} ></input>
              {errors.email && (
                <span className="text-yellow-500">{errors.email.message}</span>
            )}
         </label>

         <label className="text-gray-800 font-bold text-sm flex-1">
           Password
            <input type="password" 
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", { required: "This field is required.", minLength: {
                value:8,
                message:"Password must be at least 8 characters."
            }})} ></input>
              {errors.password && (
                <span className="text-yellow-500">{errors.password.message}</span>
            )}
         </label>

         <label className="text-gray-800 font-bold text-sm flex-1">
           Confirm Password
            <input 
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
                validate:(val) => {
                 if(!val) {
                    return "This field is required."
                 } else if (watch ("password") !== val) {
                    return "Your passwords do not match."
                 }
                }
            })} ></input>
              {errors.confirmPassword && (
                <span className="text-yellow-500">{errors.confirmPassword.message}</span>
            )}
         </label>
         <span>
            <button type="submit" className=" w-[200px] bg-dgreen hover:bg-shadow font-bold text-white hover:text-black text-xl p-2">Sign Up</button>
         </span>
    </form>;
};

export default Register;