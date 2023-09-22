import axios from "axios";

const BASE_URL = "https://api.api-ninjas.com";

class MklNutritionApi {
    static async request(endpoint, data = {}, method="get") {
        console.debug("API Call:", endpoint, data, method);

        // Passing API key in the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {'X-Api-Key': 'nb5m6n6nlFkPcaBVfXgDS6uBYDJXYlSQw2mf39eg'};
        const params = (method === "get") ? data : {};
        
        try {
            return (await axios({url, method, params, headers})).data;
        } catch (err) {
            console.error("API ERROR")
        }
    }

    // Gets nutrition data on a food
    static async getNutritionData(data) {
        let nutritionData = await this.request(`/v1/nutrition?query=${data}`)
        return nutritionData;
    }
}

export default MklNutritionApi;