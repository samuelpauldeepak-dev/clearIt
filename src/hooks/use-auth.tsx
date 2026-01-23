"use client";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore, UserProfile } from "@/store/use-user-store";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: string) => Promise<void>;
  checkUsage: () => boolean;
  incrementUsage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    user,
    setUser,
    logout: clearStore,
    subscription,
    incrementUsage,
  } = useUserStore();
  const router = useRouter();

  const checkUsage = () => {
    if (subscription.usageCount >= subscription.usageLimit) {
      toast.error(
        `Usage limit reached (${subscription.usageLimit}/${subscription.usageLimit}). Please upgrade your plan.`,
      );
      router.push("/pricing");
      return false;
    }
    return true;
  };

  const login = async (email: string, password: string) => {
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUser: UserProfile = { id: "1", email, name: email.split("@")[0] };
    setUser(mockUser);
    toast.success("Logged in successfully!");
    router.push("/");
  };

  const signup = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUser: UserProfile = {
      id: "1",
      email: data.email,
      name: data.name,
    };
    setUser(mockUser);
    toast.success("Account created successfully!");
    router.push("/");
  };

  const socialLogin = async (provider: string) => {
    toast.loading(`Redirecting to ${provider}...`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockUser: UserProfile = {
      id: "1",
      email: `user@${provider.toLowerCase()}.com`,
      name: `${provider} User`,
    };
    setUser(mockUser);
    toast.dismiss();
    toast.success(`Connected with ${provider}!`);
    router.push("/");
  };

  const logout = () => {
    clearStore();
    toast.info("Logged out");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        login,
        signup,
        logout,
        socialLogin,
        checkUsage,
        incrementUsage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
