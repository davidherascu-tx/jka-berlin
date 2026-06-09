/**
 * Root-Layout fuer den Sanity-Studio-Bereich (/studio).
 *
 * Da app/layout.tsx entfernt wurde, ist dieses Layout das Root-Layout fuer
 * alle Routen unterhalb /studio — also bewusst minimal: nur <html> + <body>,
 * keine Navbar/Footer, kein globales CSS der Website.
 * Sanity bringt sein eigenes Styling und Viewport mit (next-sanity/studio).
 */
export default function StudioLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}
