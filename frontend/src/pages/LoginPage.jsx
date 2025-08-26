import loginImg from '../assets/login.jpg';

const LoginPage = () => {
  return (
    <div className='grid grid-cols-2 p-4'>
        <div>
            <h1></h1>
        </div>
        <img className='h-screen w-screen col-span-1 object-cover rounded-[24px]' src={loginImg} alt='flower background'/>
    </div>
  )
}

export default LoginPage