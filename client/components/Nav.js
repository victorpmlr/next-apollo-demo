import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import styles from './Nav.module.scss'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contacts', label: 'Contacts' },
]

const Nav = () => {
  const router = useRouter()
  return (
    <div className={styles.nav}>
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          <a className={router.asPath === href && styles.current}>{label}</a>
        </Link>
      ))}
    </div>
  )
}

export default Nav
