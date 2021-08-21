import dynamic from 'next/dynamic'
import Link from 'next/link'

const NameComp = dynamic(() => import('../components/Name'), { loading: () => <span>...</span> })

const Page = () => (
  <div>
    Welcome, <NameComp />
    <br />
    <br />
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
)

export default Page
