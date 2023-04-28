import Layout from "@/components/Layout"
import Head from "next/head"

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Web3:App</title>
        <meta name="description" content="A small web3 application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </Layout>
  )
}
