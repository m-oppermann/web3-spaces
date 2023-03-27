import Header from "./header"

export default function LayoutComponent({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
