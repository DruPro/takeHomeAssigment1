import { ref } from "vue";

function useFetch(url) {
    const isLoading = ref(true)
    const data = ref(null)
    const error = ref(null)
    
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            data.value = json
        })
        .catch((err) => {
            error.value = err
        })
        .finally(() => {
            isLoading.value = false
        })

    return { isLoading, data, error }
}

export default useFetch
