import { useEffect } from "react";
import { useKunji } from "../hooks/useKunji";
import "./style.css";

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
        <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', background: (loading ? '#f4d03f' : user ? '#229954' : '#e74c3c')}}>
            {
                loading ? 
                    <div>
                        <h1>{loading && "Authenticating..."}</h1>
                    </div>
                : 
                (user ? 
                    <div>
                        <h2>Hello { user.fullName }!</h2>
                        <button onClick={() => logout()}>Logout</button>    
                    </div>
                     : 
                    <div> 
                        <h2>Not LoggedIn</h2>
                        <button onClick={() => initiateAuthentication()}>Login Button</button>    
                    </div>
                     )
            }
        </div>
    );
}

export default Main;