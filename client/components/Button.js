import styles from './Button.module.scss'

const Button = ({ loading, label, ...rest }) => (
  <button
    disabled={loading}
    type="button"
    className={styles.button + (loading ? ' ' + styles.buttonLoading : '')}
    {...rest}
  >
    {label}
  </button>
)

export default Button
