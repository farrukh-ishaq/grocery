import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
    baseUrl: "http://localhost:9000",
    maxRetries: 3,
    publishableApiKey: "pk_89e8f3bde7a55c29adaadfea682fe8aafc8d9b129508124722d7839602493910"
})

export default medusa;
