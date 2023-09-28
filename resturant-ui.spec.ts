import { test, expect } from '@playwright/test';
import { BrowseWrapper } from '../infra/browser/browser';
import configJson from '../../config.json'
import { RestaurantPage } from '../logic/page/restaurant-page';
import { generateRandomString, getRandomInt } from '../infra/utils';
import restaurantsAPI from '../logic/api/restaurantsAPI';



test.describe('Base UI Test', () => {

  let browser: BrowseWrapper
  let resturantPage: RestaurantPage;

  test.beforeAll(async () => {
    browser = new BrowseWrapper()
  })
  test.beforeEach(async () => {
    resturantPage = await browser.newPage(RestaurantPage, configJson.baseUiUrl)
  })

  test.afterEach(async () => {
    await browser.closeContext()
  })

  test.afterAll(async () => {
    await browser.close()
  })

  //gotech test
  test.skip('Validate "Create new Restaurant Popup" opened', async () => {
    await resturantPage.clickreateNewRestaurantButtone()
    await expect(resturantPage.returnPopupTitle).toBeTruthy
  })

  test('Create and delete restaurant via UI', async () => {
    //Create new restaurant

    await resturantPage.clickreateNewRestaurantButtone()
    await resturantPage.insertDataToIdField(getRandomInt(999, 100))
    await resturantPage.insertDataToNameField(generateRandomString(10))
    await resturantPage.insertDataToAddressField(generateRandomString(10))
    await resturantPage.insertDataToScoreField(getRandomInt(99, 1))
    await resturantPage.clickOnSubmitButton()

    //Verify created popup window appears
    await expect(resturantPage.returnCreatedPopupTitle).toBeTruthy
    await resturantPage.clickOnOKButton()

    //Delete the restaurant
    await resturantPage.clickOnDeleteButton()
    await resturantPage.returnDeletedPopupTitle()
    await resturantPage.clickOnOKButton()

    //Assert - verify number of rows in the table in UI is 0
    let numberOfRows = await resturantPage.returnNumberOfrowsInrestaurantsTable
    await expect(numberOfRows).toBe(0)

    //Get all restaurants via api
    const getAllRestaurantsResponse = await restaurantsAPI.getAllRestaurants();
    const jsonResponse = await getAllRestaurantsResponse.json();
    const count = jsonResponse.data.length

    //Assert - verify number of rows in API is 0
    await expect(count).toBe(0)
  })
})