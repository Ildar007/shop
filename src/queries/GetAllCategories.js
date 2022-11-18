import { client, Query, Field} from "@tilework/opus";

const getAllCategories = async () => {

  client.setEndpoint("http://localhost:4000/");

  const queryAll = new Query("category", true)      
      .addField(new Field("products", true).addFieldList(["id", "name", "brand", "attributes{id, items{value, id}}", "inStock", "gallery", "prices{amount}"]))

      return await client.post(queryAll)
}

export default getAllCategories