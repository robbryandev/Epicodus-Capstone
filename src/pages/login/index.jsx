import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
// import { useForm } from 'react-hook-form'; 

// const magic = typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_PK || 'a');

export default function Login({ providers }) {
    const router = useRouter();
    // const { register, handleSubmit } = useForm();
    async function handleEmail({email}) {
        // const email = event.target.email.value.toLowerCase()
        console.log(email);
        console.log(router.query['callbackUrl'])
        // const didToken = await magic.auth.loginWithMagicLink({email});
        // await signIn('credentials', {
        //     didToken,
        //     callbackUrl: router.query['callbackUrl']
        //   });      
    }
    return (
            <div className="bg-background-card rounded-lg shadow-md absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] px-6 pb-2 pt-10 text-center">
                {/* <form method="post" className="mb-2" onSubmit={handleSubmit(handleEmail)}>
                    <input className="mb-4 p-1.5 rounded-lg" {...register('email', { required: true })} placeholder="nick@example.com" />
                    <br />
                    <button className="p-2 rounded-md bg-slate-500 bg-opacity-75 text-white" type="submit">Email Login</button>
                </form> */}
                {Object.values(providers).map((provider) => (
                        provider.name !== "magic" ? (
                            <div key={provider.name} className="rounded-lg">
                                <button className="p-2 m-2 bg-background-nav hover:bg-background-main rounded-md text-white shadow-sm" onClick={() => signIn(provider.id)}>
                                    Sign in with {provider.name}
                                </button>
                            </div>) : (
                                null
                    )
                ))}
            </div>
    );
}

export async function getServerSideProps(context) {
    return { props: { providers: await getProviders() } };
}