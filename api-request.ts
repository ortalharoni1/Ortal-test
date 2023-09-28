import { request } from "@playwright/test"

const postRequest = async (url: string, data?: any) => {
    const context = await request.newContext()
    return await context.post(url, {
        data: data ? data : ''
    })
}

const getRequest = async (url: string, param?: any) => {
    const context = await request.newContext()
    return await context.post(url, {
        params: {
            'id': param,
        }
    })
}

const getRequestAllRestaurants = async (url: string) => {
    const context = await request.newContext();
    return await context.get(url);
}

const patchRequest = async (url: string, data?: string) => {
    const context = await request.newContext();
    return await context.patch(url, {
        data: {
            "address": data,
        }
    })
}

const deleteRequest = async (url: string) => {
    const context = await request.newContext();
    return await context.delete(url);
}


export { postRequest, getRequest, patchRequest, getRequestAllRestaurants, deleteRequest }