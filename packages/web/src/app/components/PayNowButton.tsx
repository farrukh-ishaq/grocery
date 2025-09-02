'use client'

import { useRouter } from "next/navigation"

export default function PayNowButton() {
    const router = useRouter()

    const handlePayNow = () => {
        router.push("/checkout") // create a separate checkout page
    }

    return (
        <button
            onClick={handlePayNow}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
            Pay Now
        </button>
    )
}
