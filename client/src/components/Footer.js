import { NavLink } from 'react-router-dom'

const navigation = {
  solutions: [
    { name: 'Checkings', href: '#' },
    { name: 'Savings', href: '#' },
    { name: 'CDs', href: '#' },
    { name: 'Investing', href: '#' },
  ],
  support: [
    { name: 'Insurance Claim', href: '#' },
    { name: 'Fraud Alert', href: '#' },
    { name: 'Financial Advice', href: '#' },
  ],
  company: [
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className='bg-gray-900' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='flex items-center'>
            <p className='text-sm leading-6 text-gray-300'>
              We'll invest your money in a diversified portfolio of stocks and
              bonds that aims to maximize your returns.
            </p>
          </div>
          <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Solutions
                </h3>
                <ul className='mt-6 space-y-4'>
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white'
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Support
                </h3>
                <ul className='mt-6 space-y-4'>
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white'
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Company
                </h3>
                <ul className='mt-6 space-y-4'>
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white'
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Legal
                </h3>
                <ul className='mt-6 space-y-4'>
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24'>
          <p className='text-xs leading-5 text-gray-400'>
            &copy; 2023 Bank Bank, Inc. All rights reserved. Not a member of
            F.D.I.C.
          </p>
        </div>
      </div>
    </footer>
  )
}
