import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../../../Provider/AuthProvider";

const CheckUser = () => {
    const router = useRouter();
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            return router.push('/')
        }
    }, [user])

    return (
        <>

        </>
    );

};

export default CheckUser;