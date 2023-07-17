import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page " className = "flex bg-black text-white flex-col gap-5 items-center justify-center h-screen w-full">
      <h1 className="text-5xl">Oops !</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Page {error.statusText || error.message}</i>
      </p>
      <button className="lets-go-home py-2 px-4 rounded-full" onClick={() => {
        navigate("/")
      }}>lets go home!</button>
    </div>
  );
}