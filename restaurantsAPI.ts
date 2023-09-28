
import jsonConfig from '../../../config.json';
import { getRequest, postRequest, patchRequest, getRequestAllRestaurants, deleteRequest } from '../../infra/rest/api-request';
import { Restaurant } from './API-Request/get-restaurants-request';

const baseUrl = jsonConfig.baseUrl + '/';

const getRestaurants = async () => {
    return getRequest(baseUrl + 'restaurants');
}

const getAllRestaurants = async () => {
    return getRequestAllRestaurants(baseUrl + 'restaurants');
}

const resetServer = async () => {
    return postRequest(baseUrl + 'reset');

}

const createRestaurant = async (body: Restaurant) => {
    return postRequest(baseUrl + 'restaurant', body)
}

const getRestaurantById = async (id: number) => {
    return getRequest(baseUrl + 'restaurant', id);

}

const editRestaurant = async (id: number, body: string) => {
    return patchRequest(baseUrl + 'restaurant/' + id, body)
}

const deleteRestaurant = async (id: number) => {
    return deleteRequest(baseUrl + 'restaurant/' + id)
}


export default { getRestaurants, resetServer, createRestaurant, getRestaurantById, editRestaurant, getAllRestaurants, deleteRestaurant }