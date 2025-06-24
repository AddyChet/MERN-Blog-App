import axiosInstance from "../config/axiosInstance";

export const FilterPagination = async ({createNewArr = false, state, data, page, counteRoute, dataToSend = {}}) => {
    let obj;

    if(state !== null && !createNewArr){
        obj = {...state, results : [...state.results, ...data], page}
    }
    else {
        await axiosInstance.post(counteRoute, dataToSend)
        .then(({data : {totalDocs}})=> {
            obj = {results : data, page : 1, totalDocs}
        })
        .catch((err)=> console.log(err))
    }

    return obj
}