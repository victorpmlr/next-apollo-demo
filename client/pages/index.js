import dynamic from 'next/dynamic'

const NameComp = dynamic(() => import('../components/Name'), { loading: () => <span>...</span> })

const Page = () => (
  <div>
    Welcome, <NameComp />
  </div>
)

export default Page
