import Link from "next/link";
import { contact, whatsappUrl } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-lead">
        <Link className="brand brand-logo-link footer-brand" href="/" aria-label="Diyar e Taiba home">
          <img className="brand-logo" src="/brand/diyar-e-taiba-logo.png" alt="Diyar e Taiba" width={880} height={226} />
        </Link>
        <div className="footer-cargo-stamp" role="group" aria-label="Recovered materials cargo trading coverage">
          <strong>DET</strong>
          <span>FCL · LCL · BULK</span>
          <small>IND / EUR / GCC</small>
        </div>
        <p>One trading partner for metal, rubber, textile and paper scrap.</p>
      </div>
      <div className="footer-links">
        <div><span>Explore</span><Link href="/about">About us</Link><Link href="/materials">All materials</Link><Link href="/locations">Trading locations</Link><Link href="/quality">Quality process</Link><Link href="/faq">Scrap Q&A</Link></div>
        <div><span>Markets</span><Link href="/markets#india">India</Link><Link href="/markets#europe">Europe</Link><Link href="/markets#middle-east">Middle East</Link></div>
        <div><span>Contact</span><Link href="/contact?intent=sell#trade-enquiry">Offer scrap</Link><Link href="/contact?intent=source#trade-enquiry">Source material</Link></div>
        <div>
          <span>WhatsApp</span>
          {contact.whatsapp.map((line) => (
            <a href={whatsappUrl(line.number)} key={line.number} rel="noopener noreferrer" target="_blank">{line.display}</a>
          ))}
        </div>
      </div>
      <address className="footer-address">
        {contact.address.street}, {contact.address.locality}, {contact.address.region} {contact.address.postalCode}, {contact.address.country}
      </address>
      <div className="footer-bottom">
        <span>© 2026 Diyar e Taiba</span>
        <span>Recovered material cargo · India · Europe · Middle East</span>
      </div>
    </footer>
  );
}
