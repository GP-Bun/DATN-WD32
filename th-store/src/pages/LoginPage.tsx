import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    await login(String(form.get('email')||''), String(form.get('password')||''))
    navigate('/')
  }

  return (
    <section>
      <h2>Đăng nhập</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <input name="email" placeholder="Email" type="email" required />
        <input name="password" placeholder="Mật khẩu" type="password" required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>
        Chưa có tài khoản? <Link to="/dang-ky">Đăng ký</Link>
      </p>
    </section>
  )
}


