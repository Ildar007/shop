import { client, Query, Field} from "@tilework/opus";

const getCategory = async (category) => {

  client.setEndpoint("http://localhost:4000/");

  const queryCategory = new Query("category", true)
    .addArgument("input", "CategoryInput", { title : category})
    .addField(new Field("products", true).addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"]))    

    return await client.post(queryCategory)
  }

export default getCategory
