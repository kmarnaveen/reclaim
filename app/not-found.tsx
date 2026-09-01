import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="kicker">404 · Route not found</p>
      <h1>This material<br /><em>isn’t here.</em></h1>
      <p>Return to the complete scrap directory or start a custom material enquiry.</p>
      <div><Link className="button button-dark" href="/materials">Browse materials <span>↗</span></Link><Link className="text-link" href="/contact">Contact our team <span>→</span></Link></div>
    </main>
  );
}
