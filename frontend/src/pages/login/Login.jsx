import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100'>
 				<h1 className='text-3xl font-semibold text-center text-gray-300 mb-5'>
 					Login
 					<span className='text-blue-500'> ChatMe</span>
 				</h1>
        

 				<form>
					<div>
 						<label className='label'>
 							<span className='text-base label-text'>Username</span>
 						</label>
 						<input type='text' placeholder='Enter username' className='w-full input input-primary h-10 py-3 ' />
 					</div>

					<div>
 						<label className='label'>
							<span className='text-base label-text'>Password</span>
 						</label>
 						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-primary h-10  outline-none'
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
					<button className="btn btn-block btn-primary">Login</button>
					</div>
				</form>
			</div>
		</div>
  )
}

export default Login