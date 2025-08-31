import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
    baseUrl: "http://localhost:9000",
    maxRetries: 3,
    publishableApiKey: "pk_0bd3a1213f63ccf2ada2b5b6754e413a2ef95b786b5f6a5c8174554464e33409"
})

export default medusa
