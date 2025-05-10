export default function Skills() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row-reverse md:space-x-6 mx-auto md:p-9 md:max-w-7xl xl:max-w-[2080px] overflow-visible gap-6">
      {/* Right side header */}
      <section className="relative w-full md:w-1/3 md:sticky md:top-6 p-6 md:p-0 md:pb-6 mb-6 md:mb-0 h-[100vh] max-h-[100vh] md:h-[90vh] md:max-h-[90vh] space-y-6 border border-j-celestial-white/10 rounded-3xl">
      </section>

      {/* Left side content */}
      <article className=" w-full md:w-2/3 space-y-24">
        <section className="w-full h-[90vh] border border-j-celestial-white/10 p-9 rounded-3xl">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <p className="text-lg">
            We are a team of passionate designers and developers dedicated to
            bringing your ideas to life. Our mission is to create beautiful and
            functional designs that resonate with your audience.
          </p>
        </section>
      </article>
    </section>
  );
}
