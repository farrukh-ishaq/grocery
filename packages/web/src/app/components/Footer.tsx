export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                            <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
                            <li><a href="#" className="hover:text-gray-900">Returns</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                            <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                            <li><a href="#" className="hover:text-gray-900">Cookies</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Email: support@grocerstore.com</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Hours: 24/7</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} GrocerStore. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
