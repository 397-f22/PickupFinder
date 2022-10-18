import { useProfile } from "../../utilities/useProfile";

const UserPage = () => {
    const [profile, profileError, profileLoading] = useProfile();

    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;

    return (
        profile.user && <h1>Hello, {profile.user.displayName}</h1>
    );
};

export default UserPage; 