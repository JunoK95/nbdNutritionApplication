import App from "../components/App.js"
import { Provider } from "../context.js";

function Index(){
    return (
        <Provider>
            <App />
        </Provider>
    )
}

export default Index