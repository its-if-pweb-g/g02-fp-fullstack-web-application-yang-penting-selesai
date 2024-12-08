export default function LoginView() {
  return (
    <div className="mx-auto max-w-lg ">
      <section className="rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <div className="flex flex-col  ">
          <div className="relative block h-16">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="-hue-rotate-[167deg] opacity-90 absolute inset-0 h-full w-full object-cover rounded-t-lg "
            />
          </div>

          <main className="items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Masuk ke TokoKu!
              </h1>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    placeholder="your email"
                    className="mt-1 w-full rounded-md border-gray-200  bg-white p-2 pe-12 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    placeholder="create a password"
                    className="mt-1 w-full rounded-md border-gray-200  bg-white p-2 pe-12 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="col-span-6 mt-2 flex flex-col sm:items-center">
                  <button className="mb-4 inline-block w-full rounded-md border border-[#a9ca4e] bg-[#a9ca4e] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#859F3D] focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                    Login
                  </button>

                  <p className="mt-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                    Baru di TokoKu?{" "}
                    <a
                      href="/auth/register"
                      className="text-gray-700 underline dark:text-gray-200">
                      {" "}
                      Daftar
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
