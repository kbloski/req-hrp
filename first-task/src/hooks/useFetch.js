import { ref } from "vue";

export function useFetch( url , fetchOptions = {
    method: 'GET',
    body: undefined,
    headers: {},
}){

    const error = ref(null);
    const loading = ref(false);
    const data = ref(null)

    async function doFetch(){
        loading.value = true;
        error.value = false;

        try {
            const response = await fetch(url, fetchOptions);

            if (!response.ok) throw new Error("HTTP ERROR: " + response.statusText);
            
            // Try catch data
            try {
                data.value = response.json()
            } catch (err){}
        } catch (err){
            error.value = err.message
        } finally {
            loading.value = false;
        }
    }

    doFetch()

    return {
        data, 
        error,
        loading
    }
}