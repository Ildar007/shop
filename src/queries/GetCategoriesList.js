import { client, Query, Field} from "@tilework/opus";

const getCategoriesList = async () => {

    client.setEndpoint("http://localhost:4000/");

    const queryCategoriesList = new Query("category", true)    
    .addField(new Field("products", true).addFieldList(["category"]))    

    return await client.post(queryCategoriesList)
  }

export default getCategoriesList