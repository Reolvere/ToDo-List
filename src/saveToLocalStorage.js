
export function saveToLocalStorage(obj){

    // get data from the local storage 
    let existingData = JSON.parse(localStorage.getItem("myLocalStore")) || [];

    // convert existing data in the array
    existingData = [existingData]

    // Add the new item to the existing data
    existingData.push(obj);

    // Save the updated data back to localStorage
    localStorage.setItem("myLocalStore", JSON.stringify(existingData));

}