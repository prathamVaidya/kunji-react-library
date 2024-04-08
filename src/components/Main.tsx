import { useEffect } from "react";
import { useKunji } from "../hooks/useKunji";
// Todo: Flow to initiate Authentication, handle not logged in state
function Main() : JSX.Element {
    const {user, loading, initiateAuthentication, logout, API, oAxios } = useKunji()
    useEffect(() => {
        // API.getUserProfile()
        // oAxios.get("http://localhost:3013/test") // token is included in request
            // console.log("Hey")

            if(loading){
                console.log("State: Loading")
            }
            else{
                if(user){
                    console.log("State: LoggedIn")
                }
                else{
                    console.log("State: Not LoggedIn")
                }
            }
            
    }, [user, loading])
    return (
        <div>
            {loading && "Authenticating..."}
            {
                user ? 
                <div>Hello { user.fullName }
                    <button onClick={() => logout()}>Logout</button>    
                </div> 
                : 
                <div> 
                    <button onClick={() => initiateAuthentication()}>Login Button</button>    
                </div>
            }
        </div>
    );
}

export default Main;