import App from "../components/App.js"
import { Provider } from "../context.js";
import 'bootstrap/dist/css/bootstrap.min.css';
//FontAwesomeIcons implementation
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)
library.add(faSearch)

function Index(){
    return (
        
        <Provider>
            <App />
        </Provider>
    )
}

export default Index