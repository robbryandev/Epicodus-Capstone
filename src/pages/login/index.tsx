import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Magic } from "magic-sdk";
import { env } from "@/env.mjs";
const magic =
  typeof window !== "undefined" &&
  new Magic(env.NEXT_PUBLIC_MAGIC_KEY || "a");

export default function Login({ providers }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  });
  const handleEmail = async ({ email }) => {
    if (!magic) throw new Error(`magic not defined`);

    // login with Magic
    const didToken = await magic.auth.loginWithEmailOTP({ email });

    // sign in with NextAuth
    await signIn('credentials', {
      didToken,
      callbackUrl: router.query['callbackUrl'] as string,
    });
  };
  return (
    <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background-card px-6 pb-2 pt-6 text-center shadow-md">
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit(handleEmail)}>
        <input
          className="py-1 px-1.5 mb-2 rounded-md"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <br />
        <button type="submit" className="m-2 rounded-md bg-background-nav p-2 text-white shadow-sm hover:bg-background-main">Login with Email</button>
      </form>
      {Object.values(providers).map((provider: any) =>
        provider.name !== "magic" ? (
          <div key={provider.name} className="rounded-lg">
            <button
              className="m-2 rounded-md bg-background-nav p-2 text-white shadow-sm hover:bg-background-main"
              onClick={() => signIn(provider.id)}
            >
              Login with {provider.name}
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: { providers: await getProviders() } };
}
