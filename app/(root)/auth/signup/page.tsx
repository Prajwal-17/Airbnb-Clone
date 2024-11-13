import SignUpForm from "@/components/SignUpForm";

export default function SignUp() {
  return (<>
    <section className="min-h-screen flex justify-center items-center">
      <div className=" w-full px-5 sm:w-8/12 md:w-8/12 lg:w-5/12 md:px-9 py-7 rounded-lg shadow-xl">

        <h1 className="text-3xl font-bold my-2">Welcome to Airbnb</h1>
        <div className="text-gray-500">Create an Account</div>

        <SignUpForm />

      </div>

    </section>
  </>)
}