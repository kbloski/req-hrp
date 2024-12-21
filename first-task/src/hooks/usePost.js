import { reactive, ref } from "vue";

export function usePost(
  url = null,
  postOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }
) {
  const options = reactive(postOptions);
  const fullUrl = ref(url);

  const error = ref(null);
  const loading = ref(false);
  const data = ref(null);
  const isOk = ref(null); 

  async function postData(body) {
    loading.value = true;
    error.value = null;
    data.value = null;

    try {
      const response = await fetch(fullUrl.value, {
        method: "POST", 
        body: JSON.stringify(body), 
        ...options,
      });

      if (!response.ok) throw new Error("HTTP ERROR: " + response.statusText);

      isOk.value = true; 

      try {
          data.value = await response.json();
      } catch (err){}
    } catch (err) {
      error.value = err.message;
      isOk.value = false; 
    } finally {
      loading.value = false; 
    }
  }

  return {
    data,
    error,
    loading,
    isOk, 
    postData,
  };
}
