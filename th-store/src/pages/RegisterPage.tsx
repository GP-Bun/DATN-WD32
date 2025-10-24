import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    await register(String(form.get('name')||''), String(form.get('email')||''), String(form.get('password')||''))
    navigate('/')
  }

  return (
    <section>
      <h2>Đăng ký</h2>
      <form className="auth-form" onSubmit={onSubmit}>
        <input name="name" placeholder="Họ và tên" required />
        <input name="email" placeholder="Email" type="email" required />
        <input name="password" placeholder="Mật khẩu" type="password" required />
        <button type="submit">Tạo tài khoản</button>
      </form>
      <p>
        Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
      </p>
    </section>
  )
}


