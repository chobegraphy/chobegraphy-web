import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../../../Provider/AuthProvider";

const CheckTeamMember = () => {
    const router = useRouter();
    const { user } = useAuth()

    useEffect(() => {
        if (!user?.teamMember) {
            return router.push('/')
        }
    }, [user])

    return (
        <>

        </>
    );

};

export default CheckTeamMember;