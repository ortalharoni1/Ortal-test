import { test, expect } from '@playwright/test';
import { BrowseWrapper } from '../infra/browser/browser';
import restaurantsAPI from '../logic/api/restaurantsAPI';
import { generateRandomString, getRandomInt } from '../infra/utils';

test.describe('Base API test', () => {

    let browser: BrowseWrapper

    test.beforeAll(async () => {
        browser = new BrowseWrapper()
    })

    test.afterEach(async () => {
        await browser.closeContext()
    })

    test.afterAll(async () => {
        await browser.close()
    })

    test.skip('Create restaurants via api', async () => {
        //Arrange
        const myNewRest = { address: generateRandomString(10), id: getRandomInt(999, 100), name: generateRandomString(5), score: getRandomInt(99, 1) }
        await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(myNewRest.id);

        //Assert
        expect(getByIdResponse.status()).toEqual(201)
        expect(getByIdResponse.ok).toBeTruthy
    })

    test.skip('Edit restaurant and delete restaurant via api', async () => {
        //Arrange
        //Create new restaurant via api          
        const restaurant = { address: generateRandomString(20), id: getRandomInt(999, 100), name: generateRandomString(5), score: getRandomInt(99, 1) }
        await restaurantsAPI.createRestaurant(restaurant);

        //Act - Edit the restaurant address
        const newAddress = generateRandomString(20)
        await restaurantsAPI.editRestaurant(restaurant.id, newAddress);

        //Get all restaurants via api
        const getAllRestaurantsResponse = await restaurantsAPI.getAllRestaurants();
        const jsonResponse = await getAllRestaurantsResponse.json();

        //In the json response, search the required restaurant according the id
        const data = jsonResponse.data.find((item: { id: number; }) => item.id === restaurant.id);

        //Assert - verify the address was changed
        expect(getAllRestaurantsResponse.status()).toEqual(200)
        expect(getAllRestaurantsResponse.ok).toBeTruthy
        expect(data.address).toEqual(newAddress);

        //Act - Delete the restaurant
        const deleteResponse = await restaurantsAPI.deleteRestaurant(restaurant.id);

        const getAllRestaurants = await restaurantsAPI.getAllRestaurants();
        const jsonResponseGetAllRes = await getAllRestaurants.json();

        //In the json response, verify the required restaurant isn't exist
        const doesNotExist = jsonResponseGetAllRes.data.every((item: { id: number; }) => item.id !== restaurant.id);

        //Assert 
        expect(deleteResponse.status()).toEqual(200)
        expect(deleteResponse.ok).toBeTruthy
        expect(doesNotExist).toBeTruthy
    })

    test.skip('Delete restaurant that is not exist', async () => {
        let randomId = getRandomInt(99999, 10000);
        let getAllRestaurants = await restaurantsAPI.getAllRestaurants();
        let jsonResponseGetAllRes = await getAllRestaurants.json();

        //In the json response, verify the required restaurant isn't exist
        const doesNotExist = jsonResponseGetAllRes.data.every((item: { id: number; }) => item.id !== randomId);

        //Act - if the restaurant id doesn't exist - try to delete it
        if (doesNotExist) {
            const deleteResponse = await restaurantsAPI.deleteRestaurant(12345678912345);

            //Assert - verify we get the correct response
            expect(deleteResponse.status()).toEqual(404)
            expect(deleteResponse.ok).toBeFalsy
        }
    })

})