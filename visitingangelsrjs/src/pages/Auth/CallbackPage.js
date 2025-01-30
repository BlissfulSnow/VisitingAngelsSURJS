import { useAuth0 } from "@auth0/auth0-react";

// moved to home.js 
function CallbackPage() {
    const { isLoading, error } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>Successfully authenticated!</div>;
}

export default CallbackPage;