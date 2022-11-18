import { client, Query, Field} from "@tilework/opus";

const getCurrencies = async () => {

    client.setEndpoint("http://localhost:4000/");

    const queryCurrencies = new Query("currencies", true)     
    .addFieldList(["label", "symbol"])
    return await client.post(queryCurrencies)
  }

export default getCurrencies