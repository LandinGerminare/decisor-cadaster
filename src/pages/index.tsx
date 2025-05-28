import Button from "@/components/FormComponents/Button";
import Input from "@/components/FormComponents/Input";
import useAuth from "@/context/Auth";
import { AuthModel } from "@/context/Auth/types";
import { loginRequest } from "@/entraid/authConfig";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from "phosphor-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { instance, accounts } = useMsal();
  const [password, setPassword] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const [graphData, setGraphData] = useState(null);
  const { setCredentials, getAccessToken } = useAuth();

  const [viewPassword, setViewPassword] = useState(false)

  const [result, doLogin] = useTripleRequest<AuthModel>("POST", {
    onSuccess(data) {
      toast.success("Login realizado com sucesso!");
      setCredentials(data);
      navigate();
    },
    onError(errorMessage) {
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    if (isAuthenticated && !graphData) {
      RequestProfileData();
    }
  }, [isAuthenticated]);

  //Pega os dados do usuário do entraID assim que estiver autenticado
  async function RequestProfileData() {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      const userData: any = {
        access_token: response.accessToken,
        type: "Bearer",
        user_roles: []
      };
      setGraphData(userData);
      getTokenEntraID(response)
    } catch (error) {
      toast.error("Erro ao obter os dados do perfil do usuário");
    }
  }

  const getTokenEntraID = (userData: any) => {
    if (userData) {
      const formData = new FormData();
      formData.append("username", `${userData.account.username}`);
      formData.append("password", `${userData.uniqueId}`);
      formData.append("client_id", "ENTRA_ID");
      doLogin({
        url: "/v1/user/access-token",
        body: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
    } else {
      toast.warning("Ocorreu um erro ao fazer o login");
    }
  };

  const handleLogin = () => {
    if (email && password) {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      doLogin({
        url: "/v1/user/access-token",
        body: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
    } else {
      toast.warning("Preencha os campos corretamente");
    }
  };

  function navigate() {
    const from = router.query["from"];
    if (from) {
      router.push(`/${from}`);
    } else {
      router.push("/cadaster-usuario");
    }
  }

  useEffect(() => {
    if (getAccessToken() !== null) {
      navigate();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="w-full bg-black h-full flex items-center justify-center flex-col text-neutral-1000">
        <div className="border-b-[1px] border-neutral-300 p-2 w-[20rem] items-center flex justify-center">
          <span className="text-7xl">
            <img src="/logo/decisor_logo.svg" className="h-[62px]" />
          </span>
        </div>
        <div className="my-5">
          <span className="text-xl text-neutral-700">Entre com sua conta</span>
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="flex flex-col mt-2">
            <Input
              label="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <div className="relative w-full">
              <Input
                label="Senha"
                type={viewPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => setViewPassword(viewPassword ? false : true)}
                className="absolute top-2/3 -translate-y-1/2 right-0 p-3 pt-4 text-gray-500 hover:text-gray-700"
                title={viewPassword ? "Ocultar" : "Mostrar"}
              >
                {viewPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
              </button>
            </div>
            <br />
          </div>

          <br></br>
          <div className="flex justify-end">
            <p
              className="mr-2 mb-5 hover:cursor-pointer hover:text-support-info w-max"
              onClick={() => {
                router.push("/forgot-password");
              }}
            >
              Esqueci minha senha
            </p>
          </div>

          <Button
            title="Entrar"
            loading={result.state === "Loading"}
            onClick={handleLogin}
          />
        </div>
      </div>
      <video
        autoPlay
        loop
        muted
        className="w-9/12 bg-black object-contain"
      >
        <source src="https://decisor-api.s3.amazonaws.com/assets/initial_video.mp4" />
      </video>
    </div >
  );
}
