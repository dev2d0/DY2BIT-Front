import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageConfig } from '../lib/router/config'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(pageConfig.introduce.props.build())
  }, [])

  return <>Home</>
}

export default Home
