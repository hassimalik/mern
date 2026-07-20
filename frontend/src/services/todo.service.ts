const API_URL = ""

export async function getTodos(){
    const response = await fetch(API_URL)

    if(!response.ok){
        throw new Error("Failed to fetch todos")
    }
    return response.json();
}