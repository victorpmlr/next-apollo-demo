import Loading from 'components/Loading'
import dynamic from 'next/dynamic'

// eslint-disable-next-line react/display-name
const NameComp = dynamic(() => import('../components/Name'), { loading: () => <Loading /> })

const Index = (): JSX.Element => (
  <div>
    Welcome, <NameComp />
  </div>
)

export default Index
