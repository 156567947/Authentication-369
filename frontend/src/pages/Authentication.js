import AuthForm from '../components/AuthForm';
import {json,redirect} from 'react-router-dom'
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  console.log(request,'request')
  const searchParams=new URL(request.url).searchParams;
  const mode=searchParams.get('mode') || 'login';
  if(mode!=='login'||mode!=='signup'){
    json({message:'Mode is invalid'},{status:422});
  }
  const formData = await request.formData();
  const authData = Object.fromEntries(formData);
  const data={
    email:authData.email,
    password:authData.password
  }
  const res=await fetch('http://localhost:8080/'+mode,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
  if(res.status===422||res.status===401){
    return res
  }
  if(!res.ok){
    throw json({message:'Could not authenticate you'},{status:500})
  }
  const resData=await res.json();
  const token=resData.token;
  localStorage.setItem('token',token);
  return redirect('/')
}