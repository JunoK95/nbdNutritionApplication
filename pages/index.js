import App from "../components/App.js"
import { Provider } from "../context.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function Index(){
    return (
        
        <Provider>
            <App />
        </Provider>
    )
}

export default Index