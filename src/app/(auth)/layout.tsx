export default function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <h1>Auth</h1>
   
        {children}
      </section>
    )
  }