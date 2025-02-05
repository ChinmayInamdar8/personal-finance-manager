import { useState } from "react";
import { ChangeLoginPage } from "../components/ChangeLoginPage";
import { InputBox } from "../components/InputBox";
import { SubmitButton } from "../components/SubmitButton";
import { SubTitleComponent } from "../components/SubTitleComponent";
import { TitleComponent } from "../components/TitleComponent";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface result {
  message: string;
  token?: string;
}

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-screen h-screen bg-slate-300 flex flex-col justify-center items-center">
      <div className="w-1/3 flex flex-col justify-center items-center bg-white rounded-md shadow-lg">
        <div>
          <div className="mb-6 mt-3">
            <TitleComponent label="Sign Up"></TitleComponent>

            <SubTitleComponent label="Sign Up to access the platform!"></SubTitleComponent>
          </div>
          <InputBox
            label={"Full Name"}
            type="text"
            placeholder="Jon Doe"
            OnChange={(e) => {
              setName(e.target.value);
            }}
          ></InputBox>

          <InputBox
            label={"Email"}
            type="text"
            placeholder="JonDoe@gmail.com"
            OnChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputBox>

          <InputBox
            label={"Password"}
            type="Password"
            OnChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>

          <SubmitButton
            label="Sign Up"
            OnClick={() => {
              async function CallMe() {
                try {
                  const response = await axios.post<result>(
                    "http://localhost:3000/api/user/signup",
                    { name, email, password }
                  );

                  if (response.data.message == "signedup successfully!") {
                    if (response.data.token) {
                      window.localStorage.setItem("token", response.data.token);
                    }
                    Swal.fire({
                      title: "Good job!",
                      text: "You clicked the button!",
                      icon: "success",
                    });

                    navigate("/dashboard");
                  }
                } catch (e: AxiosError) {
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

          <ChangeLoginPage
            label="Already have account? "
            to="Sign In"
            routeLink="/signin"
          ></ChangeLoginPage>
        </div>
      </div>
    </div>
  );
}
