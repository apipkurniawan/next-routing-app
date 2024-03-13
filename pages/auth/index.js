import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import AuthForm from "../../components/auth/auth-form";

function AuthPage() {
  const router = useRouter();

  // client-side page guard
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/events");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
