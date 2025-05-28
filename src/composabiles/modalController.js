import { ref } from "vue"

function useModalController(){
    const isModalActive = ref(false)
    const toggleModalVisibility = function(){
        if(isModalActive.value){
            isModalActive.value = false
            return false
          }else{
            isModalActive.value = true
            return true
          }
    }
    const openModal = function(){
      if(isModalActive.value === false){
        toggleModalVisibility()
      }
    }
    const closeModal = function(){
      if(isModalActive.value === true){
        toggleModalVisibility()
      }
    }
    return {toggleModalVisibility,isModalActive,openModal,closeModal}
}

export default useModalController