export const UserIsRegisteredOnDb = ({ userName }: { userName: string }) => {
  return (
    <div>
      <p className="text-xl md:text-2xl font-bold">
        Welcome back {userName} 👋
      </p>
    </div>
  );
};
