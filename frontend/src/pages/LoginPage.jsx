import loginImg from '../assets/images/login.jpg';
import { useState } from 'react';

const LoginPage = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const handleSubmit =(e) =>{
        e.preventDefault();
    }

  return (
    <div className='h-screen lg:grid lg:grid-cols-2 p-4 flex flex-col'>
        <img className='h-[180px] w-full lg:h-full lg:col-span-1 object-cover rounded-[24px]' src={loginImg} alt='flower background'/>
        <div className='flex lg:flex-col lg:relative justify-center lg:items-center h-screen '>
            <div className='w-[350px] h-[400px] lg:h-[500px] flex flex-col justify-between m-4'>
                <div className='flex flex-col gap-3'>
                <h1 className='lg:text-4xl text-2xl'>Welcome back 👋</h1>
                <p className='lg:text-[20px]'>Today is a new day! It's your day. You shape it. Sign in to start managing your recipes.</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                <input className=' bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2' type='text' id='email' value={email} placeholder='user@email.com'
                onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col'>
                   <label htmlFor="password">Password</label>
                <input className=' bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2'  type='password' id='password' value={password} placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}/> 
                </div>
                
                <button className='bg-[#FF7518] py-2 rounded-xl text-white'>Sign in</button>
            </form>
            <p className='mx-auto'>Don't have an account? 
               <span className='text-blue-800'> Sign up</span></p>
            </div>
            <p className='absolute bottom-0 text-[#959CB6] mx-auto my-4 text-sm'>© 2025 All rights reserved.</p>
        </div>
    </div>
  )
}

export default LoginPage