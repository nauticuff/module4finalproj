import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className='h-screen bg-yellow-200 flex justify-center items-center'>
      <form className='flex flex-col border-2 p-4 border-gray-700 bg-slate-400 rounded-md'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button className='p-3 rounded border-none bg-blue-700 my-2' formAction={login}>Log in</button>
        <button className='p-3 rounded border-none bg-blue-700 ' formAction={signup}>Sign up</button>
      </form>
    </div>
  )
}