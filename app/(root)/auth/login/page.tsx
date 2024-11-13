import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  return (<>
    <section className="min-h-screen flex justify-center items-center ">
      <div className=" w-full px-5 sm:w-8/12 md:w-8/12 lg:w-5/12 md:px-9 py-7 rounded-lg shadow-xl">

        <h1 className="text-3xl font-bold my-2">Welcome back</h1>
        <div className="text-gray-500">Login to your Account!</div>

        <SignInForm />

      </div>

    </section>
  </>)
}