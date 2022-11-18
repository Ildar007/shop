import { client, Query} from "@tilework/opus";

const checkForInStock = async (name) => {

  client.setEndpoint("http://localhost:4000/");

  const queryInStock = new Query("product", true)  
  .addArgument("id", "String!", name)   
  .addField("inStock")    

    return await client.post(queryInStock)
  }

export default checkForInStock