import {useLocation} from 'react-router-dom';
import MakerPage from './makerHomePage';
import CustomerPage from './customerHomePage';

function Home(){
    const location = useLocation();
    const state = location.state

    return(
        <div className="auth">
            {state.isMaker === true ? <MakerPage uid = {state.uid}/> : <CustomerPage uid={state.uid} profile={state.profile}/>}
        </div>
    )
}

export default Home

