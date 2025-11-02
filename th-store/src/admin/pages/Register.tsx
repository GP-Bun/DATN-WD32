import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

const AdminRegister = () => {
  const { registerAdmin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await registerAdmin(name, email, password);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/admin/login');
    } catch (err: any) {
      setError(err.general || 'Đăng ký thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Đăng ký Admin</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="text"
            placeholder="Họ và tên"
            className="admin-login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="admin-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="admin-login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-login-btn" disabled={isLoading}>
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
        <p>
          Đã có tài khoản? <a href="/admin/login">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
