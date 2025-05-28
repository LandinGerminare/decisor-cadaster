import { createContext, useContext, useEffect, useState } from "react";
import { AuthModel } from "./types";
import { useRouter } from "next/router";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

interface AuthContextI {
  getAccessToken: () => string | null;
  getUserRoles: () => string[];
  setCredentials: (credentials: AuthModel) => void;
  clearCredentials: () => void;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  getUserName: () => string;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [authModel, setAuthModel] = useState<AuthModel | null>(null);

  useEffect(() => {
    const storedRoles = window.localStorage.getItem("user_roles");
    const storedAccessToken = localStorage.getItem("access_token");
    const storedUsername = localStorage.getItem("username");
    const storedIsRealTime = localStorage.getItem("is_real_time");
    const storedQuotesUsername = localStorage.getItem("cqg_username");
    const storedQuotesPassword = localStorage.getItem("cqg_password");

    setAuthModel({
      access_token: storedAccessToken ?? "",
      user_roles: storedRoles ? JSON.parse(storedRoles) : [],
      type: "",
      username: storedUsername ?? "",
      is_real_time: storedIsRealTime ?? "",
      cqg_username: storedQuotesUsername ?? "",
      cqg_password: storedQuotesPassword ?? ""
    });
  }, []);

  function setCredentials(credencials: AuthModel): void {
    localStorage.setItem("access_token", credencials.access_token);
    localStorage.setItem("user_roles", JSON.stringify(credencials.user_roles));
    localStorage.setItem("username", credencials.username);
    localStorage.setItem("is_real_time", credencials.is_real_time);
    if (credencials.cqg_username) {
      localStorage.setItem("cqg_username", credencials.cqg_username);
    }
    if (credencials.cqg_password) {
      localStorage.setItem("cqg_password", credencials.cqg_password);
    }
    setAuthModel(credencials);
  }

  function getAccessToken(): string | null {
    if (authModel?.access_token) {
      return authModel.access_token;
    }
    const token = localStorage.getItem("access_token");
    return token;
  }

  function getUserRoles(): string[] {
    if (authModel?.user_roles) {
      return authModel.user_roles;
    }

    return [];
  }

  function getUserName(): string {
    if (authModel?.username) {
      return authModel.username;
    }

    return "";
  }

  function clearCredentials(): void {
    if (isAuthenticated) {
      instance.logoutPopup()
        .then(() => {
          clearAuth();
        });
    } else {
      clearAuth();
    }
  }

  function clearAuth(): void {
    setAuthModel(null);
    localStorage.clear();
    const currentMainRoute = router.pathname.split("/")[1];
    router.replace({
      pathname: "/",
      query: currentMainRoute
        ? {
          from: currentMainRoute,
        }
        : {},
    });
  }

  function isAdmin(): boolean {
    return getUserRoles().includes("ADMIN");
  }

  function isSuperAdmin(): boolean {
    const superAdmins = ["dev@germinareagro.com.br", "conrado@germinareagro.com.br"];
    const userName = getUserName();

    return superAdmins.some(email => userName.includes(email));
  }

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        getUserRoles,
        setCredentials,
        clearCredentials,
        isAdmin,
        isSuperAdmin,
        getUserName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
