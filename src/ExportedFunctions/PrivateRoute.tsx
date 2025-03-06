

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAuth } from '../../Provider/AuthProvider';


const PrivateRoute = ({ children }: any) => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const Language = useSelector((state: any) => state.Language.value);
    useEffect(() => {
        if (!user) {
            // Save the current route to redirect back to after login

            typeof window !== 'undefined' && localStorage.setItem('redirectUrl', pathname);
            router.push('/signin');  // Redirect to sign in if no user
        }
    }, [user, router]);

    if (!user) {
        return toast.error(
            Language === "EN"
                ? "Download failed! Try again."
                : "ডাউনলোড ব্যর্থ হয়েছে! পুনরায় চেষ্টা করুন."
        );; // Optionally, show a loading spinner or placeholder here
    }

    return children;  // Render the protected component if user exists
};

export default PrivateRoute;
