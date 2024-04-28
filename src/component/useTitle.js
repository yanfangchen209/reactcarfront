import { useEffect } from "react";

//custom hook
function useTitle(title){
    useEffect(()=>{document.title = title;}, [title]);
}

export default useTitle

