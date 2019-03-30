import FoodSearcher from "./FoodSearcher.js"
import NutritionDisplay from "./NutritionDisplay.js"

class App extends React.Component{

    render(){
        return (
            <div>
                <NutritionDisplay />
                <FoodSearcher triggerUpdate={this.updateFood}/>              
            </div>
        )
    }
}

export default App