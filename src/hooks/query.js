import axios from "axios";


export const query = async (url)=>{
    try{
        const {data:response} = await axios.get(url,{
            headers:{
                
            }
        });
        return response;
    }catch(err){
        console.log(err);
        throw err;
    }

}