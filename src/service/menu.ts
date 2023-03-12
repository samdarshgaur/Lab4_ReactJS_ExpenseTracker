import axios from "axios";
import IDataList from "../model/IDataList";

const getDataFromServer = async () => {
    return axios.get<IDataList[]>("http://localhost:3001/items")
        .then(response => response.data);
};

const pushDataToServer = async (newItemPurchase: Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>(
        "http://localhost:3001/items",
        newItemPurchase,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.data);
};

export {
    getDataFromServer,
    pushDataToServer
}