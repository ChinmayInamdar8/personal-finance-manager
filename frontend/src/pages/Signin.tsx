import { useState } from "react";
import { ChangeLoginPage } from "../components/ChangeLoginPage";
import { InputBox } from "../components/InputBox";
import { SubmitButton } from "../components/SubmitButton";
import { SubTitleComponent } from "../components/SubTitleComponent";
import { TitleComponent } from "../components/TitleComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";


interface result{
  message:string,
  token?: string
}

export function Signin(){

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
    return (
        <div className="w-screen h-screen bg-slate-300 flex flex-col justify-center items-center">
          <div className="w-1/3 flex flex-col justify-center items-center bg-white rounded-md shadow-lg">
            <div>
              <div className="mb-6 mt-3">
              <TitleComponent label="Sign In"></TitleComponent>
    
                <SubTitleComponent label="Sign In to access the platform!"></SubTitleComponent>
    
              </div>
    
              <InputBox
                label={"Email"}
                type="text"
                placeholder="JonDoe@gmail.com"
                OnChange={(e) => {
                  console.log(e.target.value);
                  setEmail(e.target.value);
                }}
                ></InputBox>
    
              <InputBox
                label={"Password"}
                type="Password"
                OnChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value);
                }}
              ></InputBox>
    
              <SubmitButton
                label="Sign Up"
                OnClick={() => {
                  console.log("button is clicked");
                  async function CallMe(){
                    try{
                      const response = await axios.post<result>('http://localhost:3000/api/user/signin', {email, password});
    
                    if(response.data.message=="signedup successfully!"){
    
                      if(response.data.token){
                        window.localStorage.setItem("token", response.data.token);
                      }
                      Swal.fire({
                        title: "Signed In successfully!",
                        text: "You are being redirected to dashboard",
                        icon: "success"
                      });
                    }
                    navigate("/dashboard");
    
                    }catch(e:AxiosError){
                      console.log(e);
                      Swal.fire({
                        icon: "error",
                        title: e.response.data.message,
                        text: "Try again!",
                      });
                    }
                  }
    
                  CallMe();
                }}
              ></SubmitButton>
    
              <ChangeLoginPage label="Don't have account? " to="Sign Up" routeLink="/signup"></ChangeLoginPage>
            </div>
          </div>
        </div>
      );
}