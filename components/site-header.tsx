"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/materials", label: "Materials" },
  { href: "/markets", label: "Markets" },
  { href: "/locations", label: "Locations" },
  { href: "/quality", label: "Quality" },
  { href: "/faq", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/materials" ? pathname.startsWith("/materials") : pathname === href;
  }

  return (
    <header className="site-header">
      <div className="trade-strip">
        <span>DET // Recovered material cargo</span>
        <span className="trade-strip-status"><i /> FCL · LCL · Bulk lots</span>
        <span>IN · EU · GCC trade lanes</span>
      </div>
      <div className="header-main">
        <Link className="brand brand-logo-link" href="/" aria-label="Diyar e Taiba home">
          <img className="brand-logo" src="/brand/diyar-e-taiba-logo.png" alt="Diyar e Taiba" width={1508} height={391} />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact#trade-enquiry">Get a trade quote <span aria-hidden="true">↗</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span>Menu</span><i aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link href={item.href} key={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                <span>{(index + 1).toString().padStart(2, "0")}</span>{item.label}<b aria-hidden="true">↗</b>
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
