import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

const POPUP_TITLE = "//h2[contains(text(),'Create new restaurant')]"

export class RestaurantPage extends BasePage {

    private createNewResturantButton: Locator
    private popupTitle: Locator
    private idField: Locator
    private nameField: Locator
    private addressField: Locator
    private scoreField: Locator
    private submitButton: Locator
    private okButton: Locator
    private deleteButton: Locator
    private createdPopupTitle: Locator
    private deletedPopupTitle: Locator
    private restaurantsTable: Locator



    constructor(page: Page) {
        super(page);
        this.createNewResturantButton = this.page.locator("//button[contains(text(),'Create new')]")
        this.popupTitle = this.page.locator("//h2[contains(text(),'Create new restaurant')]")
        this.idField = this.page.locator("input[id='id']")
        this.nameField = this.page.locator("input[id='name']")
        this.addressField = this.page.locator("input[id='address']")
        this.scoreField = this.page.locator("input[id='score']")
        this.submitButton = this.page.locator("//button[contains(text(),'Submit')]")
        this.okButton = this.page.locator("//button[contains(text(),'OK')]")
        this.deleteButton = this.page.locator("//button[contains(text(),'X')]")
        this.createdPopupTitle = this.page.locator("//h2[contains(text(),'Created!')]")
        this.deletedPopupTitle = this.page.locator("//h2[contains(text(),'Deleted!')]")
        this.restaurantsTable = this.page.locator('table.table.table-striped').locator('tbody')
    }

    clickreateNewRestaurantButtone = async () => {
        await this.createNewResturantButton.click()
    }

    returnPopupTitle = async () => {
        return this.popupTitle.isVisible()
    }

    insertDataToIdField = async (data: number) => {
        await this.idField.clear()
        await this.idField.type(String(data))
    }

    insertDataToNameField = async (data: string) => {
        await this.nameField.clear()
        await this.nameField.fill(data)
    }

    insertDataToAddressField = async (data: string) => {
        await this.addressField.clear()
        await this.addressField.fill(data)
    }

    insertDataToScoreField = async (data: number) => {
        await this.scoreField.clear()
        await this.scoreField.type(String(data))
    }

    clickOnSubmitButton = async () => {
        await this.submitButton.click()
    }

    clickOnOKButton = async () => {
        await this.okButton.click()
    }

    clickOnDeleteButton = async () => {
        await this.deleteButton.click()
    }

    returnCreatedPopupTitle = async () => {
        return this.createdPopupTitle.isVisible()
    }

    returnDeletedPopupTitle = async () => {
        return this.deletedPopupTitle.isVisible()
    }

    returnNumberOfrowsInrestaurantsTable = async () => {
        return this.restaurantsTable.count()
    }

}