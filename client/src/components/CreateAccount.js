import { useState, useContext } from 'react'
import login from '../api/login'
import { AccountContext } from '../context/accountContext'
import { toast } from 'react-toastify'
import createaccount from '../api/createaccount'

export default function CreateAccount() {
  const { setAccount } = useContext(AccountContext)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newUser.name === '') {
      return toast.error('Please enter a name')
    }
    if (newUser.email === '') {
      return toast.error('Please enter an email')
    }
    if (newUser.password !== newUser.passwordConfirm) {
      setNewUser({
        ...newUser,
        password: '',
        passwordConfirm: '',
      })
      return toast.error('Passwords do not match')
    }
    if (newUser.password.length < 8) {
      setNewUser({
        ...newUser,
        password: '',
        passwordConfirm: '',
      })
      return toast.error('Password must be at least 8 characters')
    }
    const result = await createaccount(newUser)
    if (result === 'Email already exists') {
      setNewUser({
        ...newUser,
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      })
      return toast.error('Email already exists. Please try to login.')
    }
    if (result) {
      setNewUser({
        ...newUser,
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      })
      toast.success('Account created. Please wait while we log you in.')
      setTimeout(async () => {
        const token = await login(newUser.email, newUser.password, setAccount)
        if (token) {
          window.location.href = '/accountsummary'
        }
      }, 4000)
    }
  }

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Create an account
              </h2>
            </div>

            <div className='mt-10'>
              <div>
                <form
                  action='#'
                  method='POST'
                  className='space-y-6'
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Name
                    </label>
                    <div className='mt-2'>
                      <input
                        id='name'
                        name='name'
                        type='text'
                        onChange={handleChange}
                        value={newUser.name}
                        required
                        className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email address
                    </label>
                    <div className='mt-2'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        onChange={handleChange}
                        value={newUser.email}
                        required
                        className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Password
                    </label>
                    <div className='mt-2'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        onChange={handleChange}
                        value={newUser.password}
                        required
                        className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Confirm Password
                    </label>
                    <div className='mt-2'>
                      <input
                        id='passwordConfirm'
                        name='passwordConfirm'
                        type='password'
                        onChange={handleChange}
                        value={newUser.passwordConfirm}
                        required
                        className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
