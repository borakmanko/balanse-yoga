import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Loader } from 'lucide-react';
import { getUserProfile } from '../../../services/database';
import ProfileSetup from '../profile/ProfileSetup';
import { UserProfile } from '../../../types/user';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [_user, setUser] = useState<any>(null);
    const [_userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [needsProfileSetup, setNeedsProfileSetup] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    // Check if user has a profile
                    const profile = await getUserProfile(currentUser.uid);
                    if (profile) {
                        setUserProfile(profile);
                        setNeedsProfileSetup(false);
                    } else {
                        setNeedsProfileSetup(true);
                    }
                } catch (error) {
                    console.error('Error checking user profile:', error);
                    setNeedsProfileSetup(true);
                }
                setLoading(false);
            } else {
                console.log('unauthorized');
                setLoading(false);
                window.location.href = '/login';
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const handleProfileComplete = (profile: UserProfile) => {
        setUserProfile(profile);
        setNeedsProfileSetup(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading your yoga journey...</p>
                </div>
            </div>
        );
    }

    if (needsProfileSetup) {
        return <ProfileSetup onComplete={handleProfileComplete} />;
    }

    return <div>{children}</div>;
}

export default AuthRoute;