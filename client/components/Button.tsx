import styles from './Button.module.scss'

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  label: string
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ loading = false, type = 'button', label, ...rest }: ButtonProps): JSX.Element => (
  <button
    disabled={loading}
    type={type}
    className={styles.button + (loading ? ' ' + styles.buttonLoading : '')}
    {...rest}
  >
    {label}
  </button>
)

export default Button
