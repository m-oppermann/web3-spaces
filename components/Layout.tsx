import Header from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

export default function LayoutComponent({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
