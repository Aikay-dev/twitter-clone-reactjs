import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page " className = "flex bg-black text-white flex-col gap-5 items-center justify-center h-screen w-full">
      <h1 className="text-5xl">Oops !</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Page {error.statusText || error.message}</i>
      </p>
    </div>
  );
}