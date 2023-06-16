import {useQuery} from "@tanstack/react-query";
import DoctorsRepository from "@/repositories/DoctorsRepository.js";

export default function DoctorsService() {
    const {getDoctors} = DoctorsRepository();

    const {data: dataDoctors, isLoading: isLoadingDoctors} = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getDoctors(),
        refetchOnWindowFocus: false,
    });

    return {
        dataDoctors: dataDoctors?.data,
        isLoadingDoctors
    };
}