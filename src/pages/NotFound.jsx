import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page empty empty--full">
      <h1 className="gradient-text big-404">404</h1>
      <p>This scene didn't make the final cut.</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </div>
  );
}
