import pb from "@/lib/pb";

const useLogout = () => pb.authStore.clear;

export default useLogout;