import FoodSearcher from "./foodsearcher/FoodSearcher.js"
import NutritionDisplay from "./NutritionDisplay.js"

class App extends React.Component{

    render(){
        return (
            <div>
                <NutritionDisplay />
                <FoodSearcher />              
            </div>
        )
    }
}

export default App