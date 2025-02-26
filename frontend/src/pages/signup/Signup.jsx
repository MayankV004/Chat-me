import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import { useSignUp } from '../../hooks/useSignUp.js'
function SignUp() {
	const [input , setInput] = useState({
		fullname:"",
		username:"",
		password:"",
		confirmPassword:"",
		gender:""
	})

	const {loading , signup} = useSignUp();

	const handleCheckBox = (gender)=>{
		setInput({...input , gender});
	}

	const handleSubmit =async (e)=>{
		e.preventDefault();
		//SignUP HOOK
		await signup(input)

	}

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
	<div className='w-full p-6 rounded-lg shadow-md bg-gray-400/10 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
 				<h1 className='mb-5 text-3xl font-semibold text-center text-gray-300'>
 					Sign Up <span className='text-blue-500'> ChatMe</span>
 				</h1>

 				<form onSubmit={handleSubmit}>
 					<div>
 						<label className='label p-2'>
 							<span className='text-base label-text'>Full Name</span>
 						</label>
 						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' 
							value={input.fullname}
							onChange={(e)=> setInput({...input, fullname:e.target.value})}
						/>
					</div>

 					<div>
 						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
 						</label>
 						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10'
							value={input.username}
							onChange={(e)=> setInput({...input, username:e.target.value})}
						/>
 					</div>

 					<div>
 						<label className='label p-2'>
 							<span className='text-base label-text'>Password</span>
 						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={input.password}
							onChange={(e)=> setInput({...input, password:e.target.value})}
						/>
					</div>

					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={input.confirmPassword}
							onChange={(e)=> setInput({...input, confirmPassword:e.target.value})}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckBox} selectedGender = {input.gender}/>

					<Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-md mt-2 border border-slate-700'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
  )
}

export default SignUp