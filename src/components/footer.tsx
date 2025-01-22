


const Footer: React.FC = () => {

    return (
        <footer className="border-t mt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <p className="text-sm text-gray-600 mb-2">685 Market Street</p>
              <p className="text-sm text-gray-600 mb-2">Las Vegas, LA 95820,</p>
              <p className="text-sm text-gray-600 mb-2">United States.</p>
              <p className="text-sm text-gray-600">example@domain.com</p>
              <p className="text-sm text-gray-600">(+01) 850-315-5862</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                {['My Account', 'Login', 'Cart', 'Wishlist', 'Shop'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-2">
                {['About Us', 'Privacy Policy', 'Terms Of Use', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Download App</h3>
              <p className="text-sm text-gray-600 mb-4">Save $3 With App & New User only</p>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer