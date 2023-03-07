export const RegistrationForm = () => {
  return (
    <form className="w-full">
      <div className="flex flex-col items-center gap-2">
        <label
          htmlFor="name"
          className="text-xl font-bold text-zinc-300 font-mono"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="
          w-full border-2 border-zinc-300 text-zinc-400 rounded-md px-3 py-0.5 transition-all
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent focus:shadow-md    
          "
          autoComplete="off"
        />
      </div>
    </form>
  );
};
